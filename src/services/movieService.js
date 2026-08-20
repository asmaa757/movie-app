//========== Movie Details ============
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
function getMovieDetails(id) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    ).then((response) => response.json());
}
function getRecommendations(id, page = 1) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&page=${page}`
    ).then((response) => response.json());
}
function getMovieReviews(id) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
    ).then((response) => response.json());
}
export {getMovieDetails,getRecommendations,getMovieReviews};