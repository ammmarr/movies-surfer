import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

var initialData = {
  randomMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  popularSeries: [],
  topRatedSeries: []

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
initialData.randomMovies = await getData("https://api.themoviedb.org/3/discover/movie?api_key=801a00d82d2efc5cba24e10087c344d4").then(res => res.results)
initialData.popularSeries = await getData("https://api.themoviedb.org/3/discover/tv?api_key=801a00d82d2efc5cba24e10087c344d4").then(res => res.results)
initialData.topRatedSeries = await getData("https://api.themoviedb.org/3/tv/top_rated?api_key=801a00d82d2efc5cba24e10087c344d4").then(res => res.results)

initialData.topRatedMovies = await getData("https://api.themoviedb.org/3/movie/top_rated?api_key=801a00d82d2efc5cba24e10087c344d4").then(res => res.results)


const moviesSlice = createSlice({
  name: "apiData",
  initialState: initialData,
  reducers: {
    deleteItem(state,action){
      const itemId = action.payload
      

    }

  }
})


export const {deleteItem} = moviesSlice.actions


export default moviesSlice.reducer