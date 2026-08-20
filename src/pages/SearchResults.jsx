import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import Pagination from "../components/Pagination/Pagination";
import { searchMovies } from "../services/tmdb";
import { searchTVShows } from "../services/tvServiice";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const type = searchParams.get("type") === "tv" ? "tv" : "movie";

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [query, type]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const search = type === "tv" ? searchTVShows : searchMovies;

    search(query, currentPage)
      .then((data) => {
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch((err) => {
        console.error("Failed to search:", err);
        setError("Failed to load search results.");
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, type, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#141414] box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <Link
        to={type === "tv" ? "/tv-shows" : "/"}
        className="inline-flex items-center gap-2 text-white hover:text-(--primary) text-base font-medium mb-6 no-underline transition-colors"
      >
        <ArrowLeft size={20} />
        Back to {type === "tv" ? "TV Shows" : "Movies"}
      </Link>

      <h2 className="text-[#e50914] font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
        {query ? `Search results for "${query}"` : "Search"}
      </h2>

      {!query && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          Type something in the search bar to find {type === "tv" ? "TV shows" : "movies"}.
        </p>
      )}

      {error && (
        <p className="min-h-75 flex items-center justify-center text-[#e50914] text-lg m-0">
          {error}
        </p>
      )}

      {loading && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          Loading results...
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <section className="w-full mt-9 md:mt-7.5">
          <MovieGrid movies={results} basePath={type === "tv" ? "/tv-shows" : "/movies"} />
        </section>
      )}

      {!loading && !error && results.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!loading && !error && query && results.length === 0 && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          No results found for "{query}".
        </p>
      )}
    </main>
  );
}

export default SearchResults;
