import React from "react";
import BodyContentHeader from "../common/BodyContentHeader";
import WorkInProgressMsg from "../common/WorkInProgressMsg";
import FunWithTeila from "../FunWithTeila/FunWithTeila";
const Game = () => {

  return (
    <div>
      <BodyContentHeader
        headerTitle="Game Corner"
        headerSubtitle="Play games with space cats."
        imgSrc="planet_1.svg"
        imgAlt="planet 1"
      />
      <WorkInProgressMsg />
      <FunWithTeila />
    </div>
  );
};

export default Game;