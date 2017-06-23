<template>
  <transition name="slide">
    <div class="singer-detail">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      <h2>我是歌手详情页面</h2>
      <h4>{{getSinger.name}}</h4>
      <h6 v-for="i in songList">
        {{i.musicData.songname}}
      </h6>
    </div>
  </transition>
</template>

<script>
  import {getSingerDetail} from 'api/singer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'singerdetail',
    data () {
      return {
        songList: []
      }
    },
    mounted() {
      getSingerDetail(this.getSinger.id).then(res => {
        this.songList = res.data.list
        console.dir(res.data.list)
      })
    },
    computed: {
      ...mapGetters([
        'getSinger'
      ])
    },
    methods: {
      goBack() {
        history.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";

  .singer-detail {
    z-index: 101;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $bg-color;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
