/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/26
 * Time: 15:55
 *
 */
import * as types from '../mutation-types'
import {playMode} from '@/common/js/config'
const state = {
  playing: false,
  fullScreen: false,
  playList: [],
  sufxPlayList: [],
  mode: playMode.sequence,
  curIndex: -1
}

const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  sufxPlayList: state => state.sufxPlayList,
  mode: state => state.mode,
  curIndex: state => state.curIndex,
  curSong: (state) => {
    return state.playList[state.curIndex] || {}
  }
}

const actions = {
  selectPlay: ({commit, state}, {list, index}) => {
    commit(types.SET_PLAY_INDEX, index)
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_SUFX_LIST, list)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAY_STATE, true)
  }
}

const mutations = {
  [types.SET_PLAY_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state, arr) {
    state.playList = arr
  },
  [types.SET_SUFX_LIST](state, arr) {
    state.sufxPlayList = arr
  },
  [types.SET_PLAY_MODE](state, num) {
    state.mode = num
  },
  [types.SET_PLAY_INDEX](state, index) {
    state.curIndex = index
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
