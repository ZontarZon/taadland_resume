import React, {createRef, useEffect, useRef, useState} from "react";
import {WebGLRenderer, Clock} from "three";
import {
  initializeCharacter,
  initializeFallingObject,
  initializeFloor,
} from "./Utilities/InitializeObjectFuncs";
const PlayArea = ({scene, camera, children}) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);
  const [mouseRight, setMouseRight] = useState(false);
  const [animateRunning, setAnimateRunning] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);

  const playArea = createRef();
  const renderer = useRef(null);

  const KEYCODES = {
    w: 87,
    a: 65,
    s: 83,
    d: 68,
  };
  let container;
  var clock = new Clock();
  var speed = 50; //units a second
  var playerSpeed = 15;
  var delta = 0;
  var playerDelta = 0;

  const render = () => {
    if (renderer.current) {
      renderer.current.render(scene, camera);
      return null;
    }
  };

  const animate = () => {
    if (renderer.current.gameInProgress) moveFallingObjectsDown();
    requestAnimationFrame(animate);

    render();
  };

  const onWindowResize = () => {
    if (renderer.current) renderer.current.setSize(window.innerWidth, 600);
    render();
  };

  const onKeyDown = (event) => {
    //playerDelta = clock.getDelta();
    switch (event.keyCode) {
      case KEYCODES.w:
        setMouseUp(true)
        break;
      case KEYCODES.a:
        setMouseLeft(true)
        break;
      case KEYCODES.s:
        setMouseDown(true)
        break;
      case KEYCODES.d:
        setMouseRight(true)
        break;
      default:
        break;
    }
  };

  const onKeyUp = (event) => {
    //playerDelta = clock.getDelta();
    switch (event.keyCode) {
      case KEYCODES.w:
        setMouseUp(false)
        break;
      case KEYCODES.a:
        setMouseLeft(false)
        break;
      case KEYCODES.s:
        setMouseDown(false)
        break;
      case KEYCODES.d:
        setMouseRight(false)
        break;
      default:
        break;
    }
  };

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  const createRenderer = () => {
    const container = document.querySelector("#canvas");
    renderer.current = new WebGLRenderer({
      canvas: container,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    });
    scene.background = null;
    renderer.current.setSize(window.innerWidth, 600);
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
    let char = scene.getObjectByName("characterMesh");
    if (mouseDown) {
      if (char.position.z >= 350) return;
      char.translateZ(15);
    } else if (mouseUp) {
      if (char.position.z <= -350) return;
      char.translateZ(-15);
    } else if (mouseLeft) {
      if (char.position.x <= -350) return;
      char.translateX(-15);
    } else if (mouseRight) {
      if (char.position.x >= 350) return;
      char.translateX(15);
    }
  };

  const spawnFallingObject = () => {
    let newObjects = initializeFallingObject();
    let newFallingObj = newObjects.fallingObj;
    let newFallingObjShadow = newObjects.shadow;
    scene.add(newFallingObj);
    scene.add(newFallingObjShadow);
  };

  const clearFallingObjects = () => {
    let objectsToRemove = [];
    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].objectType === "fallingObj") {
        objectsToRemove.push(scene.children[i].name);
        objectsToRemove.push(scene.children[i].shadowName);
      }
    }
    console.log(objectsToRemove);
    for (let a = 0; a < objectsToRemove.length; a++) {
      scene.remove(scene.getObjectByName(objectsToRemove[a]));
    }
  };

  useInterval(
    onMouseDown,
    mouseDown || mouseUp || mouseLeft || mouseRight ? 50 : null
  );

  useInterval(spawnFallingObject, gameInProgress ? 2000 : null);

  const moveFallingObjectsDown = () => {
    console.log("MOVING OBJECTS");
    delta = clock.getDelta();

    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].objectType === "fallingObj") {
        let fallingObj = scene.getObjectByName(scene.children[i].name);
        if (!fallingObj.frames) fallingObj.frames = 0;
        let shadowObj = scene.getObjectByName(fallingObj.shadowName);
        let objNewPos = fallingObj.position.clone();
        objNewPos.x = fallingObj.position.x;
        objNewPos.y = 0;
        objNewPos.z = fallingObj.position.z;

        fallingObj.translateY(-(speed * delta));

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

  //useInterval(moveFallingObjectsDown, gameInProgress ? 50 : null);

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
      <button
        onClick={() => {
          setGameInProgress(true);
          console.log("STARTING GAME");
          if (renderer.current) renderer.current.gameInProgress = true;
        }}
      >
        Start Game
      </button>
      <button
        onClick={() => {
          setGameInProgress(false);
          if (renderer.current) renderer.current.gameInProgress = false;
          clearFallingObjects();
        }}
      >
        End Game
      </button>
    </div>
  );
};

export default PlayArea;
