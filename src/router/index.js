import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/Rank.vue'
import Recommend from '@/components/recommend/Recommend.vue'
import Singer from '@/components/singer/Singer.vue'
import Search from '@/components/search/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
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
