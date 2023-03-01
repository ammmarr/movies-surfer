// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck
import CircularProgress from '@mui/material/CircularProgress';
import { getAuth, User } from 'firebase/auth';
import { onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../api/MovieApi/apiConfig';
import bg from "../assets/watchLaterBg.jpg";
import Navbar from '../components/Navbar';
import { db } from '../firebase/firebase';
import { SetCurrentUserWatchLater } from '../reduxStore/currentUser';
import "../styles/watchLaterMovies.scss";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { AnimatePresence, motion } from 'framer-motion';
export default function watchLater() {
  // const [watchLater, setWatchLater] = useState([])
  const watchLater = useSelector(state => state.currentUser.watchLater)
  const [user, setUser] = useState<User | null>(null)
  const dispatch = useDispatch()
const navigate = useNavigate()
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    if (user) {
      return onValue(ref(db, `users/${auth.currentUser?.uid}/likes`), snapShot => {
        // setWatchLater([])
        const data = snapShot.val();
        const DataObject = Object.values(data ?? {}).map((each:WatchLaterMovie | WatchLaterSeries) => each.movieData);
        dispatch(SetCurrentUserWatchLater(DataObject));
      });
    }
  }, [user])

  // console.log(watchLater[0])
  const auth = getAuth()
function removeWatchLater(e:any,ID:Number) {
  e.stopPropagation();
  if(auth.currentUser){
  remove(ref(db, `users/${auth.currentUser.uid}/likes/${ID}`))
  }
}
function handleWatchLaterMovieCardClick(ID:number) {
  navigate(`/movie/${ID}`)
}
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5,ease:'easeOut',delay:1}} exit={{opacity:0}} className='watch-later'>

      <Navbar />
      <img src={bg} className="bg-img" />
      <h1>Watch later</h1>
      {watchLater.length > 0 ? <div className="watch-later-movies-container">


        {watchLater.map(movie => <AnimatePresence mode="wait"><motion.div  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:5,ease:'easeOut',delay:1}}
    exit={{opacity:0, background:"yellow",transition:{duration:4}}} className='watch-later-movie-card' Key={movie.id}>


          <img src={apiConfig.originalImage(movie.backdrop_path)} />


          <div className='watch-later-card-info' onClick={(e) => handleWatchLaterMovieCardClick(movie.id)}>
          <button onClick={(e) => removeWatchLater(e,movie.id)} className="remove-button"><HighlightOffOutlinedIcon style={{width:"100%",height:"100%"}} /></button>


            <h2>{movie.title}</h2>
            <div className='movie-text'>
              <p>{movie.overview}</p>
            </div>
            <div className='progress'>
              <CircularProgress value={movie.vote_average * 10} variant="determinate" color='inherit' style={{ width: "100%", height: "100%" }} />
              <div className='progress-value'>{movie.vote_average}</div>
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
        )}

      </div> : <div className='no-movies'><h2>You Didn't add any movies</h2></div>}


    </motion.div>
  )
}


