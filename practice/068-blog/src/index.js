import article_api from './Api/article';
import article_ui from './Ui/article';
import route from './Route/route';

let route_config = {
    routes: {
        home: {
            path: '/home',
            el: '#home',
            template_url: '',

        },
        about: {
            path: '/about',
            el: '#about',
            template_url: '',

        },
        article: {
            path: '/article',
            el: '#article',
            template_url: '',

        },
        article_list: {
            path: '/article_list',
            el: '#article_list',
            template_url: '',

        },
    },
    hook: {
        before: function(){
            return true;
        }
    }

}

route.init(route_config);