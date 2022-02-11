import { reactive } from 'vue'

export const getDatas = () => {
  const info: IObj = reactive({
    class: [
      {
        id: 0,
        name: ''
      },
      {
        id: 1,
        name: ''
      },
      {
        id: 2,
        name: ''
      },
      {
        id: 3,
        name: ''
      },
      {
        id: 4,
        name: ''
      }
    ],
    merchandiseDialog: {
      isVisible: false
    },
    merchandiseListDialog: {
      isVisible: false,
      tableData: [],
      columns: [
        { prop: 'name2', label: 'ID' },
        { prop: 'name3', label: '商品标题' },
        { prop: 'name4', label: '商品封面' },
        { prop: 'name5', label: '类目' },
        { prop: 'name6', label: '创建时间', width: '150px' },
        { slot: 'operate' }
      ],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      page: {},
      loading: true,
      searchData: {
        status: {
          label: '请选择商品分类',
          val: '',
          type: 'select',
          list: [
            {
              label: '1',
              val: 0
            },
            {
              label: '2',
              val: 1
            }
          ]
        },
        input: { label: '商品标题', val: '', showIcon: 'el-icon-search' }
      }
    }
  })

  const getList = () => {
    info.merchandiseListDialog.loading = true
    setTimeout(() => {
      info.merchandiseListDialog.tableData = [
        {
          name1: 1,
          name2: '0000001',
          name3: '商品标题',
          name4: 'http',
          name5: '类目名称',
          name6: '2022/2/13 19:49:45',
          name7: 0
        },
        {
          name1: 1,
          name2: '0000001',
          name3: '商品标题',
          name4: 'http',
          name5: '类目名称',
          name6: '2022/2/13 19:49:45',
          name7: 1
        }
      ]
      info.merchandiseListDialog.loading = false
      console.log(info.merchandiseListDialog.tableData)
    }, 3000)
  }
  const handleCurrentChange = (val: number) => {
    info.merchandiseListDialog.pageNo = val
    getList()
  }
  const searchFun = () => {
    console.log('searchBtn')
  }
  getList()
  return { info, getList, handleCurrentChange, searchFun }
}
