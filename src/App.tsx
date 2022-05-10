import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Info from "./components/Info/Info";

// pages
import Homepage from "./pages/homepage/Index";
import Movies from "./pages/movies/Index";
import Tv from "./pages/tv/Index";
import ErrorPage from "./pages/errorPage/ErrorPage";

import axios from "axios";

import "./App.scss";

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

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res: any) => {
        console.log(res);
      });
  }, []);

  return (
    <Router>
      <div className='app'>
        {open && (
          <Info
            open={open}
            closeModal={closeModal}
            modalInfo={modalInfo}
            similar={similar}
          />
        )}
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <Homepage
                openModal={openModal}
                setModalInfo={setModalInfo}
                getSimilarMovies={getSimilarMovies}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <Movies
                openModal={openModal}
                setModalInfo={setModalInfo}
                getSimilarMovies={getSimilarMovies}
              />
            }
          />
          <Route
            path='/tv'
            element={
              <Tv
                openModal={openModal}
                setModalInfo={setModalInfo}
                getSimilarMovies={getSimilarMovies}
              />
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
