// pages/dashboard.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/firebase";

const SUBJECTS = [
    "Air Navigation",
    "Meteorology",
    "Air Regulations",
    "Technical General",
    "Radio Telephony",
];

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) router.push("/login?from=/dashboard");
    }, [user, authLoading]);

    useEffect(() => {
        if (user) fetchStats();
    }, [user]);

    async function fetchStats() {
        setLoadingStats(true);
        try {
            const res = await fetch(`/api/user/stats?uid=${user.uid}`);
            const data = await res.json();
            setStats(data);
        } catch {
            // Use demo data if API not built yet
            setStats(DEMO_STATS);
        } finally {
            setLoadingStats(false);
        }
    }

    async function handleLogout() {
        await logout();
        router.push("/login");
    }

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-[#0a2342] flex items-center justify-center">
                <p className="text-blue-300 text-sm">Loading...</p>
            </div>
        );
    }

    const s = stats || DEMO_STATS;
    const displayName = user.displayName || user.email?.split("@")[0] || "Cadet";

    return (
        <>
            <Head>
                <title>Dashboard — WeOne Aviation PrepAI</title>
            </Head>

            <div className="min-h-screen bg-[#0a2342] px-4 py-6">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-white font-semibold text-xl">
                                Welcome back, <span className="text-[#f97316]">{displayName}</span>
                            </h1>
                            <p className="text-blue-400 text-sm mt-0.5">DGCA CPL Preparation</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="/practice" className="px-4 py-2 bg-[#f97316] hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors">
                                Practice now
                            </a>
                            <button onClick={handleLogout} className="text-blue-400 hover:text-white text-sm transition-colors">
                                Sign out
                            </button>
                        </div>
                    </div>

                    {/* Nav tabs */}
                    <div className="flex gap-2 mb-6">
                        {["Dashboard", "Leaderboard"].map((tab) => (
                            <a
                                key={tab}
                                href={tab === "Dashboard" ? "/dashboard" : "/leaderboard"}
                                className={`px-4 py-2 rounded-xl text-sm transition-colors ${tab === "Dashboard"
                                        ? "bg-[#0d3060] text-white border border-blue-700"
                                        : "text-blue-400 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </a>
                        ))}
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {[
                            { label: "Tests taken", value: s.totalTests, sub: `+${s.testsThisWeek} this week` },
                            { label: "Accuracy", value: `${s.accuracy}%`, sub: `${s.accuracyDelta >= 0 ? "+" : ""}${s.accuracyDelta}% vs last week` },
                            { label: "Streak", value: `${s.streak} days`, sub: `Best: ${s.bestStreak} days` },
                            { label: "Rank", value: `#${s.rank}`, sub: `Top ${s.rankPct}% of cadets` },
                        ].map((c) => (
                            <div key={c.label} className="bg-[#0d3060] border border-blue-800 rounded-xl p-4">
                                <p className="text-blue-400 text-xs uppercase tracking-wide mb-2">{c.label}</p>
                                <p className="text-white text-2xl font-semibold">{c.value}</p>
                                <p className="text-[#f97316] text-xs mt-1">{c.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Streak calendar */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl p-5 mb-5">
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-4">
                            14-day streak
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {s.streakDays.map((day, i) => (
                                <div
                                    key={i}
                                    title={day.label}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${day.status === "done"
                                            ? "bg-green-900/60 text-green-400 border border-green-700"
                                            : day.status === "today"
                                                ? "bg-[#f97316]/20 text-[#f97316] border border-orange-600"
                                                : "bg-blue-900/30 text-blue-600 border border-blue-800"
                                        }`}
                                >
                                    {day.day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subject performance */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl p-5 mb-5">
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-4">
                            Accuracy by subject
                        </p>
                        <div className="flex flex-col gap-3">
                            {s.subjectStats.map((sub) => (
                                <div key={sub.name}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-blue-200 text-sm">{sub.name}</span>
                                        <span className="text-white text-sm font-medium">{sub.accuracy}%</span>
                                    </div>
                                    <div className="h-2 bg-blue-900 rounded-full">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${sub.accuracy >= 75
                                                    ? "bg-green-500"
                                                    : sub.accuracy >= 50
                                                        ? "bg-[#f97316]"
                                                        : "bg-red-500"
                                                }`}
                                            style={{ width: `${sub.accuracy}%` }}
                                        />
                                    </div>
                                    <p className="text-blue-500 text-xs mt-0.5">
                                        {sub.correct} correct / {sub.total} attempted
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent sessions */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl p-5">
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-4">
                            Recent sessions
                        </p>
                        <div className="flex flex-col gap-2">
                            {s.recentSessions.map((session, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2 border-b border-blue-800/50 last:border-0"
                                >
                                    <div>
                                        <p className="text-blue-100 text-sm">{session.subject}</p>
                                        <p className="text-blue-500 text-xs">{session.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-sm font-medium">
                                            {session.score}/{session.total}
                                        </p>
                                        <p className={`text-xs ${session.pct >= 75 ? "text-green-400" : session.pct >= 50 ? "text-orange-400" : "text-red-400"
                                            }`}>
                                            {session.pct}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

// Demo data — replace with real Firestore/MongoDB data later
const DEMO_STATS = {
    totalTests: 47,
    testsThisWeek: 3,
    accuracy: 74,
    accuracyDelta: 2,
    streak: 12,
    bestStreak: 18,
    rank: 14,
    rankPct: 8,
    streakDays: [
        { day: "M", status: "done", label: "Mon" },
        { day: "T", status: "done", label: "Tue" },
        { day: "W", status: "done", label: "Wed" },
        { day: "T", status: "miss", label: "Thu" },
        { day: "F", status: "done", label: "Fri" },
        { day: "S", status: "done", label: "Sat" },
        { day: "S", status: "done", label: "Sun" },
        { day: "M", status: "done", label: "Mon" },
        { day: "T", status: "done", label: "Tue" },
        { day: "W", status: "miss", label: "Wed" },
        { day: "T", status: "done", label: "Thu" },
        { day: "F", status: "done", label: "Fri" },
        { day: "S", status: "done", label: "Sat" },
        { day: "T", status: "today", label: "Today" },
    ],
    subjectStats: [
        { name: "Air Navigation", accuracy: 82, correct: 41, total: 50 },
        { name: "Meteorology", accuracy: 68, correct: 34, total: 50 },
        { name: "Air Regulations", accuracy: 76, correct: 38, total: 50 },
        { name: "Technical General", accuracy: 58, correct: 29, total: 50 },
        { name: "Radio Telephony", accuracy: 90, correct: 45, total: 50 },
    ],
    recentSessions: [
        { subject: "Air Navigation", score: 8, total: 10, pct: 80, date: "Today" },
        { subject: "Meteorology", score: 6, total: 10, pct: 60, date: "Yesterday" },
        { subject: "Air Regulations", score: 9, total: 10, pct: 90, date: "2 days ago" },
        { subject: "Technical General", score: 5, total: 10, pct: 50, date: "3 days ago" },
        { subject: "Radio Telephony", score: 10, total: 10, pct: 100, date: "4 days ago" },
    ],
};