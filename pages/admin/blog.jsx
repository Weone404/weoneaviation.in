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
        dgca: 'bg-blue-100 text-blue-700',
        'cpl guide': 'bg-purple-100 text-purple-700',
        training: 'bg-green-100 text-green-700',
        career: 'bg-yellow-100 text-yellow-700',
        medical: 'bg-red-100 text-red-700',
    }
    return map[(cat || '').toLowerCase()] || 'bg-gray-100 text-gray-600'
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
            // handle both { blogs: [...] } and plain array responses
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
            // FIXED
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
        <div className="max-w-5xl mx-auto p-8 pt-28">

            {/* top bar */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Blog Manager</h1>
                    <p className="text-gray-500 text-sm">
                        {blogsLoading ? 'Loading...' : `${blogs.length} blog${blogs.length !== 1 ? 's' : ''} published`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={openNew}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                        ✏️ Write New Blog
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* stats row */}
            {!blogsLoading && !blogsError && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                        <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">Total Blogs</p>
                        <p className="text-3xl font-bold text-blue-700">{blogs.length}</p>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                        <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Published</p>
                        <p className="text-3xl font-bold text-green-700">{blogs.length}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                        <p className="text-xs text-purple-500 font-semibold uppercase tracking-wide mb-1">Categories</p>
                        <p className="text-3xl font-bold text-purple-700">
                            {new Set(blogs.map(b => (b.category || '').toLowerCase()).filter(Boolean)).size}
                        </p>
                    </div>
                </div>
            )}

            {/* blog list */}
            {blogsLoading && (
                <div className="text-center py-20 text-gray-400">Loading blogs...</div>
            )}
            {blogsError && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 text-center">
                    {blogsError}
                </div>
            )}
            {!blogsLoading && !blogsError && blogs.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
                    <p className="text-4xl mb-3">📝</p>
                    <p className="text-gray-500 font-medium">No blogs yet</p>
                    <p className="text-gray-400 text-sm mt-1">Click "Write New Blog" to get started</p>
                </div>
            )}
            {!blogsLoading && !blogsError && blogs.length > 0 && (
                <div className="flex flex-col gap-3">
                    {blogs.map((blog, i) => (
                        <div
                            key={blog._id || blog.id || i}
                            className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
                        >
                            {/* thumbnail */}
                            <div className="w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                {(blog.coverImage || blog.image) ? (
                                    <img
                                        src={blog.coverImage || blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🖼️</div>
                                )}
                            </div>

                            {/* info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {blog.category && (
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColour(blog.category)}`}>
                                            {blog.category}
                                        </span>
                                    )}
                                    {blog.readTime && (
                                        <span className="text-xs text-gray-400">⏱ {blog.readTime} min read</span>
                                    )}
                                </div>
                                <p className="font-semibold text-gray-900 truncate">{blog.title}</p>
                                {blog.excerpt && (
                                    <p className="text-sm text-gray-400 truncate mt-0.5">{blog.excerpt}</p>
                                )}
                            </div>

                            {/* date */}
                            <div className="text-right flex-shrink-0 hidden sm:block">
                                <p className="text-xs text-gray-400">
                                    {blog.createdAt
                                        ? new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                        : '—'}
                                </p>
                            </div>

                            {/* edit btn */}
                            <button
                                onClick={() => openEdit(blog)}
                                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    // ════════════════════════════════════════════════════════════════════════
    // NEW / EDIT FORM VIEW
    // ════════════════════════════════════════════════════════════════════════
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `.ql-editor { min-height: 300px; font-size: 16px; } .ql-container { border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; } .ql-toolbar { border-top-left-radius: 6px; border-top-right-radius: 6px; }`
            }} />

            <div className="max-w-4xl mx-auto p-8 pt-28">

                {/* header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={backToDashboard}
                            className="text-gray-400 hover:text-gray-700 text-sm flex items-center gap-1 transition-colors"
                        >
                            ← Back
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {view === 'edit' ? 'Edit Blog' : 'Write a Blog'}
                            </h1>
                            <p className="text-gray-500 text-sm">
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
                                className="px-4 py-2 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                🗑 Delete
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* form */}
                <input
                    className="w-full border p-3 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Blog Title *"
                    value={form.title}
                    onChange={e => setField('title', e.target.value)}
                />

                <input
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Category (e.g. CPL Guide, DGCA, Career, Medical)"
                    value={form.category}
                    onChange={e => setField('category', e.target.value)}
                />

                {/* cover image */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                        onClick={() => document.getElementById('imageInput').click()}
                    >
                        {form.imagePreview ? (
                            <img src={form.imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                        ) : (
                            <div>
                                <p className="text-4xl mb-2">🖼️</p>
                                <p className="text-gray-500 text-sm">Click to upload cover image</p>
                                <p className="text-gray-400 text-xs mt-1">JPG, PNG, WEBP up to 5MB</p>
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
                            className="mt-2 text-red-500 text-sm hover:underline"
                        >
                            ✕ Remove image
                        </button>
                    )}
                </div>

                <textarea
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Short description for SEO (1–2 sentences)"
                    rows={3}
                    value={form.excerpt}
                    onChange={e => setField('excerpt', e.target.value)}
                />

                <div className="mb-6">
                    <ReactQuill
                        theme="snow"
                        value={form.content}
                        onChange={v => setField('content', v)}
                        modules={modules}
                        placeholder="Write your blog content here..."
                    />
                </div>

                {/* actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-8 py-3 rounded-lg text-base font-semibold text-white transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading
                            ? (view === 'edit' ? 'Saving...' : 'Publishing...')
                            : (view === 'edit' ? '💾 Save Changes' : '🚀 Publish Blog')}
                    </button>
                    <button
                        onClick={backToDashboard}
                        className="px-6 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                {status && (
                    <p className={`mt-4 font-medium text-base ${status.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                        {status}
                    </p>
                )}
            </div>
        </>
    )
}