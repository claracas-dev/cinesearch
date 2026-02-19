import { useEffect } from "react";
function MovieModal({ movie, onClose }) {
    useEffect(() => {
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  document.addEventListener("keydown", handleEsc);

  return () => {
    document.removeEventListener("keydown", handleEsc);
  };
}, [onClose]);

  if (!movie) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
<div className="modal-text">
          <h2>{movie.title}</h2>
          <p><strong>⭐ Nota:</strong> {movie.vote_average}</p>
          <p><strong>📅 Lançamento:</strong> {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
