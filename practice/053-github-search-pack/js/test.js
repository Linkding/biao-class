// var a = [1,2,3]
// console.log('删除前：' + a)

// var index_num = a.indexOf(1)

// a.splice(index_num,2)
// console.log('删除后：' + a)
// ==================================
// var kwd = require('./pub_param')

// var keyword = kwd.get_keyword();
// console.log(keyword)
var localstore = require('./localstore')
    , pub_param = require('./pub_param')
    ;

var a = localstore.get_store('history_list')
console.log('获取初始history_list ' +  a);
localstore.append_history('niaho');
console.log('获取更改后history_list ' + a);



