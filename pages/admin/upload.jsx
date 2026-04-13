// pages/admin/upload.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

// Add your admin email(s) here
const ADMIN_EMAILS = ["your@email.com"];

const SUBJECTS = [
    "Air Navigation",
    "Meteorology",
    "Air Regulations",
    "Technical General",
    "Radio Telephony",
];

export default function AdminUploadPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState(SUBJECTS[0]);
    const [status, setStatus] = useState("idle"); // idle | uploading | done | error
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loadingQ, setLoadingQ] = useState(false);

    // Auth guard — only admin emails allowed
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login?from=/admin/upload");
            } else if (!ADMIN_EMAILS.includes(user.email)) {
                router.push("/practice");
            }
        }
    }, [user, authLoading]);

    useEffect(() => {
        if (user && ADMIN_EMAILS.includes(user.email)) {
            fetchAllQuestions();
        }
    }, [user]);

    async function fetchAllQuestions() {
        setLoadingQ(true);
        try {
            const res = await fetch("/api/questions?limit=50");
            const data = await res.json();
            setAllQuestions(data.questions || []);
        } catch {
            setAllQuestions([]);
        } finally {
            setLoadingQ(false);
        }
    }

    function handleFileChange(e) {
        const f = e.target.files?.[0];
        if (f) setFile(f);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!file) return;

        setStatus("uploading");
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("subject", subject);

            const res = await fetch("/api/generate-mcq", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }

            setResult(data);
            setStatus("done");
            setFile(null);
            // Refresh question list
            fetchAllQuestions();
        } catch {
            setError("Network error — please check your connection.");
            setStatus("error");
        }
    }

    const uploading = status === "uploading";

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-[#0a2342] flex items-center justify-center">
                <p className="text-blue-300 text-sm">Loading...</p>
            </div>
        );
    }

    // Group questions by subject for the table
    const grouped = SUBJECTS.map((s) => ({
        subject: s,
        count: allQuestions.filter((q) => q.subject === s).length,
    }));

    return (
        <>
            <Head>
                <title>Admin — Upload Questions</title>
            </Head>

            <div className="min-h-screen bg-[#0a2342] px-4 py-6">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-white font-semibold text-xl">
                                Admin — <span className="text-[#f97316]">Upload Questions</span>
                            </h1>
                            <p className="text-blue-400 text-sm mt-0.5">Signed in as {user.email}</p>
                        </div>
                        <a href="/practice" className="text-blue-400 text-sm hover:text-white transition-colors">
                            ← Back to app
                        </a>
                    </div>

                    {/* Question bank summary */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl p-5 mb-6">
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-3">
                            Question bank
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {grouped.map((g) => (
                                <div key={g.subject} className="bg-[#0a2342] rounded-xl px-3 py-2 flex items-center justify-between">
                                    <span className="text-blue-300 text-xs truncate pr-2">{g.subject}</span>
                                    <span className={`text-xs font-semibold flex-shrink-0 ${g.count > 0 ? "text-green-400" : "text-blue-600"}`}>
                                        {g.count} Qs
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload form */}
                    <div className="bg-[#0d3060] border border-blue-800 rounded-2xl p-6">
                        <p className="text-white font-medium mb-5">Upload a new document</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Subject */}
                            <div>
                                <label className="text-blue-300 text-sm mb-2 block">Subject</label>
                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[#0a2342] border border-blue-800 text-white text-sm focus:outline-none focus:border-[#f97316]"
                                >
                                    {SUBJECTS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Drop zone */}
                            <div>
                                <label className="text-blue-300 text-sm mb-2 block">Document</label>
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onClick={() => document.getElementById("file-input").click()}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragOver
                                            ? "border-[#f97316] bg-orange-900/10"
                                            : file
                                                ? "border-blue-500 bg-blue-900/20"
                                                : "border-blue-800 hover:border-blue-600"
                                        }`}
                                >
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".pdf,.docx,.txt"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    {file ? (
                                        <div>
                                            <p className="text-[#f97316] font-medium mb-1">{file.name}</p>
                                            <p className="text-blue-400 text-sm">
                                                {(file.size / 1024).toFixed(0)} KB · Click to change
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-blue-300 mb-1">Drop your file here</p>
                                            <p className="text-blue-500 text-sm">PDF, DOCX, or TXT · Click to browse</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3 text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${!file || uploading
                                        ? "bg-blue-900/50 text-blue-500 cursor-not-allowed"
                                        : "bg-[#f97316] hover:bg-orange-500 text-white cursor-pointer"
                                    }`}
                            >
                                {uploading
                                    ? "Generating MCQs with AI... (15–30 seconds)"
                                    : "Generate MCQs from document"}
                            </button>

                            {/* Uploading indicator */}
                            {uploading && (
                                <div className="bg-blue-900/30 border border-blue-700 rounded-xl px-4 py-3">
                                    <p className="text-blue-300 text-sm">
                                        Claude is reading your document and creating questions with explanations...
                                    </p>
                                    <div className="mt-2 h-1 bg-blue-900 rounded-full overflow-hidden">
                                        <div className="h-1 bg-[#f97316] rounded-full animate-pulse w-2/3" />
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Success result */}
                        {status === "done" && result && (
                            <div className="mt-5 bg-green-900/20 border border-green-700 rounded-xl p-5">
                                <p className="text-green-400 font-semibold mb-1">
                                    {result.saved} questions saved to MongoDB
                                </p>
                                <p className="text-blue-400 text-sm mb-4">Subject: {subject}</p>

                                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-3">
                                    Preview (first 3)
                                </p>
                                <div className="flex flex-col gap-3">
                                    {result.questions.slice(0, 3).map((q, i) => (
                                        <div key={i} className="bg-[#0a2342] rounded-xl p-3">
                                            <p className="text-blue-100 text-sm mb-2">{i + 1}. {q.question}</p>
                                            <div className="flex flex-col gap-1">
                                                {q.options.map((opt, j) => (
                                                    <p
                                                        key={j}
                                                        className={`text-xs px-2 py-1 rounded ${j === q.correctIndex
                                                                ? "bg-green-900/40 text-green-400"
                                                                : "text-blue-400"
                                                            }`}
                                                    >
                                                        {["A", "B", "C", "D"][j]}. {opt.text}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {result.questions.length > 3 && (
                                        <p className="text-blue-500 text-xs text-center">
                                            +{result.questions.length - 3} more questions saved
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}