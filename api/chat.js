const API_URL = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key}`;

const SYSTEM_PROMPT = `You are a Movie Assistant chatbot. Your ONLY job is to help users with movie and TV show related topics:
- Recommending movies/TV shows based on user preferences
- Answering questions about movies and TV shows
- Suggesting similar movies to ones the user mentions
- Discussing movie genres
- Providing movie summaries or explanations
- Answering questions about actors, directors, and other movie-related topics

Rules:
- If the user asks about anything NOT related to movies or TV shows, politely respond that you are a movie assistant and can only help with movie and TV-related questions. Do not answer the unrelated question in any way.
- Keep responses conversational, concise, and helpful.
- Use the conversation history to keep context (e.g. follow-up requests like "something less serious").`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    {
      role: "model",
      parts: [{ text: "Understood. I'm ready to help with movie and TV-related questions only." }],
    },
    ...messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    })),
  ];

  try {
    const response = await fetch(API_URL(process.env.GEMINI_API_KEY), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, data);
      return res.status(response.status).json({ error: "API request failed" });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: "No response from assistant" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach assistant" });
  }
}