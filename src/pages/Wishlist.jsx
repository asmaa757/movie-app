import { useContext } from "react";
import { Heart, HeartOff } from "lucide-react";
import StarRating from "../components/StarRating";
import { WishlistContext } from "../contexts/WishlistContext";
import { Link } from "react-router";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <main className="w-full mx-auto px-5 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-[42px] font-bold mb-8">
        Watch list
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <HeartOff className="w-50 h-50 mb-10 fill-(--heart-off) text-(--heart-off)" />

          <p className="text-lg">
            No Movies in Watch list
          </p>

          <Link
            to="/"
            className="bg-(--primary) hover:bg-(--primary-hover) text-(--on-primary) px-20 py-2 my-5 rounded-md"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((media) => {
            const title = media.title || media.name;
            const releaseDate =
              media.release_date || media.first_air_date;

            const type = media.title ? "movie" : "tv";

            const detailsPath =
              type === "movie"
                ? `/movies/${media.id}`
                : `/tv-shows/${media.id}`;

            return (
              <Link key={media.id} to={detailsPath}>
                <div className="flex border border-(--primary) rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

                  <img
                    src={`${IMG_URL}${media.poster_path}`}
                    alt={title}
                    className="w-40 h-auto p-2 shrink-0 rounded-2xl"
                  />

                  <div className="p-5 flex flex-col flex-1">

                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                        {title}
                      </h2>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(media);
                        }}
                        className="border-none bg-transparent cursor-pointer p-1 transition-transform hover:scale-115"
                      >
                        <Heart
                          fill="var(--primary)"
                          color="var(--primary)"
                          className="w-7 h-7"
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

                    <p className="mt-3 leading-relaxed line-clamp-3">
                      {media.overview}
                    </p>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Wishlist;