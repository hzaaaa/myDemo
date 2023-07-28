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
  console.log('控制台查看加载gltf文件返回的对象结构', gltf);
  console.log('gltf对象场景属性', gltf.scene);
  const textureCube = new THREE.CubeTextureLoader()
    .setPath('/img/')
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
  // scene.add(gltf.scene);
})

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 25, 0, //顶点3坐标
]);
// 顶点位置
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

const colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 0, 1, //顶点2颜色
  0, 1, 0, //顶点3颜色
]);
// 设置几何体attributes属性的颜色color属性
//3个为一组,表示一个顶点的颜色数据RGB
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); 
const material = new THREE.MeshBasicMaterial({
  // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
  vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material); 

scene.add(mesh)








































// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
