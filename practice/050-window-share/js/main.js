; (function () {
    'use strict';

    var form = document.querySelector('#search-form')
        , input = document.querySelector('#search')

    init();

    function init(){
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var keyword = input.value;
            search.search_user(keyword);
            search.search_repo(keyword)
        })
    }    
})();