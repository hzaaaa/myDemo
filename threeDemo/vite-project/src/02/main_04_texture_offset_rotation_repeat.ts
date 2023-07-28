import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';


// createApp(App).mount('#app')
import * as THREE from 'three';
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
// for(let i =0;i<50;i++){
//   const geometry = new THREE.BufferGeometry( );
//   const vertices = new Float32Array(9)
//   for(let j=0;j<9;j++){
//     vertices[j]= -5+ Math.random()*10;
//   }
//   geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
//   let color =new THREE.Color( Math.random(), Math.random(), Math.random())
//   const material = new THREE.MeshBasicMaterial( { color: color,transparent:true,opacity:0.5} );
//   const bufferGeometryMesh = new THREE.Mesh( geometry, material );
//   console.log('geometry',geometry)
//   scene.add( bufferGeometryMesh );
// }

const boxGeometry = new THREE.BoxGeometry( 1,1,1);

const textureLoader = new THREE.TextureLoader();
let defaultTexture = textureLoader.load('/img/default.jpg');
console.log('defaultTexture',defaultTexture)
//偏移
// defaultTexture.offset.x=0.5;
//旋转
defaultTexture.center.set(0.5,0.5)
// defaultTexture.rotation=Math.PI/2;
//重复
defaultTexture.repeat.set(3,3);
defaultTexture.wrapS =THREE.RepeatWrapping;
defaultTexture.wrapT =THREE.RepeatWrapping;


const material = new THREE.MeshBasicMaterial( { color: 0xffffff,map:defaultTexture } );
const boxGeometryMesh = new THREE.Mesh( boxGeometry, material );


scene.add( boxGeometryMesh );

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
