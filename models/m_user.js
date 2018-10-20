// //控制器c_user.js中数据库操作的部分提取到当前文件中
const connection = require('../tools/db-config')

//1.验证邮箱
exports.checkEmail = (email, callback) => {
    const sqlStr = 'select * from `users` where `email`=?'
    connection.query(sqlStr,email,(err,data) => {
        if(err) {
            return callback(err,null)
        }
        callback(null,data)
    })
}

//验证昵称
exports.checkNickname = (nickname, callback) => {
    const sqlstr = 'select * from `users` where `nickname` = ?'
    connection.query(sqlstr, nickname, (err, data) => {
        if(err) {
            return callback(err,null)
        }
        callback(null, data)
    })
}

//添加
exports.insertUser = (body, callback) => {
    const sqlstr = 'insert into users set ?'
    connection.query(sqlstr, body, (err, data) => {
        if(err) {
            return callback(err)
        }
        callback(null, data)
    })
}




