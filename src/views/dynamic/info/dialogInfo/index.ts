import { reactive } from 'vue'

const Checks = (rule: { field: string }, value: string, callback: (arg0?: Error | undefined) => void) => {
  if (rule.field === 'name1') {
  }
  callback()
}

export const getDatas = () => {
  const info = reactive({
    name1Options: [
      {
        label: '分类一',
        value: 0
      },
      {
        label: '分类二',
        value: 1
      },
      {
        label: '分类三',
        value: 2
      }
    ],
    name2Options: [
      {
        label: '北京',
        value: 0
      },
      {
        label: '上海',
        value: 1
      },
      {
        label: '广州',
        value: 2
      }
    ]
  })
  const form = reactive({
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    name5: '',
    name6: '0'
  }) as IObj

  const rules = {
    name1: [{ required: true, message: '请输入动态标题' }],
    name2: [{ required: true, message: '请选择动态详情' }],
    name3: [{ required: true, message: '请选择动态分类' }],
    name5: [{ required: true, message: '请选择发布城市' }]
  }

  const onFileChange1 = () => {}

  return { info, form, onFileChange1, rules }
}
