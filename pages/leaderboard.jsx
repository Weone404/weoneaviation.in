// pages/leaderboard.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

export default function LeaderboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("week"); // week | month | all

    useEffect(() => {
        if (!authLoading && !user) router.push("/login?from=/leaderboard");
    }, [user, authLoading]);

    useEffect(() => {
        if (user) fetchLeaderboard();
    }, [user, period]);

    async function fetchLeaderboard() {
        setLoading(true);
        try {
            const res = await fetch(`/api/leaderboard?period=${period}`);
            const data = await res.json();
            setPlayers(data.players || DEMO_PLAYERS);
        } catch {
            setPlayers(DEMO_PLAYERS);
        } finally {
            setLoading(false);
        }
    }

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-[#0a2342] flex items-center justify-center">
                <p className="text-blue-300 text-sm">Loading...</p>
            </div>
        );
    }

    const currentUserEmail = user.email;

    return (
        <>
            <Head>
                <title>Leaderboard — WeOne Aviation PrepAI</title>
            </Head>

            <div className="min-h-screen bg-[#0a2342] px-4 py-6">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-white font-semibold text-xl">Leaderboard</h1>
                            <p className="text-blue-400 text-sm mt-0.5">Top DGCA prep cadets</p>
                        </div>
                        <div className="flex gap-2">
                            <a href="/practice" className="text-blue-300 text-sm hover:text-white transition-colors">
                                Practice
                            </a>
                            <a href="/dashboard" className="text-blue-300 text-sm hover:text-white transition-colors">
                                Dashboard
                            </a>
                        </div>
                    </div>

                    {/* Period filter */}
                    <div className="flex gap-2 mb-6">
                        {[
                            { key: "week", label: "This week" },
                            { key: "month", label: "This month" },
                            { key: "all", label: "All time" },
                        ].map((p) => (
                            <button
                                key={p.key}
                                onClick={() => setPeriod(p.key)}
                                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${period === p.key
                                        ? "bg-[#f97316] border-[#f97316] text-white font-medium"
                                        : "border-blue-700 text-blue-300 hover:border-blue-500 hover:text-white"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {/* Top 3 podium */}
                    {!loading && players.length >= 3 && (
                        <div className="flex items-end justify-center gap-3 mb-6">
                            {/* 2nd */}
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-800 border-2 border-blue-500 flex items-center justify-center text-white font-semibold text-sm mb-2">
                                    {getInitials(players[1].name)}
                                </div>
                                <div className="bg-[#0d3060] border border-blue-700 rounded-xl px-3 py-3 text-center w-24">
                                    <p className="text-gray-300 text-xs font-bold mb-1">2nd</p>
                                    <p className="text-white text-xs font-medium leading-tight">{players[1].name}</p>
                                    <p className="text-blue-300 text-xs mt-1">{players[1].score.toLocaleString()}</p>
                                </div>
                            </div>
                            {/* 1st */}
                            <div className="flex flex-col items-center">
                                <div className="text-yellow-400 text-lg mb-1">★</div>
                                <div className="w-14 h-14 rounded-full bg-yellow-900/50 border-2 border-yellow-500 flex items-center justify-center text-white font-semibold mb-2">
                                    {getInitials(players[0].name)}
                                </div>
                                <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl px-3 py-3 text-center w-28">
                                    <p className="text-yellow-400 text-xs font-bold mb-1">1st</p>
                                    <p className="text-white text-xs font-medium leading-tight">{players[0].name}</p>
                                    <p className="text-yellow-300 text-xs mt-1">{players[0].score.toLocaleString()}</p>
                                </div>
                            </div>
                            {/* 3rd */}
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-orange-900/50 border-2 border-orange-600 flex items-center justify-center text-white font-semibold text-sm mb-2">
                                    {getInitials(players[2].name)}
                                </div>
                                <div className="bg-[#0d3060] border border-blue-700 rounded-xl px-3 py-3 text-center w-24">
                                    <p className="text-orange-400 text-xs font-bold mb-1">3rd</p>
                                    <p className="text-white text-xs font-medium leading-tight">{players[2].name}</p>
                                    <p className="text-blue-300 text-xs mt-1">{players[2].score.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full list */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-blue-800">
                            <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">Rank</span>
                            <span className="text-blue-300 text-xs font-semibold uppercase tracking-wide">Score</span>
                        </div>

                        {loading ? (
                            <div className="px-5 py-8 text-center text-blue-400 text-sm">Loading...</div>
                        ) : (
                            <div>
                                {players.map((p, i) => {
                                    const isYou = p.email === currentUserEmail;
                                    return (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-3 px-5 py-3 border-b border-blue-900/50 last:border-0 ${isYou ? "bg-[#f97316]/10 border-l-2 border-l-[#f97316]" : ""
                                                }`}
                                        >
                                            {/* Rank number */}
                                            <div className={`w-7 text-center text-sm font-semibold flex-shrink-0 ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-orange-400" : "text-blue-500"
                                                }`}>
                                                {i + 1}
                                            </div>

                                            {/* Avatar */}
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${isYou ? "bg-[#f97316]/30 text-[#f97316]" : "bg-blue-800 text-blue-200"
                                                }`}>
                                                {getInitials(p.name)}
                                            </div>

                                            {/* Name */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-medium truncate ${isYou ? "text-[#f97316]" : "text-blue-100"}`}>
                                                        {p.name}
                                                    </span>
                                                    {isYou && (
                                                        <span className="text-xs bg-[#f97316]/20 text-[#f97316] px-2 py-0.5 rounded-full border border-orange-700 flex-shrink-0">
                                                            you
                                                        </span>
                                                    )}
                                                    {p.badge && (
                                                        <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full border border-green-800 flex-shrink-0">
                                                            {p.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-blue-500 text-xs">{p.testsThisWeek} tests this week</p>
                                            </div>

                                            {/* Score */}
                                            <div className="text-right flex-shrink-0">
                                                <p className={`text-sm font-semibold ${isYou ? "text-[#f97316]" : "text-white"}`}>
                                                    {p.score.toLocaleString()}
                                                </p>
                                                <p className="text-blue-500 text-xs">{p.accuracy}% acc.</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <p className="text-center text-blue-600 text-xs mt-4">
                        Score = (correct × 4) − (wrong × 1) · Resets every Sunday
                    </p>
                </div>
            </div>
        </>
    );
}

function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const DEMO_PLAYERS = [
    { name: "Rahul Sharma", email: "rahul@example.com", score: 2840, accuracy: 88, testsThisWeek: 12, badge: "Top Gun" },
    { name: "Priya Mehta", email: "priya@example.com", score: 2710, accuracy: 84, testsThisWeek: 10, badge: "Ace" },
    { name: "Vikram Kapoor", email: "vikram@example.com", score: 2590, accuracy: 81, testsThisWeek: 9, badge: "" },
    { name: "Arjun Dubey", email: "arjun@example.com", score: 2340, accuracy: 74, testsThisWeek: 7, badge: "" },
    { name: "Sneha Rao", email: "sneha@example.com", score: 2290, accuracy: 72, testsThisWeek: 8, badge: "" },
    { name: "Amit Tiwari", email: "amit@example.com", score: 2140, accuracy: 69, testsThisWeek: 6, badge: "" },
    { name: "Kavya Nair", email: "kavya@example.com", score: 1980, accuracy: 65, testsThisWeek: 5, badge: "" },
    { name: "Rohan Singh", email: "rohan@example.com", score: 1820, accuracy: 61, testsThisWeek: 4, badge: "" },
];