var history = require('../history')

history.init({
    el: '.history-list',
    on_click: function(kwd,e){
        console.log(kwd,e)
    },
    on_delete: function(kwd,e){
        console.log(kwd,e)
    }

})

history.add('yo1')
history.add('yo2')
history.add('yo3')
history.add('yo4')
history.remove('aaa')