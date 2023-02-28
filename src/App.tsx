import React, { useEffect } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import MoviePage from "./Pages/MoviePage"
import MoviesSearchPage from './Pages/MoviesSearchPage'
import AiSurveyPage from './Pages/WatchLater'
import SeriesSearchPage from './Pages/SeriesSearchPage'
import SignInPopUp from './components/CreateAccPopUp'
import { HttpStatusCode } from 'axios'
import LogInPopUp from './components/LoginPopUp'
function App() {
  
  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path='/movies' element={<MoviesSearchPage />} />
        <Route path='/series' element={<SeriesSearchPage />} />
        <Route path='/watch-later' element={<AiSurveyPage />} />

      </Routes>
      <SignInPopUp />
      <LogInPopUp/>

    </>


  )
}

export default App


