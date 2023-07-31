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
import { setCamera } from './hooks/cameraHook'
const scene = new THREE.Scene();
setLights(scene);
let camera = setCamera(scene);
let renderer = setCommon(scene, camera);
// 创建GLTF加载器对象
const loader = new GLTFLoader();
// loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
//   scene.add(gltf.scene); //三维场景添加到model组对象中
//   const box3 = new THREE.Box3();
//   box3.expandByObject(gltf.scene); // 计算模型包围盒

//   console.log('查看包围盒', box3);
//   const scale = new THREE.Vector3()
//   // getSize()计算包围盒尺寸
//   // 获得包围盒长宽高尺寸，结果保存在参数三维向量对象scale中
//   box3.getSize(scale)
//   console.log('模型包围盒尺寸', scale);

//   // 计算包围盒中心坐标
//   const center = new THREE.Vector3()
//   box3.getCenter(center)
//   console.log('模型中心坐标', center);

//   let minP = box3.min;

//   let maxP = box3.max;

//   let geometry2 = new THREE.BoxGeometry(scale.x, scale.y, scale.z)

//   // geometry2.setFromPoints(<any>[minP,maxP]);
//   const material2 = new THREE.MeshBasicMaterial({
//     color: 0xff00ff,
//     // size: 0.02,
//     wireframe: true
//   });
//   //点模型对象
//   const points = new THREE.Mesh(geometry2, material2);
//   // points.position.set(center.x,center.y,center.z)
//   gltf.scene.position.set(0, -center.y, 0)
//   scene.add(points);

//   console.log('gltf.scene', gltf.scene)
//   let posArr = <any>[];
//   let meshArr = <any>[];
//   for (let c = 0; c < gltf.scene.children.length; c++) {

//     const mesh = <any>gltf.scene.children[c];
//     meshArr.push(mesh);
//     posArr.push(mesh.geometry.attributes.position)

//   }

//   // 
//   // console.log('count',count)
//   // console.log('pos',pos)
//   let yArr = [];
//   let xArr = [];
//   let zArr = [];
//   for (let pn = 0; pn < posArr.length; pn++) {
//     let pos = posArr[pn];
//     let count = pos.count;
//     for (let i = 0; i < count; i++) {
//       yArr.push(pos.getY(i))
//       xArr.push(pos.getX(i))
//       zArr.push(pos.getZ(i))
//     }
//   }


//   let minY = Number.MAX_VALUE;
//   let maxY = Number.MIN_VALUE;
//   let minX = Number.MAX_VALUE;
//   let maxX = Number.MIN_VALUE;
//   let minZ = Number.MAX_VALUE;
//   let maxZ = Number.MIN_VALUE;
//   for (let i = 0; i < yArr.length; i++) {
//     if (xArr[i] < minX) {
//       minX = xArr[i]
//     }
//     if (xArr[i] > maxX) {
//       maxX = xArr[i]
//     }

//     if (yArr[i] < minY) {
//       minY = yArr[i]
//     }
//     if (yArr[i] > maxY) {
//       maxY = yArr[i]
//     }

//     if (zArr[i] < minZ) {
//       minZ = zArr[i]
//     }
//     if (zArr[i] > maxZ) {
//       maxZ = zArr[i]
//     }
//   }
//   let h = maxY - minY;
//   let w = maxX - minX;
//   let d = maxZ - minZ;
//   console.log('h', h)
//   console.log('w', w)
//   console.log('d', d)
//   for (let mc = 0; mc < meshArr.length; mc++) {
//     let colorsArr = <any>[];

//     // 根据顶点距离起点远近进行颜色插值计算
//     const c1 = new THREE.Color(0x0000ff);//山谷颜色
//     const c2 = new THREE.Color(0x00ff00);//山顶颜色
//     const cx = new THREE.Color(0xff0000);
//     const cy = new THREE.Color(0x00ff00);
//     const cz = new THREE.Color(0x0000ff);
//     let pos = posArr[mc];
//     for (let i = 0; i < pos.count; i++) {

//       let py = pos.getY(i)
//       let px = pos.getX(i)
//       let pz = pos.getZ(i)

//       colorsArr.push(cx.r * (px - minX) / w, cy.g * (py - minY) / h, cz.b * (pz - minZ) / d);
//       // colorsArr.push(cx.r*(px-minX)/w,0,0);
//       // colorsArr.push(0,cy.g*(py-minY)/h,0);
//       // colorsArr.push(0,0, cz.b*(pz-minZ)/d);
//     }
//     const colors = new Float32Array(colorsArr);
//     let mesh = meshArr[mc];
//     mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
//     mesh.material = new THREE.MeshBasicMaterial({
//       vertexColors: true,
//     });
//   }



// })
// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(90, -40, 60),
  new THREE.Vector3(120, 30, 30),
]);
let geometry = new THREE.TubeGeometry(path);
let material = new THREE.MeshBasicMaterial({
  color:'#ff0000',
  wireframe: true,
  side:THREE.DoubleSide,
})
let mesh =new THREE.Mesh(geometry,material);
scene.add(mesh)

let points = path.getSpacedPoints(500);
// const moveCamera =()=>{
//   return new Promise((resove,reject)=>{

//   })
// }
// 注意关闭 OrbitControls
for(let i =0 ;i<points.length-1;i++){
  let point = points[i];
  let next_point = points[i+1];
  console.log('point',point);
  console.log('next_point',next_point);
  camera.position.set(point.x,point.y,point.z)
  camera.lookAt(next_point); 
  await new Promise((resove,reject)=>{

    gsap.to(camera.position,{
      x:next_point.x,
      y:next_point.y,
      z:next_point.z,
      ease: "none",
      duration :0.01,
      onComplete:()=>{
        resove(null);
      }
    })
  })
}
// let i = 0;

// let animate =()=>{
//   if(i===points.length-1)return;
//   let point = points[i];
//   let next_point = points[i+1];
//   camera.position.set(point.x,point.y,point.z)
//   camera.lookAt(next_point); 
//   i++;
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);

// }

// animate();//注意关闭 commonhook的动画






// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})



const gui = new dat.GUI();
