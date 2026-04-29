import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p className="text-gray-400 text-sm p-4">Loading editor...</p>
})

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
    ]
}

// ─── Category badge colours ───────────────────────────────────────────────────
const categoryColour = (cat = '') => {
    const map = {
        dgca: 'bg-sky-100 text-sky-700 border-sky-200',
        'cpl guide': 'bg-violet-100 text-violet-700 border-violet-200',
        training: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        career: 'bg-amber-100 text-amber-700 border-amber-200',
        medical: 'bg-rose-100 text-rose-700 border-rose-200',
    }
    return map[(cat || '').toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200'
}

// ─── Blank form state ─────────────────────────────────────────────────────────
const blankForm = () => ({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    imageFile: null,
    imagePreview: '',
})

export default function AdminBlog() {
    const router = useRouter()
    const [authChecked, setAuthChecked] = useState(false)

    // view: 'dashboard' | 'new' | 'edit'
    const [view, setView] = useState('dashboard')

    // blog list
    const [blogs, setBlogs] = useState([])
    const [blogsLoading, setBlogsLoading] = useState(true)
    const [blogsError, setBlogsError] = useState('')

    // form (shared for new + edit)
    const [form, setForm] = useState(blankForm())
    const [editingId, setEditingId] = useState(null)

    // submission
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    // ── auth ────────────────────────────────────────────────────────────────
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('weone_admin')
        if (!isLoggedIn) router.replace('/admin/login')
        else setAuthChecked(true)
    }, [])

    // ── fetch all blogs ─────────────────────────────────────────────────────
    const fetchBlogs = async () => {
        setBlogsLoading(true)
        setBlogsError('')
        try {
            const res = await fetch('/api/blogs')
            const data = await res.json()
            setBlogs(Array.isArray(data) ? data : data.blogs || [])
        } catch (e) {
            setBlogsError('Could not load blogs. Check your API.')
        } finally {
            setBlogsLoading(false)
        }
    }

    useEffect(() => {
        if (authChecked) fetchBlogs()
    }, [authChecked])

    // ── helpers ─────────────────────────────────────────────────────────────
    const setField = (key, val) => setForm(f => ({ ...f, [key]: val }))

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setField('imageFile', file)
            setField('imagePreview', URL.createObjectURL(file))
        }
    }

    const openNew = () => {
        setForm(blankForm())
        setEditingId(null)
        setStatus('')
        setView('new')
    }

    const openEdit = (blog) => {
        setForm({
            title: blog.title || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            category: blog.category || '',
            imageFile: null,
            imagePreview: blog.coverImage || blog.image || '',
        })
        setEditingId(blog._id || blog.id)
        setStatus('')
        setView('edit')
    }

    const backToDashboard = () => {
        setView('dashboard')
        setStatus('')
        fetchBlogs()
    }

    // ── submit (create or update) ───────────────────────────────────────────
    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            setStatus('❌ Title and content are required.')
            return
        }
        setLoading(true)
        setStatus(view === 'edit' ? 'Saving changes...' : 'Publishing...')

        try {
            const formData = new FormData()
            formData.append('title', form.title)
            formData.append('excerpt', form.excerpt)
            formData.append('content', form.content)
            formData.append('category', form.category)
            if (form.imageFile) formData.append('coverImage', form.imageFile)

            const isEdit = view === 'edit'
            const res = await fetch(
                isEdit ? `/api/blogs?id=${editingId}` : '/api/blogs',
                { method: isEdit ? 'PUT' : 'POST', body: formData }
            )
            const text = await res.text()
            let data
            try { data = JSON.parse(text) } catch {
                setStatus(`❌ Server error: ${text.substring(0, 100)}`)
                setLoading(false)
                return
            }

            if (data.success) {
                setStatus(isEdit ? '✅ Blog updated!' : '✅ Blog published!')
                setTimeout(() => backToDashboard(), 1200)
            } else {
                setStatus(`❌ ${data.message || 'Something went wrong.'}`)
                setLoading(false)
            }
        } catch (e) {
            setStatus(`❌ Network error: ${e.message}`)
            setLoading(false)
        }
    }

    // ── delete ──────────────────────────────────────────────────────────────
    const handleDelete = async () => {
        if (!confirm('Delete this blog permanently? This cannot be undone.')) return
        setLoading(true)
        setStatus('Deleting...')
        try {
            const res = await fetch(`/api/blogs?id=${editingId}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setStatus('✅ Deleted.')
                setTimeout(() => backToDashboard(), 900)
            } else {
                setStatus(`❌ ${data.message || 'Delete failed.'}`)
                setLoading(false)
            }
        } catch (e) {
            setStatus(`❌ ${e.message}`)
            setLoading(false)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('weone_admin')
        document.cookie = 'weone_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.replace('/admin/login')
    }

    if (!authChecked) return null

    // ════════════════════════════════════════════════════════════════════════
    // DASHBOARD VIEW
    // ════════════════════════════════════════════════════════════════════════
    if (view === 'dashboard') return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
                    .admin-root { font-family: 'DM Sans', sans-serif; }
                    .admin-root h1, .admin-root h2 { font-family: 'Syne', sans-serif; }
                    .blog-row { transition: all 0.18s ease; }
                    .blog-row:hover { transform: translateX(3px); }
                    .stat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
                    .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                    .btn-primary { transition: all 0.18s ease; }
                    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.35); }
                `
            }} />
            <div className="admin-root min-h-screen bg-slate-50">
                {/* Sidebar accent bar */}
                <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #2563eb 0%, #7c3aed 100%)', zIndex: 50 }} />

                <div className="max-w-5xl mx-auto px-8 pt-28 pb-16">

                    {/* top bar */}
                    <div className="flex items-start justify-between mb-10">
                        <div>
                            <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">WeOne Admin</p>
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-1" style={{ letterSpacing: '-0.5px' }}>
                                Blog Manager
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">
                                {blogsLoading ? 'Fetching posts...' : `${blogs.length} post${blogs.length !== 1 ? 's' : ''} published`}
                            </p>
                        </div>
                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={openNew}
                                className="btn-primary flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-sm"
                            >
                                <span style={{ fontSize: '15px' }}>✏️</span> Write New Blog
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors"
                            >
                                <span style={{ fontSize: '14px' }}>🚪</span> Logout
                            </button>
                        </div>
                    </div>

                    {/* stats row */}
                    {!blogsLoading && !blogsError && (
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="stat-card bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Blogs</p>
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base">📄</div>
                                </div>
                                <p className="text-4xl font-extrabold text-slate-800">{blogs.length}</p>
                            </div>
                            <div className="stat-card bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Published</p>
                                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-base">✅</div>
                                </div>
                                <p className="text-4xl font-extrabold text-emerald-600">{blogs.length}</p>
                            </div>
                            <div className="stat-card bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categories</p>
                                    <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center text-base">🏷️</div>
                                </div>
                                <p className="text-4xl font-extrabold text-violet-600">
                                    {new Set(blogs.map(b => (b.category || '').toLowerCase()).filter(Boolean)).size}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* section heading */}
                    {!blogsLoading && !blogsError && blogs.length > 0 && (
                        <div className="flex items-center gap-3 mb-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">All Posts</p>
                            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                        </div>
                    )}

                    {/* blog list */}
                    {blogsLoading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <div style={{
                                width: 36, height: 36, border: '3px solid #e2e8f0',
                                borderTopColor: '#2563eb', borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite'
                            }} />
                            <p className="text-slate-400 text-sm">Loading blogs...</p>
                            <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
                        </div>
                    )}
                    {blogsError && (
                        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-6 text-center text-sm font-medium">
                            ⚠️ {blogsError}
                        </div>
                    )}
                    {!blogsLoading && !blogsError && blogs.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-white">
                            <div style={{ fontSize: 48, marginBottom: 12 }}>✍️</div>
                            <p className="text-slate-700 font-semibold text-lg">No blogs yet</p>
                            <p className="text-slate-400 text-sm mt-1">Click "Write New Blog" to publish your first post</p>
                        </div>
                    )}
                    {!blogsLoading && !blogsError && blogs.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {blogs.map((blog, i) => (
                                <div
                                    key={blog._id || blog.id || i}
                                    className="blog-row flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-md"
                                >
                                    {/* thumbnail */}
                                    <div className="w-20 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                        {(blog.coverImage || blog.image) ? (
                                            <img
                                                src={blog.coverImage || blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl">🖼️</div>
                                        )}
                                    </div>

                                    {/* info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {blog.category && (
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryColour(blog.category)}`}>
                                                    {blog.category}
                                                </span>
                                            )}
                                            {blog.readTime && (
                                                <span className="text-xs text-slate-400 font-medium">⏱ {blog.readTime} min</span>
                                            )}
                                        </div>
                                        <p className="font-semibold text-slate-800 truncate">{blog.title}</p>
                                        {blog.excerpt && (
                                            <p className="text-sm text-slate-400 truncate mt-0.5">{blog.excerpt}</p>
                                        )}
                                    </div>

                                    {/* date */}
                                    <div className="text-right flex-shrink-0 hidden sm:block">
                                        <p className="text-xs text-slate-400 font-medium">
                                            {blog.createdAt
                                                ? new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                                : '—'}
                                        </p>
                                    </div>

                                    {/* edit btn */}
                                    <button
                                        onClick={() => openEdit(blog)}
                                        className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-100 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )

    // ════════════════════════════════════════════════════════════════════════
    // NEW / EDIT FORM VIEW
    // ════════════════════════════════════════════════════════════════════════
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
                    .admin-root { font-family: 'DM Sans', sans-serif; }
                    .admin-root h1, .admin-root h2 { font-family: 'Syne', sans-serif; }
                    .ql-editor { min-height: 300px; font-size: 16px; font-family: 'DM Sans', sans-serif; }
                    .ql-container { border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border-color: #e2e8f0 !important; }
                    .ql-toolbar { border-top-left-radius: 12px; border-top-right-radius: 12px; border-color: #e2e8f0 !important; background: #f8fafc; }
                    .ql-container.ql-snow:focus-within { border-color: #93c5fd !important; box-shadow: 0 0 0 3px rgba(147,197,253,0.25); }
                    .form-input { transition: border-color 0.15s, box-shadow 0.15s; }
                    .form-input:focus { border-color: #93c5fd !important; box-shadow: 0 0 0 3px rgba(147,197,253,0.2); outline: none; }
                    .btn-publish { transition: all 0.18s ease; }
                    .btn-publish:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
                `
            }} />

            <div className="admin-root min-h-screen bg-slate-50">
                {/* Sidebar accent bar */}
                <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #2563eb 0%, #7c3aed 100%)', zIndex: 50 }} />

                <div className="max-w-4xl mx-auto px-8 pt-28 pb-16">

                    {/* header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-start gap-4">
                            <button
                                onClick={backToDashboard}
                                className="mt-1 flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
                            >
                                ← Back
                            </button>
                            <div>
                                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
                                    {view === 'edit' ? 'Editing Post' : 'New Post'}
                                </p>
                                <h1 className="text-3xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.5px' }}>
                                    {view === 'edit' ? 'Edit Blog' : 'Write a Blog'}
                                </h1>
                                <p className="text-slate-400 text-sm font-medium mt-0.5">
                                    {view === 'edit'
                                        ? 'Make your changes and click Save — updates instantly.'
                                        : 'Fill in the details and click Publish — appears instantly.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {view === 'edit' && (
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex items-center gap-1.5 px-4 py-2.5 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold rounded-xl transition-colors"
                                >
                                    🗑 Delete
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    </div>

                    {/* form card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">

                        {/* Title */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Blog Title *</label>
                            <input
                                className="form-input w-full border border-slate-200 bg-slate-50 p-3.5 rounded-xl text-lg font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-normal"
                                placeholder="Enter your blog title..."
                                value={form.title}
                                onChange={e => setField('title', e.target.value)}
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                            <input
                                className="form-input w-full border border-slate-200 bg-slate-50 p-3.5 rounded-xl text-slate-800 placeholder:text-slate-300"
                                placeholder="e.g. CPL Guide, DGCA, Career, Medical"
                                value={form.category}
                                onChange={e => setField('category', e.target.value)}
                            />
                        </div>

                        {/* Cover image */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cover Image</label>
                            <div
                                className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                                onClick={() => document.getElementById('imageInput').click()}
                            >
                                {form.imagePreview ? (
                                    <img src={form.imagePreview} alt="Preview" className="max-h-52 mx-auto rounded-xl object-cover shadow-sm" />
                                ) : (
                                    <div>
                                        <div style={{ fontSize: 40, marginBottom: 8 }}>🖼️</div>
                                        <p className="text-slate-500 text-sm font-medium">Click to upload cover image</p>
                                        <p className="text-slate-400 text-xs mt-1">JPG, PNG, WEBP up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            {form.imagePreview && (
                                <button
                                    onClick={() => { setField('imageFile', null); setField('imagePreview', '') }}
                                    className="mt-2 text-red-400 hover:text-red-600 text-sm font-medium hover:underline transition-colors"
                                >
                                    ✕ Remove image
                                </button>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">SEO Excerpt</label>
                            <textarea
                                className="form-input w-full border border-slate-200 bg-slate-50 p-3.5 rounded-xl placeholder:text-slate-300 text-slate-800"
                                placeholder="Short description for SEO (1–2 sentences)"
                                rows={3}
                                value={form.excerpt}
                                onChange={e => setField('excerpt', e.target.value)}
                            />
                        </div>

                        {/* Content editor */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Content *</label>
                            <ReactQuill
                                theme="snow"
                                value={form.content}
                                onChange={v => setField('content', v)}
                                modules={modules}
                                placeholder="Write your blog content here..."
                            />
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', background: '#f1f5f9', marginBottom: 24 }} />

                        {/* actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`btn-publish flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white shadow-sm ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600'}`}
                            >
                                {loading
                                    ? (view === 'edit' ? 'Saving...' : 'Publishing...')
                                    : (view === 'edit' ? '💾 Save Changes' : '🚀 Publish Blog')}
                            </button>
                            <button
                                onClick={backToDashboard}
                                className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                        {status && (
                            <div className={`mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold ${status.includes('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}