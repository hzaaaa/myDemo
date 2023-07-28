import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';





// createApp(App).mount('#app')
import * as THREE from 'three';
// declare const THREE:any ;
console.log('THREE', THREE);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  // 设置对数深度缓冲区，优化深度冲突问题
  // logarithmicDepthBuffer: true,//作用有点小
});
const pointLight1 = new THREE.PointLight(0xffffff, 1.0);
const pointLight2 = new THREE.PointLight(0xffffff, 1.0);
pointLight1.position.set(0, 5, 5);
pointLight2.position.set(0, -5, -5);
scene.add(pointLight1); //点光源添加到场景中
scene.add(pointLight2); //点光源添加到场景中


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
camera.position.z = 200





// // p1、p3轨迹线起始点坐标
// const p1 = new THREE.Vector3(-100, 0, -100);
// const p3 = new THREE.Vector3(100, 0, 100);
// // 计算p1和p3的中点坐标
// const x2 = (p1.x + p3.x)/2;
// const z2 = (p1.z + p3.z)/2;
// const h = 50;
// const p2 = new THREE.Vector3(x2, h, z2);

// const arr = [p1, p2, p3];
// // 三维样条曲线
// const curve = new THREE.CatmullRomCurve3(arr);

const R = 80;//圆弧半径
const H = 200;//直线部分高度
// 直线1
const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0));
// 圆弧
const arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 直线2
const line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, H));

// CurvePath创建一个组合曲线对象
const CurvePath = new THREE.CurvePath();
//line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
CurvePath.curves.push(line1, arc, line2);




//曲线上获取点
const pointsArr =<any> CurvePath.getPoints(16); 
const geometry = new THREE.BufferGeometry();
//读取坐标数据赋值给几何体顶点
geometry.setFromPoints(pointsArr); 
// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0x00fffff
});
// 线模型
const line = new THREE.Line(geometry, material);

scene.add(line);

// 用点模型可视化样条曲线经过的顶点位置
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);
scene.add(points);





// 






// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})
function animate() {
  requestAnimationFrame(animate);
  // geometry.center();
  // boxGeometryMesh.rotateY(0.01);//旋转动画
  // boxGeometryMesh.rotateOnAxis(new THREE.Vector3(0,1,0),0.01);
  // controls.update();
  // geometry.translate(50/2,0,0,);
  // console.log('顶点位置数据', geometry.attributes.position);
  
  controls.update();
  renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  console.log('window.devicePixelRatio', window.devicePixelRatio)
})
window.addEventListener('dblclick', () => {
  // debugger
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen();
  }
})
const gui = new dat.GUI();
