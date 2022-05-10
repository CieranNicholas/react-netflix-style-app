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
        spaceBetween={10}
        slidesPerView={3}
        slidesPerGroup={3}
        navigation={true}
        breakpoints={{
          100: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            allowTouchMove: true,
          },
          1124: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            allowTouchMove: false,
          },
        }}
        loop={true}
        modules={[Navigation]}
      >
        {data.map((movie: any) => (
          <SwiperSlide key={movie.id}>
            {movie.backdrop_path !== null ? (
              <img
                src={`http://image.tmdb.org/t/p/${imageSize}/${movie.backdrop_path}`}
                alt={`${movie.original_title} poster`}
                onClick={() => {
                  openModal();
                  setModalInfo(movie);
                  getSimilarMovies(movie.id);
                }}
              />
            ) : (
              <img
                src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'
                alt={`${movie.original_title} poster`}
                onClick={() => {
                  openModal();
                  setModalInfo(movie);
                  getSimilarMovies(movie.id);
                }}
              />
            )}
            <p>{movie.original_title || movie.original_name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
