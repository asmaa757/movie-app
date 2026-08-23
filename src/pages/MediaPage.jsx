import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import { getNowPlayingMovies, getPopularTVShows, getGenres, getByGenre} from "../services/tmdbService";

function MediaPage({ type }) {
  const isMovie = type === "movie";

  const [heroMovies, setHeroMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: mediaData, loading, error } = useFetch(
    () =>
      selectedGenre === null
        ? isMovie
          ? getNowPlayingMovies(currentPage)
          : getPopularTVShows(currentPage)
        : getByGenre(type, selectedGenre, currentPage),
    [currentPage, selectedGenre, type],
    true,
    true
  );

  const { data: genresData } = useFetch(() => getGenres(type), [type]);

  const media = mediaData?.results || [];
  const totalPages = mediaData?.total_pages || 1;
  const genres = genresData?.genres || [];

  useEffect(() => {
    if (!isMovie) {
      setHeroMovies([]);
      return;
    }

    getNowPlayingMovies(1)
      .then((data) => setHeroMovies(data.results || []))
      .catch((err) => console.error("Failed to fetch hero movies:", err));
  }, [isMovie]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  return (
    <main className="w-full min-h-screen bg-(--bg) box-border sm:px-5 sm:py-3 md:px-5 md:py-3">
      <div className="mb-10">
        <SearchBar type={isMovie ? "movie" : "tv"} />
      </div>

      {isMovie && heroMovies.length > 0 && <HeroSection movies={heroMovies} />}

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      {error ? (
        <p className="min-h-75 flex items-center justify-center text-(--primary) text-lg m-0">
          {error}
        </p>
      ) : (
        <>
          <section className="media-section w-full mt-9 md:mt-7.5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-(--primary) font-bold m-0 text-[19px] sm:text-[21px] md:text-2xl">
                {selectedGenre === null
                  ? isMovie
                    ? "Now Playing Movies"
                    : "Popular TV Shows"
                  : isMovie
                    ? "Movies"
                    : "TV Shows"}
              </h2>
            </div>

            {loading && media.length === 0 ? (
              <div className="min-h-75 flex items-center justify-center">
                <p className="text-(--text) text-lg">
                  Loading {isMovie ? "movies" : "TV shows"}...
                </p>
              </div>
            ) : media.length > 0 ? (
              <MovieGrid
                movies={media}
                basePath={isMovie ? "/movies" : "/tv-shows"}
              />
            ) : (
              <p className="min-h-75 flex items-center justify-center text-(--text) text-lg m-0">
                No {isMovie ? "movies" : "TV shows"} found.
              </p>
            )}
          </section>

          {media.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </main>
  );
}

export default MediaPage;