; (function () {
    'use strict';

    window.send = {
        get: get,
        post: post,
        send: send
    };

    function get(url,on_succed) {
        send(url, 'get', on_succed);
    };

    function post(url,on_succed) {
        send(url, 'post', on_succed);
    };


    function send(url, method, on_succed) {
        var http = new XMLHttpRequest();
        http.open(method, url);
        http.send();

        http.addEventListener('load', function (e) {
            on_succed(this.responseText);
        });
    };
})();