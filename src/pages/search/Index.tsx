import { useEffect, useState } from "react";
import axios from "axios";

import "./Search.scss";

import { useSearchParams } from "react-router-dom";

interface Types {
  setSearchData: any;
  searchData: any;
  openModal: () => void;
  setModalInfo: React.Dispatch<React.SetStateAction<string>>;
  getSimilarMovies: (id: number) => void;
}

export default function Search({
  searchData,
  setSearchData,
  openModal,
  setModalInfo,
  getSimilarMovies,
}: Types) {
  const [searchParams, setSearchParams] = useSearchParams();
  const showSearch = searchParams.get("query");
  const [opacity, setOpacity] = useState(0);

  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    setSearchParams({ query: searchData });
  }, [searchData]);

  useEffect(() => {
    const query = searchParams.get("query");
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((res: any) => {
        setSearchResults(res.data.results);

        setTimeout(() => {
          setOpacity(100);
        }, 500);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [searchParams]);

  return (
    <div
      className='searchContainer'
      style={{
        opacity: `${opacity}%`,
      }}
    >
      <div className='moviesSpacer' />
      <div className='searchCardContainer'>
        {searchResults.map((item: any, index: number) => {
          // return (
          //   <div className='searchCard' key={item.id}>
          //     {item.backdrop_path !== null ? (
          //       <img
          //         src={`http://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
          //         alt={``}
          //       />
          //     ) : (
          //       <img
          //         src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'
          //         alt={``}
          //       />
          //     )}
          //     <p>{item.original_title}</p>
          //   </div>
          // );
          if (item.original_title !== undefined) {
            return (
              <div className='searchCard' key={item.id}>
                {item.backdrop_path !== null ? (
                  <img
                    src={`http://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
                    alt={""}
                    onClick={() => {
                      openModal();
                      setModalInfo(item);
                      getSimilarMovies(item.id);
                    }}
                  />
                ) : (
                  //
                  <img
                    src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png'
                    alt={""}
                    onClick={() => {
                      openModal();
                      setModalInfo(item);
                      getSimilarMovies(item.id);
                    }}
                  />
                )}
                <div className='imageGradient' />
                <p>{item.original_title}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
