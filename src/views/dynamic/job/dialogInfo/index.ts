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
        label: '招聘',
        value: 0
      },
      {
        label: '求职',
        value: 1
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
    name1: [{ required: true, message: '请输入信息标题' }],
    name2: [{ required: true, message: '请选择信息详情' }],
    name3: [{ required: true, message: '请选择信息类型' }],
    name6: [{ required: true, message: '请选择发布城市' }],
    name7: [{ required: true, message: '请输入联系电话' }]
  }

  const onFileChange1 = () => {}

  return { info, form, onFileChange1, rules }
}
