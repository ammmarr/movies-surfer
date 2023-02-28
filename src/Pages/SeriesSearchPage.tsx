import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SeriesSearchComponent from '../components/subComponents/SeriesSearchComponent';



const HeroSearchMovies = () => {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease:'easeOut',delay:1}}className='movie-search-container'>
            <Navbar />
            <SeriesSearchComponent />


        </motion.div>

    )
}

export default HeroSearchMovies;