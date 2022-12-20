import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Navbar.scss";

import { FaSearch } from "react-icons/fa";

import { AiFillCloseCircle } from "react-icons/ai";

import { CgMenuRound, CgCloseO } from "react-icons/cg";

import notflix from "./notflix.png";

interface Types {
  setSearchData: any;
  searchData: any;
}

export default function Navbar({ setSearchData, searchData }: Types) {
  const [show, handleShow] = useState<boolean>(false);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const searchInput = useRef<HTMLInputElement>(null);

  const mobileNavLinks = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  document.addEventListener("keydown", (event: any) => {
    if (event.key === "Escape") {
      setShowSearch(false);
    }
  });

  useEffect(() => {
    if (searchData !== "") {
      navigate("/search");
    }
  }, [searchData]);

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
          <Link to='/'>
            <img src={notflix} alt='notflix banner' />
          </Link>
        </div>
        {!showMenu && (
          <div className='navLinks'>
            <Link to='/'>Home</Link>
            <Link to='/movies'>Movies</Link>
            <Link to='/tv'>TV Shows</Link>
          </div>
        )}

        <div className='search-icon-container'>
          {showSearch ? (
            <input
              type='text'
              className='searchInput'
              ref={searchInput}
              onBlur={() => setShowSearch(false)}
              onChange={(e: any) => setSearchData(e.target.value)}
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
      </div>
    </>
  );
}
