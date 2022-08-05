import React from "react";
import {FaEnvelope, FaLinkedin} from "react-icons/fa";
import "./Landing.scss";
const Landing = () => {
  return (
    <div>
      <div id="landing_header_container">
        <div id="landing_header_txt_container">
          <div id='landing_h1_container'>
          <img id='landing_h1_icon' alt='white_lines_decor' src="white_lines_icon_1.svg"/>

          <h1 id="landing_h1">Thorya Aadland</h1>
          </div>
          <h3 id="landing_h3">
            Front-end web developer. UI designer. Digital artist. Cats.
          </h3>
          <div id="contact_info_container">
        <div className="contact_info">
          <FaEnvelope />
          <a href="mailto:thoryagudrun@gmail.com">thoryagudrun@gmail.com</a>
        </div>

        <div className="contact_info">
          <FaLinkedin />
          <a href="https://www.linkedin.com/in/thorya-aadland/">
            thorya-aadland
          </a>
        </div>
      </div>
        </div>
        <div id="landing_header_img_container">
          <img id="teila_img" alt={"cat in space"} src={"teila_in_space.png"} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
