import React, { createContext, useState, useEffect } from 'react';

export const WatchListContext = createContext();

export function WatchListProvider({children}) {

    const[watchlist,setWatchList]= useState(()=>{  

    const saved = localStorage.getItem('watchlist');

      return saved ? JSON.parse(saved) : [];
    });

    useEffect(()=>{
        localStorage.setItem('watchlist' , JSON.stringify(watchlist));
    },[watchlist]);

    const addToWatchList = (item) => {
        setWatchList((prev)=>{

              if (prev.some(w => w.id === item.id && w.type === item.type)) {
        return prev;
      }
      return [...prev, item];
    });
  };



  const removeFromWatchList = (id, type) => {
    setWatchList((prev) => prev.filter(item => !(item.id === id && item.type === type)));
  };

  return (
    <WatchListContext.Provider value={{ watchlist, addToWatchList, removeFromWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
}


export default WatchListProvider ;







