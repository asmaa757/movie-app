import "./GenreFilter.css";

function GenreFilter({
  genres,
  selectedGenre,
  onGenreChange,
}) {
  return (
    <div className="genre-filter">
      <button
        className={
          selectedGenre === null ? "active" : ""
        }
        onClick={() => onGenreChange(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={
            selectedGenre === genre.id
              ? "active"
              : ""
          }
          onClick={() =>
            onGenreChange(genre.id)
          }
        >
          {genre.name}
        </button>
      ))}

    </div>
  );
}

export default GenreFilter;