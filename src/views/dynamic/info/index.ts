import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false
    },
    tableData: [],
    columns: [
      { prop: 'name1', label: 'ID', width: '100px' },
      { prop: 'name2', label: '动态标题', width: '200px' },
      { prop: 'name3', label: '动态封面', width: '150px' },
      { prop: 'name4', label: '分类', width: '200px' },
      { prop: 'name5', label: '发布人', width: '200px' },
      { prop: 'name6', label: '创建时间', width: '150px' },
      { prop: 'name7', label: '状态', width: '150px' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      dates: { label: '入驻时间', val: '', type: 'timerange' },
      input: { label: '动态标题/发布人', val: '', showSearchIcon: true },
      sorts: {
        label: '请选择动态分类',
        val: '',
        type: 'select',
        list: [
          {
            label: '分类一',
            val: 0
          },
          {
            label: '分类二',
            val: 1
          }
        ]
      },
      categories: {
        label: '请选择动态属性',
        val: '',
        type: 'select',
        list: [
          {
            label: '置顶中',
            val: 0
          }
        ]
      },
      state: {
        label: '请选择动态状态',
        val: '',
        type: 'select',
        list: [
          {
            label: '已发布',
            val: 0
          },
          {
            label: '已删除',
            val: 1
          }
        ]
      }
    },
    top: {
      isVisible: false,
      time: 0,
      inputTxt: ''
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
          name1: '0001',
          name2: '动态标题',
          name3: 'http',
          name4: '分类名称',
          name5: '发布人',
          name6: '2019/01/01 00:00:00',
          name7: '已发布',
          name8: 0
        },
        {
          name1: '0002',
          name2: '动态标题',
          name3: 'http',
          name4: '分类名称',
          name5: '发布人',
          name6: '2019/01/01 00:00:00',
          name7: '已删除',
          name8: 1
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
