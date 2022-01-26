import router from '/@/router'
import { store } from '/@/store/index'
import { configure, start, done } from 'nprogress'
import { RouteRecordRaw } from 'vue-router'

configure({ showSpinner: false })

const loginRoutePath = '/Login'
const defaultRoutePath = '/index/main'

router.beforeEach(async (to, from) => {
  start()
  const { layout } = store.state
  // 判断当前是否在登陆页面
  if (to.path.toLocaleLowerCase() === loginRoutePath.toLocaleLowerCase()) {
    done()
    if (layout.token.ACCESS_TOKEN)
      return typeof to.query.from === 'string'
        ? decodeURIComponent(decodeURIComponent(to.query.from))
        : defaultRoutePath
    return
  }
  // // 判断是否登录
  if (!layout.token.ACCESS_TOKEN) {
    return loginRoutePath + (to.fullPath ? `?from=${encodeURIComponent(encodeURIComponent(to.fullPath))}` : '')
  }

  //@ts-ignore
  document.title = document.title ? `${document.title.split(' |')[0]} | ${to.meta.title}` : to.meta.title
  // 判断是否还没添加过路由
  if (layout.menubar.menuList.length === 0) {
    store.commit('layout/setRoutes')
    for (let i = 0; i < layout.menubar.menuList.length; i++) {
      router.addRoute(layout.menubar.menuList[i] as RouteRecordRaw)
    }
    store.commit('layout/concatAllowRoutes')
    return to.fullPath
  }
  //地址错误跳转到首页
  if (!to.name) {
    router.replace({ name: 'Index' })
  }
})

router.afterEach(() => {
  done()
})
