/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/23
 * Time: 17:31
 *
 */
import * as types from '../mutation-types'
// initial state
const state = {
  singer: {}
}

// getters
const getters = {
  getSinger: state => state.singer
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
