const Koa = require('koa');

// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
const bodyParser = require('koa-bodyparser')();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// 打印 请求URL:
app.use(async (ctx, next) => {
    console.log(`处理 ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// get一个简单的表单
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>登录</h1>
      <form action="/signin" method="post">
          <p>用户名: <input name="name" value="" placeholder="请输入用户名"></p>
          <p>密码: <input name="password" type="password" placeholder="请输入密码"></p>
          <p><input type="submit" value="提交"></p>
      </form>`;
});

// post一个简单的表单请求，用户名koa 密码是12345
router.post('/signin', async (ctx, next) => {
  const　name = ctx.request.body.name || '';
  const　password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>欢迎你, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>登录失败，用户名或者密码不正确!</h1>
      <p><a href="/">再次登录</a></p>`;
  }
});

// 添加bodyParser中间件:
app.use(bodyParser);
// 添加router中间件:
app.use(router.routes());

app.listen(8080);
console.log('服务器启动并监听 8080端口，打开 http://localhost:8080 ...');