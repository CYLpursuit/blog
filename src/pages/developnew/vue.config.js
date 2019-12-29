// const requestIp = require('request-ip');
// const ipMiddleware = function(req,res,next){
//     const clientIp = requestIp.getClientIp(req);
//     next();
// }
const ip = require('ip')
const HOST = ip.address();

module.exports = {
    publicPath:'/platform/developnew',
    assetsDir:'static',
    indexPath:'index.html',
    // pages:{} 多页面应用
    lintOnSave:'error',
    productionSourceMap:false,
    configureWebpack:{
        plugins:[
            // new MyAwesomeWebpackPlugin()
        ]
    },
    // css:{
    //     loaderOptions:{
    //         sass:{
    //             prependData:`@import "@/css/common/variables.scss";`
    //         },
    //     }
    // },
    devServer:{
        proxy:`http://10.101.56.29:4000`,
        host:HOST || "localhost"
    }
}