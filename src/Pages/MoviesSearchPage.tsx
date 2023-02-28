import { motion } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import MoviesSearchComponent from '../components/subComponents/MoviesSearchComponent';




const HeroSearchMovies = () => {
    return (
        
           <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease:'easeOut',delay:1}}className='movie-search-container'>
            <Navbar />
            <MoviesSearchComponent />
            </motion.div> 


    )
}

export default HeroSearchMovies;