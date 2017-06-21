<template>
  <div class="app-content singer">
    <list-view :data="singer"></list-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/common'
  import Singer from '@/common/js/singer'
  import ListView from 'base/listview/ListView'
  export default {
    name: 'singer',
    data () {
      return {
        singer: []
      }
    },
    mounted() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singer = this.resetData(res.data.list)
          }
        })
      },
      imgLoad() {
        this.$refs.scroll.fresh()
      },
      resetData(list) {
        const singerNum = 10
        const hotName = '热门'
        let data = {
          hot: {
            title: hotName,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index <= singerNum) {
            data.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex
          if (!data[key]) {
            data[key] = {
              title: key,
              items: []
            }
          }
          data[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let hot = []
        let _list = []
        for (let key in data) {
          let val = data[key]
          if (val.title.match(/[a-zA-Z]/)) {
            _list.push(data[key])
          } else if (val.title === hotName) {
            hot.push(data[key])
          }
        }
        _list.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(_list)
      }
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="sass">

</style>
