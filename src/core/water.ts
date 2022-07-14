import { Water } from 'three/examples/jsm/objects/Water';
import * as THREE from "three";


export class CoreWater {
   water: Water;
   constructor() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    this.water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('texture/water.jpg', function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        alpha: 0.7,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 2.5,
        fog: false
      }
    );
    this.water.rotation.x =- Math.PI / 2;

   }
}