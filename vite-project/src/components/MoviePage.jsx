import { useParams } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import GlobalApi from "../services/GlobalApi";
import { useNavigate } from 'react-router-dom';
import { WatchListContext } from '../context/WatchListContext';



function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const { watchlist, addToWatchList } = useContext(WatchListContext);

  

  useEffect(() => {
   const fetchMovieDetails = async ()=> {
    try {
        const response = await GlobalApi.getMovieById(id);

        setMovie(response.data);
    } catch (err) {
        setError('Error fetching movie details');
    }
   };

    fetchMovieDetails();
  }, [id]);

  if(error) 
    return <div>Error</div>;
  

  if(!movie) 
    return <div>loading..</div>;
  

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/default.jpg';

   const handleAddToWatchList = () => {
    addToWatchList({
      id: movie.id,
      type: 'movie',
      title: movie.title,
      image: imageUrl,
    });
 
   };

   const isInWatchList = watchlist.some(item => item.id === movie.id && item.type === 'movie');

  return (
    <div className="movie-page p-10 ">
      <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
      <img
        src={imageUrl}
        alt={movie.title}
        className="rounded-md movie-page drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] h-[30em]"
      />

      <div className="flex-1 ml-6 max-w-xl">


      <h1 className="mt-5 mb-5">{movie.title}</h1>
      <p className="mb-5">{movie.overview}</p>

                {!isInWatchList ? (
      <button onClick={handleAddToWatchList} className="mt-2 mb-3 bg-indigo-600 hover:bg-indigo-400 transition-all ease-in border-none relative">
        + watch list
      </button>
    ) : (
      <div className=" mt-3 mb-3 w-36 text-center py-2 bg-green-600 rounded text-white"> Added to watchlist</div>
    )}

      <p className="mb-5"><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
      <p className="mb-5"><strong>Release Date:</strong> {movie.release_date}</p>
      <p className="mb-5"><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Popularity:</strong> {movie.popularity}</p>

    </div>
    </div>
    </div>
  );
}

export default MoviePage;