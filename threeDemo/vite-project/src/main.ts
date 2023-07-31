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
//   gltf.scene.visible=false;
//   console.log('gltf.scene', gltf.scene);
//   //包含关键帧动画的模型作为参数创建一个播放器
//   const mixer = new THREE.AnimationMixer(gltf.scene);
//   //  获取gltf.animations[0]的第一个clip动画对象
//   const clipAction = mixer.clipAction(gltf.animations[0]); //创建动画clipAction对象
//   clipAction.play(); //播放动画
//   // 骨骼辅助显示
//   const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
//   scene.add(skeletonHelper); 

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

























// 一个模型对象
outlinePass.selectedObjects = [];
// 多个模型对象
// outlinePass.selectedObjects = [mesh1,mesh2,group];
// const clock = new THREE.Clock();
function animate() {

  requestAnimationFrame(animate);

  
  composer.render();

}
animate();








