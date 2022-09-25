import React, {createRef, useEffect, useRef} from "react";
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  WebGLRenderer,
} from "three";

const PlayArea = ({scene, camera, children}) => {
  const playArea = createRef();
  const renderer = useRef(null);
  let container;

  const draw = () => {
    if (renderer.current) {
      renderer.current.render(scene, camera);
      return null;
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    draw();
  };

  const createRenderer = () => {
    const container = document.querySelector("#canvas");
    renderer.current = new WebGLRenderer({
      canvas: container,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    });
    scene.background = null;
    renderer.current.setSize(800, 800);
    draw();
  };

  useEffect(() => {
    if (!container) {
      createRenderer(renderer, scene, draw);
    }
    const geometry = new PlaneGeometry(800, 800);
    const material = new MeshBasicMaterial({
      opacity: 1,
      side: DoubleSide,
      color: 0x00ff00,
    });

    const floorMesh = new Mesh(geometry, material);
    floorMesh.position.set(0, 0, 0);
    floorMesh.rotation.x = Math.PI / 2;

    floorMesh.name = "floorMesh";
    scene.add(floorMesh);
  });

  useEffect(() => {
    if (scene) {
      console.log(scene);
    }
  }, [scene]);

  animate();
  return (
    <div className="play_area" ref={playArea}>
      {children}
    </div>
  );
};

export default PlayArea;
