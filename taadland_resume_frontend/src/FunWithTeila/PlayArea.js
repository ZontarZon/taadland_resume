import React, {createRef, useEffect, useRef} from "react";
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader,
  WebGLRenderer
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
    renderer.current.setSize(800, 600);
    draw();
  };

  useEffect(() => {
    if (!container) {
      createRenderer(renderer, scene, draw);
    }

    let groundTexture = new TextureLoader().load("floor_texture.png");
    groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(8, 8);
    groundTexture.encoding = sRGBEncoding;
    let groundMaterial = new MeshBasicMaterial({
      map: groundTexture,
      side: DoubleSide,
    });
    const groundGeometry = new PlaneGeometry(800, 800);
    const floorMesh = new Mesh(groundGeometry, groundMaterial);
    floorMesh.position.set(0, 0, 0);
    floorMesh.rotation.x = Math.PI / 2;

    floorMesh.name = "floorMesh";
    scene.add(floorMesh);

    // playable char init
    let characterTexture = new TextureLoader().load("cat.png");
    characterTexture.encoding = sRGBEncoding;
    let characterMaterial = new MeshBasicMaterial({
      map: characterTexture,
      side: DoubleSide,
      transparent: true,
    });
    const characterGeometry = new PlaneGeometry(100, 100);
    const characterMesh = new Mesh(characterGeometry, characterMaterial);
    characterMesh.position.set(400, 50, 0);
    //characterMesh.rotation.x = 5*Math.PI / 3;
    scene.add(characterMesh);
  }, []);

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
