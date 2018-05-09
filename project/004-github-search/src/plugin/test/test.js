var history = require('../history')

history.init({
    el:'.history-list',
    on_click: function(kwd,e){
        console.log(kwd,e)
    },
    on_delete: function(kwd,e){
        console.log(kwd,e)
    }


});

history.add('yo')
// history.remove('yo')