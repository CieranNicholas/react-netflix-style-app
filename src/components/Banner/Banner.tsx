import { useState, useEffect } from "react";
import "./Banner.scss";

import axios from "axios";

import { AiOutlineInfoCircle } from "react-icons/ai";

function truncate(str: string, n: number) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default function Banner() {
  const [movie, setMovie] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
      );

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  return (
    <header
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className='banner-content'>
        <h1 className='banner-title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner-buttons'>
          <button className='banner-button'>Play</button>
        </div>

        <h1 className='banner-description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner-fadeBottom'></div>
    </header>
  );
}
