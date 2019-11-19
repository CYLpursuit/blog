const {exec} = require('../db/mysql')

const login = (username,passward)=>{
    const sql = `select username,realname from users  where username=${username} and passward = ${passward}`
    return exec(sql).then(rows=>{
        return rows[0] || {}
    })
}

module.exports = {
 login
}