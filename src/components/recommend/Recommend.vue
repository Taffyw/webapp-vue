<template>
  <div class="app-content recommend">
    <scroll ref="scroll" class="warpper" :data="songList">
      <div class="content">
        <slider v-if="slider.length">
          <div class="slider-item" v-for="i in slider">
            <a :href="i.linkUrl">
              <img @load="loadImg" :src="i.picUrl" alt="">
            </a>
          </div>
        </slider>
        <div class="song-list">
          <div class="title">
            <span>推荐歌单</span>
          </div>
          <ul>
            <li v-for="i in songList">
              <div class="song-item">
                <div class="time">{{i.commit_time}}</div>
                <div class="img"><img v-lazy="i.imgurl" @load="refresh" alt=""></div>
                <div class="name" v-html="i.dissname"></div>
                <div class="info" v-html="i.creator.name"></div>
                <div class="listener">收听人数:{{i.listennum}}</div>
              </div>
            </li>
          </ul>
          <loading v-show="!songList.length"></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/Slider.vue'
  import {getAdvList, getSongSheet} from 'api/recommend'
  import {ERR_OK} from 'api/common'
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
      },
      loadImg() {
        if (!this.loadFlag) {
          this.$refs.scroll.fresh()
          this.loadFlag = true
        }
      },
      refresh() {
        this.$refs.scroll.fresh()
      }
    },
    components: {
      Slider
    }
  }
</script>

<style scoped lang="scss">
  @import '~sass/var';
  @import "~sass/mixin";

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .warpper {
      height: 100%;
      overflow: hidden;
    }
  }

  .song-list {
    .title {
      margin: 10px 0;
      background-color: $large-bg;
      height: 45px;
      text-align: center;
      line-height: 45px;
      span {
        display: inline-block;
        background: url("tuijian.png");
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: left center;
        padding-left: 30px;
        font-size: $font-size-m;
        color: $text-color-l;
      }
    }
    > ul {
      display: flex;
      flex-flow: row wrap;
      padding: 0 10px;
      > li {
        margin-bottom: 10px;
        width: 50%;
        padding-bottom: 10px;
        &:nth-child(2n) {
          padding-left: 5px;
        }
        &:nth-child(2n+1) {
          padding-right: 5px;
        }
        .song-item {
          position: relative;
          border: 1px solid rgba($deep-bg, .1);
          border-radius: 4px;
          background-color: $large-bg;
          .time {
            padding: 4px 6px;
            background-color: rgba($deep-bg, .4);
            position: absolute;
            top: 0;
            left: 0;
            font-size: $font-size-s-s;
            color: #fff;
          }
          .img {
            img {
              width: 100%;
              border-radius: 4px 4px 0 0;
            }
          }
          .name {
            @include ellipsis(2);
            height: 40px;
            padding: 0 10px;
            margin: 5px 0;
            font-size: $font-size-m;
            color: $text-color-l;
          }
          .info, .listener {
            word-break: break-all;
            padding: 0 10px 0;
            color: $mix-color;
          }
          .listener {
            padding: 0 10px 10px;
          }
        }
      }
    }
  }
</style>
