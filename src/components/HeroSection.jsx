import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

function HeroSection({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => {
        return (currentIndex + 1) % movies.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return null;
  }

  const movie = movies[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + movies.length) % movies.length
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (currentIndex + 1) % movies.length
    );
  };

  return (
    <section
      className="relative min-h-100 md:min-h-125 overflow-hidden 
      flex items-center mt-7.5 mb-10 rounded-[10px] bg-black"
    >
      <style>{`
        @keyframes heroFade {
          from {
            opacity: 0.4;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div
        key={movie.id}
        className="absolute inset-0 bg-cover bg-center 
        animate-[heroFade_0.8s_ease-in-out]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              var(--hero-overlay),
              var(--hero-overlay-mid),
              var(--hero-overlay-light)
            ),
            url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
          `,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none
        bg-linear-to-t from-black/70 to-transparent"
      />

      <div className="relative z-2 w-full max-w-150 p-[30px_20px] md:p-15 ml-8">
        <span className="text-(--primary) text-sm font-bold tracking-[2px]">
          NOW PLAYING
        </span>

        <h1 className="my-3.75 text-white text-[38px] md:text-[clamp(36px,5vw,60px)] leading-[1.1]">
          {movie.title}
        </h1>

        <p className="max-w-137.5 text-(--text-hero) text-sm md:text-base leading-[1.7]">
          {movie.overview || "Discover this movie and more."}
        </p>

        <div className="flex items-center gap-5 mt-5 text-white font-semibold">
          <span className="flex items-center gap-1.5">
            <Star className="text-(--primary)" />
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span className="flex items-center gap-1.5">
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "N/A"}
          </span>
        </div>
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 z-3 
        left-2.5 md:left-5 w-9 h-9 md:w-10.5 md:h-10.5 
        rounded-full bg-(--glass-bg) backdrop-blur-md text-white 
        flex items-center justify-center cursor-pointer text-base 
        transition-all duration-200 hover:bg-(--primary) hover:scale-110"
        onClick={handlePrevious}
        aria-label="Previous movie"
      >
        <ChevronLeft />
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 z-3 
        right-2.5 md:right-5 w-9 h-9 md:w-10.5 md:h-10.5 
        rounded-full bg-(--glass-bg) backdrop-blur-md text-white 
        flex items-center justify-center cursor-pointer text-base 
        transition-all duration-200 hover:bg-(--primary) hover:scale-110"
        onClick={handleNext}
        aria-label="Next movie"
      >
        <ChevronRight />
      </button>

      <div className="absolute z-3 bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((movieItem, index) => (
          <button
            key={movieItem.id}
            className={`h-2 p-0 rounded-full cursor-pointer 
            transition-all duration-300 ${
              currentIndex === index
                ? "w-6 rounded-[5px] bg-(--primary)"
                : "w-2 bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to movie ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;