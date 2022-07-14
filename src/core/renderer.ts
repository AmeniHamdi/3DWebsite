import * as THREE from "three";

export class CoreRenderer {
  renderer: THREE.WebGLRenderer;
  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.init();
  }
  
  private init() {
    window.addEventListener("resize", () => this.onResize());
    this.onResize();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMappingExposure = 0.3854;
  }

  public render (scene: THREE.Object3D<THREE.Event>, camera: THREE.Camera) {
     this.renderer.render(scene, camera);
  }

  private onResize() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}