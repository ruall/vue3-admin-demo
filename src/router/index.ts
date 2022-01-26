import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const components = {
  Layout: () => import('/@/layout/index.vue'),
  Redirect: () => import('/@/layout/redirect.vue'),
  LayoutBlank: () => import('/@/layout/blank.vue'),
  404: () => import('/@/views/errorpage/404.vue'),
  Login: () => import('/@/views/login/index.vue')
}

// 静态路由页面
export const allowRouter = [
  { path: '/', redirect: '/index' },
  {
    name: 'RedirectPage',
    path: '/redirect',
    component: components['Layout'],
    meta: { title: '重定向页面', icon: 'el-icon-eleme', hidden: true },
    children: [
      {
        name: 'Redirect',
        path: '/redirect/:pathMatch(.*)*',
        meta: {
          title: '重定向页面',
          icon: ''
        },
        component: components.Redirect
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: components.Login,
    meta: { title: '登录', icon: 'el-icon-eleme', hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(), // createWebHistory
  routes: allowRouter as RouteRecordRaw[]
})

export default router
