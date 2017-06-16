<template>
  <div class="recommend">
    <div class="content" style="height: 10000px;background-color: rgba(255,255,255,.1)">
      <a :href="i.linkUrl" v-for="i in slider">
        <img :src="i.picUrl" alt=""  width="100%">
      </a>
    </div>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped lang="scss">
  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    background-color: #fff;
    bottom: 0;
  }
</style>
