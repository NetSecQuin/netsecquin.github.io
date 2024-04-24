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



  //WEB SLIDE
const totalWebSlide = document.querySelectorAll("#webProject").length;
let webSlidePos = 0;
let currentWebSlide = Math.ceil(totalWebSlide / 2);
//Next web
document
  .querySelector("#nextWebButton")
  .addEventListener("click", function(event) {
    const whoosh = new Audio("./audios/Whoosh.mp3");
    whoosh.play();
    document.querySelectorAll("#webProject")[currentWebSlide-1].classList.remove("is-in");
    document.querySelectorAll("#dotWeb")[currentWebSlide-1].classList.remove("is-at");
    if (currentWebSlide === totalWebSlide) {
      webSlidePos = -(webSlidePos);
      currentWebSlide = 1;
    } else {
      webSlidePos = webSlidePos - document.querySelector("#webWrapper").getBoundingClientRect().width / totalWebSlide;
      currentWebSlide = currentWebSlide + 1;
    }
});



  //FUNCTIONS FOR ANIMATION
//highlight navlink according to section
let sections = document.querySelectorAll("section");
let staticSectionNumber = 1;
function highLightNavLink(number) {
  navLinks.forEach((each) => {
    each.style.color = "beige";
    each.style.fontStyle = "normal";
    each.classList.remove("is-on");
  });
  hamburgerLine.forEach((each) => {
    each.style.backgroundColor = "beige";
  });
  if (number > 1) {
    navLinks[number - 2].style.color = "goldenrod";
    navLinks[number - 2].style.fontStyle = "italic";
    navLinks[number - 2].classList.add("is-on");
    navLinks[number + 2].style.color = "goldenrod";
    navLinks[number + 2].style.fontStyle = "italic";
    navLinks[number + 2].classList.add("is-on");
    hamburgerLine[number-2].style.backgroundColor = "goldenrod";
  }
}




  //Update project size according to orientation
function projectResize() {
    if (window.innerWidth > 820) {
      if ((window.innerHeight / window.innerWidth) >= 0.9) {
        document.querySelectorAll(".project").forEach((each) => {
          each.style.width = "65vw";
        })
        document.querySelector("#prevWebButton").style.transform = "translateX(0)";
        document.querySelector("#nextWebButton").style.transform = "translateX(0)";
        document.querySelector("#prevGameButton").style.transform = "translateX(0)";
        document.querySelector("#nextGameButton").style.transform = "translateX(0)";
        document.querySelectorAll(".picture").forEach((each) => each.style.width = "65vw");
      } else {
        document.querySelectorAll(".project").forEach((each) => {
          each.style.width = "30vw";
        })
        document.querySelector("#prevWebButton").style.transform = "translateX(calc(20vw - 30px))";
        document.querySelector("#nextWebButton").style.transform = "translateX(calc(-20vw + 30px))";
        document.querySelector("#prevGameButton").style.transform = "translateX(calc(20vw - 30px))";
        document.querySelector("#nextGameButton").style.transform = "translateX(calc(-20vw + 30px))";
        document.querySelectorAll(".picture").forEach((each) => each.style.width = "30vw");
      }
    }
}



  //ANIMATION
const animate = () => {
  //Scene1
  //Particles spin around
  particlesGroup.rotation.y += 0.003;
  
  //Particles rotate
  const time = performance.now() * 0.0002;
  particlesGroup.children.forEach((each) => {
    each.rotation.x += each.speedValue / 10;
    each.rotation.y += each.speedValue / 10;
    each.rotation.z += each.speedValue / 10;
  })
  
  //Cubes rotate & fly around
  cubesGroup.children.forEach((each) => {
    each.rotation.x += 0.008;
    each.rotation.y += 0.005;
    each.rotation.z += 0.003;
    each.position.x = Math.sin(time * each.positionZ) * each.positionY;
    each.position.y = Math.cos(time * each.positionX) * each.positionZ;
    each.position.z = Math.sin(time * each.positionY) * each.positionX;
  })
  
  //Cube group rotate follow mouse
  cubesGroup.rotation.y -= (mouse.x * 4 + cubesGroup.rotation.y) * 0.1;
  cubesGroup.rotation.x -= (-mouse.y * 4 + cubesGroup.rotation.x) * 0.1;



   //Check current section on screen
  let currentSection = document.querySelector(".is-visible");
  if (currentSection === sections[0]) {
    const sectionNumber = 1;
    if (sectionNumber !== staticSectionNumber) {
      highLightNavLink(sectionNumber);
      highLightHamburger(sectionNumber);
      changeFooter(sectionNumber);
      lightTopColor.setHex(yellow);
      lightBackColor.setHex(red);
      rectLightColor.setHex(purple);
      updateCamPos.set(-0.3, 0, 5);
      staticSectionNumber = sectionNumber;
    }
  }
  if (currentSection === sections[1]) {
    const sectionNumber = 2;
    if (sectionNumber !== staticSectionNumber) {
      highLightNavLink(sectionNumber);
      highLightHamburger(sectionNumber);
      changeFooter(sectionNumber);
      toggleStars(black);
      lightTopColor.setHex(green);
      lightBackColor.setHex(yellow);
      rectLightColor.setHex(purple);
      updateCamPos.set(-0.55, 0, 5);
      staticSectionNumber = sectionNumber;
    }
  }
  if (currentSection === sections[2]) {
    const sectionNumber = 3;
    if (sectionNumber !== staticSectionNumber) {
      highLightNavLink(sectionNumber);
      highLightHamburger(sectionNumber);
      changeFooter(sectionNumber);
      toggleStars(black);
      lightTopColor.setHex(cyan);
      lightBackColor.setHex(purple);
      rectLightColor.setHex(blue);
      updateCamPos.set(-0.1, 0, 5);
      staticSectionNumber = sectionNumber;
    }
  }
  if (currentSection === sections[3]) {
    const sectionNumber = 4;
    if (sectionNumber !== staticSectionNumber) {
      highLightNavLink(sectionNumber);
      highLightHamburger(sectionNumber);
      changeFooter(sectionNumber);
      toggleStars(black);
      lightTopColor.setHex(red);
      lightBackColor.setHex(purple);
      rectLightColor.setHex(blue);
      updateCamPos.set(-0.1, 0, 5);
      staticSectionNumber = sectionNumber;
    }
  }
  if (currentSection === sections[4]) {
    const sectionNumber = 5;
    if (sectionNumber !== staticSectionNumber) {
      highLightNavLink(sectionNumber);
      highLightHamburger(sectionNumber);
      changeFooter(sectionNumber);
      toggleStars(0x545454);
      lightTopColor.setHex(black);
      lightBackColor.setHex(black);
      rectLightColor.setHex(black);
      updateCamPos.set(0, -4.5, 10);
      staticSectionNumber = sectionNumber;
    }
  }



   //Update web project slide
  document.querySelector("#webWrapper").style.translate = webSlidePos + "px";
  document.querySelectorAll("#dotWeb")[currentWebSlide-1].classList.add("is-at");
  document.querySelectorAll("#webProject")[currentWebSlide-1].classList.add("is-in");

  //Update game project slide
  document.querySelector("#gameWrapper").style.translate = gameSlidePos + "px";
  document.querySelectorAll("#dotGame")[currentGameSlide-1].classList.add("is-at");
  document.querySelectorAll("#gameProject")[currentGameSlide-1].classList.add("is-in");
  
  //Update screen
  camera.position.lerp(updateCamPos, 0.05);
  lightTop.color.lerp(lightTopColor, 0.05);
  lightBack.color.lerp(lightBackColor, 0.05);
  rectLight.color.lerp(rectLightColor, 0.05);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.scrollTo({ top: 0, behavior: "smooth" });
Array(30).fill().forEach(generateCube);
Array(200).fill().forEach(generateParticle);
generateEarth();
Array(60).fill().forEach(generateCloud);
Array(80).fill().forEach(generateStar);
generateAirPlane();
projectResize()
animate();

  
