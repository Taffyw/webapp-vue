<template>
  <scroll ref="scroll" class="warpper listview" :data="data">
    <div class="content">
      <div class="singer-list" v-for="i in data">
        <h2 class="item-title">{{i.title}}</h2>
        <ul>
          <li v-for="i in i.items">
            <div class="face">
              <img v-lazy="i.face" alt="" @load="imgLoad">
            </div>
            <div class="name">
              {{i.name}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <loading v-show="!data.length"></loading>
  </scroll>
</template>

<script>
  export default {
    name: 'listview',
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        singer: []
      }
    },
    mounted() {},
    methods: {
      imgLoad() {
        this.$refs.scroll.fresh()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";
  .listview {
    width: 100%;
    height: 100%;
    .singer-list{
      overflow: hidden;
      h2.item-title{
        font-size: $font-size-m;
        font-weight: normal;
        color: $text-color-l;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: rgba($deep-bg,1);
      }
      >ul{
        li{
          background-color: $large-bg;
          padding: 10px 0;
          align-items: center;
          display: flex;
          .face{
            margin: 0 7%;
            width: 55px;
            height: 55px;
            img{
              width: 55px;
              height: 55px;
              border-radius: 50%;
            }
          }
          .name{
            flex: 1;
            font-size: $font-size-m;
          }
        }
      }
    }
  }
</style>
