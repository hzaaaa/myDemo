import { createApp } from 'vue'
import './style.css'
import App from './App.vue';

import gsap from 'gsap';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';



// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setLights } from './hooks/lightsHook'
import { setCommon } from './hooks/commonHook'
import { setCamera } from './hooks/cameraHook'
const scene = new THREE.Scene();
setLights(scene);
let camera = setCamera(scene);
let renderer = setCommon(scene, camera);

// 创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
// OutlinePass第一个参数v2的尺寸和canvas画布保持一致
const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
// const v2 = new THREE.Vector2(800, 600);
const outlinePass = new OutlinePass(v2, scene, camera);


// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);

// 设置renderPass通道
composer.addPass(renderPass);
composer.addPass(outlinePass);


// 创建GLTF加载器对象
const loader = new GLTFLoader();
loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
  // scene.add(gltf.scene); //三维场景添加到model组对象中
  const box3 = new THREE.Box3();
  box3.expandByObject(gltf.scene); // 计算模型包围盒
  
  console.log('查看包围盒', box3);
  const scale = new THREE.Vector3()
  // getSize()计算包围盒尺寸
  // 获得包围盒长宽高尺寸，结果保存在参数三维向量对象scale中
  box3.getSize(scale)
  console.log('模型包围盒尺寸', scale);

  // 计算包围盒中心坐标
  const center = new THREE.Vector3()
  box3.getCenter(center)
  console.log('模型中心坐标', center);

  let minP = box3.min;

  let maxP = box3.max;

  let geometry2 = new THREE.BoxGeometry(scale.x, scale.y, scale.z)

  // geometry2.setFromPoints(<any>[minP,maxP]);
  const material2 = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    // size: 0.02,
    wireframe: true
  });
  //点模型对象
  const points = new THREE.Mesh(geometry2, material2);
  // points.position.set(center.x,center.y,center.z)
  gltf.scene.position.set(0, -center.y, 0)
  scene.add(points);

  console.log('gltf.scene', gltf.scene)
  let posArr = <any>[];
  let meshArr = <any>[];
  for (let c = 0; c < gltf.scene.children.length; c++) {

    const mesh = <any>gltf.scene.children[c];
    meshArr.push(mesh);
    posArr.push(mesh.geometry.attributes.position)

  }

  // 
  // console.log('count',count)
  // console.log('pos',pos)
  let yArr = [];
  let xArr = [];
  let zArr = [];
  for (let pn = 0; pn < posArr.length; pn++) {
    let pos = posArr[pn];
    let count = pos.count;
    for (let i = 0; i < count; i++) {
      yArr.push(pos.getY(i))
      xArr.push(pos.getX(i))
      zArr.push(pos.getZ(i))
    }
  }


  let minY = Number.MAX_VALUE;
  let maxY = Number.MIN_VALUE;
  let minX = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let minZ = Number.MAX_VALUE;
  let maxZ = Number.MIN_VALUE;
  for (let i = 0; i < yArr.length; i++) {
    if (xArr[i] < minX) {
      minX = xArr[i]
    }
    if (xArr[i] > maxX) {
      maxX = xArr[i]
    }

    if (yArr[i] < minY) {
      minY = yArr[i]
    }
    if (yArr[i] > maxY) {
      maxY = yArr[i]
    }

    if (zArr[i] < minZ) {
      minZ = zArr[i]
    }
    if (zArr[i] > maxZ) {
      maxZ = zArr[i]
    }
  }
  let h = maxY - minY;
  let w = maxX - minX;
  let d = maxZ - minZ;
  console.log('h', h)
  console.log('w', w)
  console.log('d', d)
  for (let mc = 0; mc < meshArr.length; mc++) {
    let colorsArr = <any>[];

    // 根据顶点距离起点远近进行颜色插值计算
    const c1 = new THREE.Color(0x0000ff);//山谷颜色
    const c2 = new THREE.Color(0x00ff00);//山顶颜色
    const cx = new THREE.Color(0xff0000);
    const cy = new THREE.Color(0x00ff00);
    const cz = new THREE.Color(0x0000ff);
    let pos = posArr[mc];
    for (let i = 0; i < pos.count; i++) {

      let py = pos.getY(i)
      let px = pos.getX(i)
      let pz = pos.getZ(i)

      colorsArr.push(cx.r * (px - minX) / w, cy.g * (py - minY) / h, cz.b * (pz - minZ) / d);
      // colorsArr.push(cx.r*(px-minX)/w,0,0);
      // colorsArr.push(0,cy.g*(py-minY)/h,0);
      // colorsArr.push(0,0, cz.b*(pz-minZ)/d);
    }
    const colors = new Float32Array(colorsArr);
    let mesh = meshArr[mc];
    mesh.castShadow =true;
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    // mesh.material = new THREE.MeshLambertMaterial({
    //   vertexColors: true,
    // });
  }



})


const geometry = new THREE.BoxGeometry(1,1,1);
geometry.translate(0, -0.5, 0);
const material = new THREE.MeshBasicMaterial({
  color:'#ff0000'
})
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const texture = new THREE.TextureLoader().load("/img/default.jpg");
// 创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
  color:0x00ffff,//设置颜色
  map:texture,
  // rotation:Math.PI/4,
});
// 创建精灵模型对象，不需要几何体geometry参数
const sprite = new THREE.Sprite(spriteMaterial);
// 控制精灵大小
console.log('sprite.scale',sprite.scale);
sprite.scale.set(0.1, 0.1, 1); //只需要设置x、y两个分量就可以
sprite.position.set(0, 0.05, 0);
scene.add(sprite)

// 一个模型对象
outlinePass.selectedObjects = [mesh];
// 多个模型对象
// outlinePass.selectedObjects = [mesh1,mesh2,group];
function animate() {
  
  requestAnimationFrame(animate);
  
  // angle += 0.01;
  // // 相机y坐标不变，在XOZ平面上做圆周运动
  // camera.position.x = R * Math.cos(angle);
  // camera.position.z = R * Math.sin(angle);

  // controls.update();
  composer.render();
}
animate();





