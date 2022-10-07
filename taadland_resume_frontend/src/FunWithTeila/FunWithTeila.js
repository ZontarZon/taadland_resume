import {PerspectiveCamera, Scene} from "three";
import "./FunWithTeila.scss";
import PlayArea from "./PlayArea";

const FunWithTeila = () => {
  const fov = 25;
  const aspect = window.innerWidth / 600;
  const near = 0.1;
  const far = 4800;
  const camera = new PerspectiveCamera(fov, aspect, near, far);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / 600
    camera.updateProjectionMatrix()
}
  camera.position.set(0, 800, 1500);
  camera.lookAt(0, 0, 0);
  const scene = new Scene();

  return (
    <div id="canvas_container">
      <PlayArea 
      camera={camera}
      scene={scene}
      />
      <canvas id="canvas"/>
    </div>
  );
};

export default FunWithTeila;
