import React, { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';
import { Link } from 'react-router-dom';

function WatchList() {
  const { watchlist , removeFromWatchList } = useContext(WatchListContext);

  if (watchlist.length === 0) {
    return <div className="text-white p-4 text-center text-lg">Your watch list is empty.</div>;
  }

    
  return (

        <div className="max-w-screen-xl mx-auto px-8 sm:px-6 lg:px-8 my-10">
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
  {watchlist.map((item) => (
    <div
      key={`${item.type}-${item.id}`}
      className="group hover:scale-105 transition-transform"
    >
      <Link
        to={item.type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}
        className="block"
      >
        <img
          src={item.image}
          alt={item.title}
          className="rounded shadow-lg w-full h-auto  drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        />
        <p className="text-white mt-2 text-md text-center">{item.title}</p>

      </Link>

      <button
       onClick={() => removeFromWatchList(item.id, item.type)}
        className="mt-2 p-1 text-sm bg-indigo-700 hover:bg-indigo-500 block mx-auto"
      >
        Remove from list
      </button>
    </div>
  ))}
</div>
</div>

  );
}

export default WatchList;
