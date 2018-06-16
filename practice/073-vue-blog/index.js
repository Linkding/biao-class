let Home =  Vue.component('home',{
    template:`
    <div>
    <h3>我的文章</h3>
    <router-link
    v-for="row in article_list"
    :key="row.id"
    :to="'article/' + row.id"
    >
    {{row.title}}<br>
    </router-link>
    </div>
    `
    ,
    data(){
        return {
            article_list: {}
        }
    },
    methods:{
        read(){
            http.post('blog/read')
                .then((res)=>{
                    this.article_list = res.data.data
                })
        }
    },
    mounted(){
        this.read()
    }
})

let ArticleNew =  Vue.component('article-new',{
    template:`
    <div>
    <h1>写文章</h1>
    <form @submit="on_submit($event)">
    <input v-model="current.title" placeholder="标题">
    <input v-model="current.author" placeholder="作者">
    <textarea v-model="current.content" placeholder="内容"></textarea>
    <button>添加文章</button>
    </form>
    </div>
    `,
    data(){
        return {
            current:{}
        }
    },
    methods:{
        on_submit(e){
            e.preventDefault();
            
            http.post('blog/create',this.current)
                .then((res)=>{
                    if(res.data.success)
                        this.current = {};
                })
        }
    }
});

let ArticleDetail = Vue.component('article-detail',{
    template:`
    <div>
    <h1>{{current.title}}</h1>
    <div>{{current.author}}</div>
    <p>{{current.content}}</p>
    </div>
    `,
    data(){
        return{
            current:{}
        }
    },
    mounted(){
        http.post('blog/find',{id:this.$route.params.id})
            .then((res)=>{
                this.current = res.data.data
            })
    }
})
new Vue({
    el: '#root',
    router: new VueRouter({
        routes: [
            { path: '/', component: Home },
            { path: '/article/new', component: ArticleNew },
            { path: '/article/:id', component: ArticleDetail },
        ]
    })
})