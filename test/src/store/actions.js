import {
    getInfo
} from "@/network/login";

export default {
    getInfo(store){
        return getInfo().then(res=>{
            store.commit('submitInfo',res.data)
        })
    }
}