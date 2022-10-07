import {debounce} from "lodash";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {PerspectiveCamera, Scene} from "three";
import "./FunWithTeila.scss";
import PlayArea from "./PlayArea";

const FunWithTeila = () => {
  const fov = 25; // AKA Field of View
  const aspect = window.innerWidth / 600;
  const near = 0.1; // the near clipping plane
  const far = 4800; // the far clipping plane
  const camera = new PerspectiveCamera(fov, aspect, near, far);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / 600
    camera.updateProjectionMatrix()
    //renderer.setSize(window.innerWidth, window.innerHeight)
    //render()
}
  // every object is initially created at ( 0, 0, 0 )
  // move the camera back so we can view the scene
  camera.position.set(0, 800, 1500);
  camera.lookAt(0, 0, 0);
  const scene = new Scene();

  return (
    <div id="canvas_container">
      <PlayArea camera={camera} scene={scene}>
        <canvas id="canvas"></canvas>
      </PlayArea>
    </div>
  );
};

export default FunWithTeila;
