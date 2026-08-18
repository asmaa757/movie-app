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
        bg-white
        border border-gray-300
        focus-within:border-gray-400
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
        className="flex-1 outline-none text-[15px] text-gray-800 disabled:opacity-50"
      />

      <button
        onClick={() => onSend(input)}
        disabled={loading || !input.trim()}
        className="rounded-full w-8 h-8 flex items-center justify-center"
      >
        <SendHorizontal
          className={`w-10 h-10 ${
            input.trim()
              ? "text-gray-400"
              : "text-gray-300"
          }`}
        />
      </button>
    </div>
  );
}

export default ChatInput;