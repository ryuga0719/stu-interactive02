import * as THREE from "three";

export default class Planet extends THREE.Mesh {
  constructor(_texture, _radius){
    const loader = new THREE.TextureLoader();

    const texture = loader.load(_texture);
    // 球体を作成
    const geometry = new THREE.SphereGeometry(_radius, 30, 30);
    // マテリアルを作成
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
    });

    super(geometry, material);
  }
}