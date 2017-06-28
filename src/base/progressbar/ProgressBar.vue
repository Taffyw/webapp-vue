<template>
  <div class="progress-bar">
    <span class="time l">{{ltime}}</span>
    <div class="bar-warp" ref="progressbar" @click="clickBar">
      <div class="bar">
        <div class="bar-line">
          <div class="progress" ref="progress"></div>
          <div class="pro-btn-w" ref="ball"
               @touchstart.prevent="ballStart"
               @touchmove.prevent="ballMove"
               @touchend="ballStop"
          >
            <div class="p-btn"></div>
          </div>
        </div>
      </div>
    </div>
    <span class="time r">{{rtime}}</span>
  </div>
</template>

<script>
  export default {
    name: 'progressbar',
    props: {
      pros: {
        type: Number,
        default: 0
      },
      ltime: {
        type: String,
        default: ''
      },
      rtime: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        touch: {}
      }
    },
    watch: {
      pros(val) {
        if (val > 0 && !this.touch.touching) {
          let barWidth = this.$refs.progressbar.clientWidth - 16
          let offsetWidth = val * barWidth
          this.setOffset(offsetWidth)
        }
      }
    },
    mounted() {
    },
    methods: {
      clickBar(e) {
        this.setOffset(e.offsetX)
        this.setPlaying()
      },
      setOffset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.ball.style.transform = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.ball.style.webkitTransform = `translate3d(${offsetWidth}px,0,0)`
      },
      setPlaying() {
        const barwidth = this.$refs.progressbar.clientWidth - 16
        const pros = this.$refs.progress.clientWidth / barwidth
        this.$emit('TimeChange', pros)
      },
      ballStart(e) {
        this.touch.touching = true
        this.touch.touchX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      ballMove(e) {
        if (!this.touch.touching) {
          return
        }
        const moveX = e.touches[0].pageX - this.touch.touchX
        const offsetWidth = Math.min(this.$refs.progressbar.clientWidth - 16, Math.max(0, this.touch.left + moveX))
        this.setOffset(offsetWidth)
      },
      ballStop() {
        this.setPlaying()
        this.touch.touching = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";

  .progress-bar {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
    span.time {
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: $font-size-s-s;
      flex: 0 0 30px;
      &.l {
        text-align: left;
      }
      &.r {
        text-align: right;
      }
    }
    .bar-warp {
      flex: 1;
      .bar {
        height: 30px;
        .bar-line {
          position: relative;
          top: 13px;
          height: 4px;
          background: rgba(#000, .3);
        }
        .progress {
          width: 0;
          position: absolute;
          height: 100%;
          background: $mix-color;
        }
        .pro-btn-w {
          position: absolute;
          left: -8px;
          top: -13px;
          width: 30px;
          height: 30px;
          .p-btn {
            position: relative;
            top: 7px;
            left: 7px;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 3px solid rgba(#fff, .6);
            border-radius: 50%;
            background: #FF6A6A;
          }
        }
      }
    }
  }
</style>
