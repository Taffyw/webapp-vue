<template>
  <div class="scroll" ref="warpper">
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
      },
      fresh() {
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
