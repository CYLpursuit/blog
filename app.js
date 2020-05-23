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
    // 解析query
    req.query = querystring.parse(req.url.split('?')[1])
    // 解析cookie 本质都是字符串，需要格式化处理
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return 
        }
        const key = item.split('=')[0].trim();
        const value = item.split('=')[1].trim();
        req.cookie[key]=value//不能用.访问对象的时候就用[]，且只有这两种方式
    })
    console.log('cookie/',req.cookie)
    // 设置返回格式
    res.setHeader('content-type','application/json')
    // 处理postData
    getPostData(req,res).then((postData)=>{
        req.body = postData;
        console.log('method/',req.method)
        console.log('path/',req.path)
        console.log('remoteAddress/',req.socket.remoteAddress)
        console.log('remotePort/',req.socket.remotePort)
        // 处理路由
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){//TODO: 异步undefined问题探究处理=》没有return promise
            blogResult.then(blogData =>{
                res.end(JSON.stringify(blogData))
            })
            return;
        }
        const userResult = handleUserRouter(req,res)
        console.log('userResult/',userResult)
        if(userResult){
            userResult.then(userData=>{
                res.end(JSON.stringify(userData))
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