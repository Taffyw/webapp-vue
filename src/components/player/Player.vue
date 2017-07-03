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
        <div class="mid"
             @touchstart.prevent="midStart"
             @touchmove.prevent="midMove"
             @touchend="midEnd"
        >
          <div class="mid-img" ref="midImg">
            <div class="cd-w">
              <div class="cd" :class="cd">
                <img :src=curSong.image>
              </div>
            </div>
            <div class="playing-txt">
              <p>{{playingTxt}}</p>
            </div>
          </div>
          <div class="mid-lyric" ref="showLyric">
            <scroll :data="currentLyric && currentLyric.lines" ref="lyricScroll">
              <div class="lyric-warp">
                <div v-if="currentLyric">
                  <p v-for="(i,index) in currentLyric.lines"
                     ref="line"
                     :class="{'cur':currentLine === index}">
                    {{i.txt}}
                  </p>
                </div>
              </div>
            </scroll>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-warp">
            <span :class="{'active':currentShow === 'cd'}"></span>
            <span :class="{'active':currentShow === 'lyric'}"></span>
          </div>
          <progress-bar
            :ltime=setMin(curTime)
            :rtime=setMin(curSong.duration)
            :pros=pros
            @TimeChange=timeChange
          ></progress-bar>
          <div class="tools">
            <div class="icon left" @click="setMode">
              <i class="iconfont" :class="modeicon"></i>
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
        <progress-bar
          :ltime=setMin(curTime)
          :rtime=setMin(curSong.duration)
          :pros=pros
          @TimeChange=timeChange
          :flag="false"
        ></progress-bar>
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
    <audio ref="audio" :src=curSong.url @canplay="ready" @error="error" @timeupdate="timeUpdate" @ended="end"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {playMode} from '@/common/js/config'
  import {shuffle} from '@/common/js/util'
  import ProgressBar from 'base/progressbar/ProgressBar'
  import Lyric from 'lyric-parser'
  export default {
    name: 'player',
    data () {
      return {
        readyFlag: false,
        curTime: 0,
        currentLyric: null,
        currentLine: 0,
        currentShow: 'cd',
        touch: {},
        playingTxt: ''
      }
    },
    computed: {
      modeicon() {
        return this.mode === playMode.sequence ? 'icon-shunxubofang' : this.mode === playMode.random ? 'icon-suijibofang' : 'icon-danquxunhuan'
      },
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
        'curIndex',
        'mode',
        'sufxPlayList'
      ])
    },
    filters: {},
    watch: {
      curSong: function (val, old) {
        if (val.id === old.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        clearInterval(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
        }, 1000)
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
      setMode() {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let songList = null
        if (mode === playMode.random) {
          songList = shuffle(this.sufxPlayList)
        } else {
          songList = this.sufxPlayList
        }
        this.resetCurIndex(songList)
        this.setPlayList(songList)
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        console.log(1)
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      resetCurIndex(songList) {
        let index = songList.findIndex((item) => {
          return item.id === this.curSong.id
        })
        this.setPlayIndex(index)
      },
      timeChange(pros) {
        if (!this.playing) {
          this.togglePlay()
        }
        let time = this.curSong.duration * pros
        if (this.currentLyric) {
          this.currentLyric.seek(time * 1000)
        }
        this.setPlaying(true)
        this.$refs.audio.currentTime = time
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
        this.readyFlag = true
      },
      ...mapMutations({
        setFull: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAY_STATE',
        setPlayIndex: 'SET_PLAY_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAY_LIST'
      }),
      togglePlay() {
        this.setPlaying(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      prev() {
        if (!this.readyFlag) {
          return
        }
        if (this.playList.length === 1) {
          this.loop()
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
        if (this.playList.length === 1) {
          this.loop()
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
      },
      getLyric() {
        this.curSong.getLyric().then(res => {
          this.currentLyric = new Lyric(res, this.LyricChange)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingTxt = ''
          this.currentLine = 0
        })
      },
      LyricChange({lineNum, txt}) {
        this.playingTxt = txt
        if (lineNum) {
          this.currentLine = lineNum
        }
        if (lineNum > 5) {
          let line = this.$refs.line[lineNum - 5]
          this.$refs.lyricScroll.scrollToElement(line, 1000)
        } else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000)
        }
      },
      midStart(e) {
        this.touch.flag = true
        this.touch.moved = false
        this.touch.startX = e.touches[0].pageX
        this.touch.startY = e.touches[0].pageY
      },
      midMove(e) {
        if (!this.touch.flag) {
          return
        }
        const t = e.touches[0]
        let Mx = t.pageX - this.touch.startX
        let My = t.pageY - this.touch.startY
        if (Math.abs(My) > Math.abs(Mx)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const width = Math.min(0, Math.max(-window.innerWidth, Mx + left))
        this.touch.det = Math.abs(width / window.innerWidth)
        this.$refs.midImg.style.opacity = 1 - this.touch.det
        this.setShowWidth(width)
      },
      midEnd(e) {
        if (!this.touch.moved) {
          return
        }
        let width
        let opt
        if (this.currentShow === 'cd') {
          if (this.touch.det > 0.1) {
            opt = 0
            width = -window.innerWidth
            this.currentShow = 'lyric'
          } else {
            width = 0
            opt = 1
          }
        } else {
          opt = 1
          if (this.touch.det < 0.9) {
            width = 0
            this.currentShow = 'cd'
            opt = 1
          } else {
            width = -window.innerWidth
            opt = 0
          }
        }
        this.$refs.midImg.style.opacity = opt
        this.setShowWidth(width)
        this.touch.flag = false
        this.touch.det = 0
      },
      setShowWidth(width) {
        this.$refs.showLyric.style.transform = `translate3d(${width}px,0,0)`
        this.$refs.showLyric.style.webkitTransform = `translate3d(${width}px,0,0)`
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
        transition: all .3s;
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
      .mid-lyric {
        transition: all .3s;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .scroll {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .lyric-warp {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
        }
        p {
          line-height: 32px;
          font-size: $font-size-m;
          text-align: center;
          color: $text-color-s;
          transition: all .3s;
          &.cur {
            color: #fff;
          }
        }
      }
      .playing-txt {
        width: 80%;
        margin: 30px auto;
        overflow: hidden;
        text-align: center;
        p {
          font-size: $font-size-m;
          color: $text-color-l;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-warp {
        font-size: 0;
        text-align: center;
        overflow: hidden;
        span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          transition: all .3s;
          background-color: $text-color-l;
          margin: 0 4px;
          &.active {
            width: 20px;
          }
        }
      }
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
    .progress-bar {
      position: absolute;
      top: -5px;
      width: 100%;
      right: 0;
      padding: 0 10px 0 70px;
    }
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
      margin-top: 8px;
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
      margin: 8px 10px 0;
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
