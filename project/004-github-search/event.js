var history = require('./src/plugin/history')

var el_input = document.querySelector('#search-input')
    , el_form = document.querySelector('#form-search')
    ; 

    
function detect_submit(){
    el_form.addEventListener('submit',function(e){
        var keyword = el_input.value;
        console.log(keyword)
        history.add(keyword)
    })
}

function detect_input_click() {
    el_input.addEventListener('click', function () {
        history.init({
            el: '.history-list'
        })
    })
}

function detect_document_click() {
    document.documentElement.addEventListener('click', function (e) {
        var target = e.target
            , in_search = target.closest('#search-input')
            , in_form = target.closest('#form-search')

        if (!in_form || !in_search)
            history.hide_history();
    })
}

function add_event() {
    detect_input_click();
    detect_document_click();
    detect_submit();
}

module.exports = {
    add_event
}