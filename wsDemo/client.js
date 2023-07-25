import WebSocket, { WebSocketServer } from 'ws';
import readline from 'readline';
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  // 向服务器发送消息
  // socket.send('client open');
  rl.on('line', function (line) {
    // console.log(line)
    // socket.send(line.trim()); //trim去除两角的空栽�; //trim去除两边的空格 
    socket.send(Date.now());
  })
  // console.log('client open')
});

// 从服务器接收消息
socket.addEventListener("message", ({ data }) => {
  console.log(data);
});