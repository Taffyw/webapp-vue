<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :songs=songList :title=getSinger.name :bg=getSinger.face></music-list>
      <loading v-show="!songList.length" loadingText="正在拼命加载中..." :center=true></loading>
    </div>
  </transition>
</template>

<script>
  import {getMusciListDetail} from 'api/singer'
  import {mapGetters} from 'vuex'
  import {CreateSong} from '@/common/js/song'
  import {ERR_OK} from 'api/common'
  import MusicList from '@/components/musiclist/MusicList.vue'
  export default {
    name: 'musiclistdetail',
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
          this.$router.push('/')
          return
        }
        getMusciListDetail(this.getSinger.id).then(res => {
          console.log(res.cdlist[0].songlist)
          if (res.code === ERR_OK) {
            this.songList = this.resetData(res.cdlist[0].songlist)
          }
        })
      },
      resetData(item) {
        let ret = []
        item.forEach((s) => {
          console.log(s)
          if (s.songid && s.albummid) {
            ret.push(CreateSong(s))
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
