import { reactive } from 'vue'

const Checks = (rule: { field: string }, value: string, callback: (arg0?: Error | undefined) => void) => {
  if (rule.field === 'name1') {
  }
  callback()
}

export const getDatas = () => {
  const options = reactive([
    {
      value: 0,
      label: '+39'
    },
    {
      value: 1,
      label: '+86'
    }
  ])
  const form = reactive({
    name1: '',
    name2: '',
    name3: '',
    name4: 0
  }) as IObj

  const rules = {
    name1: [{ required: true, message: '请上传微信二维码' }],
    name2: [{ required: true, message: '请输入微信号' }],
    name3: [{ required: true, message: '请输入手机号' }]
  }

  const onFileChange = () => {}

  return { form, options, onFileChange, rules }
}
