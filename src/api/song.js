/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/29
 * Time: 15:57
 *
 */
import {commonParams} from './common'
import axios from 'axios'
export function getlyric(mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(([^()]+)\)$/
      var matched = ret.match(reg)
      if (matched) {
        ret = JSON.parse(matched[1])
      }
    }
    return Promise.resolve(ret)
  })
}
