import * as THREE from "https://cdn.skypack.dev/three@0.148.0";
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';

//VARIABLES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const white = 0xffffff;
const black = 0x000000;
const yellow = 0xffc800;
const red = 0xff0000;
const purple = 0xa200ff;
const green = 0x03fc2c;
const blue = 0x031cfc;
const cyan = 0x03d3fc;
const pink = 0xff7dcd;
const lightYellow = 0xffe97d;

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(black);
scene.fog = new THREE.Fog(black, 4, 6);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)

//LIGHT SCENE1
let lightTopColor = new THREE.Color(yellow);
let lightBackColor = new THREE.Color(red);
let rectLightColor = new THREE.Color(purple);

const lightTop = new THREE.PointLight(lightTopColor, 10);
lightTop.position.set(5, 5, 2);
lightTop.castShadow = true;
lightTop.shadow.mapSize.width = lightTop.shadow.mapSize.height = 10000;
lightTop.penumbra = 0.5;

const lightBack = new THREE.SpotLight(lightBackColor, 2);
lightBack.position.set(0, -3, -1);

const rectLight = new THREE.RectAreaLight(rectLightColor, 20, 2, 2);
rectLight.position.set(1, 1, 1);
rectLight.lookAt(0, 0, 0);

scene.add(lightTop, lightBack, rectLight);

//LIGHT SCENE2
const targetScene2 = new THREE.Object3D();
targetScene2.position.set(0, -10, 0);
scene.add(targetScene2);

const lightRight = new THREE.SpotLight(pink, 1);
lightRight.position.set(8, 0, 0);
lightRight.target = targetScene2;

const lightLeft = new THREE.SpotLight(pink, 1);
lightLeft.position.set(-8, 0, 0);
lightLeft.target = targetScene2;

const lightMidSpot = new THREE.SpotLight(lightYellow, 2);
lightMidSpot.position.set(0, -5, 20);
lightMidSpot.target = targetScene2;

const lightMidPoint = new THREE.PointLight(lightYellow, 0.05);
lightMidPoint.position.set(0, 0, -23);

scene.add(lightRight,lightLeft, lightMidSpot, lightMidPoint);


//CAMERA  scene1(-0.3, 0, 5)   scene2(0, -4.5, 10)
let updateCamPos = new THREE.Vector3(-0.3, 0, 5);
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 1, 500);
camera.position.set(-0.3, 0, 5);
scene.add(camera);

//RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.needsUpdate = true;

//SCENE1 OBJECTS
//Space size
function spaceRandom(num = 1) {
  var setNumber = -Math.random() * num + Math.random() * num;
  return setNumber;
}


//Cubes
const cubesGroup = new THREE.Object3D();
scene.add(cubesGroup);
function generateCube() {
  //Init object
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16, 3, 7);
const texture = new THREE.TextureLoader().load('chaintexture.jpeg' ); 
// immediately use the texture for material creation 

const material = new THREE.MeshBasicMaterial( { map:texture } );

  
