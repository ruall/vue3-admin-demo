import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    tableData: [],
    columns: [{ prop: 'name2', label: '帮助类型' }, { prop: 'name3', label: '更新时间' }, { slot: 'operate' }],
    loading: true,
    editDialog: {
      isVisible: false,
      content: '',
      title: ''
    }
  })

  const getList = () => {
    info.loading = true
    setTimeout(() => {
      info.tableData = [
        {
          name1: 0,
          name2: '商品信息',
          name3: '2021-1-18 09:58:06'
        },
        {
          name1: 1,
          name2: '求购',
          name3: '2021-1-18 09:58:06'
        },
        {
          name1: 2,
          name2: '动态',
          name3: '2021-1-18 09:58:06'
        },
        {
          name1: 3,
          name2: '求职招聘',
          name3: '2021-1-18 09:58:06'
        },
        {
          name1: 4,
          name2: '填写帮助',
          name3: '2021-1-18 09:58:06'
        },
        {
          name1: 5,
          name2: '关于我们',
          name3: '2021-1-18 09:58:06'
        }
      ]
      info.loading = false
      console.log(info.tableData)
    }, 3000)
  }
  getList()
  return { info, getList }
}
