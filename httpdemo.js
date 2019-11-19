const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req,res)=>{
    /**
     * http.createServer((req,res)=>{})
     * req,即请求头对象具有很多存在的属性，包括常见的method,url等可供读取使用
     * res,即请求响应头对象，可通过setHeaders方法设置响应头对象参数，也可通过end方法写回传并展示在preview中
     */
    
    // GET请求
    // console.log('method:',req.method)//GET
    // let url = req.url;
    // console.log('url:',url)
    // req.query =  querystring.parse(url.split('?')[1])
    // console.log('query:',req.query)
    // res.end(JSON.stringify(req.query))

    // POST请求
    // console.log('method:',req.method)
    // if(req.method === 'POST'){变量名
    //     console.log('content-type',req.headers('content-type'))
    //     let postData = ''//接收数据
    //     req.on('data',(chunk)=>{//数据流分多个chunk传输触发
    //         postData += chunk.toString();
    //     })
    //     req.on('end',()=>{//数据流传输完毕触发
    //         console.log('postData',postData)
    //         res.end('POST')//服务端响应头返回的数据
    //     })
    // }else{
    //     res.end('GET')
    // }

    // 综合实例
    const method = req.method,
    url = req.url,
    path = req.url.split('?')[0]
    query = querystring.parse(req.url.split('?')[1])
    
    const resData = {//对象可直接使用变量，键名为变量名，键值为变量值
        method,
        url,
        path,
        query,
    }

    res.setHeader('content-type','application/json')//设置的即为res.end返回的字符串中的数据的格式
    if(method==='GET'){
        res.end(JSON.stringify(resData))
    }
    if(req.method === 'POST'){
        let postData = ''
        req.on('data',(chunk)=>{//异步接收数据
            postData += chunk.toString()
        })
        req.on('end',()=>{
            resData.postData = postData;
            res.end(JSON.stringify(resData))//不是必须得？？？
        })
    }
})
server.listen('8000',()=>{//可自定义端口，习惯写3000
    console.log('OK')
})