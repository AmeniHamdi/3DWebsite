import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelLoader } from "../core/loader";
import { degreeToCoordiantes } from "./helpers";

const modelPath = "assets";
const modelExtension = "glb";

export class IslandManager {

  static ALL_ISLANDs = ["jupiter", "mars", "mercury", "moon", "neptun"];
  static RADIUS = 5;
  loader: ModelLoader;
  islands: GLTF[] = [];
  readyToRender: Promise<boolean>;
  private resolve?: (value: boolean | PromiseLike<boolean>) => void;
  pivot?: THREE.Object3D;
  
  constructor () {
    this.loader = new ModelLoader();
    this.readyToRender = new Promise(r => this.resolve = r);
    this.init();
  }

  async getIslands () {
    await this.readyToRender;
    return this.islands;
  }

  async getPivot () {
    await this.readyToRender;
    return this.pivot;
    
  }

  async init() {
    this.islands = await this.loadAllIslands()
    this.positionIslands();
    this.createPivot();
    // mark as ready to render
    this.resolve && this.resolve(true);
  }

  private positionIslands () {
    this.islands = this.islands.map(this.positionSingleIsland.bind(this))
  } 

  private createPivot () {
    const group = new THREE.Object3D();
    this.islands.map(({scene}) => group.add(scene));

    this.pivot = group;

  }
  
  private positionSingleIsland(island: GLTF, index: number) {
    const root = island.scene;
    const model = island.scene.children[0];
    console.log({root, index})
    model.position.set(0, 0, 0)
    // root.scale.set(0.2,0.2,0.2);
    root.position.set(0, 0, 0);
    const angleInDegree = index * 360 / IslandManager.ALL_ISLANDs.length;
    const {x, y} = degreeToCoordiantes(angleInDegree, IslandManager.RADIUS);
    root.position.set(x, 4, y);
    return {...island, root};
  }

  private loadAllIslands(): Promise<GLTF[]> {
    return Promise.all(IslandManager.ALL_ISLANDs.map(this.loadSingleIsland.bind(this)))
  }

  private loadSingleIsland(islandName: string) {
    return this.loader.load(`${modelPath}/${islandName}.${modelExtension}`);
  }

}