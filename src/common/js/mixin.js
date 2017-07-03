/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/7/3
 * Time: 17:15
 *
 */
import {mapGetters} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList: function (val) {
      this.handlePlayList(val)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('该方法必须定义！')
    }
  }
}
