const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleUserRouter = (req,res)=>{

    // 登录
    if(req.method==='POST' && req.path === '/api/user/login'){
        const {username,passward} = req.body
        const result = login(username,passward)
        return result.then(data=>{
            if(data.username){
                // 操作cookie 设置所有路由均生效
                // res.setHeader('Set-Cookie',`username='${username}';path=/`) //TODO: set-cookie不存在
                return new SuccessModel('登录成功')
            }else{
                return new ErrorModel('登录失败')
            }
        })
    }

    // 登录验证的测试
    // if(req.method==='GET' && req.path === '/api/user/login-test'){
    //     if(req.cookie.username){
    //         return Promise.resolve(
    //             new SuccessModel('登录成功')
    //         )//可通过Promise.resolve直接构造一个promise返回
    //     }else{
    //         return Promise.resolve(
    //             new ErrorModel('登录失败')
    //         )
    //     }
    // }
}

module.exports = handleUserRouter