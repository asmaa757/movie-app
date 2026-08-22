import MovieCard from "./MovieCard";
import { Link } from "react-router";

function MovieGrid({ movies = [], basePath = "/movies" }) {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 py-7.5">
      {movies.map((movie) => (
        <Link key={movie.id} to={`${basePath}/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MovieGrid;