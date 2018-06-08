const output  = {
    trim:trim
}
function trim(str,cap_type){
    var arr = cap_type.split(''); // '#/' => ['#','/']
    arr.forEach(function(item){
        //处理头
        if(str.startsWith(item))
            str = str.substring(1); // '##/home'=> '#/home'
            str = trim(str,item);
        
        if(str.endsWith(item)){
            str = str.substring(1);
            str = trim(str,item);
        }
    });
    return str;
}

export default output;