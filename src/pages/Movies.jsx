import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import HeroSection from "../components/HeroSection/HeroSection";
import GenreFilter from "../components/GenreFilter/GenreFilter";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import Pagination from "../components/Pagination/Pagination";
import {
  getNowPlayingMovies,
  getMovieGenres,
  getMoviesByGenre,
} from "../../services/tmdb";
import { Link } from "lucide-react";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        let data;

        if (selectedGenre === null) {
          data = await getNowPlayingMovies(currentPage);
        } else {
          data = await getMoviesByGenre(selectedGenre, currentPage);
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Failed to load movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre]);

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


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);

    setTimeout(() => {
      const moviesSection = document.querySelector(".movies-section");
      if (moviesSection) {
        moviesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full min-h-screen bg-[#141414] box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <SearchBar />
      {heroMovies.length > 0 && <HeroSection movies={heroMovies} />}

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {error && (
        <p className="min-h-75flex items-center justify-center text-[#e50914] text-lg m-0">
          {error}
        </p>
      )}

      {loading && (
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          Loading movies...
        </p>
      )}

      {!loading && !error && movies.length > 0 && (
        <section className="movies-section w-full mt-9 md:mt-7.5">
          <h2 className="text-[#e50914] font-bold m-0 mb-5 text-[19px] sm:text-[21px] md:text-2xl">
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
        <p className="min-h-75 flex items-center justify-center text-white text-lg m-0">
          No movies found.
        </p>
      )}
    </main>
  );
}

export default Movies;