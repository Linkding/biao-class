let app_data = {
    article: {
        list: [
            {
                id: 1,
                title: 'ABC',
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa dicta dolorem doloribus eveniet fuga, illum iste labore modi neque nisi, nostrum odit placeat quasi quos reprehenderit tempore ullam vel?',
            },
            {
                id: 2,
                title: 'DEF',
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi culpa dicta dolorem doloribus eveniet fuga, illum iste labore modi neque nisi, nostrum odit placeat quasi quos reprehenderit tempore ullam vel?',
            },
        ],
    },
};
let o = {
    default: 'home',
    route: {
        home: {
            path: '#/home',
            el: "#home",
            template: './tpl/home.html',
            data: {
                name: 'Linkding',
                longin: {
                    username: 'whh',
                    password: '',
                }
            },
            hook: {
                before: function () {
                    console.log('rout-before', 'before');

                },
                after: function () {
                    console.log('home after');
                    
                    let list = app_data.article.list;
                    let el_article = document.querySelector('#article-list');

                    list.forEach(function (row) {
                        let el_title = document.createElement('div')
                        el_title.innerHTML = `
                        <a href="#/article?id=${row.id}">${row.title}</a>
                        `
                        el_article.appendChild(el_title);
                    })

                }
            }
        },
        about: {
            path: '#/about',
            el: "#about",
            template: './tpl/about.html',
            data: {
                name: '王花花',
                age: 18,
            },
            hook: {
                before: function () {
                    console.log('rout-before', 'before');

                },
                after: function () {
                    console.log('route-after', 'after');

                }
            }
        },
        article: {
            path: '#/article',
            el: "#article",
            template: './tpl/article.html',
            data: {
                name: '王花花',
                age: 18,
            },
            hook: {
                before: function () {
                    console.log('rout-before', 'before');

                },
                after: function (id) {
                    let list =  app_data.article.list;
                    let el_content = document.querySelector('.article-content');
                    list.forEach(function(item){
                        if(item.id == id){
                            console.log('id',id);
                            
                            let el = document.createElement('div');
                            el.innerHTML = `
                            <h3>${item.title}</h3>
                            <p>${item.content}</p>
                            `
                            el_content.appendChild(el);
                        }
                    })
                    
                }
            }
        },
        create: {
            path: '/create',
            template: './tpl/create.html',
            data: {},
            hook:{
                after:function(){
                    let form = document.querySelector('#create-article');
                    

                    form.addEventListener('submit',function(e){
                        let max_id = app_data.article.list.length + 1;
                        e.preventDefault();

                        let row = {};
                        row.id = max_id;
                        row.title  = form.querySelector('[name=title]').value;
                        row.content = form.querySelector('[name=content]').value;

                        console.log('row',row);
                        
                        app_data.article.list.push(row);
                        console.log('app_data.article.list',app_data.article.list);
                        
                        // 重置 表单
                        form.reset();
                    });
                }
            }
    
        }
    },
    hook: {
        before: function () {
            console.log('hook-before', 'hook-before');

        },
        after: function () {
            console.log('hook-after', 'hook-after');

        },
    },
   
}
let route = new Route(o);
