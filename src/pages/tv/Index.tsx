import Slider from "../../components/Slider/Slider";

import "./Tv.scss";

interface props {
  openModal: () => void;
  setModalInfo: React.Dispatch<React.SetStateAction<string>>;
  getSimilarMovies: (id: number) => void;
}

export default function Tv({
  openModal,
  setModalInfo,
  getSimilarMovies,
}: props) {
  return (
    <div className='tvContainer'>
      <div className='tvSpacer'></div>
      <Slider
        url={`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Top Rated TV Shows'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
      <Slider
        url={`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Popular TV Shows'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
      <Slider
        url={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Latest TV Shows'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
    </div>
  );
}
