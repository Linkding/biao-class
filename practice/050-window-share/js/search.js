; (function () {
    'use strict';


    window.search = {
        search_user: search_user,
        search_repo: search_repositories
    };

    function search_user(kwd){
        send.get('https://api.github.com/search/users?q=' + kwd, function(data){
            console.log(data);
        });
    }

    function search_repositories(kwd){
        send.post('https://api.github.com/search/repositories?q=' + kwd ,function(data){
            console.log(data);
        });
    }
})();