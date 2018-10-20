//程序入口文件
//1.导包
const express = require('express')

const bodyParser = require('body-parser')

const router = require('./router')
//导入express-session包
const session = require('express-session')

//导入express-mysql-session,持久化保存session信息
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news51'
};
const sessionStore = new MySQLStore(options);

//2.app对象
const app = express()

//配置包
//配置模板引擎
app.engine('html', require('express-art-template'))


//处理静态资源
app.use('/public',express.static('./public'))
//处理第三方资源
app.use('/node_modules', express.static('./node_modules'))
//配置express-sesssion包(注意要写在app.use(router之前))
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
//   }))
// 配置express-mysql-session包
// 配置body-parser包
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

  
//绑定端口上使用
app.use(router)

//4.绑定端口
app.listen(12345, () => {
    console.log('suceess----')
})



//话题列表页
//一、渲染页面
// 1.导入ui的素材
// 2. /router.js中配置路由 在控制器res.render(v,m)
// M:查询数据库   返回data
// 把data在V中通过模板引擎语法使用

//二、 登录和注册按钮的显示与隐藏
// express-session包
// 1 保存用户信息 req.session.user = data[0]
// 2 显示当前用户名 req.session.user.title


//三、详情页
//在页面中  发送了动态的请求 /topic/{{$value.id}}
//在路由中  配置了动态路由  router.get('/topic/:参数名topicId')
//在控制器中  通过req.params.topicId获取当前话题的id值
            // 让模型按照topicId查找当前话题的数据res.render(V,M)
//在页面中  使用话题数据

//四：发布新话题
//1.渲染页面
//2.客户端发送表单请求
//3.服务端处理表单
//4.客户端进行跳转（列表页）

//五、 express-session 不是持久化存储
//express-mysql-session
//创表   sql语句 都不需要写