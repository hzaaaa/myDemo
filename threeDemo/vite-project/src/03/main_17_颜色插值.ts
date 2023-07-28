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
  // scene.add(gltf.scene);
})

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(70, 0, 80)
]);
const pointsArr = curve.getSpacedPoints(100); //曲线取点      
geometry.setFromPoints(pointsArr); //pointsArr赋值给顶点位置属性 

const pos = geometry.attributes.position;
const count = pos.count; //顶点数量
// 计算每个顶点的颜色值
const colorsArr = [];
// 根据顶点距离起点远近进行颜色插值计算
let c1 = new THREE.Color(0x00ffff); //曲线起点颜色 青色
let c2 = new THREE.Color(0xffff00); //曲线结束点颜色 黄色
for (let i = 0; i < count; i++) {
    const percent = i / count; //点索引值相对所有点数量的百分比
    //根据顶点位置顺序大小设置颜色渐变
    const c = c1.clone().lerp(c2, percent);//颜色插值计算
    colorsArr.push(c.r, c.g, c.b); 
}

//类型数组创建顶点颜色color数据
const colors = new Float32Array(colorsArr);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.LineBasicMaterial({
  vertexColors: true, //使用顶点颜色渲染
});
const line = new THREE.Line(geometry, material);

scene.add(line)

 c1 = new THREE.Color(0xff0000); //红色
 c2 = new THREE.Color(0x0000ff); //蓝色
let c = new THREE.Color();
console.log('c1',c1)
console.log('c2',c2)
c.lerpColors(c1,c2, 0);
console.log('颜色插值结果',c);
c.lerpColors(c1,c2, 0.5);
console.log('颜色插值结果',c);
c.lerpColors(c1,c2, 1);
console.log('颜色插值结果',c);



 c = c1.clone().lerp(c2, 0);//颜色插值计算
 console.log('颜色插值结果',c);
 c = c1.clone().lerp(c2, 0.5);//颜色插值计算
 console.log('颜色插值结果',c);
 c = c1.clone().lerp(c2, 1);//颜色插值计算
 console.log('颜色插值结果',c);










































// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
