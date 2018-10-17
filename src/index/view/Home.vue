<template>
  <div class="v-home">
    <div class="head flex-row">
      Welcome
    </div>
    <div class="body flex-col">
      {{content}}
      {{this.app.config.local}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-home',
    data() {
      return {
        content: 'default'
      }
    },
    created() {
      this.api.get('/demo.json').then((res) => {
        this.content = res
      })
    }
  }
</script>

<style scoped>
  .v-home {
    background: #eee;
    height: 100%;
  }
  .head {
    padding: .1rem .3rem;
    font-size: .4rem;
    box-shadow: #ddd 0 5px 5px;
    background: #fff;
  }
  .body {
    margin-top: .1rem;
    padding: 1rem .3rem;
    font-size: 24px;
    background: #fff;
  }
</style>
