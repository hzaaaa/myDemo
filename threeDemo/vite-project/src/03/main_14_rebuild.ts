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









































// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
