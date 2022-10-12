import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";
import WorkInProgressMsg from "../common/WorkInProgressMsg";
const Gallery = () => {

  return (
    <div>
      <BodyContentHeader
        headerTitle="Art Gallery"
        headerSubtitle="View the shinies."
        imgSrc="planet_dark.svg"
        imgAlt="planet dark mode"
      />
      <WorkInProgressMsg />
    </div>
  );
};

export default Gallery;