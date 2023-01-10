import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";
import FunWithTeila from "../FunWithTeila/FunWithTeila";
const Game = () => {

  return (
    <div className="body_content_container_child">
      <BodyContentHeader
        headerTitle="Game Corner"
        headerSubtitle="Play games with space cats."
        imgSrc="planet_1.svg"
        imgAlt="planet 1"
      />

      <FunWithTeila />
    </div>
  );
};

export default Game;