export function clone(val){
    return JSON.parse(JSON.stringify(val))
}
// function for_each(arr,fn){
//     for(let key in arr){
//         let val = arr[key];
//         fn(val,key);
//     }
// }
// export default {
//     clone,
//     for_each,
// }