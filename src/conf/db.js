const env = process.env.NODE_ENV//环境参数

// 配置
let MYSQL_CONF

if(env==='dev'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'',
        port:'3306',
        database:''
    }
}
if(env==='production'){
    MYSQL_CONF = {
        host:'',
        user:'',
        password:'',
        port:'',
        database:''
    }
}

module.exports = {
    MYSQL_CONF
}