self.onmessage =(e)=>{
  self.postMessage(e.data+1)
  console.log('worker',e.data)
}