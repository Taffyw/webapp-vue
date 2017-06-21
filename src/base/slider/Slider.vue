<template>
  <div class="slider">
    <div class="slider-content">
      <div class="sliders" ref="slider">
        <div class="slider-warp" ref="item">
          <slot>
          </slot>
        </div>
      </div>
      <div class="dots">
        <span
          v-for="(i,index) in dots"
          class="dot"
          :class="{'active':cur === index}"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        cur: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this.initWidth()
        this.initDots()
        this.initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this.initWidth(true)
        this.slider.refresh()
      })
    },
    watch: {},
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      /**
       * 初始化slider宽度
       * @param isResize 标识是否改变浏览器大小
       */
      initWidth (isResize) {
        this.children = this.$refs.item.children
        let warpWidth = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let item = this.children[i]
          item.style.width = sliderWidth + 'px'
          warpWidth += sliderWidth
        }
        if (this.loop && !isResize) {
          warpWidth += 2 * sliderWidth
        }
        this.$refs.item.style.width = warpWidth + 'px'
      },
      /**
       * 初始化slider
       */
      initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: true,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.cur = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      /**
       * 初始化小点
       */
      initDots () {
        this.dots = new Array(this.children.length)
      },
      /**
       * 自动播放
       * @private
       */
      _play () {
        let pageIndex = this.cur + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    activated() {
      this._play()
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/var";

  .slider {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
    .sliders {
      min-height: 1px;
    }
    .slider-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .slider-warp {
        overflow: hidden;
        position: relative;
        white-space: nowrap;
        .slider-item {
          position: relative;
          overflow: hidden;
          float: left;
          a {
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .dots {
      position: absolute;
      bottom: 5px;
      width: 100%;
      left: 0;
      text-align: center;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 3px;
        border-radius: 4px;
        background-color: rgba(#fff, .8);
        &.active {
          background-color: rgba($mix-color, .9);
        }
      }
    }
  }
</style>
