const Koa = require('koa');
const path = require('path');
const fs = require('fs');
// import Koa from 'koa';
// import path from 'path';
// import fs from 'fs';
const app = new Koa();



app.use(async (ctx, next) => {
  //console.log('1-1');
  const start = Date.now();
  await next();
  //console.log('1-2');
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  
  const start = Date.now();
  await next();
  
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  
  const indexContent = await fs.promises.readFile(path.resolve(__dirname, "./index.html")); // 在服务端一般不会这么用
  ctx.response.body = indexContent;
  ctx.response.set("Content-Type", "text/html");
  ctx.cookies.set('name', 'value')
});

app.listen(3000);