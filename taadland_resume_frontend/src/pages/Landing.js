import React from "react";
import {FaCode, FaEnvelope, FaLinkedin} from "react-icons/fa";
import "./Landing.scss";
const Landing = () => {
  return (
    <div className="body_content_container_child">
      <div id="landing_header_container">
        <div id="landing_header_txt_container">
          <div id="landing_h1_container">
            <img
              id="landing_h1_icon"
              alt="white_lines_decor"
              src="white_lines_icon_1.svg"
            />

            <h1 id="landing_h1">Thorya Aadland</h1>
          </div>
          <h3 id="landing_h3">
            Front-end web developer. UI designer. Digital artist. Cats.
          </h3>
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
              <a href="https://github.com/ZontarZon">GitHub</a>
            </div>
          </div>
        </div>
        <div id="landing_header_img_container">
          <img id="teila_img" alt={"cat in space"} src={"teila_in_space.png"} />
        </div>
      </div>

      <div id="landing_company_icons_container">
        <a href="https://www.smartrobottutor.com/">
          <img
            className="company_logo"
            src="van_robotics_current_logo.svg"
            alt="van robotics logo"
          />
        </a>
        <a href="https://sc.edu/">
          <img
            className="company_logo"
            src="uofsc_logo.svg"
            alt="university of sc logo"
          />
        </a>
        <img id="planet_1" alt="planet_purple" src="planet_1.png" />
        <img id="planet_2" alt="planet_green" src="planet_2.png" />
        <div id="moon_1" />
      </div>

      <div id="landing_about_me_container">
        <div id="landing_about_me_text">
          <h1 id="landing_about_me_h1">
            STEM and the arts, working in harmony.
          </h1>
          <h2 id="landing_about_me_h2">
            My name is Thorya Aadland (pronounced TORE-yuh ODD-lund), but many
            people simply call me Zon.
            <br/><br/>
            I'm a digital artist turned software
            developer specializing in UI design and development. My background
            in both computer science and digital art gives me an edge in
            creating fun, effective websites and user interfaces.
          </h2>
        </div>

        <div id="landing_about_me_gradient_bg">
          <img
            id="landing_about_me_stars"
            alt="stars"
            src="stars_transparent.svg"
          />

          <div id="landing_about_me_planet_1">
            <div id="landing_about_me_planet_1_ring" />
          </div>

          <div id="landing_about_me_planet_2">
            <div id="landing_about_me_planet_2_ring_1" />
            <div id="landing_about_me_planet_2_ring_2" />
          </div>

          <div id="landing_about_me_planet_3">
            <div id="landing_about_me_planet_3_ring" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
