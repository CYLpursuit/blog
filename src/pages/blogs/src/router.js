import Vue from "vue";
import Router from "vue-router";//路由管理器
import HelloWorld from "./views/HelloWorld.vue";// 引入路由
import index from "./views/index"

Vue.use(Router)

let router = new Router({
    routes:[
        {
            path:'/HelloWorld',
            name:'HelloWorld',
            component:HelloWorld
        },
        {
            path:'/index',
            name:'index',
            component:index
        }
    ]
})

export default router;