import React, {useEffect, useRef, useState} from "react";
import {WebGLRenderer, Clock, Raycaster, Vector3, Vector2, Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import {
  initializeCharacter,
  initializeFallingObject,
  initializeFloor,
} from "./Utilities/InitializeObjectFuncs";

const PlayArea = ({scene, camera, children}) => {
  const [animateRunning, setAnimateRunning] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  let movingCharToPos = null;
  const renderer = useRef(null);
  const pointer = new Vector2();
  const raycaster = new Raycaster();

  let container;
  let clock = new Clock();
  let playerClock = new Clock();
  let speed = 50;
  let delta = 0;
  let playerDelta = 0;

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
  let maxFrames = 400;

  function lerp(a, b, t) {return a + (b - a) * t}

  function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}

  function loop(b) {
    let char = scene.getObjectByName("characterMesh");

    if (frames > maxFrames || (char.position.x === b.x && char.position.z === b.z)){
      frames = 0;
      return;
    }
   let t = frames / maxFrames;
    var newX = lerp(char.position.x, b.x, ease(t));   // interpolate between a and b where
    var newZ = lerp(char.position.z, b.z, ease(t));   // function in this example.
    char.position.set(newX, char.position.y, newZ);  // set new position
    frames++;
  }

  function onMouseClick( event ) {
    frames = 0;
    let canvas = document.querySelector('canvas');

    pointer.x = ( event.offsetX / canvas.clientWidth ) * 2 - 1;
    pointer.y = - ( event.offsetY / canvas.clientHeight ) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects( scene.children );
    let newCharX = null;
    let newCharZ = null;
    intersects.forEach((value) => {
      if (value.object.name === "floorMesh") {
        console.log(value);
        newCharX = value.point.x;
        newCharZ = value.point.z;
      }
    });
    if (!newCharX || !newCharZ) return;
    if (newCharX < -350) newCharX = -350;
    if (newCharX > 350) newCharX = 350;
    if (newCharZ < -350) newCharZ = -350;
    if (newCharZ > 350) newCharZ = 350;
    movingCharToPos = {x: newCharX, z: newCharZ};
    playerDelta = playerClock.getDelta();
  }
  window.addEventListener( 'click', onMouseClick );

  const onWindowResize = () => {
    if (renderer.current) {
      renderer.current.setSize(window.innerWidth, 600);}
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
