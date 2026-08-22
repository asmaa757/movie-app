import { SendHorizontal } from "lucide-react";

function ChatInput({
  input,
  setInput,
  onSend,
  loading = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(input);
    }
  };

  return (
    <div
      className="
        w-full max-w-2xl mx-auto 
        flex items-center gap-3 
        border border-(--border)
        focus-within:border-(--primary)
        rounded-full px-5 py-3 
        shadow-sm
      "
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message Movie Assistant..."
        disabled={loading}
        className="flex-1 outline-none text-(--text) placeholder:text-(--text-muted) disabled:opacity-50"
      />

      <button
        onClick={() => onSend(input)}
        disabled={loading || !input.trim()}
        className="rounded-full w-8 h-8 flex items-center justify-center"
      >
        <SendHorizontal
          className={`w-10 h-10 ${
            input.trim()
              ? "text-(--primary)"
              : "text-(--text-muted)"
          }`}
        />
      </button>
    </div>
  );
}

export default ChatInput;