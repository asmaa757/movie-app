import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router";
import "./MovieGrid.css";

function MovieGrid({ movies = [], basePath = "/movies" }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link key={movie.id} to={`${basePath}/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MovieGrid;