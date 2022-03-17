import { log } from "./modules/core/Debug";
log("test", "output");
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const init = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // レンダラーを作成
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#app"),
  });
  renderer.setSize(width, height);

  // シーンを作成
  scene = new THREE.Scene();

  // 軸の追加
  const axes = new THREE.AxesHelper(10000);
  scene.add(axes);

  // カメラを作成
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 1000, 3000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load("/src/img/chrome.png");
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  // 3D空間にメッシュを追加
  scene.add(mesh);

  // OrbitControls
  const orbitControls = setOrbitControls();

  // 平行光源
  const directionalLight = createDirectionalLight(1, 1, 1);

  // シーンに追加
  scene.add(directionalLight);

  let controls = new (function () {
    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraZ = 1000;
  })();

  const gui = new dat.GUI();
  gui.add(controls, "cameraX", 0, 2000);
  gui.add(controls, "cameraY", 0, 2000);
  gui.add(controls, "cameraZ", 0, 2000);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // メッシュを回転させる
    mesh.rotation.y += 0.01;
    // camera.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);

    orbitControls.update();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
};

/**
 * resize
 */
const onResize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(windowWidth, windowHeight);
};

// ページの読み込みを待つ
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", onResize, false);
