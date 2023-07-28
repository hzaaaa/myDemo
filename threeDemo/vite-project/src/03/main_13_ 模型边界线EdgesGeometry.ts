import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 创建GLTF加载器对象
const loader = new GLTFLoader();
loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
  console.log('控制台查看加载gltf文件返回的对象结构', gltf);
  console.log('gltf对象场景属性', gltf.scene);
  const textureCube = new THREE.CubeTextureLoader()
    .setPath('/img//')
    .load(['default.jpg', 'default.jpg', 'default.jpg', 'default.jpg', 'default.jpg', 'default.jpg']);
  textureCube.colorSpace = THREE.SRGBColorSpace;
  // scene.environment = textureCube;  
  gltf.scene.traverse(function (obj:any) {
    if (obj.isMesh) {
        // 模型材质重新设置
        obj.material = new THREE.MeshLambertMaterial({
            color: 0x004444,
            transparent: true,
            opacity: 0.5,
        });
        // 模型边线设置
        const edges = new THREE.EdgesGeometry(obj.geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
        })
        const line = new THREE.LineSegments(edges, edgesMaterial);
        obj.add(line);
    }
});

  // 返回的场景对象gltf.scene插入到threejs场景中
  scene.add(gltf.scene);
})





// createApp(App).mount('#app')

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
camera.position.z = 2//200

















// const geometry = new THREE.CylinderGeometry(60, 60, 100, 30);
// const edges = new THREE.EdgesGeometry(geometry, 10);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   transparent: true,
//   opacity: 0,
// });
// const mesh = new THREE.Mesh(geometry, material);

// // 长方体作为EdgesGeometry参数创建一个新的几何体
// // const edges = new THREE.EdgesGeometry(geometry);
// const edgesMaterial = new THREE.LineBasicMaterial({
//   color: 0x00ffff,
// })
// const line = new THREE.LineSegments(edges, edgesMaterial);
// mesh.add(line);
// scene.add(mesh);


// // const pointsArr = CurvePath.getPoints(16); 
// // 用点模型可视化样条曲线经过的顶点位置
// const geometry2 = new THREE.BufferGeometry();
// // geometry2.setFromPoints(<any>curve.getPoints(4));
// const material2 = new THREE.PointsMaterial({
//   color: 0xff00ff,
//   size: 2,
// });
// //点模型对象
// const points = new THREE.Points(geometry2, material2);
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
