/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/29
 * Time: 11:00
 *
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
