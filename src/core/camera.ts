import * as THREE from "three";

export class CoreCamera {
  camera: THREE.PerspectiveCamera;
  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.init()
  }

  private init() {
    window.addEventListener("resize", () => this.onResize())
    this.camera.position.set(0, 4, 0.5);
    this.camera.rotateY(180)
  }

  private onResize () {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
  }

  add(...obj: THREE.Object3D<THREE.Event>[]) {
    this.camera.add(...obj);
  }
}