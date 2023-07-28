export const setCamera=(scene:any)=>{
  
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2//200 100

//   // 正投影相机
// const width = window.innerWidth; //canvas画布宽度
// const height = window.innerHeight; //canvas画布高度
// const k = width / height; //canvas画布宽高比
// const s = 6;//控制left, right, top, bottom范围大小
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 80);
// camera.position.set(0, 20, 0);//相机放在了y轴上
// camera.lookAt(0, 0, 0);//指向坐标原点

// camera.lookAt(0,0,0);
// // // 你可以看到模型相比原来上下颠倒  y坐标轴朝下
// camera.up.set(0,-1,0)
//渲染效果：红色x轴向上
// camera.up.set(1, 0, 0);

// 注意执行顺序问题
// 注意.up属性和.position属性一样，如果在.lookAt()执行之后改变,需要重新执行.lookAt()。
// camera.lookAt(0,0,0);
// camera.up.set(0, 1,0);//改变up
// camera.lookAt(0,0,0);//执行lookAt重新计算相机姿态

  return camera;
}