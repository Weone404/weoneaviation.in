"use client";
import { useState, useEffect, useCallback } from "react";

// ─── STATIC DATA (non-student) ────────────────────────────────────────────────
const SUBJECTS = [
    { id: 1, name: "Air Regulations", color: "#3B82F6", icon: "📋", key: "airRegulations", topics: 28 },
    { id: 2, name: "Aviation Meteorology", color: "#10B981", icon: "🌤️", key: "aviationMeteorology", topics: 32 },
    { id: 3, name: "Air Navigation", color: "#8B5CF6", icon: "🧭", key: "airNavigation", topics: 86 },
    { id: 4, name: "Technical", color: "#F59E0B", icon: "⚙️", key: "technical", topics: 40 },
    { id: 5, name: "Radio Telephony", color: "#EF4444", icon: "📡", key: "radioTelephony", topics: 24 },
];

const UPCOMING_CLASSES = [
    { id: 1, title: "Navigation – Dead Reckoning", instructor: "Capt. Arvind Sharma", date: "Today", time: "07:00 PM – 08:30 PM", category: "Ground School", color: "#3B82F6", live: true },
    { id: 2, title: "Aviation Meteorology", instructor: "Capt. Neha Gupta", date: "Tomorrow", time: "06:00 PM – 07:30 PM", category: "Ground School", color: "#10B981", live: false },
    { id: 3, title: "Air Regulations – ICAO Annexes", instructor: "Capt. Vikram Desai", date: "24 May", time: "07:00 PM – 08:30 PM", category: "Ground School", color: "#F59E0B", live: false },
    { id: 4, title: "Radio Navigation – VOR & DME", instructor: "Capt. Rohan Mehta", date: "25 May", time: "05:00 PM – 06:30 PM", category: "Ground School", color: "#8B5CF6", live: false },
];

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
const C = {
    bg: "#F0F4FF", sidebar: "#0A1628", card: "#FFFFFF",
    primary: "#1D4ED8", primaryLight: "#EFF6FF",
    accent: "#F59E0B", green: "#10B981", red: "#EF4444", purple: "#8B5CF6",
    text: "#0F172A", muted: "#64748B", border: "#E2E8F0",
};

// ─── TINY HELPERS ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color = C.primary, height = 6 }) => (
    <div style={{ background: "#E2E8F0", borderRadius: 99, height, overflow: "hidden", width: "100%" }}>
        <div style={{ width: `${Math.min(value || 0, 100)}%`, height: "100%", background: color, borderRadius: 99, transition: "width .6s ease" }} />
    </div>
);

const Badge = ({ label, color = C.primary }) => (
    <span style={{ background: color + "20", color, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 99, letterSpacing: .3 }}>
        {label}
    </span>
);

const StatCard = ({ icon, label, value, sub, color = C.primary }) => (
    <div style={{ background: C.card, borderRadius: 16, padding: "20px 22px", border: `1px solid ${C.border}`, display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
        <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>{label}</div>
            {sub && <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 2 }}>{sub}</div>}
        </div>
    </div>
);

const Skeleton = ({ w = "100%", h = 16, r = 8 }) => (
    <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#E2E8F0 25%,#F1F5F9 50%,#E2E8F0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
);

const statusColor = (s) => s === "active" ? C.green : s === "at-risk" ? C.accent : C.red;
const progressColor = (v) => v >= 75 ? C.green : v >= 55 ? C.accent : C.red;

// ─── MONGODB HOOK — calls /api/students ──────────────────────────────────────
function useStudents(search = "") {
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            const res = await fetch(`/api/students?${params.toString()}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();
            setStudents(data.students ?? []);
            setStats(data.stats ?? null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => { fetchStudents(); }, [fetchStudents]);

    return { students, stats, loading, error, refetch: fetchStudents };
}

// ─── ERROR BANNER ─────────────────────────────────────────────────────────────
function ErrorBanner({ message, onRetry }) {
    return (
        <div style={{ background: "#FEF2F2", border: `1px solid ${C.red}30`, borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: C.red, fontSize: 13 }}>Failed to load students from MongoDB</div>
                <div style={{ color: C.muted, fontSize: 12 }}>{message}</div>
            </div>
            <button onClick={onRetry} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Retry</button>
        </div>
    );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { icon: "🏠", label: "Home", id: "home" },
    { icon: "👨‍🎓", label: "Students", id: "students" },
    { icon: "📅", label: "Live Classes", id: "classes", badge: "LIVE" },
    { icon: "🎬", label: "Recorded Lectures", id: "lectures" },
    { icon: "📚", label: "Subjects", id: "subjects" },
    { icon: "✏️", label: "Practice", id: "practice" },
    { icon: "📝", label: "Mock Tests", id: "mocktests" },
    { icon: "📊", label: "Progress", id: "progress" },
    { icon: "📁", label: "Resources", id: "resources" },
];

function Sidebar({ active, onChange, role }) {
    return (
        <div style={{ width: 220, minHeight: "100vh", background: C.sidebar, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: "auto" }}>
            <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #1E3A5F" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✈️</div>
                    <div>
                        <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, lineHeight: 1.1 }}>WE ONE</div>
                        <div style={{ color: C.accent, fontWeight: 700, fontSize: 11, letterSpacing: 1 }}>AVIATION</div>
                    </div>
                </div>
                <div style={{ color: "#8BA3C5", fontSize: 10, marginTop: 6, fontStyle: "italic" }}>Your Flight. Our Passion.</div>
            </div>

            <div style={{ padding: "14px 16px", borderBottom: "1px solid #1E3A5F" }}>
                <div style={{ background: "#0D1F35", borderRadius: 10, display: "flex", padding: 3 }}>
                    {["Teacher", "Student"].map(r => (
                        <button key={r} onClick={() => onChange(active, r.toLowerCase())}
                            style={{
                                flex: 1, padding: "6px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                                background: role === r.toLowerCase() ? C.primary : "transparent",
                                color: role === r.toLowerCase() ? "#fff" : "#8BA3C5", transition: "all .2s"
                            }}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <nav style={{ padding: "10px 10px", flex: 1 }}>
                <div style={{ color: "#4B6785", fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: "8px 10px 4px", textTransform: "uppercase" }}>Main Menu</div>
                {NAV_ITEMS.map(item => (
                    <button key={item.id} onClick={() => onChange(item.id)}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 2,
                            background: active === item.id ? C.primary : "transparent",
                            color: active === item.id ? "#fff" : "#8BA3C5", transition: "all .15s"
                        }}>
                        <span style={{ fontSize: 15 }}>{item.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: active === item.id ? 700 : 400 }}>{item.label}</span>
                        {item.badge && <span style={{ marginLeft: "auto", background: C.red, color: "#fff", fontSize: 8, fontWeight: 800, padding: "2px 5px", borderRadius: 4 }}>{item.badge}</span>}
                    </button>
                ))}
                <div style={{ color: "#4B6785", fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: "14px 10px 4px", textTransform: "uppercase" }}>Learning Path</div>
                {[{ icon: "🎓", label: "Ground School" }, { icon: "🛩️", label: "Flying Lessons" }, { icon: "🖥️", label: "Simulator Sessions" }, { icon: "✅", label: "Checkrides Prep" }].map(item => (
                    <button key={item.label} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "#8BA3C5" }}>
                        <span style={{ fontSize: 14 }}>{item.icon}</span>
                        <span style={{ fontSize: 12 }}>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div style={{ margin: "12px", borderRadius: 14, background: "linear-gradient(135deg,#1D4ED8,#7C3AED)", padding: "14px 16px" }}>
                <div style={{ color: C.accent, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>👑 Go Premium</div>
                <div style={{ color: "#CBD5E1", fontSize: 11, lineHeight: 1.5, marginBottom: 10 }}>Unlock all courses & 1-on-1 mentoring.</div>
                <button style={{ background: "#fff", color: C.primary, border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", width: "100%" }}>Upgrade Now →</button>
            </div>
        </div>
    );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
function TopBar({ role, page }) {
    const titles = { home: "Dashboard", students: "Students", classes: "Live Classes", subjects: "Subjects", progress: "Progress", lectures: "Recorded Lectures", practice: "Practice", mocktests: "Mock Tests", resources: "Resources" };
    return (
        <div style={{ position: "fixed", top: 0, left: 220, right: 0, height: 64, background: "#fff", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 28px", gap: 16, zIndex: 90 }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{titles[page] || "Dashboard"}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Home › {titles[page] || "Dashboard"}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 10, padding: "8px 14px", border: `1px solid ${C.border}` }}>
                <span style={{ color: C.muted }}>🔍</span>
                <input placeholder="Search anything..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: C.text, width: 180 }} />
            </div>
            <div style={{ position: "relative", width: 38, height: 38, borderRadius: 10, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid ${C.border}` }}>
                🔔
                <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: C.red, borderRadius: "50%", border: "2px solid #fff" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${C.primary},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                    {role === "teacher" ? "CS" : "PS"}
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{role === "teacher" ? "Capt. Sharma" : "Pilot Student"}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{role === "teacher" ? "Instructor" : "Student"} ▾</div>
                </div>
            </div>
        </div>
    );
}

// ─── TEACHER HOME ─────────────────────────────────────────────────────────────
function TeacherHome({ onNav }) {
    const { students, stats, loading, error, refetch } = useStudents();

    return (
        <div>
            <div style={{ background: `linear-gradient(120deg,${C.sidebar} 0%,#1D4ED8 100%)`, borderRadius: 20, padding: "28px 32px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ color: "#93C5FD", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Good Evening, Captain 👋</div>
                    <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Track Your Students'<br />Progress & Performance</div>
                    <div style={{ color: "#93C5FD", fontSize: 13, marginBottom: 18 }}>
                        {loading ? "Loading from MongoDB…" : stats ? `${stats.atRiskCount} student${stats.atRiskCount !== 1 ? "s" : ""} at risk · ${stats.totalStudents} enrolled` : ""}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button onClick={() => onNav("classes")} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📅 View Schedule</button>
                        <button onClick={() => onNav("students")} style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>👥 All Students</button>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#fff", fontSize: 42, fontWeight: 900 }}>{stats?.totalStudents ?? "–"}</div>
                    <div style={{ color: "#93C5FD", fontSize: 12 }}>Enrolled Students</div>
                    <div style={{ marginTop: 8, color: "#fff", fontSize: 32, fontWeight: 900 }}>{stats ? `${stats.avgProgress}%` : "–"}</div>
                    <div style={{ color: "#93C5FD", fontSize: 12 }}>Avg. Progress</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {loading
                    ? Array(4).fill(0).map((_, i) => <div key={i} style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}><Skeleton h={48} /></div>)
                    : <>
                        <StatCard icon="👥" label="Total Students" value={stats?.totalStudents ?? 0} color={C.primary} />
                        <StatCard icon="✅" label="Active" value={stats?.activeCount ?? 0} color={C.green} />
                        <StatCard icon="⚠️" label="At Risk" value={stats?.atRiskCount ?? 0} sub="Need attention" color={C.accent} />
                        <StatCard icon="😴" label="Inactive" value={stats?.inactiveCount ?? 0} color={C.red} />
                    </>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
                <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                    <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>Student Progress Overview</div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: C.muted }}>Live from MongoDB</span>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: loading ? C.accent : C.green }} />
                            <button onClick={() => onNav("students")} style={{ color: C.primary, background: C.primaryLight, border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View All →</button>
                        </div>
                    </div>

                    {error && <div style={{ padding: 16 }}><ErrorBanner message={error} onRetry={refetch} /></div>}

                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#F8FAFC" }}>
                                    {["Student", "Batch", "Overall", "Ground School", "Flying", "Status"].map(h => (
                                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: .5, textTransform: "uppercase" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? Array(5).fill(0).map((_, i) => (
                                        <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                                            {Array(6).fill(0).map((_, j) => <td key={j} style={{ padding: "14px 16px" }}><Skeleton h={14} w={j === 0 ? 140 : j === 2 ? 100 : 60} /></td>)}
                                        </tr>
                                    ))
                                    : students.map((s, i) => (
                                        <tr key={s.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#FAFBFF" : "#fff" }}>
                                            <td style={{ padding: "12px 16px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.primary},${C.purple})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{s.avatar}</div>
                                                    <div>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</div>
                                                        <div style={{ fontSize: 10, color: C.muted }}>{s.lastActive}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: "12px 16px" }}><Badge label={s.batch} color={C.primary} /></td>
                                            <td style={{ padding: "12px 16px", minWidth: 130 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <ProgressBar value={s.overallProgress} color={progressColor(s.overallProgress)} />
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: C.text, whiteSpace: "nowrap" }}>{s.overallProgress}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: "12px 16px" }}><span style={{ fontSize: 13, fontWeight: 600 }}>{s.groundSchool}%</span></td>
                                            <td style={{ padding: "12px 16px" }}><span style={{ fontSize: 13, fontWeight: 600 }}>{s.flyingLessons}%</span></td>
                                            <td style={{ padding: "12px 16px" }}><Badge label={s.status === "active" ? "Active" : s.status === "at-risk" ? "At Risk" : "Inactive"} color={statusColor(s.status)} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                        <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                            <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>⚠️ Needs Attention</div>
                            <Badge label={`${students.filter(s => s.status !== "active").length} students`} color={C.red} />
                        </div>
                        <div style={{ padding: "8px 0" }}>
                            {loading
                                ? Array(3).fill(0).map((_, i) => <div key={i} style={{ padding: "10px 18px" }}><Skeleton h={14} /></div>)
                                : students.filter(s => s.status !== "active").slice(0, 4).map(s => (
                                    <div key={s.id} style={{ padding: "10px 18px", display: "flex", gap: 10, alignItems: "center", borderBottom: `1px solid #F1F5F9` }}>
                                        <div style={{ width: 30, height: 30, borderRadius: 8, background: statusColor(s.status) + "20", color: statusColor(s.status), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{s.avatar}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{s.name}</div>
                                            <div style={{ fontSize: 10, color: C.muted }}>{s.batch} · {s.overallProgress}% progress</div>
                                        </div>
                                        <Badge label={s.status === "at-risk" ? "At Risk" : "Inactive"} color={statusColor(s.status)} />
                                    </div>
                                ))
                            }
                            {!loading && students.filter(s => s.status !== "active").length === 0 && (
                                <div style={{ padding: "20px 18px", textAlign: "center", color: C.muted, fontSize: 13 }}>🎉 All students on track!</div>
                            )}
                        </div>
                    </div>

                    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 18 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 12 }}>Next Live Class</div>
                        <div style={{ background: `linear-gradient(135deg,${C.primary},${C.purple})`, borderRadius: 12, padding: "14px 16px", color: "#fff" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <Badge label="LIVE" color={C.red} />
                                <span style={{ fontSize: 10, color: "#93C5FD" }}>Ground School</span>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 14, margin: "8px 0 4px" }}>Navigation – Dead Reckoning</div>
                            <div style={{ fontSize: 11, color: "#93C5FD" }}>Today · 07:00 PM – 08:30 PM</div>
                            <div style={{ fontSize: 11, color: "#93C5FD", marginBottom: 12 }}>Capt. Arvind Sharma</div>
                            <button style={{ background: "#fff", color: C.primary, border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%" }}>Start Class →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── STUDENTS PAGE ────────────────────────────────────────────────────────────
function StudentsPage() {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 350);
        return () => clearTimeout(t);
    }, [search]);

    const { students, stats, loading, error, refetch } = useStudents(debouncedSearch);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>All Students</h2>
                    <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>
                        {loading ? "Fetching from MongoDB…" : `${students.length} student${students.length !== 1 ? "s" : ""} found`}
                    </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, borderRadius: 10, padding: "8px 14px", border: `1px solid ${C.border}` }}>
                        <span style={{ color: C.muted }}>🔍</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students…"
                            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: C.text, width: 170 }} />
                    </div>
                    <button style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>+ Add Student</button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
                {loading
                    ? Array(4).fill(0).map((_, i) => <div key={i} style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}><Skeleton h={48} /></div>)
                    : <>
                        <StatCard icon="👥" label="Total Enrolled" value={stats?.totalStudents ?? 0} color={C.primary} />
                        <StatCard icon="✅" label="Active" value={stats?.activeCount ?? 0} color={C.green} />
                        <StatCard icon="⚠️" label="At Risk" value={stats?.atRiskCount ?? 0} color={C.accent} />
                        <StatCard icon="😴" label="Inactive" value={stats?.inactiveCount ?? 0} color={C.red} />
                    </>}
            </div>

            {error && <ErrorBanner message={error} onRetry={refetch} />}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignContent: "start" }}>
                    {loading
                        ? Array(6).fill(0).map((_, i) => (
                            <div key={i} style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 18 }}>
                                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}><Skeleton w={42} h={42} r={12} /><div style={{ flex: 1 }}><Skeleton h={14} /><div style={{ marginTop: 6 }}><Skeleton h={10} w="60%" /></div></div></div>
                                <Skeleton h={8} />
                                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>{Array(3).fill(0).map((_, j) => <Skeleton key={j} h={36} r={8} />)}</div>
                            </div>
                        ))
                        : students.map(s => (
                            <div key={s.id} onClick={() => setSelected(s)}
                                style={{ background: C.card, borderRadius: 16, border: selected?.id === s.id ? `2px solid ${C.primary}` : `1px solid ${C.border}`, padding: 18, cursor: "pointer", transition: "all .2s" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${C.primary},${C.purple})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{s.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 14, color: C.text }}>{s.name}</div>
                                            <div style={{ fontSize: 11, color: C.muted }}>{s.batch}</div>
                                        </div>
                                    </div>
                                    <Badge label={s.status === "active" ? "Active" : s.status === "at-risk" ? "At Risk" : "Inactive"} color={statusColor(s.status)} />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                        <span style={{ fontSize: 11, color: C.muted }}>Overall Progress</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>{s.overallProgress}%</span>
                                    </div>
                                    <ProgressBar value={s.overallProgress} color={progressColor(s.overallProgress)} height={8} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                                    {[["GS", s.groundSchool, C.primary], ["FL", s.flyingLessons, C.purple], ["SIM", s.simulatorSessions, C.green]].map(([k, v, c]) => (
                                        <div key={k} style={{ background: C.bg, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: c }}>{v}%</div>
                                            <div style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>{k}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: 10, color: C.muted }}>Last active: {s.lastActive}</span>
                                    <span style={{ fontSize: 11, color: C.primary, fontWeight: 700 }}>Rank #{s.rank}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 20, height: "fit-content", position: "sticky", top: 80 }}>
                    {selected ? (
                        <>
                            <div style={{ textAlign: "center", marginBottom: 20 }}>
                                <div style={{ width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg,${C.primary},${C.purple})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, margin: "0 auto 10px" }}>{selected.avatar}</div>
                                <div style={{ fontWeight: 800, fontSize: 17, color: C.text }}>{selected.name}</div>
                                <div style={{ color: C.muted, fontSize: 12, margin: "2px 0 6px" }}>{selected.batch}</div>
                                <Badge label={selected.status === "active" ? "Active" : selected.status === "at-risk" ? "At Risk" : "Inactive"} color={statusColor(selected.status)} />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 12 }}>Training Progress</div>
                                {[["Ground School", selected.groundSchool, C.primary], ["Flying Lessons", selected.flyingLessons, C.purple], ["Simulator", selected.simulatorSessions, C.green]].map(([label, val, color]) => (
                                    <div key={label} style={{ marginBottom: 10 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                            <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}%</span>
                                        </div>
                                        <ProgressBar value={val} color={color} height={6} />
                                    </div>
                                ))}
                            </div>

                            {selected.subjects && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 10 }}>CPL Subject Scores</div>
                                    {SUBJECTS.map(subj => {
                                        const data = selected.subjects?.[subj.key];
                                        if (!data) return null;
                                        return (
                                            <div key={subj.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <span style={{ fontSize: 13 }}>{subj.icon}</span>
                                                    <span style={{ fontSize: 11, color: C.muted }}>{subj.name}</span>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: data.avgScore >= 80 ? C.green : data.avgScore >= 65 ? C.accent : C.red }}>{data.avgScore}%</span>
                                                    <div style={{ fontSize: 9, color: C.muted }}>{data.topicsCompleted}/{data.totalTopics} topics</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                                <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                                    <div style={{ fontWeight: 800, fontSize: 18, color: C.primary }}>#{selected.rank}</div>
                                    <div style={{ fontSize: 10, color: C.muted }}>Class Rank</div>
                                </div>
                                <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                                    <div style={{ fontWeight: 800, fontSize: 18, color: C.accent }}>{selected.overallProgress}%</div>
                                    <div style={{ fontSize: 10, color: C.muted }}>Overall</div>
                                </div>
                            </div>

                            <button style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 8 }}>📊 Full Report</button>
                            <button onClick={() => setSelected(null)} style={{ width: "100%", background: C.bg, color: C.text, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>✕ Close</button>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}>
                            <div style={{ fontSize: 36, marginBottom: 12 }}>👈</div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>Select a student</div>
                            <div style={{ fontSize: 12, marginTop: 4 }}>Click a card to view detail</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── CLASSES PAGE ─────────────────────────────────────────────────────────────
function ClassesPage() {
    return (
        <div>
            <div style={{ background: `linear-gradient(120deg,#0A1628,#1D4ED8)`, borderRadius: 20, padding: "24px 28px", marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <Badge label="LIVE" color={C.red} />
                    <div style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "8px 0 4px" }}>Navigation – Dead Reckoning</div>
                    <div style={{ color: "#93C5FD", fontSize: 12 }}>Today, 07:00 PM – 08:30 PM (IST) · Capt. Arvind Sharma</div>
                    <div style={{ color: "#93C5FD", fontSize: 11, marginBottom: 14 }}>Learn DR, Time, Speed, Distance, Wind Triangle</div>
                    <button style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📹 Join Class Now</button>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    {[["01", "HRS"], ["32", "MINS"], ["45", "SECS"]].map(([v, l]) => (
                        <div key={l} style={{ background: "rgba(255,255,255,.15)", borderRadius: 10, padding: "10px 14px", textAlign: "center", color: "#fff" }}>
                            <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{v}</div>
                            <div style={{ fontSize: 9, color: "#93C5FD", marginTop: 2 }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, fontWeight: 800, fontSize: 14, color: C.text }}>Upcoming Schedule</div>
                {UPCOMING_CLASSES.map(cls => (
                    <div key={cls.id} style={{ padding: "14px 20px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: cls.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧭</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{cls.title}</div>
                            <div style={{ fontSize: 11, color: C.muted }}>{cls.instructor} · {cls.date} · {cls.time}</div>
                        </div>
                        <Badge label={cls.category} color={cls.color} />
                        <button style={{ background: cls.live ? C.red : C.primary, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                            {cls.live ? "🔴 Live" : "Join Class"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── PROGRESS PAGE ────────────────────────────────────────────────────────────
function ProgressPage() {
    const { students, loading } = useStudents();
    const me = students[0];

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }}>
                {loading
                    ? Array(4).fill(0).map((_, i) => <div key={i} style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}><Skeleton h={48} /></div>)
                    : <>
                        <StatCard icon="📊" label="Overall Progress" value={me ? `${me.overallProgress}%` : "–"} color={C.primary} />
                        <StatCard icon="🎬" label="Lectures Watched" value={me?.lecturesWatched ?? 0} sub={`of ${me?.lecturesTotal ?? 120} total`} color={C.green} />
                        <StatCard icon="📝" label="Mock Avg Score" value={me ? `${me.mockAvgScore}%` : "–"} color={C.purple} />
                        <StatCard icon="🏆" label="Class Rank" value={me ? `#${me.rank}` : "–"} sub="Top 15%" color={C.accent} />
                    </>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 22 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 18 }}>CPL Subject Progress</div>
                    {loading
                        ? Array(5).fill(0).map((_, i) => <div key={i} style={{ marginBottom: 16 }}><Skeleton h={12} /></div>)
                        : SUBJECTS.map(s => {
                            const data = me?.subjects?.[s.key];
                            const pct = data ? Math.round(data.topicsCompleted / data.totalTopics * 100) : 0;
                            return (
                                <div key={s.id} style={{ marginBottom: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16 }}>{s.icon}</span><span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</span></div>
                                        <div style={{ textAlign: "right" }}>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{pct}%</span>
                                            {data && <div style={{ fontSize: 10, color: C.muted }}>Avg: {data.avgScore}%</div>}
                                        </div>
                                    </div>
                                    <ProgressBar value={pct} color={s.color} height={8} />
                                    {data && <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{data.topicsCompleted}/{data.totalTopics} topics</div>}
                                </div>
                            );
                        })
                    }
                </div>

                <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 22 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 18 }}>Training Milestones</div>
                    {[{ label: "Ground School", value: me?.groundSchool ?? 0, color: C.primary, icon: "🎓" },
                    { label: "Flying Lessons", value: me?.flyingLessons ?? 0, color: C.purple, icon: "🛩️" },
                    { label: "Simulator Sessions", value: me?.simulatorSessions ?? 0, color: C.green, icon: "🖥️" }].map(item => (
                        <div key={item.label} style={{ marginBottom: 22 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>{item.icon}</span><span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.label}</span></div>
                                <span style={{ fontSize: 20, fontWeight: 900, color: item.color }}>{loading ? "…" : `${item.value}%`}</span>
                            </div>
                            <ProgressBar value={loading ? 0 : item.value} color={item.color} height={10} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── PLACEHOLDER ──────────────────────────────────────────────────────────────
function Placeholder({ page }) {
    const icons = { lectures: "🎬", practice: "✏️", mocktests: "📝", resources: "📁" };
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, color: C.muted, background: C.card, borderRadius: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>{icons[page] || "📄"}</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.text, marginBottom: 6 }}>{page.charAt(0).toUpperCase() + page.slice(1)}</div>
            <div style={{ fontSize: 13 }}>Coming soon in the full build.</div>
        </div>
    );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function WeOneAviationDashboard() {
    const [page, setPage] = useState("home");
    const [role, setRole] = useState("teacher");

    function handleNav(newPage, newRole) {
        if (newPage) setPage(newPage);
        if (newRole) setRole(newRole);
    }

    function renderPage() {
        if (page === "students") return <StudentsPage />;
        if (page === "classes") return <ClassesPage />;
        if (page === "subjects") return <Placeholder page="subjects" />;
        if (page === "progress") return <ProgressPage />;
        if (role === "teacher" && page === "home") return <TeacherHome onNav={p => setPage(p)} />;
        if (role === "student" && page === "home") return <ProgressPage />;
        return <Placeholder page={page} />;
    }

    return (
        <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: C.bg, minHeight: "100vh" }}>
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
            <Sidebar active={page} onChange={handleNav} role={role} />
            <TopBar role={role} page={page} />
            <main style={{ marginLeft: 220, paddingTop: 64 }}>
                <div style={{ padding: "28px 32px", maxWidth: 1300 }}>
                    {renderPage()}
                </div>
            </main>
            <div style={{ marginLeft: 220, background: C.sidebar, padding: "16px 32px", display: "flex", justifyContent: "space-around" }}>
                {[["📺", "120+", "Live Classes"], ["🎬", "500+", "Recorded Lectures"], ["👨‍🏫", "25+", "Expert Instructors"], ["👥", "10K+", "Students Trained"], ["🏆", "95%", "Success Rate"], ["🤖", "24/7", "Capt. Assistant"]].map(([icon, val, label]) => (
                    <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 16 }}>{icon}</div>
                        <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{val}</div>
                        <div style={{ color: "#8BA3C5", fontSize: 10 }}>{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}