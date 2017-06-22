<template>
  <transition name="slide">
    <div class="singer-detail">
      <h2>我是歌手详情页面</h2>
      <h4>{{name}}</h4>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'singerdetail',
    data () {
      return {
        name: this.$route.query.name
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";
  .singer-detail{
    z-index: 101;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $bg-color;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>
