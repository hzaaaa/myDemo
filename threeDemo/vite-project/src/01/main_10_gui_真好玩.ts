import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';


// createApp(App).mount('#app')
// import * as THREE from 'three';
// declare const THREE:any ;
console.log('THREE',THREE);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping=true;
controls.update();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
camera.position.z = 8

const clock = new THREE.Clock();
// gsap.to(cube.position,{x:5,duration:3})
function animate() {
	requestAnimationFrame( animate ); 
  
  controls.update();
	renderer.render( scene, camera );
}
animate();
window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio);
  console.log('window.devicePixelRatio',window.devicePixelRatio)
})
window.addEventListener('dblclick',()=>{
  // debugger
  const fullscreenElement =  document.fullscreenElement;
  if(!fullscreenElement){
    renderer.domElement.requestFullscreen()
  }else{
    document.exitFullscreen();
  }
})
const gui = new dat.GUI();
gui.add(cube.position,'x').min(0).max(5).step(0.1).name('position_x').onChange(()=>{
  // console.log('onChange')
}).onFinishChange(()=>{
  console.log('onFinishChange')
});
let params={
  color:'#ffffff',
  fn:()=>{
    gsap.to(cube.position,{
      x:5,
      duration:3,
      yoyo:true,
      repeat:-1
    })
  }
}
gui.addColor(params,'color').  onChange((value:any)=>{
  // console.log('onChange')
  cube.material.color.set(value)
})
gui.add(cube,'visible').name('是否显示')
gui.add(params,'fn').name('运动');;
let folder = gui.addFolder('设置立方体');;
folder.add(cube.material,'wireframe').name('设置线框')
