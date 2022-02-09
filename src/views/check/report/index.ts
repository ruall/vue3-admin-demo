import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    tableData: [],
    columns: [
      { prop: 'name2', label: '发起用户' },
      { prop: 'name3', label: '举报原因', width: '300px' },
      { prop: 'name4', label: '被举报用户', width: '150px' },
      { prop: 'name5', label: '举报内容', width: '300px' },
      { prop: 'name6', label: '动态标题', width: '150px' },
      { prop: 'name7', label: '举报时间', width: '150px' },
      { slot: 'name8', label: '举报类型', width: '200px' },
      { slot: 'name9', label: '状态', width: '200px' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    loading: true,
    searchData: {
      dates: { label: '举报时间', val: '', type: 'timerange' },
      status: {
        label: '请选择类型',
        val: '',
        type: 'select',
        list: [
          {
            label: '动态',
            val: 0
          },
          {
            label: '用户',
            val: 1
          }
        ]
      },
      categories: {
        label: '请选择状态',
        val: '',
        type: 'select',
        list: [
          {
            label: '已处理',
            val: 0
          },
          {
            label: '未处理',
            val: 1
          }
        ]
      }
    }
  })
  const searchFun = () => {
    console.log('searchBtn')
  }

  const getList = () => {
    info.loading = true
    setTimeout(() => {
      info.tableData = [
        {
          name1: 1,
          name2: '用户名',
          name3: '🙅‍♂️不行不行不行',
          name4: '用户名',
          name5: '动态/回复内容动态/回复内容',
          name6: '动态标题动态标题',
          name7: '2022/1/22 13:18:45',
          name8: 0,
          name9: 0
        },
        {
          name1: 1,
          name2: '用户名',
          name3: '🙅‍♂️不行不行不行',
          name4: '用户名',
          name5: '动态/回复内容动态/回复内容',
          name6: '动态标题动态标题',
          name7: '2022/1/22 13:18:45',
          name8: 1,
          name9: 1
        }
      ]
      info.loading = false
      console.log(info.tableData)
    }, 3000)
  }
  const handleCurrentChange = (val: number) => {
    info.pageNo = val
    getList()
  }
  getList()
  return { info, searchFun, handleCurrentChange, getList }
}
