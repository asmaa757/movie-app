function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="flex gap-2.5 flex-wrap py-5 scrollbar-none">
      <button
        className={`shrink-0 cursor-pointer rounded-full border px-4.5 py-2.25 text-sm transition-colors duration-200 ${
          selectedGenre === null
            ? "border-(--primary) bg-(--primary) text-(--on-primary)"
            : "border-(--border-filter) bg-(--bg-secondary) text-(--text) hover:border-(--primary) hover:text-(--primary)"
        }`}
        onClick={() => onGenreChange(null)}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`shrink-0 cursor-pointer rounded-full border px-4.5 py-2.25 text-sm transition-colors duration-200 ${
            selectedGenre === genre.id
              ? "border-(--primary) bg-(--primary) text-(--on-primary)"
              : "border-(--border-filter) bg-(--bg-secondary) text-(--text) hover:border-(--primary) hover:text-(--primary)"
          }`}
          onClick={() => onGenreChange(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;