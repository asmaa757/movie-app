import { useEffect, useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./HeroSection.css";

function HeroSection({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change movie every 5 seconds
  useEffect(() => {
    if (!movies || movies.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => {
        return (currentIndex + 1) % movies.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // No movies
  if (!movies || movies.length === 0) {
    return null;
  }

  const movie = movies[currentIndex];

  // Previous movie
  const handlePrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + movies.length) % movies.length
    );
  };

  // Next movie
  const handleNext = () => {
    setCurrentIndex(
      (currentIndex + 1) % movies.length
    );
  };

  return (
    <section className="hero-section">

      {/* Background */}
      <div
        key={movie.id}
        className="hero-background"
        style={{
          backgroundImage: 
            `linear-gradient(
              to right,
              rgba(0, 0, 0, 0.95),
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.15)
            ),
            url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
          `,
        }}
      />

      {/* Movie Information */}
      <div className="hero-content">

        <span className="hero-label">
          NOW PLAYING
        </span>

        <h1>{movie.title}</h1>

        <p>
          {movie.overview ||
            "Discover this movie and more."}
        </p>

        <div className="hero-info">

          <span>
            <FaStar />
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span>
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "N/A"}
          </span>

        </div>
      </div>

      {/* Previous Button */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={handlePrevious}
        aria-label="Previous movie"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        className="hero-arrow hero-arrow-right"
        onClick={handleNext}
        aria-label="Next movie"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {movies.slice(0, 5).map((movieItem, index) => (
          <button
            key={movieItem.id}
            className={`hero-dot ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to movie ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroSection;