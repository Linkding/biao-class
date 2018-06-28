<template>
    <form class="search-bar">
        <input type="search" placeholder="请输入关键字" autofocus>
        <button type="submit">🔍</button>
    </form>
</template>
<style scoped>
.search-bar {
    margin: 10px 0;
}
input {
  width: 45%;
  /* font-size: 1.6rem; */
}
button {
  border-left: 0;
}

button:hover {
  background: #22ac38;
}
</style>

