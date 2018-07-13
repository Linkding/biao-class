<script>
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import AdminNav from "../components/AdminNav";
import api from "../lib/api";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import Location from "../components/Location";

export default {
  components: { Nav, AdminNav, Pagination, SearchBar, DropDown,Location },
  data() {
    return {
      total: 0, //共计多少条数据
      last_page: 0, //最后一页，默认0
      current_page: 1, //当前页码
      limit: 5,
      show_form: false,
      current: {
        preview: []
      },
      list: [],
      edit_mode: false,
      keyword: "",
      model: null
    };
  },
  methods: {
    on_page_change(page) {
      this.read(page);
    },
    read(page = 1) {
      // if (page == this.current_page && page != 1) return; //点击当前页，不操作。如果当前页是1，则会请求，主要是首次加载就是第一页，不能将第一页情况卡死

      api(`${this.model}/read`, {
        limit: this.limit,
        page: page,
        sort_by: ["id", "down"],
        with: this.with,
      }).then(r => {
        this.list = r.data;
        this.total = r.total;
        this.last_page = r.last_page;
        this.current_page = r.current_page;
      });
    },
    cou(e) {
      console.log('111',111);
      
      e.preventDefault();
      let action = this.current.id ? "update" : "create";
      api(`${this.model}/${action}`, this.current).then(r => {
        this.read(this.current_page);
      });
    },
    remove(id) {
      api(`${this.model}/delete`, { id }).then(r => {
        this.read();
      });
    },
    update(row) {
      this.current = row;
      this.show_form = true;

      this.$nextTick(() => {
        if(this.model == 'vehicle'){
          this.edit_vehicle(row)          
        }
        else if(this.model == 'model'){
          this.edit_model(row);
        }else if(this.model == 'report'){
          this.edit_report(row);
        }
      });
    },
    edit_model(row) {
      this.$refs.edit_brand.on_edit_model(row.$brand);
      this.$refs.edit_design.on_edit_model(row.$design);
    },
    edit_vehicle(row) {
      this.$refs.edit_vehicle_brand.on_edit_vehicle(row.$brand);
      this.$refs.edit_vehicle_model.on_edit_vehicle(row.$model);
      this.$refs.edit_vehicle_design.on_edit_vehicle(row.$design);
    },
    edit_report(row){
      this.$refs.edit_report.on_edit_report(row.$vehicle);
    },
    cancel() {
      this.current = {preview:[]};
      this.show_form = false;
    },
    search(keyword) {
      let param = {
        or: {}
      };

      this.searchable.forEach(prop => {
        param.or[prop] = keyword;
      });
      // console.log('this.searchable',this.searchable);
      // console.log('param',param);

      api(`${this.model}/search`, param).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    }
  },
  mounted() {
    if (!this.model) throw new Error("请在模型中配置model！");
    this.read();
  }
};
</script>
<style scoped>
.input-control button,
button:hover {
  background: #0b5a81;
  color: #fff;
}
.input-control button {
  margin: 0px 10px;
}
</style>
