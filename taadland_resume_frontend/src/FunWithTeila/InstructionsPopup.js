import React from "react";
import {FaTimes} from "react-icons/fa";
import "./InstructionsPopup.scss";

const InstructionsPopup = ({setShowInstructions}) => {
  return (
    <div id="popup_graybox_backdrop">
      <div id="popup_box">
        <h1>Instructions</h1>
        <p>
          Unfortunately, while transporting some essentials through the space
          station, Egbert the space cat accidentally activated the SGP
          (Synthetic Gravity Protocol). Poor Egbert thought it meant SGP (Salmon
          and Gravy Paté).
        </p>
        <p>
          This isn't the first time he mistook a label for something else. Last
          time, he mistook the EAS (Evacuation Alarm System) for the EAS (Eggs,
          Ahi, and Sushi).
        </p>
        <p>
          Food is now falling to the ground, and he needs to save as much of it
          as he can! Otherwise, he'll get fired, and he has fifteen mouths to
          feed. Yeah. Egbert needs a good TNR ... and I don't mean TNR (Tuna, Nigiri, Roe).
        </p>
        <hr />
        <div id="exit_btn_container" onClick={() => setShowInstructions(false)}>
          <FaTimes color="white" />
        </div>
        <div id="instructions_grid_1">
          <span>
            Food will periodically fall from the ceiling. As food falls to the
            ground, you'll see its shadow grow larger.
          </span>
          <div>
            <img
              className="instructions_img"
              alt="falling fruit"
              src="game_food_icons/falling_obj_sprite_3.png"
            />
          </div>
        </div>
        <div id="instructions_grid_2">
          <div>
            <img
              className="instructions_img"
              alt="cat player sprite"
              src="cat_sprite_anims/cat_run.png"
            />
          </div>
          <span>
            Click or tap the platform to make Egbert run to that location. Try
            to pick up as much food as you can before the time runs out!
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
