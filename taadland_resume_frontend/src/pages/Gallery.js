import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";
import WorkInProgressMsg from "../common/WorkInProgressMsg";
const Gallery = () => {

  return (
    <div>
      <BodyContentHeader
        headerTitle="Art Gallery"
        headerSubtitle="View the shinies."
        imgSrc="teila_head.png"
        imgAlt="teila's head"
      />
      <WorkInProgressMsg />
    </div>
  );
};

export default Gallery;