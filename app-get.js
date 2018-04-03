const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// 打印 请求URL:
app.use(async (ctx, next) => {
    console.log(`处理 ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 为router添加URL请求:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>你好, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>主页</h1>';
});

// 添加router中间件:
app.use(router.routes());

app.listen(8080);
console.log('服务器启动并监听 8080端口，打开 http://localhost:8080 ...');