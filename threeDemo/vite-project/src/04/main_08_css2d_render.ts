// http://www.webgl3d.cn/pages/e1e75d/
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
// 引入UnrealBloomPass通道
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// 引入GlitchPass通道
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

// 伽马校正后处理Shader
import {GammaCorrectionShader} from 'three/addons/shaders/GammaCorrectionShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
// SMAA抗锯齿通道
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';

// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DRenderer,CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';







// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { setLights } from './hooks/lightsHook'
import { setCommon } from './hooks/commonHook'
import { setCamera } from './hooks/cameraHook'

const width =window.innerWidth;
const height =window.innerHeight;

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


// canvas画布宽高度尺寸是800, 600
// canvas画布宽高度window.innerWidth, window.innerHeight
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),1.0,1,1);
const glitchPass = new GlitchPass();

// 创建伽马校正通道
const gammaPass= new ShaderPass(GammaCorrectionShader);




// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);

// 设置renderPass通道
composer.addPass(renderPass);
composer.addPass(outlinePass);
// composer.addPass(bloomPass);
//闪屏 酷炫
// composer.addPass(glitchPass);
composer.addPass(gammaPass);

//获取.setPixelRatio()设置的设备像素比
const pixelRatio = renderer.getPixelRatio();
// width、height是canva画布的宽高度
const smaaPass = new SMAAPass(window.innerWidth * pixelRatio,  window.innerHeight * pixelRatio);
composer.addPass(smaaPass);



// import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

// 创建一个html标签
function tag(){
    const div = document.createElement('div');
    // div.style.visibility = 'hidden';
    div.innerHTML = '标签内容';
    div.style.padding = '4px 10px';
    div.style.color = '#fff';
    div.style.fontSize = '16px';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'rgba(25,25,25,0.5)';
    div.style.borderRadius = '5px';
    // div元素包装成为css2模型对象CSS2DObject
    const label =new CSS2DObject(div);
    div.style.pointerEvents = 'none';//避免HTML标签遮挡三维场景的鼠标事件
     // 设置HTML元素标签在three.js世界坐标中位置
    // label.position.set(0,1,0);
    return label;
}

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 相对鼠标的相对偏移
// labelRenderer.domElement.style.top = '-16px';
// labelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

let label = tag();



// 创建GLTF加载器对象
const loader = new GLTFLoader();
const mmdLoader = new MMDLoader();

let meshArrGlobal =<any>[];

renderer.domElement.addEventListener('click', function (event) {
  console.log('event',event)
  // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
  const px = event.offsetX;
  const py = event.offsetY;

  //屏幕坐标px、py转WebGL标准设备坐标x、y
  //width、height表示canvas画布宽高度
  const x = (px / width) * 2 - 1;
  const y = -(py / height) * 2 + 1;
  //创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
  // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
  // 未选中对象返回空数组[],选中一个对象，数组1个元素，选中两个对象，数组两个元素
  const intersects = raycaster.intersectObjects(meshArrGlobal);
  console.log('meshArrGlobal',meshArrGlobal)
  console.log("射线器返回的对象", intersects);
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    console.log('intersects',intersects)
      // 选中模型的第一个模型，设置为红色
      let obj =<any> intersects[0].object;
      console.log('obj.material.color',obj.material.color)
      console.log('obj.material_back',obj.material_back)
      if(obj.material_back){
        obj.material = obj.material_back;
        obj.material_back = null;
      }else{
        obj.material_back =  obj.material;

        obj.material= obj.material.clone();
        obj.material.color.set(0xff0000);
      }

  }
})
// renderer.domElement.addEventListener('click', function (event) {
//   const px = event.offsetX;
//   const py = event.offsetY;
//   //屏幕坐标转标准设备坐标
//   const x = (px / window.innerWidth) * 2 - 1;
//   const y = -(py / window.innerHeight) * 2 + 1;
//   const raycaster = new THREE.Raycaster();
//   //.setFromCamera()在点击位置生成raycaster的射线ray
//   raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
//   const cunchu = model.getObjectByName('存储罐');
//   // 射线拾取模型对象(包含多个Mesh)
//   // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)    
//   for (let i = 0; i < cunchu.children.length; i++) {
//       const group = cunchu.children[i];
//       //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
//       group.traverse(function (obj) {
//           if (obj.isMesh) {
//               obj.ancestors = group;
//           }
//       })
//   }
//   // 射线交叉计算拾取模型
//   const intersects = raycaster.intersectObjects(cunchu.children);
//   console.log('intersects', intersects);
//   if (intersects.length > 0) {
//       // 通过.ancestors属性判断那个模型对象被选中了
//       outlinePass.selectedObjects = [intersects[0].object.ancestors];
//   }
// })



loader.load('/module/potted_plant_01_4k/potted_plant_01_4k.gltf', function (gltf) {
  scene.add(gltf.scene); //三维场景添加到model组对象中
  const worldPosition = new THREE.Vector3();
  gltf.scene.children[0].add(label)
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
  // scene.add(points);

  console.log('gltf.scene', gltf.scene)
  let posArr = <any>[];
  let meshArr = <any>[];
  for (let c = 0; c < gltf.scene.children.length; c++) {

    const mesh = <any>gltf.scene.children[c];
    meshArr.push(mesh);
    posArr.push(mesh.geometry.attributes.position)

  }
  meshArrGlobal = meshArr
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
    outlinePass.selectedObjects.push(meshArr[mc]);
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
// mmdLoader.load('/module/XueHu3D-20230718/huhu_0718.pmx', function (mmd) {
//   // debugger
//   scene.add(mmd); 

// })


const geometry = new THREE.BoxGeometry(1,1,1);
geometry.translate(0, -0.5, 0);
const material = new THREE.MeshBasicMaterial({
  color:'#ff0000'
})
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)

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
// scene.add(sprite)

// 一个模型对象
outlinePass.selectedObjects = [];
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
  labelRenderer.render(scene, camera); //渲染标签
}
animate();





