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



const gui = new dat.GUI();
let params={
  clear_color:'#a29797',
  sphere_color:'#3939c3',
  z_axios:10,
  sphere_2:64,
  sphere_3:32,
  sphere_R:0.2,
}
renderer.setClearColor(params.clear_color, 1); //设置背景颜色
gui.addColor(params,'clear_color').onChange((value:any)=>{
  
  renderer.setClearColor(value, 1); //设置背景颜色
})
gui.addColor(params,'sphere_color').onChange((value:any)=>{
  
  material.color.set(value)
})
camera.position.z = params.z_axios;
gui.add(params,'z_axios').min(5).max(50).step(0.5).name('z_axios').onChange((value:any)=>{
  camera.position.z = value
})
let geometry = new THREE.SphereGeometry(params.sphere_R,params.sphere_2,params.sphere_3);
gui.add(params,'sphere_2').min(2).max(128).step(2).name('sphere_2').onChange((value:any)=>{
  // geometry.attributes.widthSegments =value; 
  geometry.dispose();
  geometry = new THREE.SphereGeometry(params.sphere_R,value,params.sphere_3);
  meshArrGlobal.forEach((mesh:any)=>{
    mesh.geometry = geometry;
  })
})
gui.add(params,'sphere_3').min(2).max(64).step(2).name('sphere_3').onChange((value:any)=>{
  geometry.dispose();
  geometry = new THREE.SphereGeometry(params.sphere_R,params.sphere_2,value);
  meshArrGlobal.forEach((mesh:any)=>{
    mesh.geometry = geometry;
  })
})
gui.add(params,'sphere_R').min(0.2).max(5).step(0.2).name('sphere_R').onChange((value:any)=>{
  geometry.dispose();
  geometry = new THREE.SphereGeometry(value,params.sphere_2,params.sphere_3);
  meshArrGlobal.forEach((mesh:any)=>{
    mesh.geometry = geometry;
  })
})



let num = 6;
let meshArrGlobal =<any[]>[];

let material = new THREE.MeshPhongMaterial({
  color:params.sphere_color
})
let createSphere =()=>{
  let mesh = new THREE.Mesh(geometry,material);
  mesh.position.x= -5 + 10* Math.random();
  mesh.position.y= -5 + 10* Math.random();
  scene.add(mesh);
  meshArrGlobal.push(mesh)
  
}
for(let i=0;i<num;i++){
  createSphere();
}

// 创建一个 AudioListener 并将其添加到 camera 中
const listener = new THREE.AudioListener();
camera.add( listener );

// 创建一个全局 audio 源
const sound_success = new THREE.Audio( listener );
const sound_fail = new THREE.Audio( listener );

// 加载一个 sound 并将其设置为 Audio 对象的缓冲区
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '/sounds/ping_pong.mp3', function( buffer ) {
	sound_success.setBuffer( buffer );
	// sound.setLoop( true );
	sound_success.setVolume( 0.5 );
	
});
audioLoader.load( '/sounds/button-press.ogg', function( buffer ) {
	sound_fail.setBuffer( buffer );
	// sound.setLoop( true );
	sound_fail.setVolume( 0.5 );
	
});

renderer.domElement.addEventListener('click', function (event) {
  console.log('event',event)
  // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
  const px = event.offsetX;
  const py = event.offsetY;
  // const width =window.innerWidth;
  // const height =window.innerHeight;
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

      sound_success.play();
      //销毁
      meshArrGlobal.splice(meshArrGlobal.find((value:any)=>value===obj),1)
      scene.remove(obj)
      //创建
      createSphere()
        
        
      

  }else{

    sound_fail.play()
    console.log('meshArrGlobal',meshArrGlobal)
  }
})




function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

}
animate();








