/**
 * 文件读写
 */
const fs = require('fs')
const path = require('path')

// const fileFullName = path.resolve(__dirname,'.','a.json')

//普通读取单文件方式
// fs.readFile(fileFullName,(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// })

// 使用callback模拟异步 callback-hell回调地狱
// const getData = (filename,callback)=>{
//     const fileFullName = path.resolve(__dirname,'.',filename)
//     fs.readFile(fileFullName,(err,data)=>{
//         if(err){
//             console.error(err)
//             return
//         }
//         callback(JSON.parse(data.toString()))
//     })
// }

// getData('a.json',aData=>{
//     console.log(aData)
//     getData(aData.next,bData=>{
//         console.log(bData)
//         getData(bData.next,cData=>{
//             console.log(cData)
//         })
//     })
// })

// 使用promise实现异步
const getData = (filename)=>{
    const fileFullName = path.resolve(__dirname,'.',filename)
    const promise = new Promise((resolve,reject)=>{
        fs.readFile(fileFullName,(err,data)=>{
            if(err){
                console.error(err)
                reject('error')
            }
            resolve(data.toString())
        })   
    })
    return promise
}

getData('a.json').then((aData)=>{
    console.log(aData)
    return getData(JSON.parse(aData).next)
}).then((bData)=>{
    console.log(bData)
    return getData(JSON.parse(bData).next)
}).then((cData)=>{
    console.log(cData)
})