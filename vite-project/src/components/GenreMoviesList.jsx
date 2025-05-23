import React from 'react'
import GenresList from '../constant/GenresList'
import MovieList from './MovieList'

function GenreMoviesList() {
  
  
  return (

    <div>
        {GenresList.map((item)=>(
          
            <div className='px-8 md:px-24 py-8' key={item.id}>
                <h2 className='text-[20px] text-white font-bold'>{item.name}</h2>
                <MovieList genreId={item.id} />
            </div>
        ))}
    </div>
  )
}

export default GenreMoviesList;