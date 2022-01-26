import { ILocalStore } from '/@/type/utils/tools'
import { IMenubarList, IMRouteList, IMRoleList } from '/@/type/store/layout'

/**
 * 睡眠函数
 * @param time
 */
export async function sleep(time: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(() => resolve, time)
  })
}
/**
 * 金额格式化
 * @param num 金额
 * @param symbol 金额前面修饰符号，如$,￥
 */
export function format(num: number | string, symbol = '￥'): string {
  if (Number.isNaN(Number(num))) return `${symbol}0.00`
  return (
    symbol +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  )
}
/**
 * 取消金额格式化
 * @param str 金额
 */
export function unformat(str: string): number | string {
  const s = str.substr(1).replace(/\,/g, '')
  return Number.isNaN(Number(s)) || Number(s) === 0 ? '' : Number(s)
}
/**
 * 表格合计行
 * @param str 金额
 */
export function tableSummaries(param: {
  columns: any
  data: any
}): Array<string | number> {
  const { columns, data } = param
  const sums: Array<string | number> = []
  columns.forEach((column: { property: string | number }, index: number) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map((item: { [x: string]: any }) =>
      Number(item[column.property])
    )
    if (!values.every((value: number) => isNaN(value))) {
      sums[index] = values.reduce((prev: number, curr: number) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      const sum = sums[index]
      if (typeof sum === 'number') {
        sums[index] = format(sum.toFixed(2))
      }
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

export function isInput(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'input'
}
export function isTextarea(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'textarea'
}

/**
 * localStorage设置有效期
 * @param name localStorage设置名称
 * @param data 数据对象
 * @param pExpires 有效期(默认100年)
 */
export function setLocal(
  name: string,
  data: IObject<any>,
  pExpires = 1000 * 60 * 60 * 24 * 365 * 0.001
): void {
  const d = data as ILocalStore
  d.startTime = Date.now()
  d.expires = pExpires
  localStorage.setItem(name, JSON.stringify(data))
}
/**
 * 判断localStorage有效期是否失效
 * @param name localStorage设置名称
 */
export async function useLocal(name: string): Promise<ILocalStore> {
  return new Promise((resolve, reject) => {
    const local = getLocal<ILocalStore>(name)
    if (local.startTime + local.expires < Date.now())
      reject(`${name}已超过有效期`)
    resolve(local)
  })
}
/**
 * 获取localStorage对象并转成对应的类型
 * @param name localStorage设置名称
 */
export function getLocal<T>(name: string): T {
  const l = localStorage.getItem(name)
  if (l !== null) {
    return JSON.parse(l)
  } else {
    return {} as T
  }
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500): () => Promise<void> {
  let timer: NodeJS.Timeout | null = null
  let firstTime = true
  return () => {
    return new Promise((resolve) => {
      if (firstTime) {
        resolve()
        return (firstTime = false)
      }
      if (timer) return false
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        timer = null
        resolve()
      }, time)
    })
  }
}

/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */
export function listToTree(
  data: Array<IMenubarList>,
  pid: string | number = 1,
  isChildNull = false
): Array<IMenubarList> {
  const d: Array<IMenubarList> = []
  data.forEach((val) => {
    if (val.parentId == pid) {
      const list = listToTree(data, val.id, isChildNull)
      const obj: IMenubarList = { ...val }
      if (!isChildNull || list.length !== 0) {
        obj.children = list
      }
      d.push(obj)
    }
  })
  return d
}

//判断是否有权限访问该菜单
function hasPermission(menus: any, route: any) {
  if (route.name) {
    let currMenu = getMenu(route, menus)
    if (currMenu != null) {
      return true
    } else {
      if (route.meta.hidden !== undefined && route.meta.hidden === true) {
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}

//根据路由名称获取菜单
function getMenu(route: any, menus: any) {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i]
    if (route.permCode === menu.permCode) {
      return menu
    } else if (route.children && route.children.length > 0) {
      for (let j = 0; j < route.children.length; j++) {
        if (menu.permCode === route.children[j].permCode) {
          return route.children[j]
        }
      }
    }
  }
  return null
}

export function getRoute(routes: Array<IMRouteList>) {
  const role: Array<IMRoleList> = getLocal('role')
  const accessedRouters = routes.filter((v) => {
    if (v.meta.title === '工作台' && v.path === '/index') {
      return v
    } else {
      if (hasPermission(role, v)) {
        if (v.children && v.children.length > 0) {
          v.children = v.children.filter((child) => {
            if (hasPermission(role, child)) {
              return child
            }
            return false
          })
          return v
        } else {
          return v
        }
      }
    }
  })
  return accessedRouters
}
