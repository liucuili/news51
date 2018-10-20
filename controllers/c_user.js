// import { CONNREFUSED } from 'dns';

//导入m_user.js
const m_user = require('../models/m_user')


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
}

//处理退出登录，删除session,页面跳转
const handleSignout = (req,res) => {
    //1.删除用户信息
    delete req.session.user
    //2.页面重定向
    res.redirect('/signin')
}




//显示注册页面
exports.showSignup = (req, res) => {
    res.render('signup.html')
}

//处理注册表单
exports.handleSignup = (req,res) => {
    const body = req.body  //获取表单数据
    //验证邮箱是否存在(!!!验证邮箱是否存在，调用时传参数应该是检测邮箱所以要用body.email)
    m_user.checkEmail(body.email, (err,data) => {
        if(err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        //走到这一步，说明服务器没错，验证邮箱，如果数据库没有，则返回一个空数组,如果有，则提醒邮箱存在
        if(data[0]) {
            return res.send({
                code: 1,
                message: '邮箱已经存在'
            })
        }
        //验证昵称是否存在，走到这一步说明邮箱不存在
        m_user.checkNickname(body.nickname, (err, data) => {
            if(err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if(data[0]) {
                return res.send({
                    code: 2,
                    message: '昵称存在'
                })
            }
             //如果昵称不存在
            m_user.insertUser(body, (err, data) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    });
                }

                // 发送响应到客户端
                 res.send({
                    code: 200,
                    message: '跳转到登录页'
                });
            });
        })

        
    })
    

   

}

//导出(会有多个处理函数)
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;