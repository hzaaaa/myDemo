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
// scene.add(pointLight1); //点光源添加到场景中
// scene.add(pointLight2); //点光源添加到场景中


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
camera.position.z = 200






// 创建多段线条的顶点数据
const p1 = new THREE.Vector3(0, 0,100)
const p2 = new THREE.Vector3(0, 0,30);
const p3 = new THREE.Vector3(0, 0,0);
const p4 = new THREE.Vector3(30, 0, 0);
const p5 = new THREE.Vector3(100, 0, 0);
// 1. 3D直线线段
const line1 = new THREE.LineCurve3(p1, p2);
// 2. 三维二次贝塞尔曲线
const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4);
// 3. 3D直线线段
const line2 = new THREE.LineCurve3(p4, p5);

const CurvePath = new THREE.CurvePath(); 
// 三条线拼接为一条曲线
CurvePath.curves.push(line1, curve, line2); 

// CurvePath:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(<any>CurvePath, 50, 5, 25);

const material = new THREE.MeshBasicMaterial({
  side:THREE.DoubleSide,//双面显示看到管道内壁
  color:'#ff0000'
});
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


const pointsArr = CurvePath.getPoints(16); 
// 用点模型可视化样条曲线经过的顶点位置
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(<any>pointsArr);
const material2 = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);
// scene.add(points);



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
