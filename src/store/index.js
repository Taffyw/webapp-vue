/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/23
 * Time: 17:37
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import singer from './modules/singer'
import play from './modules/play'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    singer,
    play
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
