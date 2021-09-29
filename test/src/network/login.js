import  {request} from "@/network/request";

export function getInfo(){
    return request({
        url:'/common/getInfo'
    })
}

export function getPrize(){
    let info = JSON.parse(localStorage.getItem('userInfo'));
    console.log(info)
    return request({
        url:'/common/getCertByInfo',
        method:'post',
        data:info,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}