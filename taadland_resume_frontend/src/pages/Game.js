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
        imgSrc="planet_dark.svg"
        imgAlt="planet dark mode"
      />
      <WorkInProgressMsg />
      <FunWithTeila />
    </div>
  );
};

export default Game;