import React from 'react'
import img from "E:/ammar's stuff/web-development/projects/movies-surfer/src/assets/demo.avif"
import "../../styles/movieCard.scss"
import apiConfig from '../../api/MovieApi/apiConfig'
import { Result, Shangolla, Tv } from '../../api/MovieApi/interfaces'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';


const MovieCard = (props: { data: Tv & Result & Shangolla }) => {
    const { title, vote_average, backdrop_path } = props.data
    var name = title
    if (props.data.hasOwnProperty("first_air_date")) {
        name = props.data.name
    }
    return (
        <Link to={`/movie/${props.data.id}`}>
            <div className='movie-card '>
                <img src={apiConfig.w500Image(props.data.poster_path)} />
                
                <div className='backdrop-info'>
                    <h2>{name}</h2>
                    <div className='rating-container'>
                        <p>{vote_average}</p>
                        <CircularProgress value={vote_average * 10} variant="determinate" color='inherit' style={{ width: "100%", height: "100%" ,margin:"0"}} />
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default MovieCard