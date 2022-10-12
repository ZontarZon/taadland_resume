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
          station, the space cats accidentally activated the artificial gravity
          switch. Food is now falling to the ground, and it's your job to save
          as much of it as you can!
        </p>
        <hr />
        <div id="exit_btn_container" onClick={() => setShowInstructions(false)}>
          <FaTimes color="white" />
        </div>
        <div id="instructions_grid_1">
          <span>
          Food will periodically fall from the ceiling. As food falls to the ground, you'll see its shadow grow larger.
          </span>
          <div>
          <img
              className="instructions_img"
              alt="falling fruit"
              src="falling_obj_sprite_3.png"
            />
            
          </div>
        </div>
        <div id="instructions_grid_2">
          <div>
          <img
              className="instructions_img"
              alt="cat player sprite"
              src="cat_run.png"
            />
          </div>
          <span>
          Click or tap the platform to make the kitty slide to that location. Try to pick up as much
            food as you can before the time runs out!
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
