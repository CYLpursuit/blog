const {exec} = require('../db/mysql')

const getList = (author,keywords)=>{
    let sql = `select * from blogs where 1=1`
    if(anthor){
        sql += `and anthor = ${author}`
    }
    if(keywords){
        sql += `and title like %${keywords}%`//TODO
    }
    sql += `order by createtime desc;`

    return exec(sql)//返回promise对象
}

const getDetail = (id = {})=>{//ES6默认值写法
    const sql = `select * from blogs where id = ${id}`
    return exec(sql).then(rows=>{
        return rows[0]
    })
}

// 新建博客
const newBlog = (blogData = {})=>{
    const title = blogData.title,
    content = blogData.content,
    author = blogData.anthor,
    createTime = Date.now(),
    sql = `insert into blogs (title,contentr,createtime,author) 
    values (${title},${content},${createTime},${author});`

    return exec(sql).then(insertData=>{
        console.log('insertData/',insertData)
        return {
            id:insertData.insertId
        }
    })
}

// 更新博客
const updateBlog = (id,blogData)=>{
    const title = blogData.title,
    content = blogData.content,
    sql = `update blogs set title=${title}, content=${content} where id= ${id}`
    return exec(sql).then(updateData=>{
        console.log('updateData/',updateData)
        if(updateData.affectedRows>0){
            return true
        }else{
            return false
        } 
    })
}

// 删除博客
const delBlog = (id,author)=>{
    const sql = `delete from blogs where id=${id} and author = ${author}`//防止用户删除别人的博客（安全）
    return exec(sql).then(delData=>{
        console.log('updateData/',updateData)
        if(updateData.affectedRows>0){
            return true
        }else{
            return false
        } 
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}