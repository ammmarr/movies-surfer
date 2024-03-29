// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import { ref, remove, set } from "firebase/database";
import React, { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { uid } from "uid";
import apiConfig from "../api/MovieApi/apiConfig";
import { auth, db } from "../firebase/firebase";
import { RootState } from "../reduxStore";
import "../styles/moviePage.scss";
import CardsTrack from "./subComponents/cardsTrack";
import CastCard from "./subComponents/CastCard";
import CastError from "./subComponents/CastError";




export default function HeroMovieUi(props: { movieData: { backdrop_path: string; poster_path: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; genres: any[]; overview: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }) {
    const [castData, setCastData] = useState()
    const [trailer, setTrailer] = useState()
    const [added, setAdded] = useState(false)
    const [recommended, setRecommended] = useState()
    const { movieId } = useParams()
    const currentWatchLaterMovies = useSelector((state) => state.currentUser.watchLater)
    const watchLaterIDs = currentWatchLaterMovies.map(each => each.id)

    useEffect(() => {
        const getData = async () => {
            try {

                let fetchCastData = await axios(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
                let fetchTrailer = await axios(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
                let fetchRecommended = await axios(`
                https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
                const castResult = await fetchCastData.data
                const trailerResult = await fetchTrailer.data
                const recommendedResult = await fetchRecommended.data.results
                setTrailer(trailerResult)
                setCastData(castResult)
                setRecommended(recommendedResult)
            } catch (e) {
                console.error(e)
            }
        }
        if (watchLaterIDs.find((each: string | undefined) => each == movieId)) {
            setAdded(true)
        }


        getData()
    }, [])

    let trailerComponentsUi
    if (trailer != undefined) {

        trailerComponentsUi = trailer.results.map(each => <SwiperSlide key={each.key}> <iframe
            src={`https://www.youtube-nocookie.com/embed/${each.key}`}
        >
        </iframe>
        </SwiperSlide>)


    } else {
    }
    const scroll = () => {
        const section = document.querySelector('#trailer');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const favClicked = () => {
        setAdded(prev => !prev)

        const Uid = uid()


        if (auth.currentUser && added == false) {
            set(ref(db, `users/${auth.currentUser.uid}/likes/${props.movieData.id}`), {
                movieData: props.movieData
            })

        } else if (auth.currentUser && added == true) {
            remove(ref(db, `users/${auth.currentUser.uid}/likes/${props.movieData.id}`))


        }
    }

    return (
        <div className="hero-movie-ui" style={{ backgroundImage: `url(${apiConfig.originalImage(props.movieData.backdrop_path)})` }}>
            <div className="movie-content">
                <div className="poster-image">
                    <img src={apiConfig.originalImage(props.movieData.poster_path)} />

                </div>
                <div className="text">
                    <h1>{props.movieData.title}</h1>
                    <div className='genres-container'>
                        {props.movieData.genres.map(genre => <div className='genre' key={genre.id}>{genre.name}</div>)}
                    </div>
                    <div className='overview-container'><p>{props.movieData.overview}
                    </p></div>
                    <div className="action-buttons">
                        <div className="love" onClick={favClicked} >
                            {added ? <FavoriteIcon className="fav-icon" /> : <FavoriteBorderIcon className="fav-icon" />}
                        </div>
                        <div className="watch-trailer">
                            <button onClick={scroll}>Watch Trailer</button>
                        </div>
                    </div>
                    <div className="cast-section">
                        <h2>CAST</h2>
                        <div className="cast-container">
                            {castData ? castData.cast.map((eachCastData: {
                                id: Key | null | undefined; cast: any;
                            }) => <CastCard castData={eachCastData} />) : <CastError />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="trailer-section" id="trailer" >
                <h2>Trailer</h2>
                <div className="trailer-container">
                    <Swiper
                        slidesPerView={"auto"}
                        navigation={true} modules={[Navigation, Autoplay, Pagination]} className="mySwiper"
                        centeredSlides={true}
                        watchSlidesProgress

                    >
                        {trailerComponentsUi}
                    </Swiper>
                </div>
            </div>
            <div className="recommended-movies">
                <h1>Similar movies</h1>
                {recommended ? <CardsTrack data={recommended} /> : null}
            </div>


        </div>
    )
}