// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import SignInPopUp from './components/CreateAccPopUp'
import LogInPopUp from './components/LoginPopUp'
import Home from './Pages/Home'
import MoviePage from "./Pages/MoviePage"
import MoviesSearchPage from './Pages/MoviesSearchPage'
import SeriesSearchPage from './Pages/SeriesSearchPage'
import AiSurveyPage from './Pages/WatchLater'
import { getData, getPopularMoviesDataThunk, getPopularSeriesDataThunk, getRandomMoviesDataThunk, getRandomSeriesDataThunk } from './reduxStore/apiData'
function App() {
  const datas = useSelector((state) => state.apiData.randomMovies)
  const dispatch = useDispatch()
  //  async function getAndSetInitialData() {
  //    const randomMovies = await getData("https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
  // dispatch(setRandomMovies(randomMovies))
  //   const randomSeries = await getData("https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
  //   dispatch(setRandomSeries(randomSeries))
  //   const topRatedSeries = await getData("https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
  //   dispatch(setPopularSeries(topRatedSeries))
  //   const topRatedMovies = await getData("https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
  //   dispatch(setPopularMovies(topRatedMovies))
  //  }
  useEffect(() => {
    const genRandomKey = async () => {
      return (dispatch(getRandomMoviesDataThunk()), dispatch(getPopularMoviesDataThunk()), dispatch(getRandomSeriesDataThunk()), dispatch(getPopularSeriesDataThunk()))
    };

    genRandomKey();
  }, []);
  const data = useSelector(state => state.randomMovies)




  //   ,[])
  return (

    <>
      {datas.length > 0 ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path='/movies' element={<MoviesSearchPage />} />
          <Route path='/series' element={<SeriesSearchPage />} />
          <Route path='/watch-later' element={<AiSurveyPage />} />

        </Routes>
        : null}
      <SignInPopUp />
      <LogInPopUp />

    </>


  )
}

export default App




