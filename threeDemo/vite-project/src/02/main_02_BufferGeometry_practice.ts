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
for(let i =0;i<50;i++){
  const geometry = new THREE.BufferGeometry( );
  const vertices = new Float32Array(9)
  for(let j=0;j<9;j++){
    vertices[j]= -5+ Math.random()*10;
  }
  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  let color =new THREE.Color( Math.random(), Math.random(), Math.random())
  const material = new THREE.MeshBasicMaterial( { color: color,transparent:true,opacity:0.5} );
  const bufferGeometryMesh = new THREE.Mesh( geometry, material );
  console.log('geometry',geometry)
  scene.add( bufferGeometryMesh );
}

// const geometry = new THREE.BufferGeometry( );
// // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// // 因为在两个三角面片里，这两个顶点都需要被用到。
// const vertices = new Float32Array( [
// 	-1.0, -1.0,  1.0,
// 	 1.0, -1.0,  1.0,
// 	 1.0,  1.0,  1.0,

// 	 1.0,  1.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	-1.0, -1.0,  1.0
// ] );
// // itemSize = 3 因为每个顶点都是一个三元组。
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const bufferGeometryMesh = new THREE.Mesh( geometry, material );


// scene.add( bufferGeometryMesh );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
camera.position.z = 8

const clock = new THREE.Clock();
// gsap.to(bufferGeometryMesh.position,{x:5,duration:3})
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
