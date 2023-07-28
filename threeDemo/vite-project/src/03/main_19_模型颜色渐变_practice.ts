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
  for (let pn = 0; pn < posArr.length; pn++) {
    let pos = posArr[pn];
    let count = pos.count;
    for (let i = 0; i < count; i++) {
      yArr.push(pos.getY(i))
    }
  }
  console.log('yArr', yArr)
  // yArr.sort();

  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  for (let i = 0; i < yArr.length; i++) {
    if (yArr[i] < min) {
      min = yArr[i]
    }
    if (yArr[i] > max) {
      max = yArr[i]
    }
  }
  let h = max - min;
  console.log('h', h)
  for (let mc = 0; mc < meshArr.length; mc++) {
    let colorsArr = <any>[];

    // 根据顶点距离起点远近进行颜色插值计算
    const c1 = new THREE.Color(0x0000ff);//山谷颜色
    const c2 = new THREE.Color(0x00ff00);//山顶颜色
    let pos = posArr[mc];
    for (let i = 0; i < pos.count; i++) {

      let ph = pos.getY(i)
      const percent = (ph - min) / h; //点索引值相对所有点数量的百分比
      //根据顶点位置顺序大小设置颜色渐变
      const c = c1.clone().lerp(c2, percent);//颜色插值计算
      colorsArr.push(c.r, c.g, c.b);
    }
    const colors = new Float32Array(colorsArr);
    let mesh = meshArr[mc];
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    mesh.material = new THREE.MeshLambertMaterial({
      vertexColors: true,
    });
  }
  // gltf.scene.traverse(function (obj:any) {
  // //mesh表示地形网格模型
  // const mesh = <any>gltf.scene.children[0];
  // //mesh表示地形网格模型
  // let pos = mesh.geometry.attributes.position;
  // let count = pos.count;
  // let yArr = [];
  // for (let i = 0; i < count; i++) {
  //   yArr.push(pos.getY(i))
  // }
  // yArr.sort();
  // let min = yArr[0];
  // let max = yArr[count - 1];
  // let h = max - min;
  // let colorsArr = <any>[];
  // // 根据顶点距离起点远近进行颜色插值计算
  // const c1 = new THREE.Color(0x0000ff);//山谷颜色
  // const c2 = new THREE.Color(0xff0000);//山顶颜色
  // for (let i = 0; i < count; i++) {
  //   let ph = pos.getY(i)
  //   const percent = (ph - min) / h; //点索引值相对所有点数量的百分比
  //   //根据顶点位置顺序大小设置颜色渐变
  //   const c = c1.clone().lerp(c2, percent);//颜色插值计算
  //   colorsArr.push(c.r, c.g, c.b);
  // }
  // const colors = new Float32Array(colorsArr);
  // mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
  // // gltf.scene.traverse(function (obj:any) {
  // mesh.material = new THREE.MeshLambertMaterial({
  //   vertexColors: true,
  // });


})









// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
