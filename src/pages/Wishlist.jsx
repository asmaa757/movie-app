import { useContext } from "react";
import { Heart, HeartOff } from "lucide-react";
import { Link } from "react-router";
import StarRating from "../components/StarRating";
import { WishlistContext } from "../contexts/WishlistContext";
import { IMAGE_BASE_URL } from "../services/tmdbService";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <main className="w-full mx-auto px-5 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-bold mb-8">
          Watch list
        </h1>

        <div className="flex flex-col items-center justify-center text-center">
          <HeartOff className="w-32 h-32 sm:w-40 sm:h-40 md:w-50 md:h-50 mb-10 fill-(--heart-off) text-(--heart-off)" />
          <p className="text-lg">No Movies in Watch list</p>
          <Link
            to="/"
            className="bg-(--primary) hover:bg-(--primary-hover) text-(--on-primary) px-10 sm:px-20 py-2 my-5 rounded-md"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full mx-auto px-5 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-[42px] font-bold mb-8">
        Watch list
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {wishlist.map((media) => {
          const title = media.title || media.name;
          const releaseDate = media.release_date || media.first_air_date;
          const type = media.title ? "movie" : "tv";
          const detailsPath =
            type === "movie" ? `/movies/${media.id}` : `/tv-shows/${media.id}`;

          return (
            <Link key={media.id} to={detailsPath}>
              <div className="flex flex-col sm:flex-row border border-(--primary) rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <img
                  src={`${IMAGE_BASE_URL}${media.poster_path}`}
                  alt={title}
                  className="w-full h-56 sm:w-40 sm:h-auto object-cover sm:object-contain p-0 sm:p-2 shrink-0 rounded-t-2xl sm:rounded-2xl"
                />

                <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                      {title}
                    </h2>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(media);
                      }}
                      className="border-none bg-transparent cursor-pointer p-1 shrink-0 transition-transform hover:scale-115"
                    >
                      <Heart
                        fill="var(--primary)"
                        color="var(--primary)"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </button>
                  </div>

                  <p className="mt-1 text-sm text-(--text-secondary)">
                    {releaseDate}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <StarRating value={media.vote_average} />
                    <span className="text-sm text-(--text-secondary)">
                      {media.vote_average}
                    </span>
                  </div>

                  <p className="mt-3 leading-relaxed line-clamp-3 text-sm sm:text-base">
                    {media.overview}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default Wishlist;