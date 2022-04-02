<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './views/Layout/Header.vue'

  export default {
    components: {
      Header,
  },
  }
</script>

<style>

</style>
