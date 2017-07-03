import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/Rank.vue'
import Recommend from '@/components/recommend/Recommend.vue'
import Singer from '@/components/singer/Singer.vue'
import Search from '@/components/search/Search.vue'
import SingerDetail from '@/components/singer/SingerDetail.vue'
import MusicListDetail from '@/components/recommend/MusicListDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: 'musiclist/:id',
          component: MusicListDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
