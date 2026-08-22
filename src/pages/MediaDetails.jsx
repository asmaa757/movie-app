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

  const type = location.pathname.startsWith("/tv-shows")
    ? "tv"
    : "movie";

  const isMovie = type === "movie";
  const [recommendationPage, setRecommendationPage] = useState(1);
  const { toggleWishlist, isInWishlist } =
    useContext(WishlistContext);

  const {
    data: media,
    loading,
    error,
  } = useFetch(
    () => getDetails(type, id),
    [type, id]
  );

  const {
    data: recommendationsData,
    loading: recommendationLoading,
  } = useFetch(
    () => getRecommendations(type, id, recommendationPage),
    [type, id, recommendationPage]
  );

  const recommendations =
    recommendationsData?.results || [];

  const totalRecommendationPages =
    recommendationsData?.total_pages || 1;

  const {
    data: reviewsData,
  } = useFetch(
    () => getReviews("movie", id),
    [id],
    type === "movie"
  );

  const reviews = reviewsData?.results || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    setRecommendationPage(1);
  }, [id, type]);

  if (!media) {
    return null;
  }

  const title = isMovie ? media.title : media.name;

  const releaseDate = isMovie
    ? media.release_date
    : media.first_air_date;

  const isFavorite = isInWishlist(media.id);

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
              <h1 className="m-0 text-2xl sm:text-3xl md:text-[42px] font-bold leading-tight">
                {title}
              </h1>

              <p className="mt-2 text-sm">
                {releaseDate}
              </p>
            </div>

            <button
              onClick={() => toggleWishlist(media)}
              className="border-none bg-transparent cursor-pointer p-1 transition-transform duration-200 hover:scale-115 shrink-0"
            >
              <Heart
                fill={isFavorite ? "var(--primary)" : "none"}
                color="var(--primary)"
                className="w-8 h-8"
              />
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <StarRating value={media.vote_average} />
            <span className="text-sm">
              {media.vote_average}
            </span>
          </div>

          <p className="text-base sm:text-lg leading-relaxed my-6">
            {media.overview}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 my-5 mb-8">

            {media.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-(--primary) px-4 sm:px-5.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}

          </div>

          {isMovie && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-17.5 my-6">

              <div className="flex items-center gap-4">
                <b>Duration:</b>
                <span>{media.runtime} Min.</span>
              </div>

              <div className="flex items-center gap-4">
                <b>Languages:</b>
                <span>
                  {media.spoken_languages
                    ?.map((language) => language.english_name)
                    .join(", ")}
                </span>
              </div>

            </div>
          )}

          {!isMovie && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-17.5 my-6">

              <div className="flex items-center gap-4">
                <b>Seasons:</b>
                <span>{media.number_of_seasons}</span>
              </div>

              <div className="flex items-center gap-4">
                <b>Episodes:</b>
                <span>{media.number_of_episodes}</span>
              </div>

              <div className="flex items-center gap-4">
                <b>Status:</b>
                <span>{media.status}</span>
              </div>

            </div>
          )}

          {isMovie
            ? media.production_companies?.[0]?.logo_path && (
                <div className="my-5">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${media.production_companies[0].logo_path}`}
                    alt={media.production_companies[0].name}
                    className="w-37.5 max-h-15 object-contain"
                  />
                </div>
              )
            : media.networks?.[0]?.logo_path && (
                <div className="my-5">
                  <img
                    src={`${IMAGE_BASE_URL}${media.networks[0].logo_path}`}
                    alt={media.networks[0].name}
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

        <h2 className="text-3xl sm:text-[38px] font-bold mb-6">
          Recommendations
        </h2>

        {recommendationLoading ? (
          <p className="text-center py-10">
            Loading...
          </p>
        ) : (
          <MovieGrid
            movies={recommendations}
            basePath={isMovie ? "/movies" : "/tv-shows"}
          />
        )}

        {recommendations.length > 0 &&
          totalRecommendationPages > 1 && (
            <Pagination
              currentPage={recommendationPage}
              totalPages={totalRecommendationPages}
              onPageChange={setRecommendationPage}
            />
          )}

      </section>

      {isMovie && (
        <section className="mt-12.5 pt-9 border-t border-(--border)">

          <h2 className="text-3xl sm:text-[36px] font-bold mb-6">
            Reviews
          </h2>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}

            </div>
          ) : (
            <p className="text-(--text-muted)">
              No reviews available.
            </p>
          )}

        </section>
      )}

    </div>
  );
}

export default MediaDetails;