import { reactive } from 'vue'

const Checks = (rule: { field: string }, value: string, callback: (arg0?: Error | undefined) => void) => {
  if (rule.field === 'name1') {
  }
  callback()
}

export const getDatas = () => {
  const info = reactive({
    name3Options: [
      {
        label: '类型1',
        value: 0
      },
      {
        label: '类型2',
        value: 1
      },
      {
        label: '类型3',
        value: 2
      }
    ],
    name4Options: [
      {
        value: '0',
        label: '一级类目',
        children: [
          {
            value: '01',
            label: '二级类目01',
            children: [
              {
                value: '011',
                label: '三级类目011'
              },
              {
                value: '012',
                label: '三级类目012'
              },
              {
                value: '013',
                label: '三级类目013'
              }
            ]
          },
          {
            value: '02',
            label: '二级类目02',
            children: [
              {
                value: '021',
                label: '三级类目021'
              },
              {
                value: '022',
                label: '三级类目022'
              },
              {
                value: '023',
                label: '三级类目023'
              }
            ]
          }
        ]
      },
      {
        value: '1',
        label: '一级类目1',
        children: [
          {
            value: '11',
            label: '二级类目11',
            children: [
              {
                value: '111',
                label: '三级类目111'
              },
              {
                value: '112',
                label: '三级类目112'
              },
              {
                value: '113',
                label: '三级类目113'
              }
            ]
          },
          {
            value: '12',
            label: '二级类目12',
            children: [
              {
                value: '121',
                label: '三级类目121'
              },
              {
                value: '122',
                label: '三级类目122'
              },
              {
                value: '123',
                label: '三级类目123'
              }
            ]
          }
        ]
      },
      {
        value: '2',
        label: '一级类目2',
        children: [
          {
            value: '21',
            label: '二级类目21',
            children: [
              {
                value: '211',
                label: '三级类目211'
              },
              {
                value: '212',
                label: '三级类目212'
              },
              {
                value: '213',
                label: '三级类目213'
              }
            ]
          },
          {
            value: '22',
            label: '二级类目222',
            children: [
              {
                value: '221',
                label: '三级类目221'
              },
              {
                value: '222',
                label: '三级类目222'
              },
              {
                value: '223',
                label: '三级类目223'
              }
            ]
          }
        ]
      }
    ],
    name5Options: [
      {
        label: '类型1',
        value: 0
      },
      {
        label: '类型2',
        value: 1
      },
      {
        label: '类型3',
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
    name6: '',
    name7: '',
    name8: '',
    name9: '',
    name10: ''
  }) as IObj
  const cascaderProps = {
    multiple: true,
    checkStrictly: true,
    emitPath: false
  }

  const rules = {
    name1: [{ required: true, message: '请输入企业名称' }],
    name3: [{ required: true, message: '请选择企业类型' }]
  }

  const onFileChange1 = () => {}

  return { info, form, cascaderProps, onFileChange1, rules }
}
