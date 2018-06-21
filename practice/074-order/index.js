const AdminPage = {
    data() {
        return {
            error: [],   //验证失败的信息
            current: {}, //当前编辑的行
            list: [],    //从数据库获取到的行
            show_form: false, //是否显示表单
            keyword: '', //搜索关键字
            timer: null,
            pagination: {
                range: 5 //页码显示个数
            },
            jump_page:'',
        };
    },
    mounted() {
        this.read();
    },
    methods: {
        create(e) {
            e.preventDefault();

            if (!this.validate())
                return;

            let is_update = this.current.id;
            let action = is_update ? 'update' : 'create';

            http.post(`${this.model}/${action}`, this.current)
                .then(r => {
                    if (r.data.success) {
                        this.current = {};
                        if (!is_update)
                            this.list.push(r.data.data);
                    }
                });
        },
        read() {
            http.post(`${this.model}/read?page=1&limit=1`, )
                .then(r => {
                    this.list = r.data.data;
                    this.pagination = Object.assign({}, this.pagination, r.data)
                    console.log(this.pagination)
                })
        },
        validate(row) {
            row = row || this.current;
            this.error = []; //清空历史错误信息
            this.validate_props.forEach(prop => {
                let r = this['validate_' + prop](); //遍历所有的验证项对应的函数
                if (r === true)
                    return;
                this.error.push(r);// 将错误信息导入错误list;

            });
            return !this.error.length //判断错误信息是否存在，并返回提供判断
        },
        remove(id) {
            if (!confirm('你确定需要删除吗？'))
                return;
            http.post(`${this.model}/delete`, { id: id })
                .then(res => {
                    if (res.data.success) {
                        util.delete_element_by_id(this.list, id);
                    }
                })
        },
        search(e) {
            e.preventDefault();

            let keyword = this.keyword
                , param = { or: { name: keyword } }
                ;
            http.post(`${this.model}/search`, param)
                .then(res => {
                    this.list = res.data.data;
                })
        },
        go(num){
            http.post(`${this.model}/read?page=${num}&limit=${this.pagination.per_page}`)
                .then(r => {
                    this.list = r.data.data;
                    this.pagination = Object.assign({},this.pagination,r.data) 
                })
        },
        go_page(num) {
            this.go(num)
        },
        go_first(){
            this.go(1)
        },
        go_last(){
            let last_page = this.pagination.last_page;
            this.go(last_page);
        }
    },
    computed: {
        page: function () {
            let pagination = this.pagination
                , start
                , end
                , middle = Math.ceil(pagination.range / 2)
                , reaching_left = pagination.current_page <= middle
                , reaching_right = pagination.current_page > pagination.total - middle
                , list = []
                ;
            if (reaching_left) {
                start = 1;
                if (pagination.range > pagination.last_page) { //如果数据总数小于单页数据数
                    end = pagination.last_page
                } else {
                    end = pagination.range
                }
            } else if (reaching_right) {
                start = pagination.total - (middle + 1);
                end = pagination.total
            } else {
                start = pagination.current_page - (middle - 1);
                end = pagination.current_page + (middle - 1)
            }

            for (i = start; i < end + 1; i++) {
                list.push(i)
            };


            return list;

        }
    },
    watch: {
    }

}
const Home = Vue.component('home', {
    template: `
    <div>
        <h1>欢迎来到背背山吃饭大学</h1>
        <div class="row dish" v-for="dish in dish_list">
            <div class="col-lg-4 thumbnail">
                <img :src="dish.cover_url || default_cover_url" alt=""/>
            </div>
            <div class="col-lg-5 detail">
                <div class="name">{{dish.name}}</div>
                <div class="description">{{dish.description}}</div>
            </div>
            <div class="col-lg-3 tool-set">
                <button>-</button>
                <input type="number"/>
                <button>+</button>
            </div>
        </div>
        <button @submit="">提交订单</button>
    </div>
    `,
    data() {
        return {
            dish_list: [
                { name: '豆腐', description: '谁家豆腐', cover_url: "http://s2.cdn.xiachufang.com/836e9ed2882711e6a9a10242ac110002_640w_628h.jpg?imageView2/2/w/660/interlace/1/q/90" },
                { name: '黄瓜', description: "你的男朋友", cover_url: "http://s2.cdn.xiachufang.com/70d9f7a686fd11e6a9a10242ac110002_435w_652h.jpg?imageView2/2/w/660/interlace/1/q/90" },
            ],
            default_cover_url: '',
            order: {
                table_id: '',
                dish_info: [
                    { dish_id: 1, count: 2 },
                    { dish_id: 2, count: 2 },
                ],
                memo: '少油 饮料加冰'
            }
        }
    }

})

const Admin = Vue.component('admin', {
    template: `
    <div class="admin row">
        <div class="col-lg-3 nav">
            <router-link to="/admin/table">桌号管理</router-link>
            <router-link to="/admin/dish">菜品管理</router-link>
            <router-link to="/admin/order">订单管理</router-link>
        </div>
        <div class="col-lg-9 main">
            <router-view></router-view>
        </div>
    </div>
    `,
});


const AdminDish = Vue.component('admin-dish', {
    template: `
    <div>
    <h2>菜品管理</h2>
    <div class="tool-set">
        <button @click="show_form = !show_form">
            <span v-if="show_form">取消</span>
            创建菜品
        </button>
    </div>

    <form @submit="create($event)" v-if="show_form" novalidate>
        <div v-if="error.length" class="error">
            <div v-for="e in error">{{e}}</div>
        </div>
        <div class="input-wrap">
            <label>菜名</label>
            <input type="text" v-model="current.name">
        </div>
        <div class="input-wrap">
            <label>价格</label>
            <input type="number" v-model="current.price">
        </div>
        <div class="input-wrap">
            <label>描述</label>
            <textarea type="text" v-model="current.description"></textarea>
        </div>
        <div class="input-wrap">
            <label>封面地址</label>
            <input type="url" v-model="current.cover_url">
        </div>
        <div class="input-wrap">
            <button>提交</button>
        </div>
    </form>

    <div class="sub-set row">
        <form @submit="search($event)" class="col-lg-4 col-sm-12">
            <input type="search" v-model="keyword" placeholder="关键字"> 
            <button type="submit" hidden>搜索</button>
        </form>
    </div>
    <table v-if="list.length" class="list">
    <thead>
        <tr>
            <th>菜名</th>
            <th>价格</th>
            <th>描述</th>
            <th>封面</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in list">
            <td>{{row.name}}</td>
            <td>{{row.price}}</td>
            <td>{{row.description || '-'}}</td>
            <td>
                <img v-if="row.cover_url" :src="row.cover_url" :alt="row.name"/>
                <span class="empty-holder" v-else>暂无图片</span>
            </td>
            <td>
                <button @click="current = row">更新</button>
                <button @click="remove(row.id)">删除</button>
            </td>
        </tr>
    </tbody>
    </table>
    <div v-else class="empty-holder">暂无内容</div>

    <div class="row pagination-container" >
        <button id="first-page" class="col pager" @click="go_first()" v-show="pagination.last_page > 1">首页</button>
        <div class="col pagination" v-for="page_num in page">
            <button :class="['col pager',{ active: page_num == pagination.current_page ? true : false}]" @click="go_page(page_num)">{{page_num}}</button>
        </div>
        <button id="last-page" class="col pager" @click="go_last()" v-show="pagination.last_page >1">尾页</button>
        <div class="row pager-jump">
            <span>跳转</span>
            <input type="number" min='1'  v-model="jump_page">
            <span>页</span>
            <button @click="go(jump_page)">确定</button>
        </div>
    </div>
     </div>
    `,
    data() {
        return {
            model: 'dish',
            validate_props: ['cover_url', 'description', 'name', 'price'],
        }
    },
    methods: {
        validate_name(value) {
            value = value || this.current.name;

            let MAX_LENGTH = 255;
            if (!value)
                return "菜名不可为空"
            if (value.length >= 255)
                return `菜名超过最大${MAX_LENGTH}`

            return true;
        },
        validate_price(value) {
            value = value || this.current.price;

            if (!value
                || value === undefined
                || value < 0
                || value > 1000
            )
                return `此价格不对哦官人`

            return true;
        },
        validate_description(value) {
            value = value || this.current.description;

            if (!value)
                return true;

            let MAX_LENGTH = 255;
            if (value.length >= MAX_LENGTH)
                return `此项最大长度为${MAX_LENGTH}`

            return true;
        },
        validate_cover_url(value) {
            value = value || this.current.cover_url;
            let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if (!value)
                return true;

            if (!re.test(value))
                return "此为不合法url"

            return true;
        },



    },
    mixins: [AdminPage]
})

const AdminTable = Vue.component('admin-table', {
    template: `
    <div>
    <h2>桌号管理</h2>
    <div class="tool-set">
    <button @click="show_form = !show_form">
    <span v-if="show_form">取消</span>
    创建桌号</button>
    </div>

    <div class="sub-set row">
        <form @submit="search($event)" class="col-lg-4 col-sm-12">
            <input type="search" v-model="keyword" placeholder="关键字"> 
            <button type="submit" hidden>搜索</button>
        </form>
    </div>
    <form @submit="create($event)" v-if="show_form">
        <div v-if="error.length" class="error">
            <div v-for="e in error">{{e}}</div>
        </div>
     <div class="input-wrap">
        <label>桌号</label>
        <input type="text" v-model="current.name">
     </div>
     <div class="input-wrap">
       <label>座位数</label>
       <input type="number" v-model="current.capacity">
     </div>
     <div class="input-wrap">
        <button>提交</button>
     </div>
    </form>
    
    <table class="list">
        <thead>
            <tr>
            <th>桌号</th>
            <th>座位数</th>
            <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in list">
                <td>{{row.name}}</td>
                <td>{{row.capacity}}</td>
                <td>
                    <button @click="current = row">更新</button>
                    <button @click="remove(row.id)">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="row pagination-container" >
        <button id="first-page" class="col pager" @click="go_first()" v-show="pagination.last_page > 1">首页</button>
        <div class="col pagination" v-for="page_num in page">
            <button :class="['col pager',{ active: page_num == pagination.current_page ? true : false}]" @click="go_page(page_num)">{{page_num}}</button>
        </div>
        <button id="last-page" class="col pager" @click="go_last()" v-show="pagination.last_page >1">尾页</button>
        <div class="row pager-jump">
            <span>跳转</span>
            <input type="number" min='1'  v-model="jump_page">
            <span>页</span>
            <button @click="go(jump_page)">确定</button>
        </div>
    </div>
    </div>
    `,
    data() {
        return {
            model: 'table',
            validate_props: ['name', 'capacity'],
            // pagination: {
            //     current_page: '',
            //     last_page: '',
            //     first_page_url: '', //第一页url
            //     last_page_url: '', //最后一页url
            //     next_page_url: '', //下一页url
            //     pre_page_url: '', //前一页url
            //     per_page: '', //每页多少条数据
            //     total: '',//共计多少条数据
            //     page_amount: '', //多少页 => total/per_page

            // },
        }
    },
    methods: {
        validate_name(value) {
            value = value || this.current.name;
            let MAX_LENGTH = 255;
            if (!value)
                return "桌名不能为空";

            if (value.length >= MAX_LENGTH)
                return `此项长度不能超过${MAX_LENGTH}`;

            return true;
        },

        validate_capacity(value) {
            value = value || this.current.capacity;

            if (!value)
                return "桌号不能为空";

            if (value.length < 1 || value.length > 1000)
                return "此项输入值不合法"
            return true;
        },
    },
    watch: {

    },
    mixins: [AdminPage]
})

new Vue({
    el: '#root',
    router: new VueRouter({
        routes: [
            { path: '/', component: Home },
            {
                path: '/admin',
                component: Admin,
                children: [
                    { path: 'dish', component: AdminDish },
                    { path: 'table', component: AdminTable },
                ]
            }
        ]
    })
})
// table dish order 嵌套路由
// http.post('MODEL/CREATE', {
//     name: 'order',
//     structure: [
//         {

//             name: 'table_id',
//             type: 'integer',
//             nullable: false,
//         },
//         {
//             name: 'dish_info',
//             type: 'text',
//             nullable: false,
//         },
//     ],
// });

// http.post('MODEL/CREATE', {
//     name: 'table',
//     structure: [
//         {
//             name: 'name',
//             type: 'string',
//             nullable: false,
//         },
//         {
//             name: 'capacity',
//             type: 'integer',
//             nullable: false,
//         },
//     ],
// });

// http.post('MODEL/CREATE', {
//     name: 'dish',
//     structure: [
//         {
//             name: 'name',
//             type: 'string',
//             nullable: false,
//         },
//         {
//             name: 'price',
//             type: 'float',
//             nullable: false,
//         },
//         {
//             name: 'description',
//             type: 'text',
//             nullable: true,
//         },
//         {
//             name: 'cover_url',
//             type: 'string',
//             nullable: true,
//         },
//     ],
// });
