import { useState, useRef, useEffect } from "react";
import { sendMessageToAssistant } from "../services/aiService";
import ChatInput from "../components/ChatInput";

const SUGGESTIONS = [
  "Recommend a movie",
  "Recommend a TV show",
  "Find movies similar to ",
  "Find TV shows similar to ",
  "Actor info",
];

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isQuotaError, setIsQuotaError] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendText = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const updated = [...messages, { role: "user", content: trimmed }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError("");
    setIsQuotaError(false);

    try {
      const reply = await sendMessageToAssistant(updated);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Assistant error:", err);
      if (err.message.includes("429")) {
        setIsQuotaError(true);
        setError("We've reached the maximum number of requests allowed at the moment. Please try again later!");
      } else {
        setIsQuotaError(false);
        setError("Something went wrong while getting a response. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText(input);
    }
  };

  return (
    <div className="h-[calc(95vh-64px)] bg-white flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            What can I help with?
          </h1>

          <ChatInput
            input={input}
            setInput={setInput}
            onSend={sendText}
            loading={loading}
          />

          <div className="flex flex-wrap w-[50%] justify-center gap-2 mt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                {s}
              </button>
            ))}
          </div>

          {error && (
            <p
              className={`mt-4 text-sm text-center ${
                isQuotaError ? "text-gray-500" : "text-red-600"
              }`}
            >
              {error}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-2xl mx-auto space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-(--primary) text-black rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}{loading && (
                <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-2xl rounded-bl-sm w-fit">
                  Typing...
                </div>
              )}
              {error && (
                <div
                  className={`text-center text-sm rounded-lg py-2 px-3 border ${
                    isQuotaError
                      ? "text-gray-600 bg-gray-50 border-gray-200"
                      : "text-red-600 bg-red-50 border-red-200"
                  }`}
                >
                  {error}
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <div className="px-4 pb-6">
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={sendText}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default AIAssistant;