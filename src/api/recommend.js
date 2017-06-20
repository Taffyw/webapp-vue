/**
 * Created by 0 on 2017/6/16.
 */
import jsonp from '../common/js/jsonp'
import {commonParams, options} from './common'
import axios from 'axios'

export function getAdvList() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uid: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getSongSheet() {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParams, {
    rnd: 0.2409882584010834,
    g_tk: 2132061997,
    jsonpCallback: 'getPlaylist',
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
