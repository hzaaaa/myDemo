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
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
// SMAA抗锯齿通道
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS3渲染器CSS3DRenderer
import { CSS3DRenderer, CSS3DSprite, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';


// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { setLights } from './hooks/lightsHook'
import { setCommon } from './hooks/commonHook'
import { setCamera } from './hooks/cameraHook'

const width = window.innerWidth;
const height = window.innerHeight;

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
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 1, 1);
const glitchPass = new GlitchPass();

// 创建伽马校正通道
const gammaPass = new ShaderPass(GammaCorrectionShader);




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
const smaaPass = new SMAAPass(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
composer.addPass(smaaPass);


// 创建GLTF加载器对象
const loader = new GLTFLoader();
const mmdLoader = new MMDLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/gltf/');
loader.setDRACOLoader(dracoLoader);
let meshArrGlobal = <any>[];

// loader.load('/module/gltf/Soldier.glb', function (gltf) {
//   scene.add(gltf.scene); //三维场景添加到model组对象中
//   const worldPosition = new THREE.Vector3();
//   console.log('动画数据', gltf.animations);
//   //包含关键帧动画的模型作为参数创建一个播放器
//   const mixer = new THREE.AnimationMixer(gltf.scene);
//   //  获取gltf.animations[0]的第一个clip动画对象
//   const clipAction = mixer.clipAction(gltf.animations[0]); //创建动画clipAction对象
//   clipAction.play(); //播放动画

//   // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
//   const clock = new THREE.Clock();
//   function loop() {
//     requestAnimationFrame(loop);
//     //clock.getDelta()方法获得loop()两次执行时间间隔
//     const frameT = clock.getDelta();
//     // 更新播放器相关的时间
//     mixer.update(frameT);
//   }
//   loop();


// })






// mmdLoader.load('/module/XueHu3D-20230718/huhu_0718.pmx', function (mmd) {
//   // debugger
//   scene.add(mmd); 

// })


//几何体两组顶点一一对应，位置不同，然后通过权重系数，可以控制模型形状在两组顶点之间变化
const geometry = new THREE.BoxGeometry(100, 100, 100);
// 为geometry提供变形目标的顶点数据(注意和原始geometry顶点数量一致)
const target1 = new THREE.BoxGeometry(100, 200, 100).attributes.position;//变高
const target2 = new THREE.BoxGeometry(100, 80, 100).attributes.position;//变细

// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];





const material = new THREE.MeshBasicMaterial({
  color: '#00ffff'
})
const material2 = new THREE.MeshBasicMaterial({
  color: '#ff0000',
  wireframe:true
})
// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material2);
mesh.morphTargetInfluences=[];
//morphTargetInfluences  原+差*Influences
mesh.morphTargetInfluences.push (0.1);
mesh.morphTargetInfluences.push(0.5);

console.log('mesh',mesh)
// 创建变形动画权重系数的关键帧数据
mesh.name = "Box";//关键帧动画控制的模型对象命名
// 设置变形目标1对应权重随着时间的变化
const KF1 = new THREE.KeyframeTrack('Box.morphTargetInfluences[0]', [0, 5], [0, 1]);
// 设置变形目标2对应权重随着时间的变化
const KF2 = new THREE.KeyframeTrack('Box.morphTargetInfluences[1]', [5, 10], [0, 1]);
// 创建一个剪辑clip对象
const clip = new THREE.AnimationClip("t", 10, [KF1, KF2]);

scene.add(mesh)
scene.add(mesh2)

// // 播放变形动画
const mixer = new THREE.AnimationMixer(mesh);
const clipAction = mixer.clipAction(clip);
clipAction.play();
clipAction.loop = THREE.LoopOnce; //不循环播放
clipAction.clampWhenFinished = true // 物体状态停留在动画结束的时候

const clock = new THREE.Clock();

function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器时间
    mixer.update(frameT);
}
loop();

// // 给需要设置关键帧动画的模型命名
// mesh.name = "Box";
// const times = [0, 3, 6]; //时间轴上，设置三个时刻0、3、6秒
// // times中三个不同时间点，物体分别对应values中的三个xyz坐标
// const values = [0, 0, 0, 1, 0, 0, 0, 0, 1];
// // 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
// const posKF = new THREE.KeyframeTrack('Box.position', times, values);
// // 从2秒到5秒，物体从红色逐渐变化为蓝色
// const colorKF = new THREE.KeyframeTrack('Box.material.color', [2, 5], [1, 0, 0, 0, 0, 1]);
// // 1.3 基于关键帧数据，创建一个clip关键帧动画对象，命名"test"，持续时间6秒。
// const clip = new THREE.AnimationClip("test", 9, [posKF, colorKF]);
// //包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
// const mixer = new THREE.AnimationMixer(mesh);
// //AnimationMixer的`.clipAction()`返回一个AnimationAction对象
// const clipAction = mixer.clipAction(clip);
// //.play()控制动画播放，默认循环播放
// clipAction.play();





// 一个模型对象
outlinePass.selectedObjects = [];
// 多个模型对象
// outlinePass.selectedObjects = [mesh1,mesh2,group];
// const clock = new THREE.Clock();
function animate() {

  requestAnimationFrame(animate);

  // angle += 0.01;
  // // 相机y坐标不变，在XOZ平面上做圆周运动
  // camera.position.x = R * Math.cos(angle);
  // camera.position.z = R * Math.sin(angle);

  // controls.update();
  // const frameT = clock.getDelta();
  // 更新播放器相关的时间
  // mixer.update(frameT);
  composer.render();

}
animate();








