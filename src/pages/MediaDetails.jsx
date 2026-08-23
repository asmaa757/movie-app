import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useParams, useLocation } from "react-router";
import { Heart, ArrowLeft, Link as LinkIcon } from "lucide-react";
import StarRating from "../components/StarRating";
import MovieGrid from "../components/MovieGrid";
import ReviewCard from "../components/ReviewCard";
import Pagination from "../components/Pagination";
import {
  getDetails,
  getRecommendations,
  getReviews,
  IMAGE_BASE_URL,
} from "../services/tmdbService";
import { WishlistContext } from "../contexts/WishlistContext";

function MediaDetails() {
  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.startsWith("/tv-shows") ? "tv" : "movie";
  const isMovie = type === "movie";

  const [recommendationPage, setRecommendationPage] = useState(1);
  const [totalRecommendationPages, setTotalRecommendationPages] = useState(1);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const { data: media, loading, error } = useFetch(() => getDetails(type, id), [type, id]);

  const { data: recommendationsData, loading: recommendationLoading } = useFetch(
    () => getRecommendations(type, id, recommendationPage),
    [type, id, recommendationPage]
  );

  const { data: reviewsData, loading: reviewsLoading } = useFetch(
    () => getReviews(type, id),
    [type, id]
  );

  const recommendations = recommendationsData?.results || [];
  const reviews = reviewsData?.results || [];

  useEffect(() => {
    setRecommendationPage(1);
    setTotalRecommendationPages(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, type]);

  useEffect(() => {
    if (recommendationPage === 1 && recommendationsData?.total_pages) {
      setTotalRecommendationPages(recommendationsData.total_pages);
    }
  }, [recommendationPage, recommendationsData]);

  if (!media) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center px-5">
        <p className={`text-lg ${error ? "text-(--primary)" : "text-(--text)"}`}>
          {error || `Loading ${isMovie ? "movie" : "TV show"}...`}
        </p>
      </div>
    );
  }

  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const isFavorite = isInWishlist(media.id);
  const logo = isMovie ? media.production_companies?.[0] : media.networks?.[0];

  const infoRows = isMovie
    ? [
        ["Duration", media.runtime ? `${media.runtime} Min.` : "N/A"],
        [
          "Languages",
          media.spoken_languages?.length
            ? media.spoken_languages.map((l) => l.english_name).join(", ")
            : "N/A",
        ],
      ]
    : [
        ["Seasons", media.number_of_seasons ?? "N/A"],
        ["Episodes", media.number_of_episodes ?? "N/A"],
        ["Status", media.status || "N/A"],
      ];

  return (
    <div className="w-full mx-auto px-5 py-8">
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 hover:text-(--primary) text-base font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <section className="flex flex-col md:flex-row gap-6 md:gap-9 pb-10 border-b border-(--border)">
        <div className="w-full max-w-87.5 md:max-w-none md:w-92.5 mx-auto md:mx-0 shrink-0">
          <img
            src={`${IMAGE_BASE_URL}${media.poster_path}`}
            alt={title}
            className="w-full h-auto md:h-140 object-cover rounded-2xl block"
          />
        </div>

        <div className="flex-1 pt-2">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h1 className="m-0 text-2xl sm:text-3xl md:text-[42px] font-bold leading-tight">{title}</h1>
              <p className="mt-2 text-sm">{releaseDate || "N/A"}</p>
            </div>
            <button
              onClick={() => toggleWishlist(media)}
              className="border-none bg-transparent cursor-pointer p-1 transition-transform duration-200 hover:scale-115 shrink-0"
            >
              <Heart fill={isFavorite ? "var(--primary)" : "none"} color="var(--primary)" className="w-8 h-8" />
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <StarRating value={media.vote_average} />
            <span className="text-sm">{media.vote_average ? media.vote_average.toFixed(1) : "N/A"}</span>
          </div>

          <p className="text-base sm:text-lg leading-relaxed my-6">{media.overview || "No overview available."}</p>

          <div className="flex flex-wrap gap-2 sm:gap-3 my-5 mb-8">
            {media.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-(--primary) text-(--on-primary) px-4 sm:px-5.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-17.5 my-6">
            {infoRows.map(([label, value]) => (
              <div key={label} className="flex items-center gap-4">
                <b>{label}:</b>
                <span>{value}</span>
              </div>
            ))}
          </div>

          {logo?.logo_path && (
            <div className="my-5">
              <img
                src={`${IMAGE_BASE_URL}${logo.logo_path}`}
                alt={logo.name}
                className="w-37.5 max-h-15 object-contain"
              />
            </div>
          )}

          {media.homepage && (
            <a
              href={media.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex gap-2 items-center px-5 py-2.25 border border-(--primary) rounded-full text-sm no-underline transition-colors hover:bg-(--primary)"
            >
              Website
              <LinkIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      <section className="pt-9">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl sm:text-[38px] font-bold m-0">Recommendations</h2>
          {recommendationLoading && (
            <span className="text-(--text-muted) text-sm">Loading...</span>
          )}
        </div>

        {recommendationLoading && recommendations.length === 0 ? (
          <div className="min-h-50 flex items-center justify-center">
            <p className="text-(--text-muted)">Loading recommendations...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <MovieGrid movies={recommendations} basePath={isMovie ? "/movies" : "/tv-shows"} />
        ) : (
          <p className="text-(--text-muted) py-10">No recommendations available.</p>
        )}

        {recommendations.length > 0 && totalRecommendationPages > 1 && (
          <Pagination
            currentPage={recommendationPage}
            totalPages={totalRecommendationPages}
            onPageChange={setRecommendationPage}
          />
        )}
      </section>

      <section className="mt-12.5 pt-9 border-t border-(--border)">
        <h2 className="text-3xl sm:text-[36px] font-bold mb-6">Reviews</h2>

        {reviewsLoading ? (
          <div className="min-h-30 flex items-center justify-center">
            <p className="text-(--text-muted)">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-(--text-muted)">No reviews available.</p>
        )}
      </section>
    </div>
  );
}

export default MediaDetails;