import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WatchListContext } from '../context/WatchListContext';


function SeriesDetailPage() {

  const { id } = useParams();
  const [series, setSeries] = useState(null);
   const {watchlist, addToWatchList } = useContext(WatchListContext);
   const apiKey = 'a7d7f8bd4dcb81e7727ce38db7a5e473';

   useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
    .then(resp=> setSeries(resp.data))
    .catch(err => console.error('Error fetching series:', err));
   },[id]);

    if(!series) 
    return <div>loading..</div>;

      const imageUrl = series.poster_path
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : '/default.jpg';

     const handleAddToWatchList = () => {
    addToWatchList({
      id: series.id,
      type: 'series',
      title: series.name,
      image: imageUrl,
    });

  };

  
     const isInWatchList = watchlist.some(item => item.id === series.id && item.type === 'series');


  return (
        <div className="text-white p-10">
       <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">

      <img
        src={imageUrl}
        alt={series.name}
        className="mb-4 rounded drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] h-[30em]"
      />
    <div className='flex-1 ml-6 max-w-xl'>

      <h1 className="text-4xl font-bold mb-4">{series.name}</h1>

      <p className="mb-2"><strong>Overview:</strong> {series.overview}</p>
          {!isInWatchList ? (
      <button onClick={handleAddToWatchList} className="mt-3 mb-3 bg-indigo-600 hover:bg-indigo-400 transition-all ease-in border-none">
        + watch list
      </button>
    ) : (
      <div className=" text-center py-2 w-36 mt-3 mb-3 bg-green-600 rounded text-white"> Added to watchlist</div>
    )}

      <p className="mb-2"><strong>First Air Date:</strong> {series.first_air_date}</p>
      <p className="mb-2"><strong>Genres:</strong> {series.genres.map(g => g.name).join(', ')}</p>
      <p className="mb-2"><strong>Rating:</strong> {series.vote_average}</p>
      <p><strong>Popularity:</strong> {series.popularity}</p>

      </div>
    </div>
    </div>

  )
}

export default SeriesDetailPage;