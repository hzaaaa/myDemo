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






// 一组二维向量表示一个多边形轮廓坐标
const pointsArr = [
  new THREE.Vector2(-50, -50), //多边形起点
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(50, -50),
]
// Shape表示一个平面多边形轮廓,参数是二维向量构成的数组pointsArr
const shape = new THREE.Shape(pointsArr);

//拉伸造型
const geometry = new THREE.ExtrudeGeometry(
  shape, //二维轮廓
  {
    depth: 20, 
    bevelThickness: 20, //倒角尺寸:拉伸方向 z拉伸
        bevelSize: 5, //倒角尺寸:垂直拉伸方向  xy 拉伸
        bevelSegments: 5, //倒圆角：倒角细分精度，默认3
  }
);



const material = new THREE.MeshBasicMaterial({
  side:THREE.DoubleSide,//双面显示看到管道内壁
  color:'#ff0000',
  wireframe:true,
});
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


// const pointsArr = CurvePath.getPoints(16); 
// 用点模型可视化样条曲线经过的顶点位置
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(<any>pointsArr);
const material2 = new THREE.PointsMaterial({
    color: 0xff00ff,
    size: 2,
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
