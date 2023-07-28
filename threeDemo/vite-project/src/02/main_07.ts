import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
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
  gltf.scene.traverse(function (obj: any) {
    if (obj.isMesh) {
      // 重新设置材质
      obj.material = new THREE.MeshPhysicalMaterial({
        metalness: 0.0,//玻璃非金属 
    roughness: 0.0,//玻璃表面光滑
        transmission: 1.0, //玻璃材质透光率，transmission替代opacity 
    ior:1.5,//折射率
      })
      obj.material.colorSpace = THREE.SRGBColorSpace;
    }
  });
  // 返回的场景对象gltf.scene插入到threejs场景中
  // scene.add(gltf.scene);
})



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


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const R = 1; //圆弧半径
const N = 50; //分段数量
const sp = 2 * Math.PI / N;//两个相邻点间隔弧度
// 批量生成圆弧上的顶点数据
const arr = [];
for (let i = 0; i < N; i++) {
    const angle =  sp * i;//当前点弧度
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    arr.push(x, y, 0);
}
//类型数组创建顶点数据
const vertices = new Float32Array(arr);
// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3); 
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
console.log('geometry',geometry)
// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0xff0000, //线条颜色
    // wireframe:true,
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material); 
const line = new THREE.LineLoop(geometry, material);//线条模型对象


scene.add(line);





const pointLight1 = new THREE.PointLight(0xffffff, 1.0);
const pointLight2 = new THREE.PointLight(0xffffff, 1.0);
pointLight1.position.set(0, 5, 5);
pointLight2.position.set(0, -5, -5);
scene.add(pointLight1); //点光源添加到场景中
scene.add(pointLight2); //点光源添加到场景中

// 



const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
camera.position.z = 3


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
