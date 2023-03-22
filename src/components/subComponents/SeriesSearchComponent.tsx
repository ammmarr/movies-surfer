// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignorenpm
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/MovieApi/apiConfig';
import BGImage from "../../assets/theatre.jpg";
import "../../styles/movieSearchComponent.scss";
function SeriesSearchComponent() {
    const [series, setSeries] = useState([])
    const searchRef = useRef("")
    const [query, setQuery] = useState()
    useEffect(() => {
        const data = async (params: type) => {
            const initialSeries = await useSelector((state: any) => state.apiData.topRatedSeries)
            setSeries(initialSeries)

        }
        data()

    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=801a00d82d2efc5cba24e10087c344d4&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`);
        // convert the data to json
        const json = await data.json();

        setSeries(json.results)
        searchRef.current.value = ""
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
                        <Link to={`/movie/${series.id}`} className="link-container" key={series.id}>
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

export default SeriesSearchComponent;