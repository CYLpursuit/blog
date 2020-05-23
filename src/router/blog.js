const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog} = require ('../controller/blog')
const {SuccessModel,ErrorModel} = require('../resModel/resModel')

const handleBlogRouter = (req,res)=>{

    const id = req.query.id

    if(req.method==='GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '',
        keywords = req.query.keywords || '';
        console.log('author/',author)
        console.log('keywords/',keywords)
        result = getList(author,keywords);
        //源promise对象resolve的数据作为listData传入 而promise对象一层层return了出去
        return result.then(listData=>{
            return new SuccessModel(listData)//return嵌套？？？
        })
    }
    if(req.method==='GET' && req.path === '/api/blog/detail'){
        console.log('id/',id)
        const result = getDetail(id)
        return result.then(detailData=>{
            return new SuccessModel(detailData)
        })
    }
    if(req.method==='POST' && req.path === '/api/blog/new'){
        console.log('postData/',req.body)
        const result = newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    if(req.method==='POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id,req.body)
        return result.then(value=>{
            if(value){
                return new SuccessModel(result)
            }else{
                return new ErrorModel('抱歉，更新失败...')
            }
        })
    }
    if(req.method==='POST' && req.path === '/api/blog/del'){
        const result = delBlog(id,req.body.author)
        return result.then(value=>{
            if(value) return new SuccessModel(result)
            else return new ErrorModel('抱歉，删除失败...')
        })
    }
}

module.exports = handleBlogRouter