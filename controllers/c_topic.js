//导入模型文件
const m_topics = require('../models/m_topic')
//导入momment
const moment = require('moment')
//显示话题
exports.showTopic = (req, res) => {
    // res.send('topic页面')   //测试所用
    //要数据 -》让模型给我数据--调用模型.方法
    m_topics.findAllTopic((err, data)=>{
        if(err) {
            return res.send({
                code:500,
                message:'服务器错误'
            })
        }
        // console.log(data)
        //data类型  是数组 
        //渲染话题模型
        res.render('index.html', {
            topics: data,
            user: req.session.user
        });
    })
    
    
}

//发布新话题
exports.createTopic = (req, res) => {
    res.render('topic/create.html')
}

//处理新话题
exports.handleTopic = (req, res) => {
    //1.接收前端发送的数据
    const body = req.body;
    //给momment添加字段
    body.createdAt = moment().format();  //格式化时间

    //给body添加userId
    body.userId = req.session.user.id
    // console.log(body);
    //2.处理数据库返回的结果
    m_topics.addTopic(body, (err, data) => {
        if(err) {
            // console.log(err)
            return res.send({
                code: 500,
                message: '服务器错误了啦，哈哈哈'
            })
        }
        //添加成功，返回结果
        res.send({
            code: 200,
            message: '添加话题成功'
        })
    })
}

//渲染话题详情页
// exports.showDetail = (req, res) => {
//     // console.log(req.params)  //{ topicID: '12' }
//     res.render('topic/show.html')
//     const topicID = req.params.topicID
//     console.log(topicID)
//     m_topics.findTopicByID(topicID, (err, data) => {
//         if(err) {
//             return res.send({
//                 code: 500,
//                 message: '服务器又错了'
//             })
//             console.log(data)
//              res.render('topic/show.html', {
//                  topic: data[0]
//              })
//         }
//     })
   
// }


exports.showDetail = (req, res) => {

    // html中  a href = '/topic/{{$value.id}}'
    //  router中 .get('/topic/:topicID');
    // 在控制器c_topic.js中 获取topicID
    // console.log(req.params); 
    // { topicID: '193' }

    const topicID = req.params.topicID;
    // 根据当前话题的id值 topicID 去数据库中找到话题数据
    // 让模型操作数据库 返回结果 
    m_topics.findTopicByID(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器又错了'
            })
        }
        // console.log(data)  data是一个数组，数组里是一个对象，包括了这篇文章的所有信息
        //req.session保存的是登录用户的id;data是指数据库中的用户信息
        res.render('topic/show.html', {
            topic: data[0],
            sessionUserId: req.session.user.id
        });

    });
}

exports.showEdit = (req,res) => {
    //获取动态路由的用户话题id
    const topicID = req.params.topicID
    //拿到新的表单数据(标题和内容)
    // const body = req.body
    // console.log(body)
    //查询数据库,显示这条id对应的标题和内容，页面跳转
    m_topics.findTopicByID(topicID, (err,data) => {
        if(err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        // console.log(data)
        res.render('topic/edit.html', {topic: data[0]})
    })
  
}

//处理编辑表单的提交
exports.handleEdit = (req, res) => {
    const body = req.body
    const topicID = req.params.topicID
    // console.log(body,topicID)
    m_topics.updataTopicByID(body, topicID, (err, data) => {
        if(err) {
            return res.send({
                code: 500,
                message: "err.message"
            })
        }
        res.send({
            code: 200,
            message: '编辑成功'
        })
    })

}
exports.deleteTopic = (req, res) => {
    const topicID = req.params.topicID
    m_topics.deleteTopicByID(topicID,(err, data) => {
        if(err) {
            return res.send( {
                code: 500,
                message: err.message
            })
        }
        res.send({
            code: 200,
            message:'删除成功'
        })
        // res.redirect('/')
    })
}


