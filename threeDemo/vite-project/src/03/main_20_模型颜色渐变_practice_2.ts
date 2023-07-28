import { createApp } from 'vue'
import './style.css'
import App from './App.vue';

import gsap from 'gsap';
import * as dat from 'dat.gui';
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setLights } from './hooks/lightsHook'
import { setCommon } from './hooks/commonHook'
const scene = new THREE.Scene();
setLights(scene);
setCommon(scene);
// 创建GLTF加载器对象
const loader = new GLTFLoader();
loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
  scene.add(gltf.scene); //三维场景添加到model组对象中
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
      
      colorsArr.push(cx.r*(px-minX)/w,cy.g*(py-minY)/h, cz.b*(pz-minZ)/d);
      // colorsArr.push(cx.r*(px-minX)/w,0,0);
      // colorsArr.push(0,cy.g*(py-minY)/h,0);
      // colorsArr.push(0,0, cz.b*(pz-minZ)/d);
    }
    const colors = new Float32Array(colorsArr);
    let mesh = meshArr[mc];
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    mesh.material = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });
  }
  


})









// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
