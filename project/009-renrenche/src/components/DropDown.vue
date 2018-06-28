<template>
    <div @mouseleave="show_menu=false" class="dropdown">
        <div @mouseenter="show_menu=true" class="drop-title">车龄</div>
        <div v-if="show_menu" class="drop-item">
            <div @click="select(index)" v-for="(row,index) in  list" :key='index'>{{row[displayKey]}}</div>
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
    }
  },
  data() {
    return {
      show_menu: false
    };
  },
  methods: {
    select(index) {
      console.log("index", index);
      if (this.selectItem) this.selectItem(index);
    }
  }
};
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
  background: #fff;
}

.drop-title,
.drop-item {
  width: 80px;
  padding: 2px;
  display: block;
  /* border: 1px solid #e6e6e6; */
}


.drop-title,
.drop-item {
  border: 1px solid #111;
}

.dropdown:hover .drop-item, 
.dropdown:hover .drop-title {
    border-bottom: 0;
    border-color: #22ac38;

}

.drop-item > *:hover {
    background: #22ac38;
    color: #fff;
}

.drop-item {
  position: absolute;
  z-index: 1;
}
</style>
