
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// import gltf from ''

let createLight = function() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // 创建环境光
    scene.add(ambientLight); // 将环境光添加到场景

    const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
    spotLight.position.set(150, 150, 150);
    spotLight.castShadow = true;
    scene.add(spotLight);
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
createLight();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);






camera.position.z = 1000;
const loader = new GLTFLoader();

loader.load('/bridge/scene.gltf', function (gltf) {
    gltf.scene.scale.set(100,100,100)
    scene.add( gltf.scene );
    // debugger
    // model.scene.children[0].scale.set(50, 50, 50);
    // scene.add(model.scene.children[0]);
    gltf.scene.rotation.y += 90;
    gltf.scene.rotation.x += 45;
    
    function animate() {
        requestAnimationFrame( animate );
        // gltf.scene.rotation.z += 0.01;
        // gltf.scene.rotation.y += 0.01;
        // gltf.scene.rotation.x += 0.01;

        renderer.render( scene, camera );
    }

    animate();
}, undefined, function (error) {

    console.error(error);

});


