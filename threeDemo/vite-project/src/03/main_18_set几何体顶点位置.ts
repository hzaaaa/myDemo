import { createApp } from 'vue'
import './style.css'
import App from './App.vue';

import gsap from 'gsap';
import * as dat from 'dat.gui';
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {setLights} from './hooks/lightsHook'
import {setCommon} from './hooks/commonHook'
const scene = new THREE.Scene();
setLights(scene);
setCommon(scene);
// 创建GLTF加载器对象
const loader = new GLTFLoader();
loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
  scene.add(gltf.scene); //三维场景添加到model组对象中
  //mesh表示地形网格模型
  const mesh =<any> gltf.scene.children[0];
  // mesh.position.y+=1;
  mesh.position.x+=1; //相同功效
  // 顶点数据
  const att = mesh.geometry.attributes;
  console.log('att', att);
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;
  console.log('pos', pos);
  console.log('index', mesh.geometry.index);
  const count = pos.count; //几何体顶点数量
  console.log('count', count);
  for (let i = 0; i < count; i++) {
      const y = pos.getY(i);//获取第i+1个顶点y坐标
      pos.setY(i,y+1)//设置第i+1个顶点y坐标为自身2倍
}
  // 返回的场景对象gltf.scene插入到threejs场景中
  // scene.add(gltf.scene);
})









// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
