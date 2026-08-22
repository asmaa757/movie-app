import { useState } from "react";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import {
  getPopularTVShows,
  getGenres,
  getByGenre,
} from "../services/tmdbService";

function TVShows() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: showsData,
    loading,
    error,
  } = useFetch(
    () =>
      selectedGenre === null
        ? getPopularTVShows(currentPage)
        : getByGenre("tv", selectedGenre, currentPage),
    [currentPage, selectedGenre]
  );

  const shows = showsData?.results || [];
  const totalPages = showsData?.total_pages || 1;

  const { data: genresData } = useFetch(
    () => getGenres("tv"),
    []
  );

  const genres = genresData?.genres || [];

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);

    setTimeout(() => {
      const showsSection = document.querySelector(".tv-shows-section");
      if (showsSection) {
        showsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <div className="mb-10">
        <SearchBar type="tv" />
      </div>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {error && (
        <p className="min-h-75 flex items-center justify-center text-(--primary) text-lg m-0">
          {error}
        </p>
      )}

      {loading && (
        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          Loading TV shows...
        </p>
      )}

      {!loading && !error && shows.length > 0 && (
        <section className="tv-shows-section w-full mt-9 md:mt-7.5">
          <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
            {selectedGenre === null ? "Popular TV Shows" : "TV Shows"}
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
        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          No TV shows found.
        </p>
      )}
    </main>
  );
}

export default TVShows;
