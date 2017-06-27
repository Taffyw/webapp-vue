<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :songs=songList :title=getSinger.name :bg=getSinger.face></music-list>
      <loading v-show="!songList.length" loadingText="正在拼命加载中..." :center=true></loading>
    </div>
  </transition>
</template>

<script>
  import {getSingerDetail} from 'api/singer'
  import {mapGetters} from 'vuex'
  import {CreateSong} from '@/common/js/song'
  import {ERR_OK} from 'api/common'
  import MusicList from '@/components/musiclist/MusicList.vue'
  export default {
    name: 'singerdetail',
    data () {
      return {
        songList: []
      }
    },
    mounted() {
      this.initDetail()
    },
    computed: {
      ...mapGetters([
        'getSinger'
      ])
    },
    methods: {
      initDetail() {
        if (!this.getSinger.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.getSinger.id).then(res => {
          if (res.code === ERR_OK) {
            this.songList = this.resetData(res.data.list)
          }
        })
      },
      resetData(item) {
        let ret = []
        item.forEach((s) => {
          let {musicData} = s
          if (musicData.songid && musicData.albummid) {
            ret.push(CreateSong(musicData))
          }
        })
        return ret
      },
      goBack() {
        history.go(-1)
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="scss">
  @import "~sass/var";

  .singer-detail {
    z-index: 101;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $bg-color;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
