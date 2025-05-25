import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from '../services/GlobalApi';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ImageBaseUrl = "https://image.tmdb.org/t/p/original";

function Slider() {
  const [MovieList, setMovieList] = useState([]);
  const elementRef = useRef();
  const firstImageRef = useRef(null);
  const navigate = useNavigate();
  const intervalIdRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    if (firstImageRef.current) {
      setImageWidth(firstImageRef.current.clientWidth + 20);
    }
  }, [MovieList]);

  const scrollBackOneByOne = async (element, step) => {
    while (element.scrollLeft > 0) {
      let nextScrollLeft = Math.max(0, element.scrollLeft - step);
      element.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });

      await new Promise(resolve => setTimeout(resolve, 5000)); 
    }

    setTimeout(() => {
      startAutoScroll();
    }, 6000);
  };

  const startAutoScroll = () => {
    const element = elementRef.current;
    if (!element || !imageWidth) return;

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      if (!element) return;

      const nearEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 5;

      if (nearEnd) {
        clearInterval(intervalIdRef.current);
        scrollBackOneByOne(element, imageWidth);
      } else {
        element.scrollBy({ left: imageWidth, behavior: 'smooth' });
      }
    }, 6000);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [imageWidth]);

  const sliderRight = (element) => {
    element.scrollBy({ left: imageWidth, behavior: 'smooth' });
  };

  const sliderLeft = (element) => {
    element.scrollBy({ left: -imageWidth, behavior: 'smooth' });
  };

  const getTrendingMovies = () => {
    GlobalApi.getTrendingVideos.then(resp => {
      setMovieList(resp.data.results);
    });
  };

  return (
    <div>
      <HiChevronLeft
        className="text-white text-[40px] absolute mx-8 mt-[150px] cursor-pointer hidden md:block z-10"
        onClick={() => sliderLeft(elementRef.current)}
      />
      <HiChevronRight
        className="text-white text-[40px] absolute right-0 mx-8 mt-[150px] cursor-pointer hidden md:block z-10"
        onClick={() => sliderRight(elementRef.current)}
      />
      <div
        className="flex overflow-x-auto w-full px-16 py-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {MovieList.map((item, index) => (
          <img
            key={item.id}
            ref={index === 0 ? firstImageRef : null} 
                       onClick={() => {
                        if (item.media_type === 'movie') {
                          navigate(`/Movie/${item.id}`);
                           } else if (item.media_type === 'tv') {
                           navigate(`/series/${item.id}`);
                           }
                          }}

            src={ImageBaseUrl + item.backdrop_path}
            className="min-w-full md:h-[450px] object-fill object-left-top mr-5 rounded-md hover:border-2 border-white transition-all duration-100 ease-in shadow-lg shadow-sky-900"
            alt={item.title || item.name}
          />
        ))}
      </div>
    </div>
  );
}


export default Slider;
