<template>
  <div id="app">
    <app-head></app-head>
    <router-view class="child_view"></router-view>
  </div>
</template>

<script>
  import AppHead from './common/Head.vue'
  export default {
    name: 'app',
    components: {
      AppHead
    }
  }
</script>

<style lang="scss">
  @import "sass/app";

  body.jay-theme::before {
    position: fixed;
    background-image: url("./assets/bg.png");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    content: '';
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
  }

  .child_view {

  }
</style>
