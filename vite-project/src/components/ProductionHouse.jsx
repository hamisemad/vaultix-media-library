import React from 'react'

import disney from './../assets/images/Disney-logo-white-png-large-size.png'
import marvel from './../assets/images/marvel-logo-png-transparent.png'
import natgeo from './../assets/images/-national-geographic-logo-hd.png'
import pixar from './../assets/images/Pixar-Logo-PNG-Clipart-Background.png'
import starwars from './../assets/images/starwars.logo.png'

import disneyV from './../assets/videos/Disney.clip.mp4'
import marvelV from './../assets/videos/marvel.clip.mp4'
import natgeoV from './../assets/videos/nat-geo clip.mp4'
import pixarV from './../assets/videos/pixar-clip.mp4'
import starwarsV from './../assets/videos/star wars-clip.mp4'



function ProductionHouse() {

  const ProductionHouselist=[
    {
      id:1,
      image:disney,
      video:disneyV
    },

    {
      id:2,
      image:marvel,
      video:marvelV
    },

    {
      id:3,
      image:natgeo,
      video:natgeoV
    },

    {
      id:4,
      image:pixar,
      video:pixarV
    },

    {
      id:5,
      image:starwars,
      video:starwarsV
    }

  ]
  return (
  <div className='container mx-auto px-6 mt-5 mb-7 '> 
    <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
      {ProductionHouselist.map((item)=>(
        <div className='border-2 border-gray-700 px-11 h-[120px] flex items-center justify-center bg-gray-800 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer relative mx-auto shadow-lg shadow-gray-700 '>
                    <video src={item.video} autoPlay loop playsInline className='absolute top-0 left-0 bottom-0 rounded-md z-0 opacity-0 hover:opacity-70 w-full h-full object-fill'/>
          <img src={item.image} className='w-24 z-[1]' alt='logo' />

        </div>
      ))}
    </div>
   </div>
  )
}

export default ProductionHouse