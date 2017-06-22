<template>
  <scroll ref="scroll" class="warpper listview" :data="data" @scroll="onScroll" :listenScroll=true :probeType=probeType>
    <div class="content">
      <div class="singer-list" v-for="i in data" ref="listGroup">
        <h2 ref="sortGroup" class="item-title">{{i.title}}</h2>
        <ul>
          <li v-for="i in i.items" @click="selectItem(i)">
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
    <div class="sort-list" @touchstart="onSortTouch" @touchmove.stop.prevent="onSortMove">
      <ul>
        <li
          v-for="(i,index) in sortData"
          :class="{active:index == sortIndex}"
          :data-index="index">
          {{i}}
        </li>
      </ul>
    </div>
    <div class="fixed-title" v-show="fixedTitle">
      <h2>{{fixedTitle}}</h2>
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
        probeType: 3,
        singer: [],
        sortIndex: 0,
        touch: {},
        listHeight: [],
        clientY: -1
      }
    },
    computed: {
      sortData() {
        return this.data.map((arr) => {
          return arr.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.clientY > 0) {
          return ''
        }
        return this.data[this.sortIndex] ? this.data[this.sortIndex].title : ''
      }
    },
    mounted() {
    },
    watch: {
      data() {
        setTimeout(() => {
          this.setListHeight()
        }, 20)
      },
      clientY(newY) {
        let lists = this.listHeight
        for (let i = 0; i < lists.length - 1; i++) {
          let height1 = lists[i]
          let height2 = lists[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.sortIndex = i
            return
          }
        }
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('selectItem', item)
      },
      imgLoad() {
        this.$refs.scroll.fresh()
      },
      onSortTouch(e) {
//        点击字母滚动到index元素的位置&&缓存点击index
        let index = e.target.getAttribute('data-index')
        if (!index) {
          return
        }
        this.sortIndex = index
        this.touch.y1 = e.touches[0].pageY
        this.touch.activeIndex = index
        this._scrollTo(index)
      },
      onScroll(pos) {
        this.clientY = pos.y
      },
      setListHeight() {
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      onSortMove(e) {
        this.touch.y2 = e.touches[0].pageY
        let moveIndex = (this.touch.y2 - this.touch.y1) / 18 | 0
        let index = moveIndex + parseInt(this.touch.activeIndex)
//      当index到达临界值的时候重新复制滚动到的元素位置
        if (index <= 0) {
          index = 0
        } else if (index >= this.sortData.length) {
          index = (this.sortData.length - 1)
        }
        this._scrollTo(index)
        this.sortIndex = index
      },
      _scrollTo(index) {
        this.$refs.scroll.scrollToElement(this.$refs.sortGroup[index], 0)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";

  .listview {
    width: 100%;
    height: 100%;
    .singer-list {
      overflow: hidden;
      h2.item-title {
        font-size: $font-size-m;
        font-weight: normal;
        color: $text-color-l;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: rgba($deep-bg, 1);
      }
      > ul {
        li {
          background-color: $large-bg;
          padding: 10px 0;
          align-items: center;
          display: flex;
          .face {
            margin: 0 7%;
            width: 55px;
            height: 55px;
            img {
              width: 55px;
              height: 55px;
              border-radius: 50%;
            }
          }
          .name {
            flex: 1;
            font-size: $font-size-m;
          }
        }
      }
    }
    .sort-list {
      font-size: $font-size-s;
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $large-bg;
      font-family: Helvetica;
      ul > li {
        color: $text-color-m;
        padding: 3px;
        line-height: 1;
        &.active {
          color: $mix-color;
        }
      }
    }
    .fixed-title{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      h2{
        font-size: $font-size-m;
        font-weight: normal;
        color: $text-color-l;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: rgba($deep-bg, 1);
      }
    }
  }
</style>
