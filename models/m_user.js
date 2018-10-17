//控制器c_user.js中数据库操作的部分提取到当前文件中
const connection = require('../tools/db-config')

//1.验证邮箱
const checkEmail = function(email, callback) {
    const sqlStr = 'select * from users where `email`=?'
    connection.query(sqlStr,email,(err,data) => {
        if(err) {
            return callback(err,null)
        }
        callback(null,data)
    })
}


//2.验证密码


//导出
exports.checkEmail = checkEmail;