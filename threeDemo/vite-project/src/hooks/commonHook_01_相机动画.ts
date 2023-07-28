import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const setCommon = (scene: any,camera:any) => {
  // WebGL渲染器设置
  const renderer = new THREE.WebGLRenderer({
    // 设置对数深度缓冲区，优化深度冲突问题
    // logarithmicDepthBuffer: true,//作用有点小
  });
  


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    console.log('window.devicePixelRatio', window.devicePixelRatio)
  })

  window.addEventListener('dblclick', () => {
    // debugger
    const fullscreenElement = document.fullscreenElement;
    if (!fullscreenElement) {
      renderer.domElement.requestFullscreen()
    } else {
      document.exitFullscreen();
    }
  })

  // 渲染循环
let angle = 0; //用于圆周运动计算的角度值
const R = 2; //相机圆周运动的半径
  function animate() {
    requestAnimationFrame(animate);
    
    angle += 0.01;
    // 相机y坐标不变，在XOZ平面上做圆周运动
    camera.position.x = R * Math.cos(angle);
    camera.position.z = R * Math.sin(angle);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}