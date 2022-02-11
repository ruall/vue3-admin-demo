import { App, DirectiveBinding } from 'vue'

export default (app: App<Element>): void => {
  app.directive('input-number', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // 获取 input 输入框
      const input = (el: HTMLElement) => (el instanceof HTMLInputElement ? el : el.querySelector('input'))

      const vm = input(el) as IObj

      if (!vm) return

      let content

      // 设置输入框的值,触发input事件,改变v-model绑定的值
      const setVal = (val: string) => {
        vm.value = val
        vm.dispatchEvent(new Event('input'))
      }

      // 按键按下=>只允许输入 数字/小数点/减号
      el.addEventListener('keypress', (event) => {
        const e = event || window.event
        const inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
        // const re = /\d|.|-/
        const re = /[0-9\.]/
        content = (e.target as IObj).value

        // 定义方法,阻止输入
        function preventInput() {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        }
        if (!re.test(inputKey) && !e.ctrlKey) {
          preventInput()
        } else if (content.indexOf('.') > 0 && inputKey === '.') {
          // 已有小数点,再次输入小数点
          preventInput()
        }
      })

      // // 按键弹起=>并限制最大最小
      el.addEventListener('keyup', (event) => {
        const e = event || window.event
        content = parseFloat((e.target as IObj).value)
        if (!content) content = 0

        let arg_max = binding?.value?.max || undefined
        let arg_min = binding?.value?.min || undefined

        if (arg_max !== undefined && content > arg_max) {
          setVal(arg_max)
          content = arg_max
        }
        if (arg_min !== undefined && content < arg_min) {
          setVal(arg_min)
          content = arg_min
        }
      })

      // 失去焦点=>保留指定位小数
      el.addEventListener('focusout', (event) => {
        // 此处会在 el-input 的 @change 后执行
        content = parseFloat(vm.value)

        if (!content) content = 0

        // 保留 多少位 小数， 如果没值则默认保留整数
        let arg_precision = binding.value?.precision ? parseInt(binding.value.precision) : 0

        // 如果输入数小于保留位数，则值不变
        vm.value = content.toString().split('.')[1]?.length < arg_precision ? content : content.toFixed(arg_precision)

        setVal(vm.value)
      })
    }
  })
}
