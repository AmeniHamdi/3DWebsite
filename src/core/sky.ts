//@ts-ignore
import * as THREE from "three";
import {Sky} from "./nativeSky";

export class CoreSky {
  sky: any;
  sun: THREE.Vector3;
  constructor() {
    this.sky = new Sky()
    this.sun = new THREE.Vector3();
    this.init()
  }

  private init() {
    const effectController = {
      turbidity: 2.1,
      rayleigh: 0.214,
      mieCoefficient: 0.018,
      mieDirectionalG: 0.693,
      elevation: 65.7,
      azimuth: 180,
    };

    const uniforms = this.sky.material.uniforms;
    uniforms[ 'turbidity' ].value = effectController.turbidity;
    uniforms[ 'rayleigh' ].value = effectController.rayleigh;
    uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
    uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;
    const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
    const theta = THREE.MathUtils.degToRad( effectController.azimuth );
    this.sun.setFromSphericalCoords( 1, phi, theta );
    uniforms[ 'sunPosition' ].value.copy( this.sun );
  }
}