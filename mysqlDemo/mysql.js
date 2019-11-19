const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users;'//查 改 插
con.query(sql,(err,result)={
    if(err){
        console.err(err)
        return
    }
    // console.log(result)???
})

// 关闭连接
con.end()