import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import HeroMovieUi from '../components/HeroMovieUi';
import Navbar from '../components/Navbar';


export default function moviePage() {
  const [movieData, setMovieData] = useState()
  const { movieId } = useParams()


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=801a00d82d2efc5cba24e10087c344d4&language=en-US`).then(res => res.json());

      setMovieData(data)
    }

    // call the function
    fetchData()
    // make sure to catch any error


  }, [])


  return (

    <motion.div  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease:'easeOut',delay:1}}
    exit={{opacity:0,background:"yellow"}} key="asakldmas">
      <Navbar />
      {movieData ? <HeroMovieUi movieData={movieData} /> : null}
    </motion.div>
  )
}

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
