import React from "react";
import {
  AiFillInstagram,
  AiOutlineLinkedin,
  AiFillFacebook,
  AiOutlineWhatsApp,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Forest Creations All rights reserverd</p>
      <p className="icons">
        <a href="https://www.instagram.com/forest.creations/" target="_blank">
          <AiFillInstagram />
        </a>
        <a
          href="https://za.linkedin.com/company/forest-creations-pty-ltd"
          target="_blank"
        >
          <AiOutlineLinkedin />
        </a>
        <a
          href="https://www.facebook.com/ForestCreationsTimberDesigns/"
          target="_blank"
        >
          <AiFillFacebook />
        </a>
        <a
          href="https://www.facebook.com/ForestCreationsTimberDesigns/"
          target="_blank"
        >
          <AiFillYoutube />
        </a>
        <a
          href="https://www.facebook.com/ForestCreationsTimberDesigns/"
          target="_blank"
        >
          <AiOutlineWhatsApp />
        </a>
      </p>
    </div>
  );
};

export default Footer;
