import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SeriesPage() {
  const [movie, setMovie] = useState([]);
   const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const apiKey = 'a7d7f8bd4dcb81e7727ce38db7a5e473'; 
  const navigate = useNavigate();

   const fetchMovies = async (pageNumber) => {
    try {
      const resp = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          page: pageNumber,
        }
      });

  if (resp.data.results.length > 0) {
      setMovie(prev => {
        const newMovies = resp.data.results.filter(
          m => !prev.some(existing => existing.id === m.id)
        );
        return [...prev, ...newMovies];
      });

      setHasMore(pageNumber < resp.data.total_pages);
    } else {
      setHasMore(false);
    }

  } catch (err) {
    console.error('Error fetching series:', err);
  }
};
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    
      fetchMovies(page);
  }, [page]);

return (
      <div className="max-w-screen-xl mx-auto px-8 sm:px-6 lg:px-8 my-10">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {movie.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className=" w-full h-[300px] object-cover"
            />
            <div className="p-2 text-white font-semibold text-center">{movie.title}</div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default SeriesPage;