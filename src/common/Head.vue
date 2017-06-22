<template>
  <div class="head">
    <div class="logo">
      <div class="icon"></div>
      <h1>FeiFei Music</h1>
    </div>
    <ul class="tab">
      <router-link :to="{path:i.path}"
                   tag="li"
                   :key="index"
                   :class="{active:cur == index}"
                   v-for="(i,index) in tab">
        {{i.txt}}
      </router-link>
    </ul>
    <span class="arrow" ref="arr"><span></span></span>
  </div>
</template>

<script>
  export default {
    name: 'AppHead',
    data () {
      return {
        tab: [
          {txt: '推荐', path: '/'},
          {txt: '歌手', path: '/singer'},
          {txt: '排行', path: '/rank'},
          {txt: '搜索', path: '/search'}
        ],
        cur: 0
      }
    },
    watch: {
      $route (to, from) {
        this.changeNav()
      }
    },
    mounted() {
      this.changeNav()
    },
    methods: {
      changeNav () {
        var path = this.$route.path.substring(1)
        switch (path) {
          case '':
            this.cur = 0
            break
          case 'singer':
            this.cur = 1
            break
          case 'rank':
            this.cur = 2
            break
          case 'search':
            this.cur = 3
            break
        }
        let index = this.cur
        this.$refs.arr.style.webkitTransform = `translateX(${100 * index}%)`
        this.$refs.arr.style.transform = `translateX(100*${100 * index}%)`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../sass/var";

  .head {
    position: relative;
    text-align: center;
    color: $text-color-s;
    font-size: 14px;
    top: 0;
    left: 0;
    line-height: 44px;
    width: 100%;
    height: 88px;
    .logo {
      height: 44px;
      text-align: center;
      .icon {
        width: 34px;
        height: 34px;
        margin-top: 5px;
        margin-right: 5px;
        vertical-align: top;
        display: inline-block;
        background-image: url("../assets/logo.png");
        background-size: 34px;
      }
      h1 {
        display: inline-block;
        font-size: $font-size-l;
        color: $mix-color;
        font-weight: normal;
        text-shadow: 0 0 6px rgba(#fff, .4);
      }
    }
    > ul.tab {
      background-color: $deep-bg;
      display: flex;
      li {
        cursor: pointer;
        tap-highlight-color: rgba(0, 0, 0, 0);
        flex: 1;
        &.active {
          color: $mix-color;
        }
      }
    }
    .arrow {
      position: absolute;
      width: 25%;
      left: 0;
      bottom: 4px;
      transition: transform .3s cubic-bezier(.35, 0, .1, .6);
      span {
        width: 30px;
        display: block;
        margin: 0 auto;
        border-bottom: 2px solid $mix-color;
        border-radius: 2px;
      }
    }
  }
</style>
