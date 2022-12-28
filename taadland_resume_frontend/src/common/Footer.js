import React from "react";
import {FaEnvelope, FaGithub, FaLinkedin, FaStackOverflow} from "react-icons/fa";
import './Footer.scss';

const Footer = () => {
  return (
    <div id='footer'>
      <p>Thorya Aadland © 2022.</p>
      <a href="mailto:thoryagudrun@gmail.com" alt='email link'><FaEnvelope /></a> 
      <a href="https://www.linkedin.com/in/thorya-aadland/" alt='LinkedIn Link'><FaLinkedin /></a> 
      <a href="https://stackoverflow.com/users/9457623/" alt='Stack Overflow Link'><FaStackOverflow /></a> 
      <a href="https://github.com/ZontarZon" alt='Git Hub Link'><FaGithub /></a> 
      <p>Like the website? <a href="https://github.com/ZontarZon/taadland_resume">View my source code here!</a></p>
    </div>
  );
};

export default Footer;