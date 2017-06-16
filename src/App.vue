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
.child_view{
  padding-top: 88px;
}
</style>
