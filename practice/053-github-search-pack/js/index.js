var event = require('./event')
    , pub_param = require('./pub_param')
    , localstore= require('./localstore')
    , history_list = localstore.get_history_list()
    ;
init();

function init(){
    // localstore.set_store('history_list',['lxx','whh'])
    localstore.reload_history_list();
    event.add_event();
}