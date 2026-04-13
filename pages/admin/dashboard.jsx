import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// ─── Sample blog data (replace with your DB/API later) ───────────────────────
const INITIAL_POSTS = [
    {
        id: 1,
        title: "How to Become a Commercial Pilot in India",
        slug: "how-to-become-commercial-pilot-india",
        category: "CPL",
        status: "published",
        date: "2024-12-10",
        excerpt: "A complete guide to earning your CPL in India, from eligibility to DGCA exams.",
    },
    {
        id: 2,
        title: "Top 5 Flying Schools in India 2025",
        slug: "top-flying-schools-india-2025",
        category: "General",
        status: "published",
        date: "2024-12-18",
        excerpt: "We compare the best aviation academies across India based on fleet, fees, and placement.",
    },
    {
        id: 3,
        title: "PPL vs CPL: What's the Difference?",
        slug: "ppl-vs-cpl-difference",
        category: "PPL",
        status: "draft",
        date: "2025-01-05",
        excerpt: "Understanding the key differences between Private Pilot License and Commercial Pilot License.",
    },
];

const CATEGORIES = ["General", "CPL", "PPL", "ATPL", "DGCA", "Career", "News"];

// ─── Auth Guard ───────────────────────────────────────────────────────────────
function useAdminAuth() {
    const router = useRouter();
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (sessionStorage.getItem("weone_admin") === "true") {
                setAuthed(true);
            } else {
                router.replace("/admin/login");
            }
        }
    }, []);

    return authed;
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const authed = useAdminAuth();
    const router = useRouter();
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [view, setView] = useState("list"); // "list" | "new" | "edit"
    const [editPost, setEditPost] = useState(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [toast, setToast] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("weone_admin");
        router.push("/admin/login");
    };

    const handleDelete = (id) => {
        setPosts((p) => p.filter((post) => post.id !== id));
        setDeleteId(null);
        showToast("Post deleted successfully.");
    };

    const handleSave = (post) => {
        if (post.id) {
            setPosts((p) => p.map((x) => (x.id === post.id ? post : x)));
            showToast("Post updated successfully!");
        } else {
            const newPost = { ...post, id: Date.now(), date: new Date().toISOString().split("T")[0] };
            setPosts((p) => [newPost, ...p]);
            showToast("Post created successfully!");
        }
        setView("list");
        setEditPost(null);
    };

    const filtered = posts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || p.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const published = posts.filter((p) => p.status === "published").length;
    const drafts = posts.filter((p) => p.status === "draft").length;

    if (!authed) return null;

    return (
        <>
            <Head>
                <title>Admin Dashboard — WeOne Aviation</title>
                <meta name="robots" content="noindex, nofollow" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ad-root {
          display: flex;
          min-height: 100vh;
          background: #07101f;
          font-family: 'DM Sans', sans-serif;
          color: #e8eaf0;
        }

        /* ── Sidebar ── */
        .ad-sidebar {
          width: 240px;
          background: #060d1a;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
        }

        .ad-sidebar.open { transform: translateX(0); }

        @media (min-width: 900px) {
          .ad-sidebar { transform: translateX(0); position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
        }

        .ad-sidebar-logo {
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ad-logo-icon {
          width: 34px; height: 34px;
          background: #f97316;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .ad-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }
        .ad-logo-text span { color: #f97316; }

        .ad-nav {
          flex: 1;
          padding: 1.25rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ad-nav-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 0.5rem 0.5rem 0.25rem;
          margin-top: 0.5rem;
        }

        .ad-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 0.75rem;
          border-radius: 7px;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          transition: background 0.15s, color 0.15s;
        }

        .ad-nav-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .ad-nav-btn.active { background: rgba(249,115,22,0.12); color: #f97316; }

        .ad-nav-btn svg { flex-shrink: 0; opacity: 0.7; }
        .ad-nav-btn.active svg { opacity: 1; }

        .ad-sidebar-footer {
          padding: 1rem 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .ad-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 0.75rem;
          border-radius: 7px;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(239,68,68,0.7);
          transition: background 0.15s, color 0.15s;
        }
        .ad-logout-btn:hover { background: rgba(239,68,68,0.1); color: #ef4444; }

        /* ── Main ── */
        .ad-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        @media (min-width: 900px) {
          .ad-main { margin-left: 0; }
        }

        /* ── Topbar ── */
        .ad-topbar {
          background: #060d1a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .ad-topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ad-hamburger {
          display: flex;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          padding: 4px;
        }

        @media (min-width: 900px) {
          .ad-hamburger { display: none; }
        }

        .ad-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }

        .ad-new-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 0.55rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .ad-new-btn:hover { background: #ea6a0a; }

        /* ── Content ── */
        .ad-content {
          flex: 1;
          padding: 1.75rem 1.5rem;
          max-width: 1100px;
          width: 100%;
        }

        /* ── Stats ── */
        .ad-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .ad-stat {
          background: #0c1829;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 1.2rem 1.25rem;
        }

        .ad-stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          margin-bottom: 0.4rem;
        }

        .ad-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .ad-stat-value.orange { color: #f97316; }
        .ad-stat-value.green  { color: #22c55e; }
        .ad-stat-value.yellow { color: #facc15; }

        /* ── Toolbar ── */
        .ad-toolbar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .ad-search {
          flex: 1;
          min-width: 200px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          padding: 0.55rem 0.9rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ad-search::placeholder { color: rgba(255,255,255,0.25); }
        .ad-search:focus { border-color: #f97316; }

        .ad-filter-btn {
          padding: 0.55rem 0.9rem;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ad-filter-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .ad-filter-btn.active { background: rgba(249,115,22,0.12); border-color: rgba(249,115,22,0.3); color: #f97316; }

        /* ── Post Table ── */
        .ad-table-wrap {
          background: #0c1829;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          overflow: hidden;
        }

        .ad-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ad-table th {
          text-align: left;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
          padding: 0.9rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-weight: 500;
          white-space: nowrap;
        }

        .ad-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 0.85rem;
          vertical-align: middle;
        }

        .ad-table tr:last-child td { border-bottom: none; }
        .ad-table tr:hover td { background: rgba(255,255,255,0.02); }

        .ad-post-title {
          font-weight: 500;
          color: #fff;
          margin-bottom: 2px;
        }

        .ad-post-excerpt {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ad-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .ad-badge.published { background: rgba(34,197,94,0.12); color: #22c55e; }
        .ad-badge.draft { background: rgba(250,204,21,0.1); color: #facc15; }

        .ad-cat-badge {
          display: inline-block;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 0.7rem;
          background: rgba(249,115,22,0.1);
          color: #f97316;
          border: 1px solid rgba(249,115,22,0.15);
        }

        .ad-actions {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .ad-action-btn {
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .ad-action-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .ad-action-btn.del:hover { background: rgba(239,68,68,0.1); color: #f87171; border-color: rgba(239,68,68,0.2); }

        .ad-empty {
          text-align: center;
          padding: 3rem;
          color: rgba(255,255,255,0.25);
          font-size: 0.9rem;
        }

        /* ── Form (New / Edit) ── */
        .ad-form-wrap {
          background: #0c1829;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 2rem;
          max-width: 720px;
        }

        .ad-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          color: #fff;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .ad-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .ad-form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ad-form-field.full { grid-column: 1 / -1; }

        .ad-form-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }

        .ad-form-input, .ad-form-select, .ad-form-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          padding: 0.7rem 0.9rem;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ad-form-input::placeholder,
        .ad-form-textarea::placeholder { color: rgba(255,255,255,0.2); }

        .ad-form-input:focus,
        .ad-form-select:focus,
        .ad-form-textarea:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
        }

        .ad-form-select { cursor: pointer; }
        .ad-form-select option { background: #0c1829; }

        .ad-form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .ad-form-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }

        .ad-save-btn {
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 0.7rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
        }
        .ad-save-btn:hover { background: #ea6a0a; }

        .ad-cancel-btn {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          padding: 0.7rem 1.25rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.15s;
        }
        .ad-cancel-btn:hover { color: #fff; background: rgba(255,255,255,0.07); }

        /* ── Toast ── */
        .ad-toast {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          background: #0c1829;
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 8px;
          padding: 0.8rem 1.25rem;
          color: #22c55e;
          font-size: 0.85rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          animation: toastIn 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ad-toast.error { border-color: rgba(239,68,68,0.3); color: #f87171; }

        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Delete Modal ── */
        .ad-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .ad-modal {
          background: #0c1829;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 2rem;
          max-width: 380px;
          width: 100%;
          animation: fadeUp 0.2s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ad-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .ad-modal-text {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .ad-modal-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .ad-del-confirm {
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 0.6rem 1.25rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.15s;
        }
        .ad-del-confirm:hover { background: #dc2626; }

        /* ── Sidebar overlay ── */
        .ad-sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 45;
        }
        .ad-sidebar-overlay.open { display: block; }

        @media (min-width: 900px) {
          .ad-sidebar-overlay { display: none !important; }
        }

        @media (max-width: 700px) {
          .ad-table th:nth-child(3),
          .ad-table td:nth-child(3),
          .ad-table th:nth-child(4),
          .ad-table td:nth-child(4) { display: none; }
          .ad-form-grid { grid-template-columns: 1fr; }
          .ad-form-field.full { grid-column: auto; }
        }
      `}</style>

            <div className="ad-root">
                {/* Sidebar overlay (mobile) */}
                <div
                    className={`ad-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                />

                {/* Sidebar */}
                <aside className={`ad-sidebar ${sidebarOpen ? "open" : ""}`}>
                    <div className="ad-sidebar-logo">
                        <div className="ad-logo-icon">✈</div>
                        <div className="ad-logo-text">WeOne <span>Admin</span></div>
                    </div>

                    <nav className="ad-nav">
                        <span className="ad-nav-label">Content</span>

                        <button
                            className={`ad-nav-btn ${view !== "new" && view !== "edit" ? "active" : ""}`}
                            onClick={() => { setView("list"); setSidebarOpen(false); }}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                            </svg>
                            All Posts
                            <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "1px 7px", fontSize: "0.7rem" }}>
                                {posts.length}
                            </span>
                        </button>

                        <button
                            className={`ad-nav-btn ${view === "new" ? "active" : ""}`}
                            onClick={() => { setView("new"); setEditPost(null); setSidebarOpen(false); }}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New Post
                        </button>

                        <span className="ad-nav-label">Site</span>

                        <button className="ad-nav-btn" onClick={() => window.open("/blogs", "_blank")}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            View Blog
                        </button>

                        <button className="ad-nav-btn" onClick={() => window.open("/", "_blank")}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            View Website
                        </button>
                    </nav>

                    <div className="ad-sidebar-footer">
                        <button className="ad-logout-btn" onClick={handleLogout}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main */}
                <main className="ad-main">
                    {/* Topbar */}
                    <header className="ad-topbar">
                        <div className="ad-topbar-left">
                            <button className="ad-hamburger" onClick={() => setSidebarOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </button>
                            <span className="ad-topbar-title">
                                {view === "new" ? "New Post" : view === "edit" ? "Edit Post" : "Blog Dashboard"}
                            </span>
                        </div>
                        <button className="ad-new-btn" onClick={() => { setView("new"); setEditPost(null); }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New Post
                        </button>
                    </header>

                    {/* Content */}
                    <div className="ad-content">

                        {/* ── LIST VIEW ── */}
                        {(view === "list") && (
                            <>
                                {/* Stats */}
                                <div className="ad-stats">
                                    <div className="ad-stat">
                                        <div className="ad-stat-label">Total Posts</div>
                                        <div className="ad-stat-value orange">{posts.length}</div>
                                    </div>
                                    <div className="ad-stat">
                                        <div className="ad-stat-label">Published</div>
                                        <div className="ad-stat-value green">{published}</div>
                                    </div>
                                    <div className="ad-stat">
                                        <div className="ad-stat-label">Drafts</div>
                                        <div className="ad-stat-value yellow">{drafts}</div>
                                    </div>
                                    <div className="ad-stat">
                                        <div className="ad-stat-label">Categories</div>
                                        <div className="ad-stat-value">{[...new Set(posts.map((p) => p.category))].length}</div>
                                    </div>
                                </div>

                                {/* Toolbar */}
                                <div className="ad-toolbar">
                                    <input
                                        type="text"
                                        className="ad-search"
                                        placeholder="Search posts..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {["all", "published", "draft"].map((s) => (
                                        <button
                                            key={s}
                                            className={`ad-filter-btn ${filterStatus === s ? "active" : ""}`}
                                            onClick={() => setFilterStatus(s)}
                                        >
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                {/* Table */}
                                <div className="ad-table-wrap">
                                    {filtered.length === 0 ? (
                                        <div className="ad-empty">No posts found.</div>
                                    ) : (
                                        <table className="ad-table">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th>Category</th>
                                                    <th>Date</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filtered.map((post) => (
                                                    <tr key={post.id}>
                                                        <td>
                                                            <div className="ad-post-title">{post.title}</div>
                                                            <div className="ad-post-excerpt">{post.excerpt}</div>
                                                        </td>
                                                        <td>
                                                            <span className={`ad-badge ${post.status}`}>{post.status}</span>
                                                        </td>
                                                        <td><span className="ad-cat-badge">{post.category}</span></td>
                                                        <td style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                                                            {post.date}
                                                        </td>
                                                        <td>
                                                            <div className="ad-actions">
                                                                <button
                                                                    className="ad-action-btn"
                                                                    onClick={() => { setEditPost(post); setView("edit"); }}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="ad-action-btn del"
                                                                    onClick={() => setDeleteId(post.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── NEW / EDIT FORM ── */}
                        {(view === "new" || view === "edit") && (
                            <div className="ad-form-wrap">
                                <div className="ad-form-title">
                                    {view === "new" ? "✍️ Create New Post" : "✏️ Edit Post"}
                                </div>
                                <PostForm
                                    post={editPost}
                                    onSave={handleSave}
                                    onCancel={() => { setView("list"); setEditPost(null); }}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="ad-modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ad-modal-title">Delete Post?</div>
                        <p className="ad-modal-text">
                            This action cannot be undone. The post will be permanently removed from your blog.
                        </p>
                        <div className="ad-modal-actions">
                            <button className="ad-cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
                            <button className="ad-del-confirm" onClick={() => handleDelete(deleteId)}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`ad-toast ${toast.type === "error" ? "error" : ""}`}>
                    ✓ {toast.msg}
                </div>
            )}
        </>
    );
}

// ─── Post Form Component ──────────────────────────────────────────────────────
function PostForm({ post, onSave, onCancel }) {
    const [form, setForm] = useState({
        id: post?.id || null,
        title: post?.title || "",
        slug: post?.slug || "",
        category: post?.category || "General",
        status: post?.status || "draft",
        excerpt: post?.excerpt || "",
        content: post?.content || "",
    });

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const autoSlug = (title) =>
        title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

    const handleTitleChange = (e) => {
        set("title", e.target.value);
        if (!form.id) set("slug", autoSlug(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="ad-form-grid">
                <div className="ad-form-field full">
                    <label className="ad-form-label">Post Title *</label>
                    <input
                        className="ad-form-input"
                        type="text"
                        placeholder="e.g. How to Become a Pilot After 12th"
                        value={form.title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>

                <div className="ad-form-field full">
                    <label className="ad-form-label">URL Slug *</label>
                    <input
                        className="ad-form-input"
                        type="text"
                        placeholder="how-to-become-a-pilot-after-12th"
                        value={form.slug}
                        onChange={(e) => set("slug", e.target.value)}
                        required
                    />
                </div>

                <div className="ad-form-field">
                    <label className="ad-form-label">Category</label>
                    <select className="ad-form-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>

                <div className="ad-form-field">
                    <label className="ad-form-label">Status</label>
                    <select className="ad-form-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div className="ad-form-field full">
                    <label className="ad-form-label">Excerpt / Meta Description</label>
                    <textarea
                        className="ad-form-textarea"
                        placeholder="A short summary of this post (shown on blog listing page and in SEO)..."
                        value={form.excerpt}
                        onChange={(e) => set("excerpt", e.target.value)}
                        rows={3}
                    />
                </div>

                <div className="ad-form-field full">
                    <label className="ad-form-label">Content (HTML or plain text)</label>
                    <textarea
                        className="ad-form-textarea"
                        placeholder="Write your full blog post content here..."
                        value={form.content}
                        onChange={(e) => set("content", e.target.value)}
                        rows={10}
                    />
                </div>
            </div>

            <div className="ad-form-actions">
                <button type="submit" className="ad-save-btn">
                    {form.status === "published" ? "✓ Save & Publish" : "Save as Draft"}
                </button>
                <button type="button" className="ad-cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}