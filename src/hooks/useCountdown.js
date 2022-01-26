import { ref } from 'vue'

/**
 * 开启一个数字的倒计时。
 * @param {number} countdown 需要倒数的时间
 * @param {function} callback 完成时调用的回调参数
 *
 * @returns {Ref<boolean>} isCounting 是否正在倒计时
 * @returns {Ref<boolean>} isClicked 是否已经被点击过一次
 * @returns {Ref<number>} time 现在倒计时的秒数
 * @returns {function} startCountdown 开始倒计时
 * @returns {function} reset 重置倒计时
 */
export default function (countdown = 60, callback = function () {}) {
  // 倒计时时间
  const time = ref(countdown)

  // 是否正在倒计时
  const isCounting = ref(false)

  // 是否已经被点击过
  const isClicked = ref(false)

  // 计数器
  const timer = ref(null)

  const fn = () => {
    if (time.value > 0) {
      time.value--
      timer.value = setTimeout(fn, 1000)
    } else {
      isCounting.value = false
      time.value = countdown

      callback()
    }
  }

  const startCountdown = () => {
    window.clearTimeout(timer.value)
    isCounting.value = true
    isClicked.value = true
    timer.value = setTimeout(fn, 1000)
  }

  const reset = () => {
    window.clearTimeout(timer.value)
    time.value = countdown
  }

  return {
    isCounting,
    isClicked,

    time,

    startCountdown,
    reset,
  }
}
