let scene = <any>null;
let setPointLight = () => {
  const pointLight1 = new THREE.PointLight(0xffffff, 1.0);
  const pointLight2 = new THREE.PointLight(0xffffff, 1.0);
  pointLight1.position.set(0, 30, 30);
  pointLight2.position.set(0, -300, -300);
  scene.add(pointLight1); //点光源添加到场景中
  scene.add(pointLight2); //点光源添加到场景中

  //   // 光源辅助观察
  const pointLightHelper = new THREE.PointLightHelper(pointLight1, 10);
  scene.add(pointLightHelper);

}
let setAmbient = () => {
  //环境光:没有特定方向，整体改变场景的光照明暗
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
}
let setDirectionalLight = () => {
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
  directionalLight.position.set(0, 2, -1);
  directionalLight.castShadow = true;//阴影要排除其他光源干扰
  directionalLight.shadow.radius = 3;


  // 设置三维场景计算阴影的范围
  directionalLight.shadow.camera.left = -1;
  directionalLight.shadow.camera.right = 1;
  directionalLight.shadow.camera.top = 1;
  directionalLight.shadow.camera.bottom = -1;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;
  // directionalLight.shadow.camera.up.set(1, 0, 0);
  // 如果阴影边缘锯齿感的时候，可以适当提升像素
  directionalLight.shadow.mapSize.set(1024, 1024);
  // directionalLight.shadow.mapSize.set(2048,2048);


  // 可视化平行光阴影对应的正投影相机对象
  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  scene.add(cameraHelper);

  // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
  // directionalLight.target = mesh;
  scene.add(directionalLight);
  // DirectionalLightHelper：可视化平行光
  const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
  scene.add(dirLightHelper);
}
let setSpotLight = () => {
  // 聚光源
  // 0xffffff:光源颜色
  // 1.0：光照强度intensity
  const spotLight = new THREE.SpotLight(0xffffff, 1.0);
  // 设置聚光光源发散角度
  spotLight.angle = Math.PI / 6;//光锥角度的二分之一   光锥此时为60度
  scene.add(spotLight);//光源添加到场景中


  // 设置聚光光源位置
  spotLight.position.set(0, 50, 0);

  // spotLight.target是一个模型对象Object3D，默认在坐标原点
  // spotLight.target.position.set(50,0,0);
  // //spotLight.target添加到场景中.target.position才会起作用
  // scene.add(spotLight.target);

  // 聚广源辅助对象，可视化聚广源
  const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0xffffff)
  scene.add(spotLightHelper);
}
export const setLights = (sceneTemp: any) => {
  scene = sceneTemp;

  // setPointLight();
  // setAmbient();
  setDirectionalLight();
  // setSpotLight();






}