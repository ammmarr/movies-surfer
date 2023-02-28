import React, { useEffect, useState, useRef } from 'react'

import "../styles/heroSlider.scss"
import apiConfig from "../api/MovieApi/apiConfig"
import { useSelector } from "react-redux"
import { getAuth } from 'firebase/auth'
import { uid } from 'uid'
import { RootState } from '../reduxStore'







const HeroSlider = () => {
  const randomMovies = useSelector((state: any) => state.apiData.randomMovies)
  const sliderMovie = randomMovies[Math.floor(Math.random() * 20)]
  const heroUrlImage = apiConfig.originalImage(sliderMovie.backdrop_path)
  const genreIds = sliderMovie.genre_ids
  const auth = getAuth()
  const s = useSelector<RootState>(s => s.currentUser)
  const genres = genreIds.map((id: number) => apiConfig.getGenreByKey(apiConfig.moviesGenre, id))
  return (
    <div className='hero-slider'>

      <img src={heroUrlImage} />
      <div className='info-container'>
        <h1>{sliderMovie.title}</h1>
        <div className='genres-container'>
          {genres.map((genre: string) => <div className='genre' key={genre}>{genre}</div>)}
        </div>
        <div className='p-container'>{sliderMovie.overview}</div>

        <button onClick={event => window.location.href = `/movie/${sliderMovie.id}`} className="costum-button" id="watch-now">Watch Now</button>

      </div>

    </div>
  )
}

export default HeroSlider


