import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const loader= new GLTFLoader();
loader.load('assets/Island.glb',function(glb){
  console.log(glb);
}, function(xhr){console.log((xhr.loaded/xhr.total * 100) + "% loaded")},
function(error){
  console.log("error occured")
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);



//Torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x6ea532 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
// add some light 

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
// Helpers

 const lightHelper = new THREE.PointLightHelper(pointLight);
 const gridHelper = new THREE.GridHelper(200, 50);
 scene.add(lightHelper, gridHelper);

 const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  controls.update();
   renderer.render(scene, camera);
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);
animate();

