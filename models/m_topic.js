//利用sql导出topics数据
//模型文件：操作话题数据库表，并且将操作数据库的结果返回

//导入db_config.js
const db = require('../tools/db-config')
exports.findAllTopic = (callback) => {
    //sql语句
    const sqlstr = 'select * from topics order by createdAt desc'
    //操作数据库(想在函数外部操作函数内部异步的函数)
    //要在c_topic中使用findAllTopic里面的query()这个异步操作返回的结果
    //所以，通过回调函数的方式将结果以参数的形式进行传递

    db.query(sqlstr,(err,data) => {
        if(err) {
            return callback(err,null)
        }
        callback(null, data)
    })
}


//把数据添加到数据库中，m中的某个方法，添加成功，返回想要
exports.addTopic = (body,callback) => {
    const sqlstr = 'insert into topics set ?'
    db.query(sqlstr, body, (err, data) => {
       if (err) {
           return callback(err,null)
       } 
       callback(null, data)
    })
}


//根据id查询是谁写的话题

exports.findTopicByID = (topicID, callback) => {
    const sqlstr = 'SELECT *FROM `topics` WHERE id = ?';
    db.query(sqlstr, topicID, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);

    });
}
