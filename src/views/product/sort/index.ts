import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    dialogInfo: {
      isVisible: false,
      formInfo: {
        name1: '',
        name2: 0
      },
      rules: {
        name1: [{ required: true, message: '请输入分类名称' }],
        name2: [{ required: true, message: '请选择状态' }]
      }
    },
    tableData: [],
    columns: [
      { slot: 'name1' },
      { prop: 'name2', label: '类型名称', width: '200px' },
      { prop: 'name3', label: '包含商品数量', width: '150px' },
      { slot: 'name5', label: '状态' },
      { prop: 'name4', label: '调整排序', width: '150px' },
      { slot: 'operate' }
    ],
    pageNo: 1,
    pageSize: 10,
    total: 10,
    page: {},
    loading: true
  })
  const searchFun = () => {
    console.log('searchBtn')
  }

  const getList = () => {
    info.loading = true
    setTimeout(() => {
      info.tableData = [
        {
          id: 0,
          name1: '1',
          name2: '一级分类名称',
          name3: '100',
          name4: '显示',
          showSort: true,
          children: [
            {
              id: 11,
              name1: '1-1',
              name2: '二级分类名称',
              name3: '100',
              name4: '显示',
              children: [
                {
                  id: 111,
                  name1: '1-1-1',
                  name2: '三级分类名称',
                  name3: '100',
                  name4: '显示'
                }
              ]
            },
            {
              id: 12,
              name1: '1-2',
              name2: '二级分类名称',
              name3: '100',
              name4: '显示'
            }
          ]
        },
        {
          id: 1,
          name1: '2',
          name2: '一级分类名称',
          name3: '100',
          name4: '显示',
          showSort: true
        },
        {
          id: 2,
          name1: '3',
          name2: '一级分类名称',
          name3: '100',
          name4: '显示',
          showSort: true
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
  return { info, searchFun, handleCurrentChange }
}
