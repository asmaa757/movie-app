const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`;

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

export async function sendMessageToAssistant(messages) {
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

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini API error:", response.status, errorBody);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!reply) {
    throw new Error("No response from assistant");
  }

  return reply;
}