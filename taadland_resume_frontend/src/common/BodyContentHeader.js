import React from "react";
import {FaDownload} from "react-icons/fa";
import Pdf from "../TAadland_Resume.pdf";
import "./BodyContentHeader.scss";

const BodyContentHeader = ({headerTitle, headerSubtitle, imgSrc, imgAlt}) => {
  return (
    <div className="body_content_header">
      <div className="body_content_header_txt_container">
        <h1>{headerTitle}</h1>
        {headerSubtitle && <h3>{headerSubtitle}</h3>}
        <div className="header_img_container">
          <img alt={imgAlt} src={imgSrc} />
        </div>

        {headerTitle === "Resume" && (
          <div
            className="contact_info"
            style={{width: "fit-content", margin: "auto"}}
          >
            <FaDownload />
            <a href={Pdf} rel="noopener noreferrer" target="_blank">
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyContentHeader;
