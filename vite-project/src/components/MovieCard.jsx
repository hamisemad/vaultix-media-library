import { Link } from 'react-router-dom';

function MovieCard({Movie}) {

   const imageUrl = Movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${Movie.poster_path}`
      : '/default.jpg'; 

 
  return (
  <Link to={`/movie/${Movie.id}`}>
    <section className='hover:scale-110 duration-300'>
        <img  src={imageUrl}  alt='movie' className={`rounded-md transition-transform hover:scale-110 duration-300 hover:border-[3px] drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]  min-w-[150px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]`}  />  

         <h2 className=' max-w-screen-sm mt-4 text-white p-2 font-semibold text-lg'>{Movie.title}</h2>

    </section>
  </Link>
  );
}

export default MovieCard;