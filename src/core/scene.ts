import * as THREE from 'three';

export class CoreScene {
  scene: THREE.Scene;
  constructor() {
    this.scene = new THREE.Scene();
    this.init()
  }

  private init () {
    this.setBackrgound(0x000000);
    this.setLighting()
  }

  public addToScene (...val: THREE.Object3D[]) {
    this.scene.add(...val)
  }

  private setLighting () {
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 5, 0);
    const skyColor = new THREE.Color() 
    const light = new THREE.HemisphereLight()
    // this.scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(pointLight, ambientLight);
    // Helpers

    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // // const gridHelper = new THREE.GridHelper(200, 50);
    // this.scene.add(lightHelper);
  }

  public setBackrgound (backrgound: number) {
    this.scene.background= new THREE.Color(backrgound);
  }
}