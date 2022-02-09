import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false
    },
    tableData: [],
    columns: [
      { prop: 'name2', label: '企业名称', width: '200px' },
      { prop: 'name3', label: '企业logo', width: '150px' },
      { slot: 'name4' },
      { prop: 'name5', label: '主营类目', width: '200px' },
      { prop: 'name6', label: '企业所在城市', width: '150px' },
      { prop: 'name7', label: '申请人', width: '150px' },
      { prop: 'name8', label: '申请时间', width: '200px' },
      { prop: 'name9', label: '联系电话', width: '200px' },
      { slot: 'name10', label: '信息类型', width: '200px' },
      { slot: 'name11' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true,
    searchData: {
      dates: { label: '申请时间', val: '', type: 'timerange' },
      status: {
        label: '请选择状态',
        val: '',
        type: 'select',
        list: [
          {
            label: '已通过',
            val: 0
          },
          {
            label: '已驳回',
            val: 1
          }
        ]
      },
      categories: {
        label: '请选择信息类型',
        val: '',
        type: 'select',
        list: [
          {
            label: '申请入驻',
            val: 0
          },
          {
            label: '申请修改',
            val: 1
          }
        ]
      }
    },
    reportDialog: {
      isVisible: false,
      txt: ''
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
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 0,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '用户名',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 0,
          name11: 0
        },
        {
          name1: 2,
          name2: 'xxx股份有限公司',
          name3: 'http',
          name4: 1,
          name5: '类目一 类目二 类目三',
          name6: '城市名称',
          name7: '用户名',
          name8: '2022/2/13 19:49',
          name9: '0039 18641930459',
          name10: 1,
          name11: 1
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
