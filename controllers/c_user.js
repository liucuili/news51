//导入m_user.js
const m_user = require('../models/m_user')


//导入tools中的db
const db = require('../tools/db-config');
//导入mysql包以及配置
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'news51'
// });


//渲染登录页
const showSignin = (req,res) => {
    res.render('signin.html')
}

//处理登录的请求
const handleSignin = (req, res) => {
    // res.render('---')
    console.log('前后端打通')
    //1.获取表单数据
    const body = req.body
    // console.log(body);  //body 是一个对象

    //方法写完了，需要调用方法   
    //调用modles中的验证邮箱方法，目的是：获取数据库操作返回的结果，err data
    m_user.checkEmail(body.email,(err,data) => {
        if(err) {
            return res.send({
                code:500,
                message:'服务器错误'
            })
        }
        //邮箱不存在
        if(!data[0]) {
            return res.send({
                code: 1,
                message:'邮箱不存在，快去注册'
            })
        }
        if(body.password != data[0].password) {
            return res.send({
                code: 2,
                message: '密码不正确'
            })
        }
        //给req。session对象增加一个user属性，用于存储用户的信息
        req.session.user = data[0];
        // console.log(req.session.user)
        res.send({
            code: 200,
            message: '可以跳转了'
        })

        
    });

    //2.先验证邮箱    -----提取到了modles下的m_user文件中
    // const sqlStr = 'select * from users where `email`=?'
    // connection.query(sqlStr,body.email,(err, data) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     // console.log(data)
    //     //邮箱不存在的情况，数组长度为0
    //     if(!data[0]) {
    //         return res.send('邮箱不存在，快去注册')
    //     }
    //     //代码来到这步，说明这个邮箱存在，进行下一步
    //     if(body.password != data[0].password) {
    //         return res.send('密码不正确')
    //     }
    //     //走到这一步说明邮箱和密码都正确了
    //     res.redirect('/')
    // })

    
}

//处理退出登录，删除session,页面跳转
const handleSignout = (req,res) => {
    //1.删除用户信息
    delete req.session.user
    //2.页面重定向
    res.redirect('/signin')
}
//导出(会有多个处理函数)
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;