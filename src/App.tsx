import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Slider from "./components/Slider/Slider";
import Info from "./components/Info/Info";

import axios from "axios";

import "./App.scss";

// todo:
// nav bar is dissapearing all of a sudden?

export default function App() {
  const [open, setOpen] = useState<boolean>(false);

  const [modalInfo, setModalInfo] = useState<any>([]);

  const [similar, setSimilar] = useState<any>([]);

  async function getSimilarMovies(id: number) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );

    setSimilar(res.data.results.slice(0, 12));
  }

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    modalInfo([]);
    setSimilar([]);
  };

  return (
    <>
      <div
        className='app'
        style={open ? { filter: `blur(5px)` } : { filter: `blur(0)` }}
      >
        {open && (
          <Info
            open={open}
            closeModal={closeModal}
            modalInfo={modalInfo}
            similar={similar}
          />
        )}
        <Navbar />
        <Banner />
        <Slider
          url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`}
          imageSize='original'
          title='Latest Movies'
          openModal={openModal}
          setModalInfo={setModalInfo}
          getSimilarMovies={getSimilarMovies}
        />
        <Slider
          url={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`}
          imageSize='original'
          title='Popular Movies'
          openModal={openModal}
          setModalInfo={setModalInfo}
          getSimilarMovies={getSimilarMovies}
        />
        <Slider
          url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`}
          imageSize='original'
          title='Movies Coming Soon'
          openModal={openModal}
          setModalInfo={setModalInfo}
          getSimilarMovies={getSimilarMovies}
        />
        <Slider
          url={`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`}
          imageSize='original'
          title='Movies Trending This Week'
          openModal={openModal}
          setModalInfo={setModalInfo}
          getSimilarMovies={getSimilarMovies}
        />
      </div>
    </>
  );
}

// style={{ backgroundImage: `url(${imgUrl}${movie.poster_path})` }}
