<template>
  <div class="song-list">
    <div class="list">
      <ul>
        <li v-for="(i,index) in songs" @click="select(i,index)">
          <div class="content">
            <h2 class="name">{{i.name}}</h2>
            <p class="des">{{i.singer}} · {{i.album}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'songlist',
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
      goBack() {
        history.go(-1)
      },
      select(item, index) {
        this.$emit('select', item, index)
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/mixin";
  @import "~sass/var";
  .song-list{
    padding: 20px 40px;
    .list{
      overflow: hidden;
      >ul{
        li{
          display: flex;
          align-items: center;
          height: 64px;
          line-height: 20px;
          .name{
            @include ellipsis(1);
            color: #fff;
            font-size: $font-size-m-x;
            font-weight: 400;
          }
          .des{
            @include ellipsis(1);
            margin-top: 5px;
            font-size: $font-size-m;
            color: $text-color-s;
          }
        }
      }
    }
  }
</style>
