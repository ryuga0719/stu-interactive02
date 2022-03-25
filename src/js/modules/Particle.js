import * as THREE from "three";

export default class Particle extends THREE.Points {
  constructor(_radius, _num){
    // 動径
    const radius = _radius;

    // 頂点数
    const starsNum = _num;

    // バッファーオブジェクトの生成
    const geometry = new THREE.BufferGeometry();

    // 型付配列で頂点座標を設定
    const positions = new Float32Array(starsNum * 3);

    // 球状に配置する頂点座標を設定
    for (let i = 0; i < starsNum; i++) {
      const theta = Math.PI * Math.random(); // 極角
      const phi = Math.PI * Math.random() * 2; // 偏角

      // 曲座標を直交座標系に変換
      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi); // x
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi); // y
      positions[i * 3 + 2] = radius * Math.cos(theta); // z
    }
    console.log(positions.length);

    //バッファーオブジェクトのattributeに頂点座標を設定
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 10,
    });
    super(geometry, material)
  }
}