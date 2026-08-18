import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
// import "./MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const isFavorite = isInWishlist(movie.id);

  const handleMovieClick = () => {
    const isTV = Boolean(movie.name);
    const path = isTV ? `/tv-shows/${movie.id}` : `/movies/${movie.id}`;
    navigate(path);
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
        alt={movie.title || movie.name}
        className="w-full aspect-[2/3] object-cover rounded-lg"
  />
) : (
    <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 text-sm">
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