//路由模块  监听请求，并且找到每个请求的方法名
//1.导包

//2.创建express对象 express.Router()

//3.router.get()
//3.监听请求 app.get

//4.导出对象（一个对象router）


const express = require('express')

//导入控制器文件
const c_user = require('./controllers/c_user');  //(c_user是一个对象类型)
const c_topic = require('./controllers/c_topic');

const router = express.Router()

//渲染登录页的请求
router.get('/signin',c_user.showSignin)
//监听登录的表单的请求
router.post('/signin',c_user.handleSignin)



//渲染话题页面
router.get('/', c_topic.showTopic)

//渲染发布文章
router.get('/topic/create', c_topic.createTopic)

//处理发布话题的表单
router.post('/createTopic', c_topic.handleTopic)

//处理退出
router.get('/signout',c_user.handleSignout)

//处理编辑
router.get('/topic/:topicID', c_topic.showDetail);

module.exports = router;