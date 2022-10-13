import React from "react";
import {FaCode, FaEnvelope, FaLinkedin} from "react-icons/fa";
import "../pages/Landing.scss";
import "./BodyContentHeader.scss";

const BodyContentHeader = ({headerTitle, headerSubtitle, imgSrc, imgAlt}) => {
  return (
    <div>
      <div id="body_content_header_container">
        <div id="landing_header_txt_container">
          <div id="landing_h1_container">
            <img
              id="landing_h1_icon"
              alt="white_lines_decor"
              src="white_lines_icon_1.svg"
            />

            <h1 id="body_content_h1">{headerTitle}</h1>
          </div>
          <h4 id="body_content_h4">{headerSubtitle}</h4>
          <div id="contact_info_container">
            <div className="contact_info">
              <FaEnvelope />
              <a href="mailto:thoryagudrun@gmail.com">Email</a>
            </div>

            <div className="contact_info">
              <FaLinkedin />
              <a href="https://www.linkedin.com/in/thorya-aadland/">LinkedIn</a>
            </div>

            <div className="contact_info">
              <FaCode />
              <a href="https://stackoverflow.com/users/9457623/">
                Stackoverflow
              </a>
            </div>

            <div className="contact_info">
              <FaCode />
              <a href="https://github.com/ZontarZon">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="header_img_container">
          <img alt={imgAlt} src={imgSrc} />
        </div>
      </div>
    </div>
  );
};

export default BodyContentHeader;
