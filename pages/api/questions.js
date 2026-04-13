// pages/api/questions.js
import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { subject, limit = "10" } = req.query;
    const limitNum = Math.min(parseInt(limit) || 10, 50);

    try {
        await connectDB();

        const filter = { active: true };
        if (subject) filter.subject = subject;

        // Random sample using MongoDB aggregation
        const questions = await Question.aggregate([
            { $match: filter },
            { $sample: { size: limitNum } },
            {
                $project: {
                    subject: 1,
                    question: 1,
                    options: 1,
                    correctIndex: 1,
                    explanation: 1,
                    difficulty: 1,
                },
            },
        ]);

        return res.status(200).json({ questions });
    } catch (err) {
        console.error("[questions GET]", err);
        return res.status(500).json({ error: "Failed to fetch questions" });
    }
}