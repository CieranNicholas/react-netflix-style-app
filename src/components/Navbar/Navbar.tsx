import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import "./Navbar.scss";

import { FaSearch } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";

import { CgMenuRound, CgCloseO } from "react-icons/cg";

import notflix from "./notflix.png";

export default function Navbar() {
  const [show, handleShow] = useState<boolean>(false);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const searchInput = useRef<HTMLInputElement>(null);

  const mobileNavLinks = useRef<HTMLDivElement>(null);

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

  const openMenu = () => {
    setShowMenu(!showMenu);
    mobileNavLinks.current!.classList.toggle("showMenu");
  };

  return (
    <>
      <nav className={`navContainer ${show && "navContainer-black"}`}>
        <div className='navImageContainer'>
          <img src={notflix} alt='notflix banner' />
        </div>
        {!showMenu && (
          <div className='navLinks'>
            <Link to='/'>Home</Link>
            <Link to='/movies'>Movies</Link>
            <Link to='/tv'>TV Shows</Link>
            <Link to='/new-and-popular'>New and Popular</Link>
          </div>
        )}

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

        <div className='menuIconContainer' onClick={openMenu}>
          {showMenu ? <CgCloseO /> : <CgMenuRound />}
        </div>
      </nav>

      <div className='mobileNavLinks' ref={mobileNavLinks}>
        <Link to='/' onClick={openMenu}>
          Home
        </Link>
        <Link to='/movies' onClick={openMenu}>
          Movies
        </Link>
        <Link to='/tv' onClick={openMenu}>
          TV Shows
        </Link>
        <Link to='/new-and-popular' onClick={openMenu}>
          New and Popular
        </Link>
      </div>
    </>
  );
}
