import { useEffect, useState } from "react";
import "./Navbar.scss";

import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [show, handleShow] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 1 ? handleShow(true) : handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className={`navContainer ${show && "navContainer-black"}`}>
      <div className='nav-left'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png'
          alt='site logo'
        />
        <a href=''>Home</a>
        <a href=''>Movies</a>
        <a href=''>TV Shows</a>
        <a href=''>New and Popular</a>
      </div>
      <div className='nav-right'>
        <div className='search-icon-container'>
          <FaSearch />
        </div>
      </div>
    </div>
  );
}
