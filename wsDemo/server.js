// import { WebSocketServer } from "ws";
import WebSocket, { WebSocketServer } from 'ws';
import readline from 'readline';
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  
  rl.on('line', function (line) {
    socket.send(line.trim()); //trim去除两边的空格 
    // ws.send(Date.now());
  })

  
  socket.on("message", (data) => {
    // console.log(data.toString());
    console.log(`Round-trip time: ${Date.now() - data} ms`);
    
    server.clients.forEach(function each(client) {
      if ( client.readyState === WebSocket.OPEN) {
        client.send(Date.now() - data);
      }
    });
  }
  );
});