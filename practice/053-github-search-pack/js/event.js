var ele = require('./element')
    , search = require('./search')

function detect_submit (){
    ele.form.addEventListener('submit',function(e){
       e.preventDefault();
        var keyword = ele.input.value;

        search.user(keyword,function(data){
            ele.render_user(data);
        })
    })
}

function add_events(){
    detect_submit();
}
module.exports = {
    add_events: add_events
}
