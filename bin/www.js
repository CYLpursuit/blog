/**
 * 基础配置文件，只涉及技术不涉及业务
 */
// 引入基础模块
const http = require('http')
const serverHandle = require('../app')

// 定义端口号
const PORT = 8000

// 起服务，回调函数采用模块化
const server = http.createServer(serverHandle);

// 监听端口
server.listen(PORT)
