import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false,
      rules: {
        name2: [{ required: true, message: '请输入分类名称' }],
        name3: [{ required: true, message: '请选择状态' }]
      },
      ruleForm: {
        name1: '',
        name2: '',
        name3: '0'
      }
    },
    tableData: [],
    columns: [
      { prop: 'name1', label: '排序' },
      { prop: 'name2', label: '城市名称' },
      { prop: 'name3', label: '创建时间', width: '200px' },
      { prop: 'name4', label: '状态' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true
  })

  const getList = () => {
    info.loading = true
    setTimeout(() => {
      info.tableData = [
        {
          name1: 1,
          name2: '普拉多',
          name3: '2019/01/01 00:00:00',
          name4: '显示'
        },
        {
          name1: 9999,
          name2: '罗马',
          name3: '2019/01/01 00:00:00',
          name4: '隐藏'
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
  return { info, handleCurrentChange, getList }
}
