import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import Pagination from "../components/Pagination/Pagination";
import { getPopularTVShows } from "../services/tvServiice";

function TVShows() {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getPopularTVShows(currentPage)
      .then((data) => {
        setShows(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch((err) => {
        console.error("Failed to fetch TV shows:", err);
        setError("Failed to load TV shows.");
        setShows([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#141414] box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <SearchBar type="tv" />

      {error && (
        <p className="min-h-75 flex items-center justify-center text-[#e50914] text-lg m-0">
          {error}
        </p>
      )}

      {loading && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          Loading TV shows...
        </p>
      )}

      {!loading && !error && shows.length > 0 && (
        <section className="w-full mt-9 md:mt-7.5">
          <h2 className="text-[#e50914] font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
            Popular TV Shows
          </h2>
          <MovieGrid movies={shows} basePath="/tv-shows" />
        </section>
      )}

      {!loading && !error && shows.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!loading && !error && shows.length === 0 && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          No TV shows found.
        </p>
      )}
    </main>
  );
}

export default TVShows;
