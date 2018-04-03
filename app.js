// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 创建记录异步处理函数日志中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 对于任何请求，app将调用该异步函数处理请求中间件
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello, koa2!</h1>";
});

// 在端口8080监听:
app.listen(8080);
console.log("app started at port 8080...");
