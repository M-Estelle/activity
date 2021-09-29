import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const FirstPage=()=> import('@/views/firstPage/FirstPage')
const Login=()=> import('@/views/login/Login')
const Activity=()=> import('@/views/activity/Activity')
const Prize=()=>import('@/views/prize/Prize')

const routes=[
    {
        path:'',
        redirect:'/firstPage'
    },
    {
        path: '/login',
        component:Login
    },
    {
        path: '/firstPage',
        meta:{isLogin:true},
        component:FirstPage
    },
    {
        path: '/activity',
        meta:{isLogin:true},
        component:Activity
    },
    {
        path: '/prize',
        meta:{isLogin:true},
        component:Prize
    },
]

const router=new VueRouter({
    routes,
    mode:'history'
})

router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        if (localStorage['userInfo']) {
            next();
        }else{
            next({
                path:"/login"
            });
        }
    }else{
        next()
    }
});


export default router