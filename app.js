//导入koa2
const Koa = require('koa2');

//引入monk
const monk = require('monk');

//定义url
const url = 'mongodb://Kun:Kun@localhost:27017/mydb';

const db = monk(url);
const users = db.get('user')

//导入路由
const router = require('koa-router')();

//创建一个Koa对象标识web app本身
const app = new Koa();

//对于任何请求，app将调用该异步函数处理请求：
app.use(async(ctx,next)=>{
    console.log(`process ${ctx.request.method} ${ctx.request.url}`)
    await next();
})

//add url-router
router.get('/hello/:name',async(ctx,next)=>{
    let name = ctx.params.name;
    ctx.response.body = `<h1>Hello,${name}!</h1>`;
})

router.get('/',async(ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>`;
})

router.get('/name',async(ctx,next)=>{
    let data = await users.find();
    ctx.body = data;
    db.close();
})

//add router middleware
app.use(router.routes());

//监听端口
app.listen(3080);
console.log('app started at port 3080')