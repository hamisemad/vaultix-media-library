import React, { useEffect, useState, useRef } from 'react'
import GlobalApi from '../services/GlobalApi'
import { HiChevronLeft,HiChevronRight } from "react-icons/hi";
import MovieCard from './MovieCard';


function MovieList({genreId}) {

  const[MovieList,setMovieList]=useState([])

   const elementRef=useRef(null);
  
    useEffect(()=>{
        getMoviesByGenreId();
    },[])

    const getMoviesByGenreId=()=>{
        GlobalApi.getMoviesByGenreId(genreId).then(resp=>{
            console.log(resp.data.results)
            setMovieList(resp.data.results)

        })
    }

    const sliderRight=(element)=>{
      element.scrollLeft += window.innerWidth - 110;

     }
     const sliderLeft=(element)=>{
      element.scrollLeft-=window.innerWidth-110;
     }
  

  return (

  <div className='relative'>

   <HiChevronLeft className='text-white text-[40px] absolute left-0 mx-8  cursor-pointer hidden md:block translate-y-[150px] translate-x-[-60px]' onClick={()=>sliderLeft(elementRef.current)}/>
    
    <div ref={elementRef} className='flex overflow-x-auto scrollbar-hide scroll-smooth w-full py-6 gap-8 mt-6 pt-10 px-3'>

      {MovieList.map((item,index)=>(

        <MovieCard key={index} Movie={item} /> 
        
      ))}


    </div>

        <HiChevronRight className='text-white text-[40px] absolute right-0  mx-8  cursor-pointer hidden md:block translate-y-[-320px] translate-x-16' onClick={()=>sliderRight(elementRef.current)}/>
    
  </div>
  )
}

export default MovieList;