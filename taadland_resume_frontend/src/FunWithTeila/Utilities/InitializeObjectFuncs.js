import {
  CircleGeometry,
  DoubleSide, Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader
} from "three";

export const initializeCharacter = (scene) => {
  let char = scene.getObjectByName("characterMesh");
  if (char) return;
  // playable char init
  let characterTexture = new TextureLoader().load("cat_idle.png");
  characterTexture.encoding = sRGBEncoding;
  let characterMaterial = new MeshBasicMaterial({
    map: characterTexture,
    side: DoubleSide,
    transparent: true,
  });

  const characterGeometry = new PlaneGeometry(100, 100);
  const characterMesh = new Mesh(characterGeometry, characterMaterial);
  characterMesh.position.set(0, 50, 0);
  characterMesh.name = "characterMesh";
  characterMesh.objectType = "character";
  return characterMesh;
};

export const initializePlusOne = (xPos, zPos, fallingObjectName) => {
  // indicates a point was earned by picking up food.
  let plusOneTexture = new TextureLoader().load("plus_one.png");
  plusOneTexture.encoding = sRGBEncoding;
  let plusOneMaterial = new MeshBasicMaterial({
    map: plusOneTexture,
    side: DoubleSide,
    transparent: true,
  });

  const plusOneGeometry = new PlaneGeometry(100, 100);
  const plusOneMesh = new Mesh(plusOneGeometry, plusOneMaterial);
  plusOneMesh.position.set(xPos, 1, zPos);
  //plusOneMesh.rotation.x = (3*Math.PI) / 2;
  plusOneMesh.objectType = "fallingObjShadow";
  // unique name
  plusOneMesh.name = `${Math.random().toString(36).substring(2,22)}`;
  plusOneMesh.fallingObjectName = fallingObjectName;
  return plusOneMesh;
};

export const initializeFloor = (scene) => {
  let floor = scene.getObjectByName("floorMesh");
  if (floor) return;
  let groundTexture = new TextureLoader().load("floor_texture.jpg");
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
  floorMesh.objectType = "boundary";
  return floorMesh;
};

export const getRandomIntInRange = (minInt, maxInt) => {
  let min = Math.ceil(minInt);
  let max = Math.floor(maxInt);
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

const initializeShadowObject = (xPos, zPos, fallingObjectName) => {
  let radius = 2;
  let segments = 64;
 let shadowMaterial = new MeshBasicMaterial( { color: 0x000000 } );
  let shadowGeometry = new CircleGeometry( radius, segments );
  const shadowMesh = new Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.position.set(xPos, 1, zPos);
  shadowMesh.rotation.x = (3*Math.PI) / 2;
  shadowMesh.objectType = "fallingObjShadow";
  // unique name
  shadowMesh.name = `${Math.random().toString(36).substring(2,22)}`;
  shadowMesh.fallingObjectName = fallingObjectName;
  return shadowMesh;
};

export const initializeFallingObject = () => {
  let randomNum = getRandomIntInRange(1, 5);
  let objTexture = new TextureLoader().load(`falling_obj_sprite_${randomNum}.png`);
  objTexture.encoding = sRGBEncoding;
  let objMaterial = new MeshBasicMaterial({
    map: objTexture,
    side: DoubleSide,
    transparent: true,
  });

  const objGeometry = new PlaneGeometry(50, 50);
  const objMesh = new Mesh(objGeometry, objMaterial);
  const randomX = getRandomIntInRange(-350, 350);
  const randomZ = getRandomIntInRange(-350, 350);
  objMesh.position.set(randomX, 500, randomZ);
  objMesh.objectType = "fallingObj";
  // unique name
  objMesh.name = `${Math.random().toString(36).substring(2,22)}`;

  let shadowObj = initializeShadowObject(randomX, randomZ, objMesh.name);
  objMesh.shadowName = shadowObj.name;
  return {fallingObj: objMesh, shadow: shadowObj};
};