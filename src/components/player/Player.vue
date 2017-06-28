<template>
  <div class="player" v-show='playList.length>0'>
    <transition name="l-player">
      <div class="l-player" v-show="fullScreen">
        <div class="play-bg" :style="bg">
        </div>
        <div class="top">
          <i class="iconfont back icon-xiangxiajiantou" @click="close"></i>
          <div class="title" v-html="curSong.name"></div>
          <div class="sub" v-html="curSong.singer"></div>
        </div>
        <div class="mid">
          <div class="mid-img">
            <div class="cd-w">
              <div class="cd" :class="cd">
                <img :src=curSong.image>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <progress-bar
            :ltime=setMin(curTime)
            :rtime=setMin(curSong.duration)
            :pros=pros
            @TimeChange=timeChange
          ></progress-bar>
          <div class="tools">
            <div class="icon left">
              <i class="iconfont icon-shunxubofang"></i>
            </div>
            <div class="icon left" @click="prev">
              <i class="iconfont icon-shangyiqu2"></i>
            </div>
            <div class="icon center" @click.stop="togglePlay">
              <i class="iconfont" :class="lPlay"></i>
            </div>
            <div class="icon right" @click="next">
              <i class="iconfont icon-xiayiqu2"></i>
            </div>
            <div class="icon right">
              <i class="iconfont icon-sc"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini-player">'
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon" :class="cd">
          <img :src=curSong.image>
        </div>
        <div class="text">
          <h2 v-html="curSong.name"></h2>
          <p v-html="curSong.singer"></p>
        </div>
        <div class="tool">
          <i class="iconfont" :class="mPlay" @click.stop="togglePlay"></i>
        </div>
        <div class="tool">
          <i class="iconfont icon-bofangliebiao"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src=curSong.url @canplay="ready" @error="error" @timeupdate="timeUpdate"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ProgressBar from 'base/progressbar/ProgressBar'
  export default {
    name: 'player',
    data () {
      return {
        readyFlag: false,
        curTime: 0
      }
    },
    computed: {
      pros() {
        return this.curTime / this.curSong.duration
      },
      cd() {
        return this.playing ? 'play' : 'play pause'
      },
      lPlay() {
        return this.playing ? 'icon-crm17' : 'icon-bofang'
      },
      mPlay() {
        return this.playing ? 'icon-crm17' : 'icon-bofang'
      },
      bg() {
        return `background-image:url(${this.curSong.image})`
      },
      ...mapGetters([
        'playing',
        'fullScreen',
        'curSong',
        'playList',
        'curIndex'
      ])
    },
    filters: {},
    watch: {
      pros: function (val) {
        if (val === 1) {
          this.next()
        }
      },
      curSong: function (val) {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing: function (val) {
        if (!this.readyFlag) {
          return
        }
        const audio = this.$refs.audio
        this.$nextTick(() => {
          val ? audio.play() : audio.pause()
        })
      }
    },
    mounted() {
    },
    methods: {
      timeChange(pros) {
        this.setPlaying(true)
        this.$refs.audio.currentTime = this.curSong.duration * pros
      },
      setMin(val) {
        val = val | 0
        let m = val / 60 | 0
        let s = val % 60
        s < 10 ? s = '0' + s : s
        return `${m}:${s}`
      },
      timeUpdate(e) {
        this.curTime = e.target.currentTime
      },
      ready() {
        this.readyFlag = true
      },
      error() {
      },
      ...mapMutations({
        setFull: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAY_STATE',
        setPlayIndex: 'SET_PLAY_INDEX'
      }),
      togglePlay() {
        this.setPlaying(!this.playing)
      },
      prev() {
        if (!this.readyFlag) {
          return
        }
        let index = this.curIndex + 1
        if (index > this.playList.length) {
          index = 0
        }
        if (!this.playing) {
          this.togglePlay()
        }
        this.setPlayIndex(index)
        this.readyFlag = false
      },
      next() {
        if (!this.readyFlag) {
          return
        }
        let index = this.curIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        if (!this.playing) {
          this.togglePlay()
        }
        this.setPlayIndex(index)
        this.readyFlag = false
      },
      close() {
        this.setFull(false)
      },
      open() {
        this.setFull(true)
      }
    },
    components: {
      ProgressBar
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";
  @import "~sass/mixin";

  .l-player {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: $bg-color;
    .play-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: cover;
      background-position: center center;
      opacity: .6;
      -webkit-filter: blur(20px);
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      text-align: center;
      .back {
        padding: 9px;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 6px;
        line-height: 1;
      }
      .title {
        width: 70%;
        margin: 0 auto;
        font-size: $font-size-m-x;
        color: #fff;
        @include ellipsis(1);
        line-height: 40px;
      }
      .sub {
        font-size: $font-size-m;
        color: #fff;
        line-height: 20px;
      }
    }
    .mid {
      position: fixed;
      z-index: 99;
      width: 100%;
      top: 80px;
      bottom: 170px;
      font-size: 0;
      white-space: nowrap;
      .mid-img {
        height: 0;
        width: 100%;
        padding-top: 80%;
        vertical-align: top;
        display: inline-block;
        position: relative;
        .cd-w {
          position: absolute;
          width: 80%;
          top: 0;
          left: 10%;
          height: 100%;
          .cd {
            width: 100%;
            position: relative;
            height: 100%;
            border: 10px solid rgba(255, 255, 255, .1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused
            }
            img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .tools {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          &.left {
            text-align: right;
          }
          &.center {
            i {
              font-size: 40px;
            }
            text-align: center;
            padding: 0 20px;
          }
          &.right {
            text-align: left;
          }
          i {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
          }
        }
      }
    }
    &.l-player-enter-active, &.l-player-leave-active {
      transition: all .4s;
      .top, .bottom {
        transition: all .4s cubic-bezier(.86, .18, .82, 1.32);
      }
    }
    &.l-player-enter, &.l-player-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    z-index: 999;
    background-color: rgba(#333, .9);
    display: flex;
    align-items: center;
    .icon {
      margin: 0 10px 0 20px;
      width: 40px;
      flex: 0 0 40px;
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        font-weight: 400;
        color: #fff;
        font-size: $font-size-m;
      }
      p {
        color: $text-color-s;
        font-size: $font-size-s;
      }
    }
    .tool {
      flex: 0 0 30px;
      width: 30px;
      margin: 0 10px;
      i {
        font-size: 30px;
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .tools {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          &.left {
            text-align: right;
          }
          &.center {
            i {
              font-size: 40px;
            }
            text-align: center;
            padding: 0 20px;
          }
          &.right {
            text-align: left;
          }
          i {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
          }
        }
      }
    }
    &.mini-player-enter-active, &.mini-player-leave-active {
      transition: all .4s;
    }
    &.mini-player-enter, &.mini-player-leave-to {
      transform: translate3d(0, 60px, 0);
      opacity: 0;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
