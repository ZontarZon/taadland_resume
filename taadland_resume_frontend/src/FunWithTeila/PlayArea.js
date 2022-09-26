import React, {createRef, useEffect, useRef, useState} from "react";
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
  const [playerPos, setPlayerPos] = useState({x: 0, z: 0});
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);
  const [mouseRight, setMouseRight] = useState(false);
  const [animateRunning, setAnimateRunning] = useState(false);
  const playArea = createRef();
  const renderer = useRef(null);
  let container;

  const render = () => {
    if (renderer.current) {
      renderer.current.render(scene, camera);
      return null;
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  useEffect(() => {
    let char = scene.getObjectByName("characterMesh");
    if (!playerPos || !char) return;
    char.position.set(playerPos.x, 50, playerPos.z);
    //scene.add(char);
  }, [playerPos]);

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
    //draw();
  };

  useEffect(() => {
    if (!container) {
      createRenderer(renderer, scene, render);
    }

    if (!animateRunning) {
      animate();
      setAnimateRunning(true);
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
    let char = scene.getObjectByName("characterMesh");
    if (char) return;
    const characterGeometry = new PlaneGeometry(100, 100);
    const characterMesh = new Mesh(characterGeometry, characterMaterial);
    characterMesh.position.set(0, 50, 0);
    characterMesh.name = "characterMesh";
    scene.add(characterMesh);
  }, []);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const onMouseDown = () => {
    if (mouseDown) {
      if (playerPos.z >= 350) return;
      setPlayerPos({x: playerPos.x, z: playerPos.z + 15});
    } else if (mouseUp) {
      if (playerPos.z <= -350) return;
      setPlayerPos({x: playerPos.x, z: playerPos.z - 15});
    } else if (mouseLeft) {
      if (playerPos.x <= -350) return;
      setPlayerPos({x: playerPos.x - 15, z: playerPos.z});
    } else if (mouseRight) {
      if (playerPos.x >= 350) return;
      setPlayerPos({x: playerPos.x + 15, z: playerPos.z});
    }
  };

  useInterval(onMouseDown, mouseDown || mouseUp || mouseLeft || mouseRight ? 50 : null);
  

  useEffect(() => {
    if (scene) {
      console.log(scene);
    }
  }, [scene]);

  return (
    <div>
      <button
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
      >
        Down
      </button>
      <button
        onMouseDown={() => {
          setMouseUp(true);
        }}
        onMouseUp={() => {
          setMouseUp(false);
        }}
      >
        Up
      </button>
      <button
        onMouseDown={() => {
          setMouseLeft(true);
        }}
        onMouseUp={() => {
          setMouseLeft(false);
        }}
      >
        Left
      </button>
      <button
        onMouseDown={() => {
          console.log('right');
          setMouseRight(true);
        }}
        onMouseUp={() => {
          setMouseRight(false);
        }}
      >
        Right
      </button>
      <div className="play_area" ref={playArea}>
        {children}
      </div>
    </div>
  );
};

export default PlayArea;
