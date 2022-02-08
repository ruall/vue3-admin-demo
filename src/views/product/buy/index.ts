import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false
    },
    tableData: [],
    columns: [
      { prop: 'name1', label: 'ID', width: '100px' },
      { prop: 'name2', label: '商品标题', width: '200px' },
      { prop: 'name3', label: '商品封面', width: '150px' },
      { prop: 'name4', label: '类目', width: '200px' },
      { prop: 'name5', label: '价格', width: '200px' },
      { prop: 'name6', label: '数量', width: '150px' },
      { prop: 'name7', label: '发布人', width: '150px' },
      { prop: 'name9', label: '创建时间', width: '200px' },
      { prop: 'name10', label: '状态', width: '200px' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      dates: { label: '入驻时间', val: '', type: 'timerange' },
      input: { label: '搜索商品名称/发布人', val: '', showIcon: 'el-icon-search' },
      status: {
        label: '请选择商品属性',
        val: '',
        type: 'select',
        list: [
          {
            label: '置顶中',
            val: 0
          },
          {
            label: '热门中',
            val: 1
          }
        ]
      },
      categories: {
        label: '请选择商品状态',
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
          name2: '商品标题',
          name3: 'http',
          name4: '类目',
          name5: '€ 2000',
          name6: '200件',
          name7: '企业管发布人理员名称',
          name9: '2019/01/01 00:00:00',
          name10: '已发布'
        },
        {
          name1: '0002',
          name2: '商品标题',
          name3: 'http',
          name4: '类目',
          name5: '€ 2000',
          name6: '200件',
          name7: '企业管发布人理员名称',
          name9: '2019/01/01 00:00:00',
          name10: '已发布'
        },
        {
          name1: '0003',
          name2: '商品标题',
          name3: 'http',
          name4: '类目',
          name5: '€ 2000',
          name6: '200件',
          name7: '企业管发布人理员名称',
          name9: '2019/01/01 00:00:00',
          name10: '已删除'
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
