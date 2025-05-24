import React, { useEffect, useState } from 'react';
import logo from './../assets/images/logo.png';
import { HiHome, HiMagnifyingGlass, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { RiMovie2AiFill } from "react-icons/ri";
import HeaderItem from './HeaderItem';
import profilePic from '../assets/images/profile-pic.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header({ onProfileClick }) {
  const [toggle, setToggle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = 'a7d7f8bd4dcb81e7727ce38db7a5e473';
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
        ).then(resp => {
          setResults(resp.data.results);
        }).catch(err => console.error('Search error:', err));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  

  const menu = [
    { name: 'HOME', icon: HiHome, route: '/' },
    { name: 'SEARCH', icon: HiMagnifyingGlass },
    { name: 'WATCH LIST', icon: HiPlus, route:'/watchlist' },
    { name: 'MOVIES', icon: RiMovie2AiFill,  route: '/movies' },
    { name: 'SERIES', icon: HiTv, route: '/series' },
  ];

  return (
    <div className='flex items-center justify-between px-3 py-5 gap-4'>
      <div className='flex items-center gap-8'>
        <img src={logo} className='w-32 sm:w-40 lg:w-52 object-cover p-3' />

        <div className='hidden lg:flex gap-8'>
          {menu.map((item, index) => {
            if (item.name === 'SEARCH') {
              return (
                <div key={index} className="relative">
                  <div onClick={() => setShowSearch(!showSearch)} className="cursor-pointer">
                    <HeaderItem name={item.name} Icon={item.icon} />
                  </div>

                  {showSearch && (
                    <div className="absolute top-full mt-2 w-80 z-50">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-1 rounded text-black"
                        placeholder="Search..."
                      />
                      {results.length > 0 && (
                        <div className="bg-gray-900 text-white rounded shadow-lg mt-2 max-h-80 overflow-y-auto">
                          {results.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (item.media_type === 'movie') {
                                 navigate(`/Movie/${item.id}`);
                               } else if (item.media_type === 'tv') {
                                navigate(`/series/${item.id}`);
                               }
                                setResults([]);
                                setShowSearch(false);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 border-b border-gray-800 cursor-pointer"
                            >
                              {item.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                  alt={item.title || item.name}
                                  className="w-12 h-auto rounded"
                                />
                              ) : (
                                <div className="w-12 h-16 bg-gray-600 rounded flex items-center justify-center text-sm text-white">
                                  N/A
                                </div>
                              )}
                              <span>{item.title || item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={index}
                onClick={() => {
                  if (item.route) navigate(item.route);
                }}
                className="cursor-pointer"
              >
                <HeaderItem name={item.name} Icon={item.icon} />
              </div>
            );
          })}
        </div>

        <div className='flex lg:hidden gap-5 relative items-center'>
          {menu.slice(0, 3).map((item, index) => {
            if (item.name === 'HOME') {
              return (
                <div key={index} onClick={() => navigate('/')} className="cursor-pointer">
                  <HeaderItem name={''} Icon={item.icon} />
                </div>
              );
            }
            if (item.name === 'WATCH LIST') {
              return (
                <div key={index} onClick={() => navigate('/watchlist')} className="cursor-pointer">
                  <HeaderItem name={''} Icon={item.icon} />
                </div>
              );
            }
            if (item.name === 'SEARCH') {
              return (
                <div key={index} className="relative">
                  <div onClick={() => setShowSearch(!showSearch)} className="cursor-pointer">
                    <HeaderItem name={''} Icon={item.icon} />
                  </div>

                  {showSearch && (
                    <div className="absolute top-full w-[10em] z-50 left-0 translate-x-[-40px] mt-3">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-1 rounded text-black"
                        placeholder="Search..."
                      />
                      {results.length > 0 && (
                        <div className="bg-gray-900 text-white rounded shadow-lg mt-2 max-h-80 overflow-y-auto">
                          {results.map((movie) => (
                            <div
                              key={movie.id}
                              onClick={() => {
                          if (movie.media_type === 'movie') {
                         navigate(`/Movie/${movie.id}`);
                         } else if (movie.media_type === 'tv') {
                            navigate(`/series/${movie.id}`);
                         }
                              setResults([]);
                          setShowSearch(false);
                             setSearchQuery('');
                       }}

                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 border-b border-gray-800 cursor-pointer"
                            >
                              {movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-12 h-auto rounded"
                                />
                              ) : (
                                <div className="w-12 h-16 bg-gray-600 rounded flex items-center justify-center text-sm text-white">
                                  N/A
                                </div>
                              )}
                              <span>{movie.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }
            return <HeaderItem key={index} name={''} Icon={item.icon} />;
          })}

          <div className='cursor-pointer' onClick={() => setToggle(!toggle)}>
            <HeaderItem name={''} Icon={HiDotsVertical} />
            {toggle && (
              <div className='absolute top-full mt-2 bg-gray-800 rounded shadow-lg p-4 left-3 z-40'>
                {menu.slice(3).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (item.route) {
                        navigate(item.route);
                        setToggle(false);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <HeaderItem name={item.name} Icon={item.icon} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <img
        src={profilePic}
        className='w-12 p-3 m-3 rounded-full m-3 cursor-pointer'
        onClick={onProfileClick}
      />
    </div>
  );
}

export default Header;
