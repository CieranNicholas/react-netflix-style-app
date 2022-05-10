import { Link } from "react-router-dom";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className='footerContainer'>
      <div className='footerIconContainer'>
        <a href='https://github.com/CieranNicholas' target='_blank'>
          <FaGithub />
        </a>
        <a
          href='https://www.linkedin.com/in/cieran-nicholas-532828179/'
          target='_blank'
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
