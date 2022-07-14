import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'


export class ModelLoader {
  loader: GLTFLoader;

  constructor() {
    this.loader = new GLTFLoader();
  }

  async load(path: string) {
    return this.loader.loadAsync(path);
  }
}