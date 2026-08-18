const API_KEY = "d554648f63abde301739d44c50e826a9";
const BASE_URL = "https://api.themoviedb.org/3";

// جلب قائمة المسلسلات الشهيرة
export const getPopularTVShows = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return data;
};

// جلب تفاصيل مسلسل معين
// export const getTVShowDetails = async (id) => {
//     const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data;
// };

// البحث الشامل
export const searchMoviesAndTV = async (query, page = 1) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();
    return data;
};

export const getTVShowDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getTVShowRecommendations = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};