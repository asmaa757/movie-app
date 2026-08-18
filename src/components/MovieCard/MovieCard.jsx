import { Heart } from "lucide-react";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useWishlist } from "../../hooks/useWishlist";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(movie.id);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="no-poster">
            No Image
          </div>
        )}

        <button
          type="button"
          className={`favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label="Add to wishlist"
        >
          <Heart
            fill={isFavorite ? "red" : "none"}
            color="var(--primary)"
          />
        </button>

        <div className="rating">
          {Math.round(movie.vote_average * 10)}%
        </div>
      </div>

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <p>
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )
            : "Unknown date"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;