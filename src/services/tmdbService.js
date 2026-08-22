const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function fetchTMDB(endpoint, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}${endpoint}?${query}`);

  if (!response.ok) throw new Error("Failed to fetch data");

  return response.json();
}

export const getDetails = (type, id) => fetchTMDB(`/${type}/${id}`);

export const getRecommendations = (type, id, page = 1) =>
  fetchTMDB(`/${type}/${id}/recommendations`, { page });

export const getReviews = (type, id) => fetchTMDB(`/${type}/${id}/reviews`);

export const getGenres = (type) =>
  fetchTMDB(`/genre/${type}/list`, { language: "en-US" });

export const getByGenre = (type, genreId, page = 1) =>
  fetchTMDB(`/discover/${type}`, { with_genres: genreId, page });

export const search = (type, query, page = 1) =>
  fetchTMDB(`/search/${type}`, { query, page });

export const searchMulti = (query, page = 1) =>
  fetchTMDB(`/search/multi`, { query, page });

export const getNowPlayingMovies = (page = 1) =>
  fetchTMDB(`/movie/now_playing`, { page });

export const getPopularTVShows = (page = 1) =>
  fetchTMDB(`/tv/popular`, { page });

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";