import { onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeroMoviesByCategory from '../components/HeroMoviesByCategory';
import HeroSlider from '../components/HeroSlider';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase/firebase';
import { setCurrentUserUserName } from '../reduxStore/currentUser';
import { AnimatePresence, motion } from 'framer-motion';


export default function Home() {
  const dispatch = useDispatch()
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `users/${auth.currentUser?.uid}/userInfo`), snapShot => {
          // setWatchLater([])
          const data = snapShot.val()
          if (data !== null) {
            dispatch(setCurrentUserUserName(data.userName))
          }
        })
      }
    })
  }, [])


  return (
    <AnimatePresence initial={true}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
        exit={{ opacity: 0, background: "yellow" }} key="asakldm">

        <Navbar />
        <HeroSlider />
        <HeroMoviesByCategory />
      </motion.div>
    </AnimatePresence>
  )
}