import React from "react";
import './BodyContentHeader.scss';

const BodyContentHeader = ({headerTitle, headerSubtitle, imgSrc, imgAlt}) => {
  return (
    <div className="body_content_header">
    <div className="body_content_header_txt_container">
      <h1>{headerTitle}</h1>
      {headerSubtitle && <h3>{headerSubtitle}</h3>}
    <div className="header_img_container">
      <img alt={imgAlt} src={imgSrc} />
    </div>      
    </div>

  </div>
  );
};

export default BodyContentHeader;