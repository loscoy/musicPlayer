import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Home from '@/pages/home'
import Artist from '@/pages/artist'
import topList from '@/pages/topList'
import Search from '@/pages/search'
import Ucenter from '@/pages/ucenter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: "/home",
      component: Index,
      children:[
        {
          path: "home",
          component: Home,
          redirect: '/home/hot',
          children:[
            {
              path: 'digital',
              component: () => import('@/pages/musicLists/digitalAlbumChart')
            },
            {
              path: 'news',
              component: () => import('@/pages/musicLists/newMusic')
            },
            {
              path: 'singer',
              component: () => import('@/pages/musicLists/singerList')
            }
            ]
        },
        {
          path: "artist",
          component: Artist
        },
        {
          path: "toplist",
          component: topList
        },
        {
          path: "search",
          component: Search
        },
        {
          path: "ucenter",
          component: Ucenter
        }
      ]
    }
  ]
})
