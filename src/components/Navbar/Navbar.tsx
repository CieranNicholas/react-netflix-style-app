import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import "./Navbar.scss";

import { FaSearch } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";

import notflix from "./notflix.png";

export default function Navbar() {
  const [show, handleShow] = useState<boolean>(false);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const searchInput = useRef<HTMLInputElement>(null);

  document.addEventListener("keydown", (event: any) => {
    if (event.key === "Escape") {
      setShowSearch(false);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 1 ? handleShow(true) : handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`navContainer ${show && "navContainer-black"}`}>
      <div className='navImageContainer'>
        <img src={notflix} alt='notflix banner' />
      </div>
      <Link to='/'>Home</Link>
      <Link to='/movies'>Movies</Link>
      <Link to='/tv'>TV Shows</Link>
      <Link to='/new-and-popular'>New and Popular</Link>
      <div className='search-icon-container'>
        {showSearch ? (
          <input
            type='text'
            className='searchInput'
            ref={searchInput}
            onBlur={() => setShowSearch(false)}
          />
        ) : null}

        {showSearch ? (
          <AiFillCloseCircle onClick={() => setShowSearch(false)} />
        ) : (
          <FaSearch
            onClick={() => {
              setShowSearch(true);
              setTimeout(() => {
                searchInput.current?.classList.add("searchActive");
                searchInput.current?.focus();
              }, 100);
            }}
          />
        )}
      </div>
    </nav>
  );
}
