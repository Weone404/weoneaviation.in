// pages/api/generate-mcq.js
import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";
import formidable from "formidable";
import fs from "fs";

// Disable Next.js body parser — formidable handles it
export const config = {
    api: { bodyParser: false },
};

const VALID_SUBJECTS = [
    "Air Navigation",
    "Meteorology",
    "Air Regulations",
    "Technical General",
    "Radio Telephony",
];

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // ── Parse multipart form ────────────────────────────────────
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 }); // 10MB limit

    let fields, files;
    try {
        [fields, files] = await form.parse(req);
    } catch (err) {
        return res.status(400).json({ error: "Could not parse form. File may be too large (max 10MB)." });
    }

    const subject = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject;
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!subject || !uploadedFile) {
        return res.status(400).json({ error: "file and subject are required" });
    }

    if (!VALID_SUBJECTS.includes(subject)) {
        return res.status(400).json({ error: `subject must be one of: ${VALID_SUBJECTS.join(", ")}` });
    }

    const mimeType = uploadedFile.mimetype || "";
    const fileName = uploadedFile.originalFilename || "upload";

    try {
        let claudeBody;

        if (mimeType === "application/pdf") {
            // Send PDF directly to Claude as base64 — Claude reads PDFs natively
            const fileBuffer = fs.readFileSync(uploadedFile.filepath);
            const base64 = fileBuffer.toString("base64");

            claudeBody = {
                model: "claude-sonnet-4-20250514",
                max_tokens: 4000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "document",
                                source: { type: "base64", media_type: "application/pdf", data: base64 },
                            },
                            {
                                type: "text",
                                text: buildPrompt(subject),
                            },
                        ],
                    },
                ],
            };
        } else {
            // DOCX or TXT — extract text first
            let docText = "";

            if (mimeType === "text/plain") {
                docText = fs.readFileSync(uploadedFile.filepath, "utf-8");
            } else if (
                mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
                // Extract text from DOCX XML
                const JSZip = (await import("jszip")).default;
                const buffer = fs.readFileSync(uploadedFile.filepath);
                const zip = await JSZip.loadAsync(buffer);
                const xml = await zip.file("word/document.xml")?.async("string");
                if (xml) {
                    docText = xml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
                }
            } else {
                return res.status(415).json({
                    error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
                });
            }

            if (!docText || docText.length < 50) {
                return res.status(422).json({
                    error: "Could not extract text from this file. Try a different format.",
                });
            }

            claudeBody = {
                model: "claude-sonnet-4-20250514",
                max_tokens: 4000,
                messages: [
                    {
                        role: "user",
                        content: buildPromptWithText(subject, docText),
                    },
                ],
            };
        }

        // ── Call Claude API ───────────────────────────────────────
        const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify(claudeBody),
        });

        if (!claudeRes.ok) {
            const errData = await claudeRes.json();
            console.error("[Claude API error]", errData);
            return res.status(502).json({ error: "Claude API error. Check your API key." });
        }

        const claudeData = await claudeRes.json();
        const rawText = claudeData.content?.[0]?.text || "[]";

        // ── Parse and save ────────────────────────────────────────
        let questions = [];
        try {
            const cleaned = rawText.replace(/```json|```/g, "").trim();
            questions = JSON.parse(cleaned);
        } catch {
            return res.status(422).json({
                error: "Claude returned an unexpected format. Try a different document.",
            });
        }

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(422).json({ error: "No questions were generated from this document." });
        }

        // Validate each question
        const valid = questions.filter(
            (q) =>
                q.question &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                typeof q.correctIndex === "number" &&
                q.correctIndex >= 0 &&
                q.correctIndex <= 3 &&
                q.explanation
        );

        if (valid.length === 0) {
            return res.status(422).json({ error: "Generated questions did not pass validation." });
        }

        // Save to MongoDB
        await connectDB();

        const docs = valid.map((q) => ({
            subject,
            question: q.question,
            options: q.options.map((text) => ({ text: String(text) })),
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            difficulty: ["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium",
            source: fileName,
        }));

        const saved = await Question.insertMany(docs);

        return res.status(200).json({
            success: true,
            generated: valid.length,
            saved: saved.length,
            questions: saved,
        });
    } catch (err) {
        console.error("[generate-mcq]", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

function buildPrompt(subject) {
    return `You are a DGCA CPL/PPL exam question specialist.
Read this document carefully and generate 10 to 20 MCQ questions for the subject: ${subject}.

Rules:
- Each question must have exactly 4 answer options
- The explanation must clearly explain WHY the correct answer is correct
- Difficulty must be "easy", "medium", or "hard"

Return ONLY a valid JSON array — no markdown, no explanation, no preamble:
[
  {
    "question": "...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Detailed explanation...",
    "difficulty": "medium"
  }
]`;
}

function buildPromptWithText(subject, docText) {
    return `You are a DGCA CPL/PPL exam question specialist.

Below is text extracted from a DGCA study document.
Generate 10 to 20 MCQ questions for the subject: ${subject}.

Rules:
- Each question must have exactly 4 answer options
- correctIndex is 0-based (0 = first option)
- Explanation must clearly explain why the correct answer is right
- Difficulty must be "easy", "medium", or "hard"
- Return ONLY a valid JSON array, no markdown, no preamble

Document text:
---
${docText.slice(0, 12000)}
---

JSON array:`;
}