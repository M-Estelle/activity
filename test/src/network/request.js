import axios from 'axios'

export function request(config){
    const instance=axios.create({
        baseURL:'https://xyh.looyeagee.cn/',
        timeout:5000
    })
    //请求拦截器
    // instance.interceptors.request.use(config=>{
    //     console.log(config)
    //     return config
    // },err=>{
    //
    // })
    instance.interceptors.request.use(config=>{
        return config
    })
    //响应拦截器
    instance.interceptors.response.use(res=>{
        return res.data
    })
    // instance.interceptors.response.use(res=>{
    //     return res.data
    // },err=>{
    //     console.log(err)
    // })
    return instance(config)

}