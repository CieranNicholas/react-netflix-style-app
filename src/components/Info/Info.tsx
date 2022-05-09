import { useEffect, useState } from "react";

import "./Info.scss";

import Modal from "react-modal";

import ReactPlayer from "react-player";

import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fafafa",
    width: "600px",
    padding: "0px",
  },
};

Modal.setAppElement("#root");

interface Props {
  open: boolean;
  closeModal: () => void;
  modalInfo: any;
  similar: any;
}

export default function Info({ open, closeModal, modalInfo, similar }: Props) {
  const [videoUrl, setVideoUrl] = useState("");

  const [genreNames, setGenreNames] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      // if modalInfo.release_date is not null
      if (modalInfo.release_date !== undefined) {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${modalInfo.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setVideoUrl(res.data.results[0].key);
      } else {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${modalInfo.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setVideoUrl(res.data.results[0].key);
      }

      const genresRes = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const genreIds = modalInfo.genre_ids.map((id: number) => {
        const genre = genresRes.data.genres.find((genre: any) => {
          return genre.id === id;
        });
        if (genre !== undefined) {
          return genre.name;
        }
      });

      setGenreNames(genreIds);
    }
    getData();
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Movie Info'
      onAfterOpen={() => {
        // document.body.style.overflow = "hidden";
      }}
      onAfterClose={() => {
        // document.body.style.overflow = "auto";
      }}
    >
      <div className='modalContent'>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoUrl}`}
          width='600px'
          height='300px'
          volume={0.1}
          controls={true}
          fullscreen={true}
        />
        <div className='modalbody'>
          <div className='modal-body-header'>
            <p>{modalInfo.title || modalInfo.original_name}</p>
            <p className='modal-release-date'>
              {modalInfo.release_date
                ? modalInfo.release_date.split("-")[0]
                : modalInfo.first_air_date.split("-")[0]}
            </p>
          </div>
          <div className='genres'>
            {genreNames.map((genre: string) => {
              if (genre !== undefined) {
                return <div key={genre}>{genre}</div>;
              }
            })}
          </div>
          <p>{modalInfo.vote_avarage}</p>

          <p className='modal-overview'>{modalInfo.overview}</p>

          {similar.length > 0 && (
            <>
              <p>More Like This</p>
              <div className='card-container'>
                {similar.map((movie: any) => (
                  <div
                    key={movie.id}
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.poster_path})`,
                    }}
                    onMouseEnter={(e: any) => {
                      const el = e.target;
                      el.style.transform = "scale(1.1)";
                      el.style.zIndex = "1";
                    }}
                    onMouseLeave={(e: any) => {
                      const el = e.target;
                      el.style.transform = "scale(1.0)";
                      el.style.zIndex = "0";
                    }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
