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
      <div class="song-list">
        <div class="title">推荐歌单</div>
        <ul>
          <li v-for="i in songList">
            <div class="song-item">
              <div class="img"><img :src="i.imgurl" alt=""></div>
              <div class="name">{{i.dissname}}</div>
              <div class="info">{{i.creator.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from '../../base/slider/Slider.vue'
  import {getAdvList, getSongSheet} from '../../api/recommend'
  import {ERR_OK} from '../../api/common'
  export default {
    name: 'hello',
    data () {
      return {
        slider: [],
        songList: [],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created () {
      this._getAdvList()
      this._getSongList()
    },
    methods: {
      _getAdvList () {
        getAdvList().then((res) => {
          if (res.code === ERR_OK) {
            this.slider = res.data.slider
          }
        })
      },
      _getSongList () {
        getSongSheet().then(res => {
          if (res.code === ERR_OK) {
            this.songList = res.data.list
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
  @import '../../sass/var';

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
  }

  .song-list {
    .title {
      margin: 10px 0;
      background-color: $large-bg;
      font-size: $font-size-m;
      color: $text-color-l;
      height: 65px;
      text-align: center;
      line-height: 65px;
    }
    >ul{
      display: flex;
      flex-flow: row wrap;
      >li{
        margin-bottom: 10px;
        width: 50%;
        padding: 0 10px 10px;
        .song-item{
          border: 1px solid rgba($deep-bg,.1);
          border-radius: 4px;
          background-color: $large-bg;
          .img{
            img{
              width: 100%;
              border-radius: 4px 4px 0 0;
            }
          }
          .name{
            word-break: break-all;
            padding:0 10px;
            margin: 5px 0;
            font-size: $font-size-m;
            color: $text-color-l;
          }
          .info{
            word-break: break-all;
            padding: 0 10px 10px;
            color: $mix-color;
          }
        }
      }
    }
  }
</style>
