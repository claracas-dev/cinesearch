const API_KEY = "8d71d70605cbd595691e65623b013798";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  const data = await response.json();
  return data.results;
}
