<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import Header from './views/Layout/Header.vue'

  export default {
    components: {
        Header,
    },

    provide() {
      return {
        reload: this.reload
      }
    },

    data() {
      return {
        isRouterAlive: true
      }
    },

    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
