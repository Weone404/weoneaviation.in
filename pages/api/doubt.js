// pages/api/doubt.js
export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { question, history = [] } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: 1024,
                messages: [
                    {
                        role: "system",
                        content: `You are an expert DGCA aviation exam tutor for Indian student pilots. 
Answer questions clearly and accurately about air regulations, navigation, meteorology, 
technical general, airframes, and engines. Use bullet points where helpful. 
Be concise but thorough. Always relate answers to DGCA exam relevance where possible.`,
                    },
                    ...history.flatMap(h => [
                        { role: "user", content: h.question },
                        { role: "assistant", content: h.answer },
                    ]),
                    { role: "user", content: question },
                ],
            }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const answer = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate an answer.";
        return res.status(200).json({ answer });

    } catch (err) {
        console.error("Doubt API error:", err);
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
}