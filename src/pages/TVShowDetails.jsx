import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { Heart, Star } from "lucide-react";
import MovieCard from "../components/MovieCard/MovieCard";
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
        setLoading(true);
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

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!show) return <div className="text-center mt-20">Show not found</div>;

    const isFavorite = isInWishlist(show.id);

    return (
        <div className="w-full mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                    <img
                    src={
                        show.poster_path
                            ? `${IMAGE_BASE_URL}${show.poster_path}`
                            : "/no-poster.png"
                    }
                    alt={show.name}
                    className="w-full md:w-64 aspect-[2/3] object-cover rounded-lg shadow-md flex-shrink-0"
                />

                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">{show.name}</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {show.first_air_date}
                            </p>
                        </div>
                        <button onClick={() => toggleWishlist(show)} className="shrink-0">
                            <Heart
                                size={24}
                                className={
                                    isFavorite
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }
                            />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={
                                    i < Math.round(show.vote_average / 2)
                                        ? "fill-black text-black"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">
                            {show.vote_count}
                        </span>
                    </div>

                    <p className="text-gray-700 mt-4 leading-relaxed">
                        {show.overview}
                    </p>

                    <div className="flex gap-2 mt-4 flex-wrap">
                        {show.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-yellow-400 text-black text-xs font-medium px-3 py-1 rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-8 mt-5 text-sm">
                        <p>
                            <span className="font-semibold">Seasons:</span>{" "}
                            {show.number_of_seasons}
                        </p>
                        <p>
                            <span className="font-semibold">Episodes:</span>{" "}
                            {show.number_of_episodes}
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            {show.status}
                        </p>
                    </div>

                    {show.networks?.[0]?.logo_path && (
                        <div className="mt-4">
                            <img
                                src={`${IMAGE_BASE_URL}${show.networks[0].logo_path}`}
                                alt={show.networks[0].name}
                                className="h-6 object-contain"
                            />
                        </div>
                    )}

                    {show.homepage && (
                        <a
                            href={show.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-4 border rounded-full px-4 py-1 text-sm hover:bg-gray-50"
                        >
                            Website ↗
                        </a>
                    )}
                </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {recommendations.slice(0, 6).map((rec) => (
                    <Link key={rec.id} to={`/tv-shows/${rec.id}`}>
                        <MovieCard movie={rec} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TVShowDetails;
