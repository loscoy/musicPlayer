import Api from "../plugins/axios";

export function getLyric(id) {
  return Api({
    url: "/lyric?id=" + id,
    method: "get"
  })
}
export function getSearchDefault() {
  return Api({
    url:"/search/default",
    method: "get"
  })
}
export function getSearchList(keyWord,limit,offset) {
  return Api({
    url:"/cloudsearch?keywords=" + keyWord + "&limit=" + limit +"&offset=" + offset,
    method:"get"
  })
}
export function getHotSearch() {
  return Api({
    url:"/search/hot/detail",
    method:"get"
  })
}
export function getSearchRecommend(keyWord) {
  return Api({
    url:"/search/suggest?keywords=" + keyWord,
    method:"get"
  })
}
export function getDetailInfo(...ids) {
  return Api({
    url:"/song/detail?ids=" + ids,
    method:"get"
  })
}
export function getPlaylistDetail (playListId) {
  return Api.get('/playlist/detail?id=' + playListId)
}
export function getAllPlaylistMusic (playListId) {
  return Api.get("/playlist/track/all?id=" + playListId)
}
export function getMusicUrl(musicId){
  return Api.get("/song/url?id=" + musicId)
}
//每日推荐歌单
export function TodayRecommendPlaylist(){
  return Api({
    url:'/recommend/resource',
    methods:'get'
  })
}
//每日推荐歌曲
export function TodayRecommendSongs() {
  return Api({
    url:'/recommend/songs',
    methods:'get'
  })
}
//获取高音质播放链接
export function getSQUrl(id){
  return Api({
    url:'/song/download/url?id=' + id,
    methods:'get'
  })
}