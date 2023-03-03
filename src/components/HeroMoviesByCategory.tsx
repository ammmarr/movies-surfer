import React from 'react'
import { useSelector } from 'react-redux'
import "../styles/cat.scss"
import CardsTrack from './subComponents/cardsTrack'

const HeroMoviesByCategory = () => {
    const data = useSelector((state: any) => state.apiData)



    return (
        <div className='categories'>
           
            <div className='catogory-container'>
            <h2>Popular Movies</h2>
                <CardsTrack data={data.randomMovies} />
            </div>
            <div className='catogory-container'>
                <h2> Top Rated movies</h2>
                 <CardsTrack data={data.topRatedMovies} />
            </div>
            <div className='catogory-container'>
                <h2> Popular Series</h2>
                 <CardsTrack data={data.randomSeries} />
            </div>
            <div className='catogory-container'>
                <h2> Top Rated Series</h2>
                 <CardsTrack data={data.topRatedSeries} />
            </div>
        


        </div>
    )
}

export default HeroMoviesByCategory