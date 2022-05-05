import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";

import "./Slider.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper";

interface Props {
  url: string;
  imageSize: string;
  title: string;
  openModal: () => void;
  setModalInfo: React.Dispatch<React.SetStateAction<string>>;
  getSimilarMovies: (id: number) => void;
}

export default function Slider({
  url,
  imageSize,
  title,
  openModal,
  setModalInfo,
  getSimilarMovies,
}: Props) {
  const [data, setData] = useState<any>([]);

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    async function getdata() {
      const request = await axios.get(url);
      setData(request.data.results);
      setTimeout(() => {
        setOpacity(100);
      }, 250);
    }
    getdata();
  }, []);

  return (
    <div className='netflix-slider' style={{ opacity: `${opacity}%` }}>
      <div className='categoryTitleContainer'>
        <h4>{title}</h4>
      </div>

      <Swiper
        cssMode={true}
        navigation={true}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={6}
        spaceBetween={10}
        slidesPerGroup={1}
        modules={[Navigation]}
        className='swiper-container mySwiper'
      >
        <div className='swiper-wrapper'>
          {data.map((movie: any) => {
            return (
              <SwiperSlide className='swiper-slide' key={movie.id}>
                <img
                  src={`http://image.tmdb.org/t/p/${imageSize}/${movie.backdrop_path}`}
                  alt={`${movie.original_title} poster`}
                  onClick={() => {
                    openModal();
                    setModalInfo(movie);
                    getSimilarMovies(movie.id);
                  }}
                />
                <p>{movie.original_title}</p>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
}
