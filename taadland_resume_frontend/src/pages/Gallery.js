import React, {useEffect, useRef, useState} from "react";
import {FaArrowLeft, FaArrowRight, FaTimes} from "react-icons/fa";
import BodyContentHeader from "../common/BodyContentHeader";
import "./Gallery.scss";

const ArtPost = ({url, altText, onClick}) => {
  return (
    <div className="art_post" onClick={onClick}>
      <img className="art_img" src={url} alt={altText} />
    </div>
  );
};

const Gallery = () => {
  let galleryItemsList = require(`./GalleryItems.json`);

  const [largeImgPopupIndex, setLargeImgPopupIndex] = useState(null);
  const popupRef = useRef(null);
  const popupNextBtnRef = useRef(null);
  const popupPreviousBtnRef = useRef(null);
  /**
   * Alert if clicked on outside of element
   * @source: https://stackoverflow.com/a/42234988/9457623
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (popupNextBtnRef.current && popupNextBtnRef.current.contains(event.target)) {
          setLargeImgPopupIndex(largeImgPopupIndex+1)
        } else if (popupPreviousBtnRef.current && popupPreviousBtnRef.current.contains(event.target)) {
          setLargeImgPopupIndex(largeImgPopupIndex-1)
        } else {
        setLargeImgPopupIndex(null);          
        }

      }
    }
    // Bind the event listener
    if (largeImgPopupIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [largeImgPopupIndex]);

  return (
    <div id='art_gallery_container'>
      <div
        id="large_art_popup_graybox"
        style={{display: largeImgPopupIndex !== null ? "flex" : "none"}}
      >
        <button
          id="large_art_popup_close_btn"
          onClick={() => setLargeImgPopupIndex(null)}
          alt="close popup"
        >
          <FaTimes color="white" size={"40px"} />
        </button>

        <button
          id="large_art_popup_previous_btn"
          style={{display: largeImgPopupIndex === 0 ? 'none' : ''}}
          ref={popupPreviousBtnRef}
          alt="previous image"
        >
          <FaArrowLeft color="white" size={"40px"} />
        </button>

        <button
          id="large_art_popup_next_btn"
          style={{display: largeImgPopupIndex === galleryItemsList.length - 1 ? 'none' : ''}}
          ref={popupNextBtnRef}
          alt="next image"
        >
          <FaArrowRight color="white" size={"40px"} />
        </button>

        <div id="large_art_popup_container" ref={popupRef}>
          <img
            id="large_art_img"
            src={
              largeImgPopupIndex !== null
                ? galleryItemsList[largeImgPopupIndex].url
                : ""
            }
            alt={
              largeImgPopupIndex !== null
                ? galleryItemsList[largeImgPopupIndex].altText
                : ""
            }
          />
        </div>
      </div>

      <BodyContentHeader
        headerTitle="Art Gallery"
        headerSubtitle="View the shinies."
        imgSrc="teila_head.png"
        imgAlt="teila's head"
      />

      <div id="art_posts_flex_container">
        {galleryItemsList.map((value, index) => (
          <ArtPost
            key={index}
            url={value.url}
            altText={value.alt_text}
            onClick={() => {
              console.log('index:', index);
              setLargeImgPopupIndex(index);}}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
