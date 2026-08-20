import { useState } from "react";
import { useNavigate } from "react-router";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;