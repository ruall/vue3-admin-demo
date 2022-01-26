<template>
  <el-card>
    <div class="my-info-class">
      <div class="h-class">{{ $t('ding-dan') }}{{ pType(info.status) }}</div>
      <div class="h-info">{{ $t('dnajdnjka') }}</div>
      <div class="h-list">
        <ul>
          <li>
            <span>{{ $t('zu-jie-shi-chang') }}：</span>
            <span>{{ info.lentDuration }}</span>
          </li>
          <li>
            <span>{{ $t('ding-dan-jin-e') }}：</span>
            <span>€ {{ info.totalAmount }}</span>
          </li>
          <li>
            <span>{{ $t('ding-dan-bian-hao') }}：</span>
            <span>{{ info.orderNo }}</span>
          </li>
          <li>
            <span>{{ $t('zu-jie-shi-jian') }}</span>
            <span>{{ time(new Date(info.createTime)) }}</span>
          </li>
          <li>
            <span>{{ $t('zu-jie-di-dian') }}</span>
            <span>{{ info.merchantName }}</span>
          </li>
          <li>
            <span>{{ $t('gui-huan-shi-jian') }}</span>
            <span>{{ time(new Date(info.returnTime)) }}</span>
          </li>
          <li>
            <span>{{ $t('gui-huan-di-dian') }}</span>
            <span>{{ info.returnMerchantName }}</span>
          </li>
          <li v-if="info.payTime">
            <span>{{ $t('zhi-fu-shi-jian') }}</span>
            <span>{{ time(new Date(info.payTime)) }}</span>
          </li>
          <li v-if="info.payTime">
            <span>{{ $t('zhi-fu-fang-shi') }}</span>
            <span>
              {{ info.payType === 0 ? `${$t('yu-e')}` : info.payType === 1 ? 'PayPal' : `${$t('kou-chu-ya-jin')}` }}
            </span>
          </li>
          <li v-show="info.transNo">
            <span>{{ $t('jiao-yi-hao') }}</span>
            <span>{{ info.transNo }}</span>
          </li>
          <li>
            <span>{{ $t('shang-jia-shou-ru') }}</span>
            <span>€ {{ info.merchantCommission }}</span>
          </li>
        </ul>
      </div>
      <div v-if="info.manualSettleTime">
        <div class="h-info">{{ $t('shou-dong-jie-suan-xin-xi') }}</div>
        <div class="h-list">
          <ul>
            <li>
              <span>{{ $t('yuan-ding-dan-jin-e') }}：</span>
              <span>€ {{ info.totalAmount }}</span>
            </li>
            <li>
              <span>{{ $t('jie-suan-jin-e') }}：</span>
              <span>€ {{ info.manualSettleAmount }}</span>
            </li>
            <li>
              <span>{{ $t('shou-dong-jie-suan-li-you') }}：</span>
              <span>{{ info.manualSettleReason }}</span>
            </li>
            <li>
              <span>{{ $t('chu-li-shi-jian') }}：</span>
              <span>{{ time(new Date(info.manualSettleTime)) }}</span>
            </li>
            <li>
              <span>{{ $t('chu-li-ren') }}：</span>
              <span>{{ info.manualHandler }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="info.refundTime">
        <div class="h-info">{{ $t('tui-kuan-xin-xi') }}</div>
        <div class="h-list">
          <ul>
            <li>
              <span>{{ $t('tui-kuan-jin-e') }}：</span>
              <span>€ {{ info.refundAmount }}</span>
            </li>
            <li>
              <span>{{ $t('tui-kuan-li-you') }}：</span>
              <span>{{ info.refundReason }}</span>
            </li>
            <li>
              <span>{{ $t('chu-li-shi-jian') }}：</span>
              <span>{{ time(new Date(info.refundTime)) }}</span>
            </li>
            <li>
              <span>{{ $t('chu-li-ren') }}：</span>
              <span>{{ info.refundHandler }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { getInfo } from '/@/api/admin/order'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const id = route.query.id || ''
    const orderDetail = reactive({
      info: {}
    })
    let timer = null
    const getOrderInfo = async () => {
      const res = await getInfo({ orderId: id })
      if (res.data.code === 0) {
        orderDetail.info = res.data.data
      }
    }
    const pType = (val) => {
      switch (val) {
        case 0:
          return t('zu-jie-zhong')
        case 1:
          return t('dai-zhi-fu')
        case 2:
          return t('yi-wan-cheng')
        case 3:
          return t('yi-yu-qi')
        case 4:
          return t('tui-kuan-zhong')
        case 5:
          return t('yi-tui-kuan')
        case 6:
          return t('yi-kou-ya-jin')
      }
    }
    const time = (date) => {
      return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
    }
    onMounted(() => {
      getOrderInfo()
      timer = setInterval(() => {
        getOrderInfo()
      }, 1000 * 60)
    })
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null
    })
    return {
      ...toRefs(orderDetail),
      pType,
      time
    }
  }
})
</script>
<style lang="postcss" scoped>
.my-info-class {
  width: 500px;
  padding: 10px 20px;
  .h-class {
    font-size: 24px;
    font-weight: bold;
    line-height: 50px;
  }
  .h-info {
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    padding-top: 20px;
  }
  .h-list {
    font-size: 14px;
    line-height: 30px;
    ul {
      font-style: normal;
      li {
        display: flex;
        justify-content: space-between;
        width: 100%;
        span {
          &:first-of-type {
            text-align: left;
            color: #333;
          }
          &:last-of-type {
            text-align: right;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
