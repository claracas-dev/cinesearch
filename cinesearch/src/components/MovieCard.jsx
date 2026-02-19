function MovieCard({ movie, onSelect }) {
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span>⭐ {movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default MovieCard;
