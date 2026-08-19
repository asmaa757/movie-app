import { useContext } from "react";
import { Heart, Star ,HeartOff } from "lucide-react";
import { WishlistContext } from "../contexts/WishlistContext";
import {Link} from "react-router";

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
            <HeartOff className="w-50 h-50 mb-10 fill-gray-300 text-gray-300"/>
          <p className="text-lg">No Movies in Watch list</p>
          <Link to={"/"} className="bg-(--primary) hover:bg-red-800 text-white px-20 py-2 my-5 rounded-md">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
            <div
              className="flex border border-(--primary) rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
             
              <img
                src={`${IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-40 h-auto p-2 shrink-0 rounded-2xl"
              />

              <div className="p-5 flex flex-col flex-1">
              
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                    {movie.title}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(movie);
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

                <p className="mt-1 text-sm text-gray-400">
                  {movie.release_date}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        fill={
                          movie.vote_average >= star * 2
                            ? "var(--primary)"
                            : "none"
                        }
                        color="var(--primary)"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {movie.vote_average}
                  </span>
                </div>

                <p className=" mt-3 leading-relaxed line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;