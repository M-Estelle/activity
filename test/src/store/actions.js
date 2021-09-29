// import {
//     ADD_TO_CART,
//     ADD_CONUTER
// } from './mutation-types'
//
// export default {
//     addCart({context,commit},payload){
//         console.log("store",payload.id);
//         let oldProduct=null;
//         for(let item of context.state.cartList){
//             if(item.id===payload.id){
//                 oldProduct=item;
//             }
//         }
//
//         if(oldProduct){
//             context.commit(ADD_CONUTER,oldProduct)
//         }else{
//             payload.count=1
//             context.commit(ADD_TO_CART,payload)
//         }
//     }
// }