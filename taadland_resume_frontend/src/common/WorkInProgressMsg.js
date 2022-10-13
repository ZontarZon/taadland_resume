import React from "react";
import {FaExclamationTriangle} from "react-icons/fa";
import "./WorkInProgressMsg.scss";

const WorkInProgressMsg = () => {
  return (
    <div id="work_in_progress_container">
      <div>
        <h2>
          <FaExclamationTriangle color="white" /> This page is under
          construction.
        </h2>
        <h4>
          The space cats are hard at work, but they get distracted by all the
          cardboard boxes.
        </h4>
        <h4>More content will be added soon!</h4>
      </div>
      <div id="teila_wip_img_container">
        <img
          id="teila_wip_img"
          src="teila_wip_tooltip.png"
          alt="teila construction"
        />
      </div>
    </div>
  );
};

export default WorkInProgressMsg;
