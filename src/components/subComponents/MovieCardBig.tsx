import react from "react"
import apiConfig from "../../api/MovieApi/apiConfig"


export default function MovieCardBig(props) {
    const movie = props.movie
    let name
    if(props.movie.title){
        name = props.movie.title
    }else{
        name = props.movie.name
    }
    return (
        <div key={movie.id} className='movie-card-big'>

            <img src={apiConfig.originalImage(movie.backdrop_path)} />

            <div className='backdrop-info'>
                <h2>{name}</h2>
                <p>{movie.vote_average}</p>
            </div>

        </div>
    )
}