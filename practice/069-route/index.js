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
                // before: (route)=> {
                    
                //     send('/api/article/read','get',(res)=>{
                //         route.data.article_list = res.data;
                //         route.render();
                //     });

                // },
                after:  (route)=> {
                   http.post('http://mock.biaoyansu.com/api/linkding/read',{},(res)=>{
                       let list = res.data;
                       
                       let el_article = document.querySelector('#article-list');
   
                       list.forEach(function (row) {
                           let el_title = document.createElement('div')
                           el_title.innerHTML = `
                           <a href="#/article?id=${row.id}">${row.title}</a>
                           `
                           el_article.appendChild(el_title);
                       })
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

                },
                after: function () {

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
                before_render: (current)=>{
                    current.data.$param = current.$param;
                    console.log('current',current);
                    http.post('http://mock.biaoyansu.com/api/linkding/find',{id:current.$param.id},(res)=>{
                        current.data.article = res.data;
                    });
                    
                },
                // before: (current)=>{
                    
                //     http.post('http://mock.biaoyansu.com/api/linkding/find',{id:current.$param.id},(res)=>{
                //         console.log('res',res);
                        
                //         current.data.article = res.data;
                //         console.log('current',current);
                //         });
                // },
                after: (current)=>{
                    current.render();
                    // console.log('current',current);
                    
                    // http.post('http://mock.biaoyansu.com/api/linkding/find',{id:current.$param.id},(res)=>{
                    //     console.log('res',res);
                    //     current.render();
                    //     });
                }
                
            },
            data: {}
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

                        let input_data = {};
                        input_data.title  = form.querySelector('[name=title]').value;
                        input_data.content = form.querySelector('[name=content]').value;

                        http.post('http://mock.biaoyansu.com/api/linkding/create',input_data,(res)=>{
                            console.log(res)
                        })
                        
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
