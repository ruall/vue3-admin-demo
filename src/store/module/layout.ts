import { login, loginParam } from '/@/api/layout/index'
import { ILayout, IMenubarStatus, IMenubarList, ISetting, IToken } from '/@/type/store/layout'
import { ActionContext } from 'vuex'
import router from '/@/router/index'
import { allowRouter } from '/@/router/index'

import { setLocal, useLocal, getLocal } from '/@/utils/index'
import admins from '/@/router/admin/index'

const setting = getLocal<ISetting>('setting')
const token = getLocal<IToken>('token')
// 前端检查token是否失效
useLocal('token')
  .then((d) => (token.ACCESS_TOKEN = d.ACCESS_TOKEN))
  .catch(() => mutations.logout(state))

const state: ILayout = {
  menubar: {
    status: document.body.offsetWidth < 768 ? IMenubarStatus.PHN : IMenubarStatus.PCE,
    menuList: [],
    isPhone: document.body.offsetWidth < 768,
    redPoint: {
      isShowDocument: false,
      isShowPlaylist: false
    }
  },
  // 用户信息
  userInfo: {
    accountNo: '',
    bindPhone: ''
    // role: []
  },
  // 标签栏
  tags: {
    tagsList: [],
    cachedViews: []
  },
  token: {
    ACCESS_TOKEN: token.ACCESS_TOKEN || ''
  },
  setting: {
    theme: 0,
    showTags: false
  },
  isLoading: false
}
const mutations = {
  changeCollapsed(state: ILayout): void {
    if (state.menubar.isPhone) {
      state.menubar.status = state.menubar.status === IMenubarStatus.PHN ? IMenubarStatus.PHE : IMenubarStatus.PHN
    } else {
      state.menubar.status = state.menubar.status === IMenubarStatus.PCN ? IMenubarStatus.PCE : IMenubarStatus.PCN
    }
  },
  changeDeviceWidth(state: ILayout): void {
    if (document.body.offsetWidth < 768) {
      state.menubar.isPhone = true
      state.menubar.status = IMenubarStatus.PHN
    } else {
      state.menubar.isPhone = false
      state.menubar.status = IMenubarStatus.PCE
    }
  },
  login(state: ILayout, token = ''): void {
    state.token.ACCESS_TOKEN = token
    setLocal('token', state.token)
    const { query } = router.currentRoute.value
    router.push(typeof query.from === 'string' ? decodeURIComponent(decodeURIComponent(query.from)) : '/')
  },
  logout(state: ILayout): void {
    state.token.ACCESS_TOKEN = ''
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('setting')
    history.go(0)
  },
  setRoutes(state: ILayout, data: Array<IMenubarList>): void {
    //@ts-ignore 路由权限配置
    // const routes = getRoute(admins)
    state.menubar.menuList = admins
  },
  concatAllowRoutes(state: ILayout): void {
    //@ts-ignore
    allowRouter.reverse().forEach((v) => state.menubar.menuList.unshift(v))
  }
}
const actions = {
  async login(context: ActionContext<ILayout, IState>, param: loginParam): Promise<void> {
    // const res = await login(param)
    // const { token, nickName } = res.data.data
    const { token, nickName } = {
      token: 'sadads',
      nickName: '管理员'
    }
    // 权限配置
    // setLocal('role', auths)
    setLocal('userInfo', { nickName })
    context.commit('login', token)
  }
}
const layoutState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default layoutState
