var ele = require('./element');

function detect_submit (){
    ele.form.addEventListener('submit',function(e){
       e.preventDefault();
        console.log('1')
    })
}

function add_events(){
    detect_submit();
}
module.exports = {
    add_events: add_events
}
