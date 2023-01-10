import React, {useEffect, useRef, useState} from "react";
import {
  Clock,
  Raycaster,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import {TWEEN} from "three/examples/jsm/libs/tween.module.min";
import CreditsPopup from "./CreditsPopup";
import InstructionsPopup from "./InstructionsPopup";
import {
  initializeCharacter,
  initializeFallingObject,
  initializeFloor
} from "./Utilities/InitializeObjectFuncs";

const PlayArea = ({scene, camera, children}) => {
  const [animateRunning, setAnimateRunning] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const [catIsRunning, setCatIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(30);
  let idleTexture = new TextureLoader().load("cat_sprite_anims/cat_idle.png");
  let runTexture = new TextureLoader().load("cat_sprite_anims/cat_run.png");

  let runTexture1 = new TextureLoader().load("cat_sprite_anims/cat_run_1.png");
  let runTexture2 = new TextureLoader().load("cat_sprite_anims/cat_run_2.png");
  let runTexture3 = new TextureLoader().load("cat_sprite_anims/cat_run_3.png");
  let runTexture4 = new TextureLoader().load("cat_sprite_anims/cat_run_4.png");
  let runTexture5 = new TextureLoader().load("cat_sprite_anims/cat_run_5.png");
  let runTexture6 = new TextureLoader().load("cat_sprite_anims/cat_run_6.png");
  let runTexture7 = new TextureLoader().load("cat_sprite_anims/cat_run_7.png");

  let runSprites = [
    runTexture1,
    runTexture2,
    runTexture3,
    runTexture4,
    runTexture5,
    runTexture6,
    runTexture7,
  ];

  let movingCharToPos = null;
  let currentCatRunCycleIndex = 0;

  const renderer = useRef(null);
  const pointer = new Vector2();
  const raycaster = new Raycaster();

  let container;
  let clock = new Clock();
  let fpsClock = new Clock();

  let speed = 50;
  let delta = 0;
  let fpsDelta = 0;
  let interval = 1 / 30;

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

    fpsDelta += fpsClock.getDelta();

    if (fpsDelta > interval) {
      // The draw or time dependent code are here
      render();
      TWEEN.update();
      fpsDelta = fpsDelta % interval;
    }
  };

  function loop(b) {
    let char = scene.getObjectByName("characterMesh");

    if (movingCharToPos) {
      let distance = char.position.distanceTo(new Vector3(b.x, b.y, b.z));
      // longer distances need more time
      setCatIsRunning(true);
      new TWEEN.Tween(char.position)
        .to(
          {
            x: movingCharToPos.x,
            z: movingCharToPos.z,
          },
          distance * 3
        )
        .onComplete(() => {
          setCatIsRunning(false);
          char.material.map = idleTexture;
          char.currentSprite = "walk";
        })
        .start();
      movingCharToPos = null;
    }
  }

  function onMouseClick(event) {
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

  const animateCatRunCycle = () => {
    let char = scene.getObjectByName("characterMesh");

    char.material.map = runSprites[currentCatRunCycleIndex];

    if (currentCatRunCycleIndex !== 6) {
      currentCatRunCycleIndex++;
    } else {
      currentCatRunCycleIndex = 0;
    }
  };

  const countDownGame = () => {
    if (countdown === 0) {
      endGame();
    } else {
      setCountdown(countdown - 1);
    }
  };

  const endGame = () => {
    setGameInProgress(false);
    if (renderer.current) renderer.current.gameInProgress = false;
    clearFallingObjects();
  };

  useInterval(spawnFallingObject, gameInProgress ? 2000 : null);
  useInterval(countDownGame, gameInProgress ? 1000 : null);
  useInterval(animateCatRunCycle, catIsRunning ? 200 : null);

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

{showCredits && (
        <CreditsPopup setShowCredits={setShowCredits} />
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
        <div className="start_end_game_btn" onClick={() => endGame()}>
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
        <div
          className="start_end_game_btn"
          onClick={() => {
            setShowCredits(true);
          }}
        >
          Credits
        </div>
      </div>

      <div id="game_countdown_container">{gameInProgress && countdown}</div>
    </div>
  );
};

export default PlayArea;
