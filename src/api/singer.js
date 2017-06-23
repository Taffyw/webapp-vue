/**
 * Created by 0 on 2017/6/16.
 */
import jsonp from '../common/js/jsonp'
import {commonParams, options} from './common'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: '1890111306',
    hostUin: 0,
    notice: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1053044265,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
