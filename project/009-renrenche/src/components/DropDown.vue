<template>
    <div @mouseleave="show_menu=false" class="dropdown">
        <div @mouseenter="show_menu=true" class="drop-title">{{selected ? selected[displayKey]:'请选择'}}</div>
        <div v-if="show_menu" class="drop-item">
            <div @click="select(row)" v-for="(row,index) in  list" :key='index'>{{row[displayKey]}}</div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    list: {},
    selectItem: {},
    displayKey: {
      default: "name"
    },
    
  },
  data() {
    return {
      selected:{},
      show_menu: false
    };
  },
  methods: {
    select(row) {
      this.selected = row;
      console.log("row", row);
      if (this.selectItem) this.selectItem(row);
    },
    on_edit(row){
      if(!row)
        this.selected = {};
      this.selected = row;
    },

  }
};
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.drop-title,
.drop-item {
  background: #fff;
  width: 80px;
  padding: 2px;
  display: block;
  /* border: 1px solid #e6e6e6; */
}


.drop-title,
.drop-item {
  border: 1px solid #D9E1E5;
}

.dropdown:hover .drop-item, 
.dropdown:hover .drop-title {
    border-bottom: 0;
    border-color: #0B5A81;

}

.drop-item > *:hover {
    background: #0B5A81;
    color: #fff;
}

.drop-item {
  position: absolute;
  z-index: 1;
}
</style>
