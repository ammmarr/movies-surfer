// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { Result, Shangolla, Tv } from '../../api/MovieApi/interfaces'
import "../../styles/cardsTrack.scss"
import MovieCard from './MovieCard'


const CardsTrack = (props: { data: Tv & Result & Shangolla }) => {
  const navigate = useNavigate()
function handleRecommendedMoviesClick(id:number) {

 navigate(`/movie/${id}`)
}
  return (
    <div className='cards-track'>
      <Swiper

        spaceBetween={30}
        navigation={true} modules={[Autoplay, Pagination, Navigation]} className="mySwiper"
        centeredSlides={false}
        breakpoints={{

          // when window width is >= 768px
          200: {
            width: 768,
            slidesPerView: 3,
            spaceBetween: 10,
          },
          900: {
            width: 900,
            slidesPerView: 4,
            spaceBetween: 10,

          },
          1300: {
            width: 1300,
            slidesPerView: 6,
            spaceBetween: 10,

          },

        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}>
        {props.data.map((item: { id: React.Key | null | undefined | number}) => <SwiperSlide key={item.id} onClick={() => handleRecommendedMoviesClick(item.id)}><MovieCard data={item} key={item.id} /></SwiperSlide>)
        }
      </Swiper>
    </div>

  )
}

export default CardsTrack