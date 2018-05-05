var event = require('./event')
    , pub_param = require('./pub_param')
    , localstore= require('./localstore')
    , history_list = localstore.get_history_list()
    ;
init();

function init(){
    localstore.set_store('history_list',['lxx','whh'])
    localstore.reload_history_list();
    console.log('history_list怎么是这样' + history_list)
    console.log('直接引用localstore.get_history_list()  ' + localstore.get_history_list() + '   没有毛病')
    event.add_event();
}