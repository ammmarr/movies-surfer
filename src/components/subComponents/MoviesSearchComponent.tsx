// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { inputAdornmentClasses } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig from '../../api/MovieApi/apiConfig';
import "../../styles/movieSearchComponent.scss"
import BGImage from "../../assets/moviesbg.jpg"
import { Link } from 'react-router-dom';
import MovieCardBig from './MovieCardBig';
function MoviesSearchComponent() {
    const initialMovies = useSelector(state => state.apiData.randomMovies)
    const [movies, setMovies] = useState(initialMovies)
    const searchRef = useRef("")
    const [query, setQuery] = useState()
    // useEffect(() => {
    //     // declare the async data fetching function
    //     const fetchData = async () => {
    //       // get the data from the api
    //       const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    //       // convert the data to json
    //       const json = await data.json();
    //       console.log(json)

    //       // set state with the result
    //       setMovies(json.results);
    //     }

    //     // call the function
    //     fetchData()
    //       // make sure to catch any error
    //       .catch(console.error);;
    //   }, [query])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`);
        // convert the data to json
        const json = await data.json();

        setMovies(json.results)
    }
    return (
        <div className="movie-search-component">
            <img src={BGImage} />
            <div className='content'>
                <h1>Search Movies!</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder="Type a movie name" className="input" name="text" type="text" ref={searchRef} />
                    <button type='submit' className='costum-button' id="search-button">Search</button>
                </form>
                {movies.length > 0 ? <div className='movies-search-ui'>
                    {movies.map((movie: { id: React.Key | null | undefined; backdrop_path: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; vote_average: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>
                        <Link to={`/movie/${movie.id}`} className="link-container">
                            <MovieCardBig movie={movie} key={movie.id} />
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