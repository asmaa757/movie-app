const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  const { endpoint, ...params } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: "endpoint is required" });
  }

  const query = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    ...params,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${query}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}