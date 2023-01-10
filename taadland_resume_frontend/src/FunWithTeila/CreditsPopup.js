import React from "react";
import {FaTimes} from "react-icons/fa";
import "./CreditsPopup.scss";

const CreditsPopup = ({setShowCredits}) => {
  return (
    <div id="popup_graybox_backdrop">
      <div id="popup_box" className="credits_popup_content">
        <h1>Credits</h1>
        <p>
          Meat icons © Nguyen Ho. Images are derivatives (cropped).
          <br />
          <a
            href="https://opengameart.org/content/meat-02"
            rel="noopener noreferrer"
            target="_blank"
          >
            Meat Slab
          </a>
          <a
            href="https://opengameart.org/content/meat-03"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ham
          </a>
          <a
            href="https://opengameart.org/content/fish-icon"
            rel="noopener noreferrer"
            target="_blank"
          >
            Fish
          </a>
          <a
            href="https://opengameart.org/content/lobster-tail"
            rel="noopener noreferrer"
            target="_blank"
          >
            Lobster Tail
          </a>
        </p>
        <p>
          Other game assets are public domain and courtesy of{" "}
          <a
            href="https://opengameart.org/"
            style={{margin: '0px'}}
            rel="noopener noreferrer"
            target="_blank"
          >
            OpenGameArt.org
          </a>
          .
        </p>
        <div id="exit_btn_container" onClick={() => setShowCredits(false)}>
          <FaTimes color="white" />
        </div>
      </div>
    </div>
  );
};

export default CreditsPopup;
