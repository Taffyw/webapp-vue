/**
 * Created by 0 on 2017/6/16.
 */
import jsonp from '../common/js/jsonp'
import {commonParams, options} from './common'

export function getAdvList () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uid: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
