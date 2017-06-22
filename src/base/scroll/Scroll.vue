<template>
  <div class="scroll" ref="warpper" :probeType="3">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      setTimeout(() => {
        this._init()
      }, 20)
    },
    watch: {
      data() {
        setTimeout(() => {
          this.fresh()
        }, 20)
      }
    },
    methods: {
      _init() {
        if (!this.$refs.warpper) {
          return
        }
        this.scroll = new BScroll(this.$refs.warpper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let that = this
          this.scroll.on('scroll', (pos) => {
            that.$emit('scroll', pos)
          })
        }
      },
      fresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
