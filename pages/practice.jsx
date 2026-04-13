// pages/practice.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

const SUBJECTS = [
    "Air Navigation",
    "Meteorology",
    "Air Regulations",
    "Technical General",
    "Radio Telephony",
];

const LETTERS = ["A", "B", "C", "D"];

export default function PracticePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [subject, setSubject] = useState("Air Navigation");
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [loadingQ, setLoadingQ] = useState(true);
    const [error, setError] = useState("");
    const [sessionResults, setSessionResults] = useState([]);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?from=/practice");
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (user) loadQuestions();
    }, [subject, user]);

    async function loadQuestions() {
        setLoadingQ(true);
        setError("");
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setDone(false);
        setSessionResults([]);

        try {
            const res = await fetch(
                `/api/questions?subject=${encodeURIComponent(subject)}&limit=10`
            );
            const data = await res.json();
            if (!data.questions || data.questions.length === 0) {
                setError(
                    "No questions found for this subject yet. The admin needs to upload a document first."
                );
                setQuestions([]);
            } else {
                setQuestions(data.questions);
            }
        } catch {
            setError("Failed to load questions. Please check your connection.");
        } finally {
            setLoadingQ(false);
        }
    }

    function selectAnswer(idx) {
        if (selected !== null) return;
        setSelected(idx);

        const q = questions[currentQ];
        const isCorrect = idx === q.correctIndex;
        if (isCorrect) setScore((s) => s + 1);

        setSessionResults((prev) => [
            ...prev,
            { question: q.question, correct: isCorrect, chosen: idx, correctIndex: q.correctIndex },
        ]);
    }

    function nextQuestion() {
        if (currentQ + 1 >= questions.length) {
            setDone(true);
        } else {
            setCurrentQ((q) => q + 1);
            setSelected(null);
        }
    }

    if (authLoading || (!user && !authLoading)) {
        return (
            <div className="min-h-screen bg-[#0a2342] flex items-center justify-center">
                <p className="text-blue-300 text-sm">Loading...</p>
            </div>
        );
    }

    const q = questions[currentQ];
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    const progressWidth = questions.length
        ? `${(currentQ / questions.length) * 100}%`
        : "0%";

    return (
        <>
            <Head>
                <title>Practice — WeOne Aviation PrepAI</title>
            </Head>

            <div className="min-h-screen bg-[#0a2342] px-4 py-6">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-white font-semibold text-lg">
                            WeOne <span className="text-[#f97316]">PrepAI</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <a href="/dashboard" className="text-blue-300 text-sm hover:text-white transition-colors">
                                Dashboard
                            </a>
                            <a href="/leaderboard" className="text-blue-300 text-sm hover:text-white transition-colors">
                                Leaderboard
                            </a>
                        </div>
                    </div>

                    {/* Subject chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {SUBJECTS.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSubject(s)}
                                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${subject === s
                                        ? "bg-[#f97316] border-[#f97316] text-white font-medium"
                                        : "border-blue-700 text-blue-300 hover:border-blue-500 hover:text-white"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {loadingQ && (
                        <div className="bg-[#0d3060] rounded-2xl border border-blue-800 p-8 text-center">
                            <p className="text-blue-300 text-sm">Loading questions...</p>
                        </div>
                    )}

                    {/* Error */}
                    {!loadingQ && error && (
                        <div className="bg-red-900/30 border border-red-700 rounded-2xl p-6 text-center">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Quiz */}
                    {!loadingQ && !error && questions.length > 0 && !done && q && (
                        <div className="bg-[#0d3060] rounded-2xl border border-blue-800 p-6">

                            {/* Q header */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-blue-300 text-sm font-medium">{subject}</span>
                                <span className="text-blue-400 text-xs">
                                    {currentQ + 1} / {questions.length}
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 bg-blue-900 rounded-full mb-5">
                                <div
                                    className="h-1 bg-[#f97316] rounded-full transition-all duration-300"
                                    style={{ width: progressWidth }}
                                />
                            </div>

                            {/* Difficulty badge */}
                            {q.difficulty && (
                                <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-medium ${q.difficulty === "easy"
                                        ? "bg-green-900/50 text-green-400 border border-green-800"
                                        : q.difficulty === "hard"
                                            ? "bg-red-900/50 text-red-400 border border-red-800"
                                            : "bg-blue-900/50 text-blue-400 border border-blue-800"
                                    }`}>
                                    {q.difficulty}
                                </span>
                            )}

                            {/* Question */}
                            <p className="text-white text-base leading-relaxed mb-5">{q.question}</p>

                            {/* Options */}
                            <div className="flex flex-col gap-3 mb-5">
                                {q.options.map((opt, i) => {
                                    let cls =
                                        "flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm text-left transition-colors ";
                                    if (selected === null) {
                                        cls += "border-blue-700 text-blue-100 hover:border-[#f97316] hover:bg-blue-900/40 cursor-pointer";
                                    } else if (i === q.correctIndex) {
                                        cls += "border-green-500 bg-green-900/30 text-green-300 cursor-default";
                                    } else if (i === selected) {
                                        cls += "border-red-500 bg-red-900/30 text-red-300 cursor-default";
                                    } else {
                                        cls += "border-blue-800 text-blue-400 opacity-50 cursor-default";
                                    }

                                    return (
                                        <button key={i} onClick={() => selectAnswer(i)} className={cls}>
                                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 ${selected === null
                                                    ? "bg-blue-900 text-blue-300"
                                                    : i === q.correctIndex
                                                        ? "bg-green-800 text-green-300"
                                                        : i === selected
                                                            ? "bg-red-800 text-red-300"
                                                            : "bg-blue-900 text-blue-500"
                                                }`}>
                                                {LETTERS[i]}
                                            </span>
                                            {opt.text}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            {selected !== null && (
                                <div className={`rounded-xl border p-4 mb-5 ${selected === q.correctIndex
                                        ? "bg-green-900/20 border-green-700"
                                        : "bg-red-900/20 border-red-700"
                                    }`}>
                                    <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${selected === q.correctIndex ? "text-green-400" : "text-red-400"
                                        }`}>
                                        {selected === q.correctIndex
                                            ? "Correct"
                                            : `Incorrect — correct answer: ${q.options[q.correctIndex]?.text}`}
                                    </p>
                                    <p className="text-blue-200 text-sm leading-relaxed">{q.explanation}</p>
                                </div>
                            )}

                            {/* Next button */}
                            {selected !== null && (
                                <div className="flex justify-end">
                                    <button
                                        onClick={nextQuestion}
                                        className="px-6 py-2.5 bg-[#f97316] hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors"
                                    >
                                        {currentQ + 1 >= questions.length ? "See results" : "Next question →"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Results screen */}
                    {done && (
                        <div className="bg-[#0d3060] rounded-2xl border border-blue-800 p-6">
                            <div className="flex items-center gap-5 bg-green-900/20 border border-green-700 rounded-xl p-5 mb-6">
                                <div className="text-4xl font-semibold text-green-400">{score}/{questions.length}</div>
                                <div>
                                    <p className="text-white font-medium mb-1">Session complete</p>
                                    <p className="text-blue-300 text-sm">{pct}% accuracy · {subject}</p>
                                    <p className="text-blue-400 text-xs mt-1">
                                        {pct >= 80
                                            ? "Excellent! You are well prepared."
                                            : pct >= 60
                                                ? "Good effort. Review the wrong answers."
                                                : "Keep practising — focus on weak areas."}
                                    </p>
                                </div>
                            </div>

                            {/* Per-question summary */}
                            <p className="text-blue-300 text-sm font-medium mb-3">Question summary</p>
                            <div className="flex flex-col gap-2 mb-6">
                                {sessionResults.map((r, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${r.correct
                                                ? "bg-green-900/20 border border-green-800 text-green-300"
                                                : "bg-red-900/20 border border-red-800 text-red-300"
                                            }`}
                                    >
                                        <span className="font-semibold">{r.correct ? "✓" : "✗"}</span>
                                        <span className="line-clamp-1">{r.question}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={loadQuestions}
                                    className="px-5 py-2.5 bg-[#f97316] hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    Practice again
                                </button>
                                <a
                                    href="/dashboard"
                                    className="px-5 py-2.5 border border-blue-700 text-blue-300 hover:text-white hover:border-blue-500 rounded-xl text-sm transition-colors"
                                >
                                    View dashboard
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}