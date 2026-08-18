import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularTVShows } from "../services/tvServiice";
function TVShows(){
const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPopularTVShows()
            .then((data) => {
                setShows(data.results || data);
                setLoading(false);              
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Popular TV Shows</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {shows.map((show) => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </div>
        </div>
    );
}
export default TVShows;

