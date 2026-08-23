import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { search } from "../services/tmdbService";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const type = searchParams.get("type") === "tv" ? "tv" : "movie";

  const [currentPage, setCurrentPage] = useState(1);

  const { data: searchData, loading, error } = useFetch(
    () => search(type, query, currentPage),
    [type, query, currentPage],
    !!query
  );

  const results = searchData?.results || [];
  const totalPages = searchData?.total_pages || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [query, type]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!query) {
    return (
      <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
        <Link
          to={type === "tv" ? "/tv-shows" : "/"}
          className="inline-flex items-center gap-2 text-(--text) hover:text-(--primary) text-base font-medium mb-6 no-underline transition-colors"
        >
          <ArrowLeft size={20} />
          Back to {type === "tv" ? "TV Shows" : "Movies"}
        </Link>

        <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
          Search
        </h2>

        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          Type something in the search bar to find{" "}
          {type === "tv" ? "TV shows" : "movies"}.
        </p>
      </main>
    );
  }

  if (error && results.length === 0) {
    return (
      <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
        <Link
          to={type === "tv" ? "/tv-shows" : "/"}
          className="inline-flex items-center gap-2 text-(--text) hover:text-(--primary) text-base font-medium mb-6 no-underline transition-colors"
        >
          <ArrowLeft size={20} />
          Back to {type === "tv" ? "TV Shows" : "Movies"}
        </Link>

        <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
          Search results for "{query}"
        </h2>

        <p className="min-h-75 flex items-center justify-center text-(--primary) text-lg m-0">
          {error}
        </p>
      </main>
    );
  }

  if (!loading && results.length === 0) {
    return (
      <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
        <Link
          to={type === "tv" ? "/tv-shows" : "/"}
          className="inline-flex items-center gap-2 text-(--text) hover:text-(--primary) text-base font-medium mb-6 no-underline transition-colors"
        >
          <ArrowLeft size={20} />
          Back to {type === "tv" ? "TV Shows" : "Movies"}
        </Link>

        <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
          Search results for "{query}"
        </h2>

        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          No results found for "{query}".
        </p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <Link
        to={type === "tv" ? "/tv-shows" : "/"}
        className="inline-flex items-center gap-2 text-(--text) hover:text-(--primary) text-base font-medium mb-6 no-underline transition-colors"
      >
        <ArrowLeft size={20} />
        Back to {type === "tv" ? "TV Shows" : "Movies"}
      </Link>

      <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
        Search results for "{query}"
      </h2>

      <section className="w-full mt-9 md:mt-7.5">
        <MovieGrid
          movies={results}
          basePath={type === "tv" ? "/tv-shows" : "/movies"}
        />
      </section>

      {results.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default SearchResults;