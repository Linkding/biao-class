let helper = {
    sum_arr_by_prop,
    sum_arr_by_props,
    avg_arr,
    math_round,
    toPercent,
}
//计算单个属性之和
function sum_arr_by_prop(arr, prop) {
    if (!arr)
        return;
    return arr.reduce(function (a, b) {
        return b[prop] == null ? a : parseFloat(a) + parseFloat(b[prop]) ;
    }, 0);
}

//计算数组两个或者以上属性之间运算后的和
function sum_arr_by_props(arr, p1, p2) {
    if (!arr)
        return;
    return arr.reduce(function (a, b) {
              
        return a + parseInt(b[p1]) * parseInt(b[p2]);
    }, 0)
}
// 四舍五入，并保留小数点后两位
function math_round(num) {
    return Math.round(num * 1000) / 1000;
}

function avg_arr(arr, prop) {
    let sum = sum_arr_by_prop(arr, prop);
    let len = arr.length;
    return sum / len;
}
//转换百分数
function toPercent(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
}
export default helper