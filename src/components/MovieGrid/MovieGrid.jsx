import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router";
import "./MovieGrid.css";

function MovieGrid({ movies = [] }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.id}`}>
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        </Link>
      ))}
    </div>
  );
}

export default MovieGrid;