var send = require('./src/util/send')
    , pub_param = require('./pub_param')
    , pagination = require('./src/plugin/pagination/pagination')
    ;

function search(on_succeed,on_fail){
    search_user(on_succeed,on_fail,on_before,on_after);
}

function on_before(){
    pagination.disabled();
    console.log('before的时候')
}

function on_after(){
    pagination.enabled();
    console.log('after的时候')
}

function search_user(on_succeed,on_fail,before,after){
    var url = 'https://api.github.com/search/users?q='
    + pub_param.get_keyword()
    + '&page='
    + pub_param.get_current_page()
    + '&per_page='
    + pub_param.get_limit();

    if(before)
        before();

    send.ajax({
        url: url,
        header: {
            Authorization: btoa('linkding:0e2af1765ccb10d1021de3dec9cb5c1f3d3ffe78')
        },
        on_succeed: function(data){
            if(on_succeed)
                on_succeed(data);
        },
        on_fail : function(){
            if(on_fail)
                on_fail()
        },
        on_load : function(){
            after();
        }
    });
}

module.exports = {
    search:search
}