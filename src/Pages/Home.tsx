import { onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroMoviesByCategory from '../components/HeroMoviesByCategory';
import HeroSlider from '../components/HeroSlider';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase/firebase';
import { setCurrentUserUserName } from '../reduxStore/currentUser';
import { motion } from 'framer-motion';


export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `users/${auth.currentUser?.uid}/userInfo`), snapShot => {
          // setWatchLater([])
          const data = snapShot.val()
          console.log('username', data.userName)
          if (data !== null) {
            dispatch(setCurrentUserUserName(data.userName))
          }
        })
      }
    })
  }, [])


  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease:'easeOut',delay:1}}>

      <Navbar />
      <HeroSlider />
      <HeroMoviesByCategory />
    </motion.div>
  )
}