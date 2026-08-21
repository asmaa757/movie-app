import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { Heart, Star, ArrowLeft, Link as LinkIcon} from "lucide-react";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import ReviewCard from "../components/ReviewCard";
import Pagination from "../components/Pagination/Pagination"
import {
    getMovieDetails,
    getRecommendations,
    getMovieReviews,
} from "../services/movieService";
import { WishlistContext } from "../contexts/WishlistContext";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [recommendationPage, setRecommendationPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalRecommendationPages, setTotalRecommendationPages] = useState(1);
    const [recommendationLoading, setRecommendationLoading] = useState(false);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const IMG_URL = "https://image.tmdb.org/t/p/w500";
    

    //========= Details ===========
    useEffect(() => {
        getMovieDetails(id)
          .then((data) => {
            setMovie(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
    }, [id]);
    
    //========= Recommendations ===========
    useEffect(() => {
        setRecommendationLoading(true);
        getRecommendations(id, recommendationPage)
          .then((data) => {
            setRecommendations(data.results || []);
            setTotalRecommendationPages(data.total_pages || 1);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setRecommendationLoading(false);
          });
    }, [id, recommendationPage]);

    //========= Reviews ===========
    useEffect(() => {
        getMovieReviews(id)
          .then((data) => {
            setReviews(data.results || []);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [id]);

    //========= Reset ===========
    useEffect(() => {
        window.scrollTo(0, 0);
        setRecommendationPage(1);
    }, [id]);
    
    if (loading) return <p className="mt-20 text-center">Loading...</p>;
    if (!movie) return <p className="mt-20 text-center">Movie not found</p>;

  return (
    <div className="w-full mx-auto px-5 py-8">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 hover:text-(--primary) text-base font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/*==== Movie Details Section ====*/}
      <section className="flex flex-col md:flex-row gap-6 md:gap-9 pb-10 border-b border-gray-200">
        {/* Poster */}
        <div className="w-full max-w-87.5 md:max-w-none md:w-92.5 mx-auto md:mx-0 shrink-0">
          <img
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto md:h-140 object-cover rounded-2xl block"
          />
        </div>

        {/* Content */}
        <div className="flex-1 pt-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-5">
            <div>
              <h1 className="m-0 text-2xl sm:text-3xl md:text-[42px] font-bold leading-tight">
                {movie.title}
              </h1>
              <p className="mt-2 text-sm">{movie.release_date}</p>
            </div>
            <button
              onClick={() => toggleWishlist(movie)}
              className="border-none bg-transparent cursor-pointer p-1 transition-transform duration-200 hover:scale-115 shrink-0"
            >
            <Heart
              fill={isInWishlist(movie.id) ? "red" : "none"}
              color="var(--primary)" className="w-8 h-8"
            />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
            <Star
            key={star}
            fill={movie.vote_average >= star * 2 ? "var(--primary)" : "none"}
            color="var(--primary)"
            />
              ))}
            </div>
            <span className="text-sm">{movie.vote_average}</span>
          </div>

          {/* Overview */}
          <p className="text-base sm:text-lg leading-relaxed my-6">
            {movie.overview}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 sm:gap-3 my-5 mb-8">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-(--primary) px-4 sm:px-5.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-17.5 my-6">
            <div className="flex items-center gap-4">
              <b>Duration:</b>
              <span>{movie.runtime} Min.</span>
            </div>
            <div className="flex items-center gap-4">
              <b>Languages:</b>
              <span>
                {movie.spoken_languages
                  ?.map((language) => language.english_name)
                  .join(", ")}
              </span>
            </div>
          </div>

          {/* Production Company Logo */}
          {movie.production_companies?.[0]?.logo_path && (
            <div className="my-5">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                alt={movie.production_companies[0].name}
                className="w-37.5 max-h-15 object-contain"
              />
            </div>
          )}

          {/* Website Button */}
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex gap-2 items-center px-5 py-2.25 border border-(--primary) rounded-full text-sm no-underline transition-colors hover:bg-(--primary)"
            >
              Website 
              <LinkIcon className="w-4 h-4"/>
            </a>
          )}
        </div>
      </section>

      {/*==== Recommendations Section ====*/}
      <section className="pt-9">
        <h2 className="text-3xl sm:text-[38px] font-bold mb-6">
          Recommendation
        </h2>
        {recommendationLoading ? (
          <p className="text-center py-10">Loading...</p>
          ) : (
              <MovieGrid movies={recommendations} />
          )}
        {recommendations.length > 0 && totalRecommendationPages > 1 && (
            <Pagination
                currentPage={recommendationPage}
                totalPages={totalRecommendationPages}
                onPageChange={setRecommendationPage}
            />
        )}
      </section>

      {/*==== Reviews Section ====*/}
      <section className="mt-12.5 pt-9 border-t border-gray-200">
  <h2 className="text-3xl sm:text-[36px] font-bold mb-6">
    Reviews
  </h2>

  {reviews.length > 0 ? (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No reviews available.
    </p>
  )}
</section>
    </div>
  );
}

export default MovieDetails;