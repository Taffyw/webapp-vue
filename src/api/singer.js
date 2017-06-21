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
