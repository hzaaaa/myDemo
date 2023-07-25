import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

createApp(App).mount('#app')
// import * as THREE from 'three';
// declare const THREE:any ;
console.log('THREE',THREE);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls( camera, renderer.domElement );
// camera.position.set( 0, 20, 100 );
controls.update();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
camera.position.z = 8
let timeStart =<any> null;
function animate() {
	requestAnimationFrame( animate );
  let currentTime =(new Date()).getTime();
  timeStart = timeStart||currentTime;
  let stamp =( currentTime - timeStart)/1000;
  cube.position.x = ((stamp*1)%5);
  // cube.position.y += 0.01;
  // cube.position.z += 0.01;

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // cube.rotation.z += 0.01;
  // cube.scale.x += 0.01;
  // cube.scale.y += 0.01;
  cube.rotation.z = -(stamp*(Math.PI*2/4));

  controls.update();
	renderer.render( scene, camera );
}
animate();
