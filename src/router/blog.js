const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog} = require ('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res)=>{

    const id = req.query.id

    if(req.method==='GET' && req.path === '/api/blog/list'){
        const author = req.query.anthor || '',
        keywords = req.query.keywords || '',
        result = getList(author,keywords);
        //源promise对象resolve的数据作为listData传入 而promise对象一层层return了出去
        return result.then(listData=>{
            return new SuccessModel(listData)//return嵌套？？？
        })
    }
    if(req.method==='GET' && req.path === '/api/blog/detail'){
        const result = getDetail(id)
        result.then(detailData=>{
            return new SuccessModel(detailData)
        })
    }
    if(req.method==='POST' && req.path === '/api/blog/new'){
        req.body.author = 'zs'//TODO 暂时写死新建博客作者后根据登录情况获取
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
        req.body.author = 'zs'//TODO 暂时写死新建博客作者后根据登录情况获取
        const result = delBlog(id,req.body.author)
        return result.then(value=>{
            if(result) return new SuccessModel(result)
            else return new ErrorModel('抱歉，删除失败...')
        })
    }
}

module.exports = handleBlogRouter