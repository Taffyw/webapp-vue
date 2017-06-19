<template>
  <div class="recommend">
    <div class="content">
      <slider v-if="slider.length">
        <div class="slider-item" v-for="i in slider">
          <a :href="i.linkUrl">
            <img :src="i.picUrl" alt="">
          </a>
        </div>
      </slider>
      <div class="log">
        <h1>
          afasfasf
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from '../../base/slider/Slider.vue'
  import {getAdvList} from '../../api/recommend'
  import {ERR_OK} from '../../api/common'
  export default {
    name: 'hello',
    data () {
      return {
        slider: [],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created () {
      this._getAdvList()
    },
    methods: {
      _getAdvList () {
        getAdvList().then((res) => {
          if (res.code === ERR_OK) {
            this.slider = res.data.slider
          }
        })
      }
    },
    components: {
      Slider
    }
  }
</script>

<style scoped lang="scss">
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
