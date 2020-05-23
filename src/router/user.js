const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../resModel/resModel')


// 获取cookie的过期时间
const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    return d.toGMTString();
}

const handleUserRouter = (req,res)=>{

    // 登录
    // if(req.method==='POST' && req.path === '/api/user/login'){
        if(req.method==='GET' && req.path === '/api/user/login'){
        // const {username,passward} = req.body
        const {username,passward} = req.query
        const result = login(username,passward)
        return result.then(data=>{
            if(data.username){
                // 服务器端写cookie 并设置所有路由均生效
                res.setHeader('Set-Cookie',`username='${username}';path=/;httpOnly;expires=${getCookieExpires()}`)
                return new SuccessModel('登录成功')
            }else{
                return new ErrorModel('登录失败')
            }
        })
    }

    // 登录验证的测试
    if(req.method==='GET' && req.path === '/api/user/login-test'){
        if(req.cookie.username){
            return Promise.resolve(
                new SuccessModel({
                    username:req.cookie.username
                })
            )//可通过Promise.resolve直接构造一个promise返回
        }else{
            return Promise.resolve(
                new ErrorModel('登录失败')
            )
        }
    }
}

module.exports = handleUserRouter