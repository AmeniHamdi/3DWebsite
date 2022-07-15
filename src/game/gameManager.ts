import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelLoader } from "../core/loader";
import { degreeToCoordiantes } from "./helpers";

const modelPath = "assets";
const modelExtension = "glb";
export class gameManager {

 static ALL_CARDs = ["moon", "mars", "cart2", "cart2","cart2"];
  static RADIUS = 5;
  loader: ModelLoader;
  cards: GLTF[] = [];
  readyToRender: Promise<boolean>;
  private resolve?: (value: boolean | PromiseLike<boolean>) => void;
  pivot?: THREE.Object3D;
  
  constructor () {
    this.loader = new ModelLoader();
    this.readyToRender = new Promise(r => this.resolve = r);
    this.init();
  }

  async getCards () {
    await this.readyToRender;
    return this.cards;
  }

  async getPivot () {
    await this.readyToRender;
    return this.pivot;
    
  }

  async init() {
    this.cards = await this.loadAllCards()
    this.positionCards();
    this.createPivot();
    // mark as ready to render
    this.resolve && this.resolve(true);
  }

  private positionCards() {
    this.cards = this.cards.map(this.positionSingleCards.bind(this))
  } 

  private createPivot () {
    const group = new THREE.Object3D();
    this.cards.map(({scene}) => group.add(scene));

    this.pivot = group;

  }
  
  private positionSingleCards(card: GLTF, index: number) {
    const root = card.scene;
    const model = card.scene.children[0];
    console.log({root, index})
    model.position.set(0, 0, 0)
    // root.scale.set(0.2,0.2,0.2);
    root.position.set(0, 0, 0);
    const angleInDegree = index * 360 / gameManager.ALL_CARDs.length;
    const {x, y} = degreeToCoordiantes(angleInDegree, gameManager.RADIUS);
    root.position.set(x, 4, y);
    return {...card, root};
  }

  private loadAllCards(): Promise<GLTF[]> {
    return Promise.all(gameManager.ALL_CARDs.map(this.loadSingleCard.bind(this)))
  }

  private loadSingleCard(cardName: string) {
    return this.loader.load(`${modelPath}/${cardName}.${modelExtension}`);
    
  
  }

}