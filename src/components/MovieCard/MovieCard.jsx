import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useWishlist } from "../../context/WishlistContext";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(movie.id);

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    toggleWishlist(movie);
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
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
          className={`favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label="Add to wishlist"
        >
          <FaHeart />
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