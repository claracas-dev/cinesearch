import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";



function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
        setError("Erro ao carregar filmes.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

   async function handleSearch(e) {
    e.preventDefault();

    if (!search) return;

    try {
      setLoading(true);
      const results = await searchMovies(search);
      setMovies(results);
    } catch (error) {
        console.error(error);
      setError("Erro ao buscar filmes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
  try {
    setLoading(true);
    const data = await getPopularMovies();
    setMovies(data);
    setSearch("");
  } catch (error) {
    console.error(error);
    setError("Erro ao carregar filmes.");
  } finally {
    setLoading(false);
  }
}

 return (
  <div>
    <h1>Filmes Populares</h1>

    <form onSubmit={handleSearch} className="search-form">
  <input
    type="text"
    placeholder="Buscar filme..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button type="submit">Buscar</button>
</form>

<button onClick={handleReset} className="reset-button">
  Voltar para populares
</button>


{loading && <div className="spinner"></div>}
{error && (
  <div className="error-box">
    <p>⚠ {error}</p>
  </div>
)}


{!loading && movies.length === 0 && (
  <p className="no-results">Nenhum filme encontrado.</p>
)}

    <div className="movies-container">
      {movies.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
    onSelect={setSelectedMovie}
  />
))}
    </div>
    <MovieModal
  movie={selectedMovie}
  onClose={() => setSelectedMovie(null)}
/>

  </div>
);
}

export default Home;