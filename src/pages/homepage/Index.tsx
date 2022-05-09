import Banner from "../../components/Banner/Banner";
import Slider from "../../components/Slider/Slider";

interface props {
  openModal: () => void;
  setModalInfo: React.Dispatch<React.SetStateAction<string>>;
  getSimilarMovies: (id: number) => void;
}

export default function Homepage({
  openModal,
  setModalInfo,
  getSimilarMovies,
}: props) {
  return (
    <div>
      <Banner />
      <Slider
        url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Latest Movies'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
      <Slider
        url={`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Popular Movies'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
      <Slider
        url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Movies Coming Soon'
        openModal={openModal}
        setModalInfo={setModalInfo}
        getSimilarMovies={getSimilarMovies}
      />
      <Slider
        url={`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`}
        imageSize='w780'
        title='Movies Trending This Week'
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
