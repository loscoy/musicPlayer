import get from "../plugins/axios";

export function getLyric(url) {
  return get({
    url: url,
    method: "get"
  })
}
