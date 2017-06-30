<template>
  <div class="music-list app-content">
    <i class="iconfont icon-fanhui" @click="goBack"></i>
    <div class="title">{{title}}</div>
    <div class="music-bg" :style="bgObj" ref="imgbg">
      <div class="filter"></div>
      <button class="play-btn" v-show="btnShow && songs.length>0" @click="suffle">
        <i class="iconfont icon-bofang"></i>
        随机播放全部
      </button>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll :data=songs class="list" ref="list" :probeType=3 :listenScroll=true @scroll="songScroll">
      <song-list :songs=songs @select="selectItem"></song-list>
    </scroll>
  </div>
</template>

<script>
  import SongList from '@/base/songlist/SongList.vue'
  import {mapActions} from 'vuex'
  export default {
    name: 'musiclist',
    props: {
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      bg: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        singer: [],
        scrollY: 0,
        btnShow: true
      }
    },
    computed: {
      bgObj() {
        return `background-image:url(${this.bg})`
      }
    },
    watch: {
      scrollY(newY) {
        let minH = -this.imgHeight + 40
        let y = Math.max((minH), newY)
        let zIndex = 0
        let scale = 1
        let img = this.$refs.imgbg.style
        img.webkitFilter = `blur(${-(y / 40)}px)`
        img.filter = `blur(${-(y / 40)}px)`
        const sc = Math.abs(newY / this.imgHeight)
        if (newY > 0) {
          zIndex = 10
          scale = 1 + sc
        }
        this.$refs.layer.style.transform = `translate3d(0px, ${y}px, 0px)`
        this.$refs.layer.style.webkitTansform = `translate3d(0px, ${y}px, 0px)`
        img.transform = `scale(${scale})`
        img.webkitTansform = `scale(${scale})`
        if (newY < minH) {
          this.btnShow = false
          zIndex = 10
          img.paddingTop = 0
          img.height = '40px'
        } else {
          this.btnShow = true
          img.paddingTop = '70%'
          img.height = '0'
        }
        img.zIndex = zIndex
      }
    },
    mounted() {
      this.imgHeight = this.$refs.imgbg.clientHeight
      this.$refs.list.$el.style.top = `${this.imgHeight}px`
    },
    methods: {
      ...mapActions([
        'selectPlay',
        'sufflePlay'
      ]),
      suffle() {
        this.sufflePlay({
          list: this.songs
        })
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      goBack() {
        history.go(-1)
      },
      songScroll(res) {
        this.scrollY = res.y
      }
    },
    components: {
      SongList
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";

  .music-list {
    top: 0;
    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
    }
    .layer {
      overflow: hidden;
      background-color: $bg-color;
      position: relative;
      height: 100%;
    }
    .icon-fanhui {
      z-index: 99;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 0px;
      left: 5px;
      font-size: 30px;
    }
    .title {
      z-index: 99;
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      height: 40px;
      line-height: 40px;
      font-size: $font-size-l;
      text-align: center;
    }
    .music-bg {
      position: relative;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      .play-btn {
        i {
          vertical-align: middle;
        }
        position: absolute;
        bottom: 20px;
        left: 50%;
        margin-left: -65px;
        width: 130px;
        height: 30px;
        background: transparent;
        border: 1px solid $mix-color;
        color: $mix-color;
        line-height: 30px;
        border-radius: 15px;
        font-size: $font-size-s;
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, .4);
      }
    }
  }
</style>
