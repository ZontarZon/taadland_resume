import React, {useEffect, useRef, useState} from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import {WebGLRenderer, Clock, Raycaster, Vector3, TextureLoader} from "three";
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
  const renderer = useRef(null);
  const raycaster = new Raycaster();
  const KEYCODES = {
    w: 87,
    a: 65,
    s: 83,
    d: 68,
  };
  let container;
  var clock = new Clock();
  var playerClock = new Clock();
  var speed = 50;
  var playerSpeed = 300;
  var delta = 0;
  var playerDelta = 0;

  const render = () => {
    if (renderer.current) {
      renderer.current.render(scene, camera);
      return null;
    }
  };

  const animate = () => {
    if (renderer.current.gameInProgress) {
      moveFallingObjectsDown();
      checkForCollisions();
    }
    requestAnimationFrame(animate);

    render();
  };

  const onWindowResize = () => {
    if (renderer.current) renderer.current.setSize(window.innerWidth, 600);
    render();
  };

  const onKeyPress = (event) => {
    let char = scene.getObjectByName("characterMesh");
    if (char.currentSprite !== "run" && event.type === "keydown") {
      let newTexture = new TextureLoader().load("cat_run.png");
      if (event.keyCode === KEYCODES.a) char.scale.x = -1;
      else if (event.keyCode === KEYCODES.d) char.scale.x = 1;
      char.material.map = newTexture;
      char.currentSprite = "run";
    } else if (char.currentSprite !== "idle" && event.type === "keyup") {
      let newTexture = new TextureLoader().load("cat_idle.png");
      if (event.keyCode === KEYCODES.a) char.scale.x = -1;
      else if (event.keyCode === KEYCODES.d) char.scale.x = 1;
      char.material.map = newTexture;
      char.currentSprite = "idle";
    }

    let change = event.type === "keydown";
    if (event.keyCode === KEYCODES.w) setMouseUp(change);
    else if (event.keyCode === KEYCODES.a) setMouseLeft(change);
    else if (event.keyCode === KEYCODES.s) setMouseDown(change);
    else if (event.keyCode === KEYCODES.d) setMouseRight(change);
  };

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("keydown", onKeyPress, false);
  document.addEventListener("keyup", onKeyPress, false);

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

    playerDelta = playerClock.getDelta();
    if (mouseDown) {
      if (char.position.z >= 350) return;
      char.translateZ(playerSpeed * playerDelta);
    } else if (mouseUp) {
      if (char.position.z <= -350) return;
      char.translateZ(-(playerSpeed * playerDelta));
    } else if (mouseLeft) {
      if (char.position.x <= -350) return;
      char.translateX(-(playerSpeed * playerDelta));
    } else if (mouseRight) {
      if (char.position.x >= 350) return;
      char.translateX(playerSpeed * playerDelta);
    }
    console.log(char);
  };

  const checkForCollisions = () => {
    let char = scene.getObjectByName("characterMesh");
    raycaster.set(
      char.position,
      new Vector3()
        .subVectors(
          new Vector3(char.position.x, -10, char.position.z),
          char.position
        )
        .normalize()
    );
    let intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.objectType === "fallingObjShadow") {
        let fallingObj = scene.getObjectByName(
          intersects[i].object.fallingObjectName
        );
        if (fallingObj.position.y < 100) {
          console.log("REMOVING OBJECT");
          scene.remove(fallingObj);
          scene.remove(scene.getObjectByName(intersects[i].object.name));
          return;
        }
      }
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

  useEffect(() => {
    if (scene) {
      console.log(scene);
    }
  }, [scene]);

  return (
    <div id="game_container">
      <div id="player_move_btn_grid">
        <div
          className="player_move_btn h"
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
        >
          <FaArrowDown />
        </div>
        <div
          className="player_move_btn b"
          onMouseDown={() => setMouseUp(true)}
          onMouseUp={() => setMouseUp(false)}
        >
          <FaArrowUp />
        </div>
        <div
          className="player_move_btn d"
          onMouseDown={() => setMouseLeft(true)}
          onMouseUp={() => setMouseLeft(false)}
        >
          <FaArrowLeft />
        </div>
        <div
          className="player_move_btn f"
          onMouseDown={() => setMouseRight(true)}
          onMouseUp={() => setMouseRight(false)}
        >
          <FaArrowRight />
        </div>
      </div>
      <div id="start_end_game_btns_container">
        <div
          className="start_end_game_btn"
          onClick={() => {
            setGameInProgress(true);
            console.log("STARTING GAME");
            if (renderer.current) renderer.current.gameInProgress = true;
          }}
        >
          Start Game
        </div>
        <div
          className="start_end_game_btn"
          onClick={() => {
            setGameInProgress(false);
            if (renderer.current) renderer.current.gameInProgress = false;
            clearFallingObjects();
          }}
        >
          End Game
        </div>
      </div>
    </div>
  );
};

export default PlayArea;
