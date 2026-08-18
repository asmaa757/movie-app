import { useEffect, useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import HeroSection from "../../components/HeroSection/HeroSection";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Pagination from "../../components/Pagination/Pagination";

import {
  getNowPlayingMovies,
  getMovieGenres,
  getMoviesByGenre,
} from "../../services/tmdb";

import "./Movies.css";

function Movies() {
  // ==========================================
  // Movies
  // ==========================================

  const [movies, setMovies] = useState([]);

  // ==========================================
  // Hero Movies
  // مستقل عن الـ Genre
  // ==========================================

  const [heroMovies, setHeroMovies] = useState([]);

  // ==========================================
  // Genres
  // ==========================================

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ==========================================
  // Loading & Error
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Get Movies
  // ==========================================

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        let data;

        // All
        if (selectedGenre === null) {
          data = await getNowPlayingMovies(
            currentPage
          );
        }

        // Selected Genre
        else {
          data = await getMoviesByGenre(
            selectedGenre,
            currentPage
          );
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(
          "Failed to fetch movies:",
          error
        );

        setError("Failed to load movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre]);

  // ==========================================
  // Get Hero Movies
  // مهم: مرة واحدة فقط
  // ==========================================

  useEffect(() => {
    const fetchHeroMovies = async () => {
      try {
        const data = await getNowPlayingMovies(1);

        setHeroMovies(data.results || []);
      } catch (error) {
        console.error(
          "Failed to fetch hero movies:",
          error
        );
      }
    };

    fetchHeroMovies();
  }, []);

  // ==========================================
  // Get Genres
  // ==========================================

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();

        setGenres(data.genres || []);
      } catch (error) {
        console.error(
          "Failed to fetch genres:",
          error
        );
      }
    };

    fetchGenres();
  }, []);

  // ==========================================
  // Change Genre
  // ==========================================

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);

    // Reset pagination
    setCurrentPage(1);

    // Scroll to movies section
    setTimeout(() => {
      const moviesSection =
        document.querySelector(
          ".movies-section"
        );

      if (moviesSection) {
        moviesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // ==========================================
  // Change Page
  // ==========================================

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="movies-page">

      {/* ======================================
          Search Bar
      ====================================== */}

      <SearchBar />

      {/* ======================================
          Hero Section
          مستقل عن الـ Genres
      ====================================== */}

      {heroMovies.length > 0 && (
        <HeroSection movies={heroMovies} />
      )}

      {/* ======================================
          Genre Filter
      ====================================== */}

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {/* ======================================
          Error
      ====================================== */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {/* ======================================
          Loading
      ====================================== */}

      {loading && (
        <p className="loading-message">
          Loading movies...
        </p>
      )}

      {/* ======================================
          Movies Section
      ====================================== */}

      {!loading &&
        !error &&
        movies.length > 0 && (
          <section className="movies-section">

            <h2 className="movies-section-title">
              {selectedGenre === null
                ? "Now Playing Movies"
                : "Movies"}
            </h2>

            <MovieGrid movies={movies} />

          </section>
        )}

      {/* ======================================
          Pagination
      ====================================== */}

      {!loading &&
        !error &&
        movies.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

      {/* ======================================
          Empty State
      ====================================== */}

      {!loading &&
        !error &&
        movies.length === 0 && (
          <p className="empty-message">
            No movies found.
          </p>
        )}

    </main>
  );
}

export default Movies;