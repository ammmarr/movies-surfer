import react from "react"
import apiConfig from "../../api/MovieApi/apiConfig"


export default function MovieCardBig(props) {
    const movie = props.movie
    return (
        <div key={movie.id} className='movie-card-big'>

            <img src={apiConfig.originalImage(movie.backdrop_path)} />

            <div className='backdrop-info'>
                <h2>{movie.title}</h2>
                <p>{movie.vote_average}</p>
            </div>

        </div>
    )
}