import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import {
  getNowPlayingMovies,
  getGenres,
  getByGenre,
} from "../services/tmdbService";

function Movies() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: moviesData,
    loading,
    error,
  } = useFetch(
    () =>
      selectedGenre === null
        ? getNowPlayingMovies(currentPage)
        : getByGenre("movie", selectedGenre, currentPage),
    [currentPage, selectedGenre]
  );

  const movies = moviesData?.results || [];
  const totalPages = moviesData?.total_pages || 1;

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const data = await getNowPlayingMovies(1);
        setHeroMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch hero movies:", error);
      }
    };

    fetchHeroMovies();
  }, []);

  const { data: genresData } = useFetch(
    () => getGenres("movie"),
    []
  );

  const genres = genresData?.genres || [];

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);

    setTimeout(() => {
      const moviesSection = document.querySelector(".movies-section");
      if (moviesSection) {
        moviesSection.scrollIntoView({
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
    <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <SearchBar />

      {heroMovies.length > 0 && (
        <HeroSection movies={heroMovies} />
      )}

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {error && (
        <p className="min-h-75flex items-center justify-center text-(--primary) text-lg m-0">
          {error}
        </p>
      )}

      {loading && (
        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          Loading movies...
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <section className="movies-section w-full mt-9 md:mt-7.5">
          <h2 className="text-(--primary) font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
            {selectedGenre === null ? "Now Playing Movies" : "Movies"}
          </h2>

          <MovieGrid movies={movies} />
        </section>
      )}

      {!loading && !error && movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
          No movies found.
        </p>
      )}
    </main>
  );
}

export default Movies;