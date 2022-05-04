# musicplayer

> A Vue.js project
> 完善ing...

> banner --> swiper

> 下拉刷新 --> **[Muse-UI](https://muse-ui.org/)**

> API -->**[ NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)**
> 
> 歌词处理-->lyric-parser

> 由于网易云音乐接口的歌词时间单位中，秒有三位数，而lyric-parser只解析到两位，所以需要对lyric-parser的源码进行修改
> 路径node_moudules->lyric-parser->src->index
![image.png](https://s2.loli.net/2022/05/04/bZlirHYVR2Q4Wyt.png)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
