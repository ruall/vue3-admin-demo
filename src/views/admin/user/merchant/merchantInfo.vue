<template>
  <el-card>
    <div class="my-merchant-class">
      <div class="title">{{ $t('ji-ben-xin-xi') }}</div>
      <div class="my-main">
        <div class="logo"><img :src="info.logoUrl" alt="" /></div>
        <div class="info">
          <ul>
            <li>
              <span>{{ $t('shou-ji-hao') }}：{{ info.phoneNo }}</span>
              <span v-show="info.promotionCode">{{ $t('tui-guang-ma') }}：{{ info.promotionCode }}</span>
            </li>
            <li>
              <span>{{ $t('qwex') }}：{{ info.corpName }}</span>
              <span>{{ $t('dmna') }}：{{ info.corpDesc }}</span>
            </li>
            <li>
              <span>{{ $t('shang-jia-ming-cheng') }}：{{ info.merchantName }}</span>
              <span>{{ $t('mdkam') }}：{{ info.linkman }}</span>
            </li>
            <li>
              <span>{{ $t('ybfs') }}：{{ info.email }}</span>
            </li>
            <li>
              <span>PayPal{{ $t('njasda') }}：{{ info.accountPayee }}</span>
            </li>
            <li>
              <span>{{ $t('asdd') }}：{{ info.bizTime }}</span>
            </li>
            <li>
              <span>{{ $t('shui-hao') }}：{{ info.taxId }}</span>
              <span>{{ $t('lmhs') }}：{{ info.greenCardNo }}</span>
            </li>
            <li>
              <span>{{ $t('asegh') }}：{{ info.invoiceCode }}</span>
              <span>{{ $t('vdca') }}：{{ info.pecEmail }}</span>
            </li>
            <li>
              <span>{{ $t('ubsaa') }}：{{ info.longitude }}</span>
              <span>{{ $t('dbahb') }}：{{ info.latitude }}</span>
            </li>
            <li>
              <span>{{ $t('pbsab') }}：{{ info.address }}</span>
            </li>
            <li>
              <span class="fl">{{ $t('tvbha') }}：</span>
              <span class="my-img"><img :src="info.images" alt="" /></span>
            </li>
            <li>
              <span class="fl">{{ $t('he-tong-wen-jian') }}：</span>
              <span class="color-m" v-if="info.contractUrl">
                <a :href="info.contractUrl">{{ $t('dian-zi-he-tong') }}.pdf</a>
              </span>
              <span v-else>{{ $t('wei-shang-chuan') }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="title mt-20 mb-20">{{ $t('weqcs') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>{{ $t('mdka') }}：€ {{ info.totalAmount }}</span>
          </li>
          <li>
            <span>{{ $t('nkla') }}：{{ info.orderNum }}</span>
          </li>
        </ul>
      </div>
      <div class="title mt-20 mb-20">{{ $t('cdfa') }}</div>
      <div class="eList">
        <ul>
          <li v-for="(item, index) in info.deviceVos" :key="index">
            <span>{{ $t('cdasa') }}{{ index + 1 }}:</span>
            <span>{{ $t('nausa') }}：{{ item.pileNo }}</span>
            <span>{{ $t('chong-dian-zhuang-gui-ge') }}：{{ item.scope }}口</span>
          </li>
        </ul>
      </div>
      <div class="btn">
        <el-button type="primary" @click="toEdit">{{ $t('bian-ji') }}</el-button>
        <el-button type="primary" @click="changePwdFn">{{ $t('xiu-gai-mi-ma') }}</el-button>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="$t('xiu-gai-mi-ma')"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="ruleForms" :model="ruleForm" label-position="top" label-width="120px">
        <el-form-item :label="$t('bybaa')">
          <el-input v-model="ruleForm.pass" type="password" :placeholder="$t('dyasbda')" ref="pwdRef"></el-input>
        </el-form-item>
        <el-form-item :label="$t('ecas')">
          <el-input v-model="ruleForm.checkPass" type="password" ref="checkPwdRef"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{ $t('que-ding') }}</el-button>
          <el-button @click="resetForm">{{ $t('qu-xiao') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getInfo, changePwd } from '/@/api/admin/merchant'
import dayjs from 'dayjs'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const checkPwdRef = ref(null)
    const dialog = reactive({
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: ''
      }
    })
    const id = route.query.id || ''
    let merchantDetail = reactive({
      info: {}
    })
    const getDetail = async () => {
      const res = await getInfo({ merchantId: id })
      if (res.data.code === 0) {
        merchantDetail.info = res.data.data
      }
    }
    const time = (date) => {
      return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
    }
    const toEdit = () => {
      router.push({ name: 'MerchantEdit', query: { id: id } })
    }
    const changePwdFn = () => {
      dialog.dialogVisible = true
    }
    const submitForm = async () => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
      if (dialog.ruleForm.pass && reg.test(dialog.ruleForm.pass)) {
        if (dialog.ruleForm.pass !== dialog.ruleForm.checkPass) {
          if (!dialog.ruleForm.checkPass) {
            ElMessage({
              message: t('qing-zai-ci-shu-ru-mi-ma'),
              type: 'warning'
            })
            checkPwdRef.value.focus()
          } else {
            ElMessage({
              message: t('qwcaa'),
              type: 'warning'
            })
          }
        } else {
          const res = await changePwd({
            merchantId: id,
            password: dialog.ruleForm.pass
          })
          if (res.data.code === 0) {
            dialog.dialogVisible = false
            ElMessage({
              message: t('qxaxa'),
              type: 'success'
            })
          }
        }
      } else {
        ElMessage({
          message: t('cvasd'),
          type: 'warning'
        })
      }
    }
    const resetForm = () => {
      dialog.dialogVisible = false
      dialog.ruleForm.pass = ''
      dialog.ruleForm.checkPass = ''
    }
    onMounted(() => {
      getDetail()
    })
    return {
      ...toRefs(dialog),
      ...toRefs(merchantDetail),
      changePwdFn,
      submitForm,
      resetForm,
      toEdit,
      getDetail,
      time,
      checkPwdRef
    }
  }
})
</script>

<style lang="scss" scoped>
.el-form-item__content {
  text-align: center;
}
.my-merchant-class {
  padding: 10px;
  .title {
    font-size: 20px;
    color: #333;
    font-weight: bold;
    &.mt-20 {
      margin-top: 20px;
    }
    &.mb-20 {
      margin-bottom: 20px;
    }
  }
  .my-main {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .logo {
    width: 150px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #ededed;
    }
  }
  .info {
    ul {
      li {
        font-size: 14px;
        color: #333;
        line-height: 40px;
        span {
          padding-left: 30px;
          &.fl {
            float: left;
          }
          &.my-img {
            display: inline-block;
            width: 150px;
            height: 150px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &.color-m {
            color: #a0cfff;
          }
        }
      }
    }
  }
  .eList {
    ul {
      overflow: hidden;
      li {
        display: flex;
        flex-direction: column;
        float: left;
        padding-left: 30px;
        span {
          line-height: 40px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .btn {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
