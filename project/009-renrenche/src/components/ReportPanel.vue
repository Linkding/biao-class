<template>
    <div class="report-panel">
        <div class="title">{{title || '检测报告'}}</div>
        <div v-if="is_empty_report()">
            <div v-for="(ok, key) in report" :key="key"
                v-if="(conf = reportStructure[key]) && conf.cat == cat"
                :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
            <span v-if="ok" class="fa fa-check"></span>
            <span v-else class="fa fa-minus"></span> {{conf.display_name}}
            </div>
        </div>
        <div v-else class="empty-holder">暂无检测</div>
    </div>
</template>
<script>
export default {
  props: ['title','reportStructure','cat','report'],
  methods:{
    is_empty_report(){
      if(!this.report)
        return false;
      return Object.keys(this.report).length; //获取对象的键名，返回一个array对象
    }
  }
};
</script>
<style scoped>
.report-panel .title {
  text-align: center;
}

.report-panel {
  border: 1px solid #0b5a81;
  margin: 5px;
}
.report-panel .title {
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 10px 0;
}
.report-panel .report-item,
.report-panel .empty-holder {
  padding: 10px;
}
.report-panel .report-item.muted {
  color: #aaa;
}
.empty-holder {
  text-align: center;
}
</style>
