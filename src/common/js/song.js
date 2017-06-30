/**
 * Created with feifei.
 * User: 835854385@qq.com
 * Date: 2017/6/26
 * Time: 10:12
 *
 */
import {getlyric} from 'api/song'
import {ERR_OK} from 'api/common'
import {Base64} from 'js-base64'
/**
 * 歌曲构造函数
 */
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    console.log('请求歌词')
    if (this.lyric) {
      return Promise.resolve()
    }
    getlyric(this.mid).then((res) => {
      if (res.code === ERR_OK) {
        this.lyric = Base64.decode(res.lyric)
        console.log(this.lyric)
      }
    })
  }
}

export function CreateSong(music) {
  return new Song({
    id: music.songid,
    mid: music.songmid,
    singer: getSinger(music.singer),
    name: music.songname,
    album: music.albumname,
    duration: music.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${music.songid}.m4a?fromtag=46`
  })
}

function getSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
