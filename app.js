/**
 * 涉及业务
 * @param {*} req 
 * @param {*} res 
 */
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理postData数据
const getPostData = ((req,res) =>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method != 'POST'){
            resolve({})//不作为错误 使用resolve返回空值
            return
        }
        if(req.headers['content-type']!='application/json'){//注意写法 通过‘.’和‘[]’两种
            resolve({})
            return
        }
        let postData = ''
        req.on('data',(chunk)=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
            // res.end(JSON.parse(postData)
        })
    })
    return promise
})
const serverHandle = (req,res)=>{
    //处理path
    req.path = req.url.split('?')[0];
    // 处理query
    req.query = querystring.parse(req.url.split('?')[1])
    // 处理cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return 
        }
        const key = item.split('=')[0]
        const value = item.split('=')[1]
        req.cookie[key]=value//不能用.访问对象的时候就用[]，且只有这两种方式
    })
    console.log('cookie/',req.cookie)
    // 设置返回格式
    res.setHeader('content-type','application/json')
    // 处理postData
    getPostData(req,res).then((postData)=>{
        req.body = postData//不是res????

        // 处理路由
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData =>{
                res.end(JSON.stringify(blogData))
            })
            return;
        }
        const userResult = handleUserRouter(req,res)
        if(userResult){
            userResult.then(userData=>{
                res.end(JSON.stringify(userRouter))
            })
            return;
        }
        // 404处理
        res.writeHeader(404,{'content-type':'text/plain'})
        res.write('404 not Found\n')
        res.end()
    })
}

module.exports = serverHandle