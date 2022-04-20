import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Home from '@/pages/home'
import Artist from '@/pages/artist'
import topList from '@/pages/topList'
import Search from '@/pages/search'
import Ucenter from '@/pages/ucenter'
import {Notification} from "element-ui";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:"/loginpage",
      component:() => import("@/pages/loginPage"),
      redirect: "loginpage/user",
      children: [
        {
          path: "login",
          component: () => import("@/components/login && regist/login")
        },
        {
          path: "register",
          component: () => import("@/components/login && regist/register")
        },
      ]
    },
    {
      path: "/musicplay",
      name: "musicPlay",
      component: () => import("@/pages/musicPlay"),
    },
    {
      path: "/musicplay2",
      name: "musicPlay2",
      component: () => import("@/pages/musicPlay2"),
    },
    {
      path: "/",
      name: "Index",
      redirect: "/home",
      component: Index,
      children: [
        {
          path: "home",
          component: Home,
          redirect: "/home/digital",
          children: [
            {
              path: "digital",
              component: () => import("@/pages/musicLists/digitalAlbumChart"),
            },
            {
              path: "news",
              component: () => import("@/pages/musicLists/newMusic"),
            },
            {
              path: "singer",
              component: () => import("@/pages/musicLists/singerList"),
            },
          ],
        },
        {
          path: "artist",
          component: Artist,
        },
        {
          path: "toplist",
          component: topList,
        },
        {
          path: "search",
          component: Search,
        },
        {
          path: "ucenter",
          component: Ucenter,
          redirect: "/ucenter/created",
          children:[
            {
              path:'created',
              component:()=>import('@/components/ucenter/createdPlaylist'),
            },
            {
              path:'collect',
              component: () => import("@/components/ucenter/collectPlaylist"),
            }
          ]
        },
        {
          path: "Umlist",
          component: () => import("@/pages/UmusicList"),
        },
        {
          path: "morelist",
          name: "moreList",
          component: () => import("@/pages/moreList"),
        },
      ],
    },
  ],
});
// router.beforeEach((to, from, next) => {
//     if (to.path === '/loginPage/login') {
//       next();
//     } else {
//       let token = sessionStorage.getItem('token');
//       if (token === null || token === '') {
//         next('/loginPage/login');
//       } else {
//         next();
//       }
//     }
// })

export default router;
