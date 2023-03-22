// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
 import {createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
 







export const getRandomMoviesDataThunk = createAsyncThunk('apiData/getRandomMoviesDataThunk', async () => {
  try {
   const data =  await getData(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`).then(res => res.results)
   

       return data
  } catch (error) {
   console.log(error);
  }
})
export const getRandomSeriesDataThunk = createAsyncThunk('apiData/getRandomSeriesDataThunk', async () => {
  try {
   const data =  await getData(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}`).then(res => res.results)
   

       return data
  } catch (error) {
   console.log(error);
  }
})
export const getPopularMoviesDataThunk = createAsyncThunk('apiData/getPopularMoviesDataThunk', async () => {
  try {
   const data =  await getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`).then(res => res.results)
   

       return data
  } catch (error) {
   console.log(error);
  }
})

export const getPopularSeriesDataThunk = createAsyncThunk('apiData/getPopularSeriesDataThunk', async () => {
  try {
   const data =  await getData(`https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}`).then(res => res.results)

       return data
  } catch (error) {
   console.log(error);
  }
})

//   const   popularSeries = await getData("https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
// const  topRatedSeries = await getData("https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
// const  topRatedMovies = await getData("https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)














var initialData= {
  randomMovies:[],
  popularMovies: [],
  topRatedMovies: [],
  popularSeries: [],
  topRatedSeries: [],
  

}




 export const getData = async (url: string) => {
  try {

    let data = await axios(url)

    const result = data.data

    return result
  } catch (e) {
    console.error(e)
  }
}

// // initialData.randomMovies = await getData("https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
// initialData.popularSeries = await getData("https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
// initialData.topRatedSeries = await getData("https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)
// initialData.topRatedMovies = await getData("https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}").then(res => res.results)

const moviesSlice = createSlice({
  name: "apiData",
  initialState: initialData,
  reducers: {
    deleteItem(state,action){
      const itemId = action.payload
    }


  },
  extraReducers: {
    [getRandomMoviesDataThunk.fulfilled]: (state,action) => {
      state.randomMovies= action.payload;
  
    },
    [getRandomSeriesDataThunk.fulfilled]: (state,action) => {
      state.randomSeries= action.payload;
  
    },
    [getPopularMoviesDataThunk.fulfilled]: (state,action) => {
      state.topRatedMovies= action.payload;
    
    },
    [getPopularSeriesDataThunk.fulfilled]: (state,action) => {
      state.topRatedSeries= action.payload;
    },
}})


export const {deleteItem} = moviesSlice.actions

export default moviesSlice.reducer


