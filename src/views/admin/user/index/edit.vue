<template>
  <div>
    <el-card>
      <div class="my-userInfo-class">
        <div class="title">{{ $t('ji-ben-xin-xi') }}</div>
        <div class="content">
          <div class="img"><img :src="info.avatar" alt="" /></div>
          <div class="detail">
            <dl>
              <dd class="w-20">
                <span>{{ $t('yong-hu-id') }}：{{ info.uId }}</span>
              </dd>
              <dd class="w-40">
                <span>{{ $t('you-xiang') }}：{{ info.email }}</span>
              </dd>
              <dd class="w-40">
                <span>{{ $t('zhu-ce-zhang-hao') }}：{{ registerInfo(info) }}</span>
              </dd>
              <dd class="w-60">
                <span>{{ $t('zhu-ce-shi-jian') }}：{{ time(new Date(info.createTime)) }}</span>
              </dd>
              <dd class="w-40">
                <span>{{ $t('massa') }}：{{ info.cardNum }}</span>
              </dd>
            </dl>
          </div>
        </div>
        <div class="title">{{ id }}{{ $t('ding-dan-qing-kuang') }}</div>
        <div class="content">
          <ul>
            <li>
              <span>{{ $t('zu-jie-ci-shu') }}：{{ info.lentTime }}</span>
            </li>
            <li>
              <span>{{ $t('lei-ji-xiao-fei') }}：{{ info.totalConsumer ? '€ ' : '' }} {{ info.totalConsumer }}</span>
            </li>
            <li>
              <span>{{ $t('yu-qi-ci-shu') }}：{{ info.expireOrderNum }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getInfo } from '/@/api/admin/user'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const route = useRoute()
    const { t } = useI18n()
    const id = route.query.id || ''
    let userDetail = reactive({
      info: {}
    })
    const getUserInfo = async () => {
      const res = await getInfo({ userId: id })
      if (res.data.code === 0) {
        userDetail.info = res.data.data
      }
    }
    const time = (date) => {
      return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
    }
    const registerInfo = (val) => {
      return val.sourceType === 0
        ? `${t('shou-ji-hao')}\n${val.loginNo}`
        : val.sourceType === 1
        ? `${t('you-xiang')}\n${val.loginNo}`
        : val.sourceType === 2
        ? `apple ID\n${val.loginNo}`
        : `facebook\n${val.loginNo}`
    }
    onMounted(() => {
      getUserInfo()
    })
    return {
      ...toRefs(userDetail),
      registerInfo,
      time
    }
  }
})
</script>
<style lang="scss" scoped>
.my-userInfo-class {
  width: 100%;
  padding: 10px 20px;
  .title {
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
    padding: 15px 0;
  }
  .content {
    padding: 0;
    img {
      width: 60px;
      height: 60px;
      margin: 20px 0;
      border-radius: 50%;
      float: left;
    }
    .detail {
      width: calc(100% - 80px);
      height: 100px;
      margin-left: 20px;
      float: left;
      dl {
        padding: 10px 0;
        dd {
          width: 33.33%;
          float: left;
          line-height: 40px;
          color: #666;
          &.w-20 {
            width: 20%;
          }
          &.w-40 {
            width: 40%;
          }
          &.w-60 {
            width: 60%;
          }
        }
      }
    }
    ul {
      li {
        line-height: 40px;
        color: #666;
      }
    }
  }
}
</style>
