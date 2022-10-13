import React, {useEffect, useRef, useState} from "react";
import {
  WebGLRenderer,
  Clock,
  Raycaster,
  Vector3,
  Vector2,
  TextureLoader,
} from "three";
import InstructionsPopup from "./InstructionsPopup";
import {
  initializeCharacter,
  initializeFallingObject,
  initializeFloor,
} from "./Utilities/InitializeObjectFuncs";

const PlayArea = ({scene, camera, children}) => {
  const [animateRunning, setAnimateRunning] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  let idleTexture = new TextureLoader().load("cat_idle.png");
  let runTexture = new TextureLoader().load("cat_run.png");

  let movingCharToPos = null;
  const renderer = useRef(null);
  const pointer = new Vector2();
  const raycaster = new Raycaster();

  let container;
  let clock = new Clock();
  let speed = 50;
  let delta = 0;

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
    if (movingCharToPos) loop(movingCharToPos);
    requestAnimationFrame(animate);
    render();
  };

  let frames = 0;
  let maxFrames = 500;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // for a better sliding effect
  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function loop(b) {
    let char = scene.getObjectByName("characterMesh");

    if (
      frames >= maxFrames ||
      Math.abs(char.position.x - b.x) <= 0.5 ||
      Math.abs(char.position.z - b.z) <= 0.5
    ) {
      frames = 0;
      if (char.currentSprite !== "walk") {
        char.material.map = idleTexture;
        char.currentSprite = "walk";
      }
      return;
    }
    let t = frames / maxFrames;
    var newX = lerp(char.position.x, b.x, ease(t));
    var newZ = lerp(char.position.z, b.z, ease(t));
    char.position.set(newX, char.position.y, newZ);
    frames++;
  }

  function onMouseClick(event) {
    frames = 0;
    let canvas = document.querySelector("canvas");

    pointer.x = (event.offsetX / canvas.clientWidth) * 2 - 1;
    pointer.y = -(event.offsetY / canvas.clientHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    let newCharX = null;
    let newCharZ = null;
    intersects.forEach((value) => {
      if (value.object.name === "floorMesh") {
        newCharX = value.point.x;
        newCharZ = value.point.z;
      }
    });

    let char = scene.getObjectByName("characterMesh");
    if (!newCharX || !newCharZ) {
      return;
    } else {
      char.material.map = runTexture;
      char.currentSprite = "run";
      if (char.position.x > newCharX) {
        if (char.scale.x !== -1) char.scale.x = -1;
      } else {
        if (char.scale.x !== 1) char.scale.x = 1;
      }
    }
    if (newCharX < -350) newCharX = -350;
    if (newCharX > 350) newCharX = 350;
    if (newCharZ < -350) newCharZ = -350;
    if (newCharZ > 350) newCharZ = 350;
    movingCharToPos = {x: newCharX, z: newCharZ};
  }
  window.addEventListener("click", onMouseClick);

  const onWindowResize = () => {
    if (renderer.current) {
      renderer.current.setSize(window.innerWidth, 600);
    }
    render();
  };

  window.addEventListener("resize", onWindowResize, false);

  const createRenderer = () => {
    const container = document.querySelector("#canvas");
    renderer.current = new WebGLRenderer({
      canvas: container,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    });
    scene.background = null;
    renderer.current.setPixelRatio(window.devicePixelRatio);
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
    // eslint-disable-next-line
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

  useInterval(spawnFallingObject, gameInProgress ? 2000 : null);

  const moveFallingObjectsDown = () => {
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

  return (
    <div id="game_container">
      {showInstructions && (
        <InstructionsPopup setShowInstructions={setShowInstructions} />
      )}

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
        <div
          className="start_end_game_btn"
          onClick={() => {
            setShowInstructions(true);
          }}
        >
          Instructions
        </div>
      </div>
    </div>
  );
};

export default PlayArea;
