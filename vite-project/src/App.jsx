import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Slider from './components/Slider'
import ProductionHouse from './components/ProductionHouse'
import GenreMoviesList from './components/GenreMoviesList'
import SignUpModal from './components/SignUpModal'
import MoviePage from './components/MoviePage';
import SeriesPage from './components/SeriesPage';
import SeriesDetailPage from './components/SeriesDetailPage';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import { WatchListProvider } from './context/WatchListContext';


function App() {
  const [showModal, setshowModal]= useState(false)

  return (
      <WatchListProvider>
      <Router>
       <Header onProfileClick={()=>setshowModal(true)}/>
       <SignUpModal isOpen={showModal} onClose={()=>setshowModal(false)}  />

         <Routes>
           <Route
          path="/"
          element={
            <>
              <Slider />
              <ProductionHouse />
              <GenreMoviesList />
            </>
          }
        />
           <Route path="/Movie/:id" element={<MoviePage  />} /> 
           <Route path="/series" element={<SeriesPage />}   />
            <Route path="/series/:id" element={<SeriesDetailPage />} />
           <Route path="/Movies" element={<Movies />}   />
           <Route path="/watchlist" element={<WatchList />}   />


         </Routes>
          
        
      </Router>

      </WatchListProvider>
  
  )
}

export default App;
