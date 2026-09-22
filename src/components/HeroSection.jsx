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
    setCurrentIndex((currentIndex - 1 + movies.length) % movies.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % movies.length);
  };

  return (
    <section
      className="relative min-h-87.5 sm:min-h-100 md:min-h-125 overflow-hidden 
      flex items-center mt-5 sm:mt-7.5 mb-8 sm:mb-10 rounded-[10px] bg-black"
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

      <div className="relative z-2 w-full max-w-150 px-11 sm:px-6 md:px-15 py-6 sm:py-7.5 md:py-15 ml-0 sm:ml-5 md:ml-8">
        <span className="text-(--primary) text-xs sm:text-sm font-bold tracking-[2px]">
          NOW PLAYING
        </span>

        <h1 className="my-3 sm:my-3.75 text-white text-[26px] sm:text-[38px] md:text-[clamp(36px,5vw,60px)] leading-[1.1]">
          {movie.title}
        </h1>

        <p className="max-w-137.5 text-(--text-hero) text-sm md:text-base leading-[1.7] line-clamp-3 sm:line-clamp-none">
          {movie.overview || "Discover this movie and more."}
        </p>

        <div className="flex items-center gap-4 sm:gap-5 mt-4 sm:mt-5 text-white font-semibold text-sm sm:text-base">
          <span className="flex items-center gap-1.5">
            <Star className="text-(--primary) w-4 h-4 sm:w-5 sm:h-5" />
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          <span className="flex items-center gap-1.5">
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </span>
        </div>
      </div>

      <button
        className="absolute top-1/2 -translate-y-1/2 z-3 
        left-2 sm:left-2.5 md:left-5 w-8 h-8 sm:w-9 sm:h-9 md:w-10.5 md:h-10.5 
        rounded-full bg-black/20 backdrop-blur-md text-white 
        flex items-center justify-center cursor-pointer text-base 
        transition-all duration-200 hover:bg-(--primary) active:bg-(--primary-hover) hover:scale-110"
        onClick={handlePrevious}
        aria-label="Previous movie"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 z-3 
        right-2 sm:right-2.5 md:right-5 w-8 h-8 sm:w-9 sm:h-9 md:w-10.5 md:h-10.5 
        rounded-full bg-black/20 backdrop-blur-md text-white 
        flex items-center justify-center cursor-pointer text-base 
        transition-all duration-200 hover:bg-(--primary) active:bg-(--primary-hover) hover:scale-110"
        onClick={handleNext}
        aria-label="Next movie"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute z-3 bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
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