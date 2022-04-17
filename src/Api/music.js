import api from "../plugins/axios";

export function getLyric(id) {
  return api({
    url: "/lyric?id=" + id,
    method: "get"
  })
}
export function getSearchDefault() {
  return api({
    url:"/search/default",
    method: "get"
  })
}
export function getSearchList(keyWord,limit) {
  return api({
    url:"/search?keywords=" + keyWord + "&limit=" + limit,
    method:"get"
  })
}
export function getHotSearch() {
  return api({
    url:"/search/hot/detail",
    method:"get"
  })
}
export function getSearchRecommend(keyWord) {
  return api({
    url:"/search/suggest?keywords=" + keyWord,
    method:"get"
  })
}
export function getDetailInfo(id) {
  return api({
    url:"/song/detail?ids=" + id,
    method:"get"
  })
}
