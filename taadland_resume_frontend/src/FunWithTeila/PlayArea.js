import React, {createRef, useEffect, useRef, useState} from "react";
import {WebGLRenderer} from "three";
import {
  initializeCharacter,
  initializeFallingObject,
  initializeFloor,
} from "./Utilities/InitializeObjectFuncs";
const PlayArea = ({scene, camera, children}) => {
  const [playerPos, setPlayerPos] = useState({x: 0, z: 0});
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);
  const [mouseRight, setMouseRight] = useState(false);
  const [animateRunning, setAnimateRunning] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);

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
  };

  useEffect(() => {
    if (!container) {
      createRenderer(renderer, scene, render);
    }

    let floorMesh = initializeFloor(scene);
    if (floorMesh) scene.add(floorMesh);

    let characterMesh = initializeCharacter(scene);
    if (characterMesh) scene.add(characterMesh);

    if (!animateRunning) {
      animate();
      setAnimateRunning(true);
    }
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

  const spawnFallingObject = () => {
    let newObjects = initializeFallingObject();
    let newFallingObj = newObjects.fallingObj;
    let newFallingObjShadow = newObjects.shadow;
    scene.add(newFallingObj);
    scene.add(newFallingObjShadow);
  };

  useInterval(
    onMouseDown,
    mouseDown || mouseUp || mouseLeft || mouseRight ? 50 : null
  );

  useInterval(spawnFallingObject, gameInProgress ? 3000 : null);

  const moveFallingObjectsDown = () => {
    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].objectType === "fallingObj") {
        let fallingObj = scene.getObjectByName(scene.children[i].name);
        let shadowObj = scene.getObjectByName(fallingObj.shadowName);
        fallingObj.position.set(
          fallingObj.position.x,
          fallingObj.position.y - 2,
          fallingObj.position.z
        );

        let percentDistanceFallen = 1 - fallingObj.position.y / 600;
        let newRadiusScale = 1 + percentDistanceFallen * 11;
        shadowObj.scale.set(newRadiusScale, newRadiusScale, newRadiusScale);
        if (fallingObj.position.y <= 15) {
          scene.remove(shadowObj);
          scene.remove(fallingObj);
        }
      }
    }
  };

  useInterval(moveFallingObjectsDown, gameInProgress ? 50 : null);

  useEffect(() => {
    if (scene) {
      console.log(scene);
    }
  }, [scene]);

  return (
    <div>
      <button
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        Down
      </button>
      <button
        onMouseDown={() => setMouseUp(true)}
        onMouseUp={() => setMouseUp(false)}
      >
        Up
      </button>
      <button
        onMouseDown={() => setMouseLeft(true)}
        onMouseUp={() => setMouseLeft(false)}
      >
        Left
      </button>
      <button
        onMouseDown={() => setMouseRight(true)}
        onMouseUp={() => setMouseRight(false)}
      >
        Right
      </button>
      <div className="play_area" ref={playArea}>
        {children}
      </div>
      <button onClick={() => setGameInProgress(true)}>Start Game</button>
      <button onClick={() => setGameInProgress(false)}>End Game</button>
    </div>
  );
};

export default PlayArea;
