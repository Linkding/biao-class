<script>
import Nav from "../../components/Nav";
import Pagination from "../../components/Pagination";
import AdminNav from "../../components/AdminNav";
import api from "../../lib/api";

export default {
  components: { Nav, AdminNav, Pagination },
  data() {
    return {
      total: 0, //共计多少条数据
      last_page: 0, //最后一页，默认0
      current_page: 1, //当前页码
      limit: 2,
      show_form: false,
      current: {},
      list: [],
      edit_mode: false,
      model:null,
    };
  },
  methods: {
    on_page_change(page) {
      this.read(page);
    },
    read(page = 1) {
      if (page == this.current_page && page != 1) return; //如果点击当前页，而且不是第一页，则返回

      api(`${this.model}/read`, { limit: this.limit, page: page }).then(r => {
        this.list = r.data;
        this.total = r.total;
        this.last_page = r.last_page;
        this.current_page = r.current_page;
      });
    },
    cou(e) {
      e.preventDefault();
      let action = this.current.id ? "update" : "create";
      api(`${this.model}/${action}`, this.current).then(r => {
        this.read();
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
    },
    cancel() {
      this.current = "";
      this.show_form = false;
    }
  },
  mounted() {
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
