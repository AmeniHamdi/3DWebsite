import { Object3D } from "three";
import { CoreCamera, CoreControls, CoreRenderer, CoreScene, CoreSky, CoreWater } from "./core";
import { IslandManager } from "./island";

let pivot: Object3D<THREE.Event> | undefined;


const canvas = document.getElementById("bg") as HTMLCanvasElement;
const coreCamera = new CoreCamera();
const coreRenderer = new CoreRenderer(canvas);
const coreScene = new CoreScene();
const coreSky = new CoreSky();
const islandManager = new IslandManager();
const coreControls = new CoreControls(coreCamera.camera, canvas);
const coreWater = new CoreWater();

// Add sky and sun to scene
coreScene.addToScene(coreSky.sky);

// Add water to scene
coreScene.addToScene(coreWater.water);

// Load and add islands to scene
islandManager.getPivot().then(p => {
  pivot = p;
  if(pivot) {
    coreScene.addToScene(pivot);
  }
});


function animate() {
  coreControls.update()
  if(pivot) {
    pivot.rotateY(0.005)
  }
  coreRenderer.render(coreScene.scene, coreCamera.camera);
  requestAnimationFrame(animate);
}

animate();