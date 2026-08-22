import { useState } from "react";
import { useNavigate } from "react-router";

function SearchBar({ type = "movie" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(query.trim())}&type=${type}`);
  };

  return (
    <form
      className="flex w-full max-w-full sm:max-w-125 mt-5"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder={
          type === "tv" ? "Search for TV shows..." : "Search for movies..."
        }
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="flex-1 min-w-0 h-11.25 px-4 border border-(--border-filter) rounded-l-[5px] bg-(--bg-placeholder) 
        text-(--text) outline-none text-sm placeholder:text-(--text-muted) focus:border-(--primary)"
      />

      <button
        type="submit"
        className="h-11.25 px-3.75 sm:px-5.5 border-none rounded-r-[5px] bg-(--primary) 
        text-(--on-primary) cursor-pointer text-sm font-semibold transition-colors duration-200 hover:bg-(--primary-hover)"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;