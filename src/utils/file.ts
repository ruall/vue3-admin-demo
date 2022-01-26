import axios from 'axios'
import { store } from '/@/store/index'
/**
 * 文件预览
 * @param url
 */
export function preview(url: string) {
  if (!/\.(pdf|PDF)$/.test(url)) {
    window.open(
      `https://view.officeapps.live.com/op/view.aspx?src=${url}`,
      '_blank'
    )
  } else {
    window.open(url, '_blank')
  }
}
/**
 * 文件下载
 * @param url
 * @param name
 */
export function download(url: string, name: string) {
  axios
    .get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      let type = ''
      if (!/\.(pdf|PDF)$/.test(url)) {
        type = 'application/msword'
      } else if (/\.(xla|xlc|xlm|xls|xlt|xlw)$/.test(url)) {
        type = 'application/vnd.ms-excel'
      } else {
        type = 'application/pdf'
      }

      const urlObject = window.URL.createObjectURL(
        new Blob([res.data], { type })
      )
      const fname = name // 下载文件的名字
      const link = document.createElement('a')
      link.href = urlObject
      link.setAttribute('download', fname)
      document.body.appendChild(link)
      link.click()
    })
}

export function fileExt(filename: string) {
  return filename.substring(filename.lastIndexOf('.') + 1)
}

/**
 * 导出Excel
 * @param url api
 * @param params  参数
 * @param fileName 导出文件名称
 */
export function exportExcel(url: string, params: Object, fileName: string) {
  const fileState = {
    headers: {
      Authorization: 'bearer ' + store.state.layout.token.ACCESS_TOKEN,
    },
  }
  axios
    .get(import.meta.env.VITE_BASE_API + `${url}`, {
      params: { ...params },
      responseType: 'blob',
      headers: fileState.headers,
    })
    .then((res) => {
      const urlObject = window.URL.createObjectURL(
        new Blob([res.data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      )
      const link = document.createElement('a')
      link.href = urlObject
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    })
}
