<template>
  
  <div>
    <h1>{{msg}}</h1>
    <div v-for="item in games" :key="item" @click="handleOpenGame(item)">
      {{item}}
    </div>
  </div>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
<script>

export default {
  data() {
    return {
      games:['game1','game2','game3','circleCat'],
      msg: 'hello, homaPage'
    }
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    handleOpenGame(gameName) {
      window.open('./src/components/circleCat/index.html', '_blank');
    }
  }
}
</script>

