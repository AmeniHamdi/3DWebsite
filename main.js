import './style.css'

import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'

import {
  FontLoader
} from 'three/examples/jsm/loaders/FontLoader.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const loader = new GLTFLoader();
const RADIUS = 5;

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
function degreeToCoordiantes(angle) {
  const DEGREE_IN_RADIANS = 0.0174533;
  const pointAngleInRadians = angle * DEGREE_IN_RADIANS;
  return {x: Math.cos(pointAngleInRadians) * RADIUS,
  y: Math.sin(pointAngleInRadians) * RADIUS}
}

/** Load single planet */
async function loadSinglePlanet(planet, index, array) {
  let resolve = () => {};
  const promise = new Promise(r => resolve = r);
  loader.load('assets/planets/' + planet + '.glb', function (glb) {
    const root = glb.scene;
    const model = glb.scene.children[0];
    console.log({root, index})
    const animations = model.animations;
    root.scale.set(0.2,0.2,0.2);
    model.position.set(0, 0, 0);
    const {x, y} = degreeToCoordiantes(index * 360 / array.length);
    root.position.set(x, 0, y);
    resolve(root);
  }, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100)
    + "% loaded")
  },
  function (error) {
    console.log("error occured")
  })
  return promise;
}

let pivot;
let roots = [];

/** Load all planets */
async function loadPlanets () {
  const planets = ["Island", "Island", "Island", "Island", "Island"];
  const roots = await Promise.all(planets.map(loadSinglePlanet));
  const group = new THREE.Object3D();
  roots.map(root => group.add(root));
  // group.position.set(0, 0, 1)
  scene.add(group)
  pivot = group;
  return roots
}

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



loadPlanets().then(r => roots = r)

// handling on click 
const raycaster = new THREE.Raycaster();
let currentIntersect = null;
// const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();

const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});
window.addEventListener("click", () => {
  if (!currentIntersect || !currentIntersect.object) return;
  console.log(currentIntersect.object.name)
  // currentIntersect.object.scale.set(20, 20, 20);

});


/** Camera + light */
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 0.5);
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);


/** Controls */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
/*const space= new THREE.TextureLoader().load('img.jpg');
scene.background= space;*/


function animate() {
  raycaster.setFromCamera(mouse, camera);
  const objectsToTest = roots;
  const intersects = raycaster.intersectObjects(objectsToTest);

  // Compute intersection between models and mouse
  if (intersects.length) {
    currentIntersect = intersects[0];
  } else {
    currentIntersect = null;
  }
  controls.update();

  // rotate planets around camera
  if (pivot) {
    pivot.rotation.y += 0.005;
  }
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);
animate();