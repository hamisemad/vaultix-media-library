import axios from "axios";

const movieBaseUrl="https://api.themoviedb.org/3"

const apiKey='a7d7f8bd4dcb81e7727ce38db7a5e473'

const movieByGenreBaseUrl="https://api.themoviedb.org/3/discover/movie";

const getTrendingVideos=axios.get(movieBaseUrl+"/trending/all/day?api_key="+apiKey);

const getMoviesByGenreId=(id)=>
    axios.get( movieByGenreBaseUrl , {
        params: {
            api_key: apiKey,
            with_genres: id
        }
    })



    const getMovieById = (id) =>
    axios.get(`${movieBaseUrl}/movie/${id}`, {
    params: {
      api_key: apiKey,
    },
  });



export default {
    getTrendingVideos,
    getMoviesByGenreId,
    getMovieById

};
