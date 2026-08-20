const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// ==========================================
// Get Now Playing Movies
// ==========================================

export async function getNowPlayingMovies(page = 1) {
  const response = await fetch(`
    ${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch now playing movies");
  }

  return response.json();
}

// ==========================================
// Get Movie Genres
// ==========================================

export async function getMovieGenres() {
  const response = await fetch(`
    ${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie genres");
  }

  return response.json();
}

// ==========================================
// Get Movies By Genre
// ==========================================

export async function getMoviesByGenre(
  genreId,
  page = 1
) {
  const response = await fetch(`
    ${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  return response.json();
}

// ==========================================
// Search Movies
// ==========================================

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
}

// ==========================================
// Export
// ==========================================

export {
  BASE_URL,
  IMAGE_BASE_URL,
  API_KEY,
};