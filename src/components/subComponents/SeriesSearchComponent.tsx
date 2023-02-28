import { inputAdornmentClasses } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig from '../../api/MovieApi/apiConfig';
import "../../styles/movieSearchComponent.scss"
import BGImage from "../../assets/theatre.jpg"
import { Link } from 'react-router-dom';
function MoviesSearchComponent() {
    const initialSeries = useSelector((state: any) => state.apiData.popularSeries)
    const [series, setSeries] = useState(initialSeries)
    const searchRef = useRef("")
    const [query, setQuery] = useState()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=801a00d82d2efc5cba24e10087c344d4&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`);
        // convert the data to json
        const json = await data.json();

        setSeries(json.results)
    }
    return (
        <div className="movie-search-component" >
            <img src={BGImage} />
            <div className='content'>
                <h1>Search Series!</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder="Type a movie name" className="input" name="text" type="text" ref={searchRef} />
                    <button type='submit' className='costum-button'>Search</button>
                </form>
                {series.length > 0 ? <div className='movies-search-ui'>
                    {series.map((series: {
                        name: ReactNode; id: React.Key | null | undefined; backdrop_path: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; vote_average: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                    }) =>
                        <Link to={`/movie/${series.id}`} className="link-container">
                            <div key={series.id} className='movie-card-big'>

                                {apiConfig.originalImage(series.backdrop_path) ? <img src={apiConfig.originalImage(series.backdrop_path)} /> : null}

                                <div className='backdrop-info'>
                                    <h2>{series.name}</h2>
                                    <p>{series.vote_average}</p>
                                </div>

                                series
                            </div>
                        </Link>
                    )
                    }

                </div>
                    : <div className='movies-search-error'>
                        <h2>No results found</h2>
                    </div>}
            </div>
        </div>
    );
}

export default MoviesSearchComponent;