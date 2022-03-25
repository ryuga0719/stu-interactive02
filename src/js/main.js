import { log } from "./modules/core/Debug";
log("test", "output");
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Planet from './modules/Planet';
import {degree2Radian} from './modules/core/MathUtils';
import Particle from "./modules/Particle";

let camera, scene, renderer;

/**
 * createDirectionalLight
 * 平行光源の作成
 * @param {number} x - 光源のx座標
 * @param {number} y - 光源のy座標
 * @param {number} z - 光源のz座標
 * @returns {Object} directionalLightオブジェクト
 *
 */
const createDirectionalLight = (x, y, z) => {
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(x, y, z);
  return directionalLight;
};

/**
 * setOrbitControls
 */
const setOrbitControls = () => {
  const orbitControls = new OrbitControls(camera, document.body);

  // 滑らかにカメラコントローラーを制御する
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.2;
  return orbitControls;
};

/**
 * init
 */
const initWebGl = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let degree = 0; // 回転角(degree)
  let radian = 0; // 回転角(rad)

  // レンダラー
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#app"),
  });
  renderer.setSize(width, height);

  // シーン
  scene = new THREE.Scene();

  // 軸
  // const axes = new THREE.AxesHelper(10000);
  // scene.add(axes);

  // カメラ
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 1000, 3000);

  // 地球
  const earthRadius = 300;
  const earth = new Planet("src/img/earth3.jpg", earthRadius);
  scene.add(earth);

  // 月
  const moonRadius = earthRadius / 4;
  const moon = new Planet("src/img/moon.jpg", moonRadius);
  moon.position.set(1000, 0, 1000); // 月の初期位置
  scene.add(moon);

  // 星
  const particles = new Particle(5000, 500000);
  scene.add(particles);

  // OrbitControls
  const orbitControls = setOrbitControls();

  // 平行光源
  const directionalLight = createDirectionalLight(5000, 5000, 5000);
  scene.add(directionalLight);

  // 毎フレーム時に実行
  const update = () => {
    // 角度の更新
    degree += 1;
    radian = degree2Radian(degree);

    // 地球のプロパティ更新
    earth.rotation.y += 0.01;

    // 月のプロパティ更新
    moon.position.x = 1000 * Math.cos(radian); // X座標
    moon.position.z = 1000 * Math.sin(radian); // Z座標
    moon.rotation.y += 0.01;

    // orbitControls
    orbitControls.update();

    // レンダリングの更新
    renderer.render(scene, camera);

    requestAnimationFrame(update);
  };

  update();
};;

/**
 * resize
 */
const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};


// ページの読み込みを待つ
document.addEventListener("DOMContentLoaded", initWebGl);
window.addEventListener("resize", onResize, false);

