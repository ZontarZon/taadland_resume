import React, {Suspense} from "react";
import {FaSpinner} from "react-icons/fa";
import {PerspectiveCamera, Scene} from "three";
import "./FunWithTeila.scss";
const PlayArea = React.lazy(() => import("./PlayArea.js"));

const FunWithTeila = () => {
  const fov = 25;
  const aspect = window.innerWidth / 600;
  const near = 1;
  const far = 3200;
  const camera = new PerspectiveCamera(fov, aspect, near, far);

  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / 600;
    camera.updateProjectionMatrix();
  }
  camera.position.set(0, 800, 1500);
  camera.lookAt(0, 0, 0);
  const scene = new Scene();

  return (
    <div id="canvas_container">
      <Suspense
        fallback={
          <div style={{textAlign: "center", margin: "10px", fontSize: "30px"}}>
            <FaSpinner color="white" /> Loading
          </div>
        }
      >
        <PlayArea camera={camera} scene={scene} />
      </Suspense>
      <canvas id="canvas" />
    </div>
  );
};

export default FunWithTeila;
