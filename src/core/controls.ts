import * as THREE from "three";
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

export class CoreControls {
  controls: OrbitControls;
  raycaster: THREE.Raycaster;
  rayDirection: THREE.Vector3;
  currentIntersection?: THREE.Intersection<THREE.Object3D<THREE.Event>>;
  mouse: THREE.Vector2;

  constructor(camera: THREE.Camera, canvas: HTMLCanvasElement) {
    this.controls = new OrbitControls(camera, canvas);
    this.raycaster = new THREE.Raycaster();
    this.rayDirection = new THREE.Vector3(10, 0, 0);
    this.mouse = new THREE.Vector2();
    this.init();
  }

  detectInterstions (...obj: THREE.Object3D<THREE.Event>[]) {
    const [intersection] = this.raycaster.intersectObjects(obj);
    this.currentIntersection = intersection;
  }

  private init() {
    this.controls.target.set(0, 0, 0);
    this.rayDirection.normalize();
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / window.innerHeight) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener("click", () => {
      if (!this.currentIntersection?.object) return;
      console.log(this.currentIntersection.object.name)
      // currentIntersect.object.scale.set(20, 20, 20);
    
    });

  }

  update() {
    this.controls.update();
  }
}