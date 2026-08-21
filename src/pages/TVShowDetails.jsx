import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Heart, Star, ArrowLeft, Link as LinkIcon } from "lucide-react";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { getTVShowDetails, getTVShowRecommendations } from "../services/tvServiice";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { WishlistContext } from "../contexts/WishlistContext";

function TVShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

    useEffect(() => {
        Promise.all([
            getTVShowDetails(id),
            getTVShowRecommendations(id),
        ])
            .then(([details, recs]) => {
                setShow(details);
                setRecommendations(recs.results || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <p className="mt-20 text-center">Loading...</p>;
    if (!show) return <p className="mt-20 text-center">Show not found</p>;

    const isFavorite = isInWishlist(show.id);

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

            {/*==== TV Show Details Section ====*/}
            <section className="flex flex-col md:flex-row gap-6 md:gap-9 pb-10 border-b border-gray-200">
                {/* Poster */}
                <div className="w-full max-w-87.5 md:max-w-none md:w-92.5 mx-auto md:mx-0 shrink-0">
                    <img
                        src={
                            show.poster_path
                                ? `${IMAGE_BASE_URL}${show.poster_path}`
                                : "/no-poster.png"
                        }
                        alt={show.name}
                        className="w-full h-auto md:h-140 object-cover rounded-2xl block"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-5">
                        <div>
                            <h1 className="m-0 text-2xl sm:text-3xl md:text-[42px] font-bold leading-tight">
                                {show.name}
                            </h1>
                            <p className="mt-2 text-sm">{show.first_air_date}</p>
                        </div>
                        <button
                            onClick={() => toggleWishlist(show)}
                            className="border-none bg-transparent cursor-pointer p-1 transition-transform duration-200 hover:scale-115 shrink-0"
                        >
                            <Heart
                                fill={isFavorite ? "red" : "none"}
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
                                    fill={show.vote_average >= star * 2 ? "var(--primary)" : "none"}
                                    color="var(--primary)"
                                />
                            ))}
                        </div>
                        <span className="text-sm">{show.vote_average}</span>
                    </div>

                    {/* Overview */}
                    <p className="text-base sm:text-lg leading-relaxed my-6">
                        {show.overview}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 my-5 mb-8">
                        {show.genres?.map((genre) => (
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
                            <b>Seasons:</b>
                            <span>{show.number_of_seasons}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <b>Episodes:</b>
                            <span>{show.number_of_episodes}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <b>Status:</b>
                            <span>{show.status}</span>
                        </div>
                    </div>

                    {/* Network Logo */}
                    {show.networks?.[0]?.logo_path && (
                        <div className="my-5">
                            <img
                                src={`${IMAGE_BASE_URL}${show.networks[0].logo_path}`}
                                alt={show.networks[0].name}
                                className="w-37.5 max-h-15 object-contain"
                            />
                        </div>
                    )}

                    {/* Website Button */}
                    {show.homepage && (
                        <a
                            href={show.homepage}
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

            {/*==== Recommendations Section ====*/}
            <section className="pt-9">
                <h2 className="text-3xl sm:text-[38px] font-bold mb-6">
                    Recommendations
                </h2>
                <MovieGrid movies={recommendations} basePath="/tv-shows" />
            </section>
        </div>
    );
}

export default TVShowDetails;
