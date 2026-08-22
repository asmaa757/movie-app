import { Heart } from "lucide-react";
import { IMAGE_BASE_URL } from "../services/tmdbService";
import { useWishlist } from "../hooks/useWishlist";

function MovieCard({ movie }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(movie.id);
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(movie);
  };

  return (
    <div
      className="w-full min-w-0 bg-(--bg-secondary) rounded-lg overflow-hidden cursor-pointer 
      transition-all duration-300 ease-in-out hover:-translate-y-1.25 
      hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="relative w-full aspect-2/3 overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={title}
            className="w-full h-full object-cover block"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center 
            bg-(--bg-placeholder) text-(--text-muted) text-base"
          >
            No Image
          </div>
        )}

        <button
          type="button"
          className={`absolute top-2.5 right-2.5 w-9.5 h-9.5 border-none 
            rounded-full bg-(--glass-bg) backdrop-blur-sm flex items-center 
            justify-center cursor-pointer transition-all duration-200 
            hover:scale-110 ${
              isFavorite ? "text-(--primary)" : "text-(--text)"
            }`}
          onClick={handleFavoriteClick}
          aria-label="Add to wishlist"
        >
          <Heart
            fill={isFavorite ? "var(--primary)" : "none"}
            color="var(--primary)"
          />
        </button>

        <div
          className="absolute bottom-1.25 left-1.25 w-11.25 h-11.25 
          rounded-full bg-(--glass-bg) backdrop-blur-sm border-[3px] 
          border-(--primary) text-(--text) flex items-center 
          justify-center text-xs font-bold"
        >
          {Math.round(movie.vote_average * 10)}%
        </div>
      </div>

      <div className="pt-7 px-3 pb-3">
        <h2
          className="text-(--text) text-base mb-2 whitespace-nowrap 
          overflow-hidden text-ellipsis"
        >
          {title}
        </h2>

        <p className="text-(--text-secondary) text-sm m-0">
          {releaseDate
            ? new Date(releaseDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown date"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;