self.onmessage =(e:any)=>{
  let positions =e.data;
  let num = positions.length;
  setInterval(()=>{

  
    let timestamp = new Date().getTime();
    for(let i=0; i<num; i++) {
      let angle = (timestamp/1000)%60/60 * 2*Math.PI*10;
      let r = Math.sqrt(positions[i].x*positions[i].x +  positions[i].y* positions[i].y )
      positions[i].x = r * Math.cos(angle);
      // positions[i].z = positions[i].z + Math.cos(angle);
      positions[i].y = r * Math.sin(angle);
      //上面就是简单的位置变化，下面的代码模拟复杂的变化，累加100000次（这是非常占用线程的情况）
      for(let j=1, total=1; j<=100000; j++) {
          total += j;
      }
      // if(positions[i].y > 500) {
      //     positions[i].y = positions[i].y - 1000;
      // }
      
    }
    self.postMessage(positions)
  },1000/60)
}