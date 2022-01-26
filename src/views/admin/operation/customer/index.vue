<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('ke-fu-she-zhi') }}</span>
      </div>
    </template>
    <div class="my-class">
      <ul>
        <li v-for="(cus, index) in customerInfo" :key="index">
          <span>{{ cus.ruleName }}</span>
          <el-select v-model="cus.code" :placeholder="$t('qing-xuan-ze')" size="small">
            <el-option v-for="item in phoneCode" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input
            v-model="cus.ruleValue"
            :placeholder="$t('qing-shu-ru-shou-ji-hao')"
            size="small"
            maxlength="10"
            show-word-limit
          />
        </li>
      </ul>
      <el-button type="primary" class="my-btn" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, reactive, onMounted } from 'vue'
import { queryBizRule, saveBizRule } from '/@/api/admin/operation'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const customerInfo = reactive([
      {
        ruleCode: 'user_service_phone',
        ruleName: t('yong-hu-duan-ke-fu-shou-ji'),
        ruleValue: '',
        code: '39'
      },
      {
        ruleCode: 'merchant_service_phone',
        ruleName: t('shang-jia-duan-ke-fu-shou-ji'),
        ruleValue: '',
        code: '39'
      }
    ])
    onMounted(() => {
      getRule()
    })
    const phoneCode = reactive([
      {
        value: '39',
        label: '+39'
      }
    ])
    const getRule = async () => {
      const res = await queryBizRule()
      if (res.data.code === 0) {
        // @ts-ignore
        res.data.data.forEach((el) => {
          if (el.ruleCode === 'merchant_service_phone') {
            const code = el.ruleValue.split('+')
            if (code.length === 2) {
              customerInfo[1].code = code[0]
              customerInfo[1].ruleValue = code[1]
            } else {
              customerInfo[1].ruleValue = el.ruleValue
            }
          } else if (el.ruleCode === 'user_service_phone') {
            const code = el.ruleValue.split('+')
            if (code.length === 2) {
              customerInfo[0].code = code[0]
              customerInfo[0].ruleValue = code[1]
            } else {
              customerInfo[0].ruleValue = el.ruleValue
            }
          }
        })
      }
    }
    const onSubmit = () => {
      if (!customerInfo[0].ruleValue || customerInfo[0].ruleValue.length < 10) {
        ElMessage({
          message: t('qing-tian-xie-zheng-que-de-yong-hu-duan-ke-fu-shou-ji-hao-ma'),
          type: 'warning'
        })
      } else if (!customerInfo[1].ruleValue || customerInfo[1].ruleValue.length < 10) {
        ElMessage({
          message: t('qing-tian-xie-zheng-que-de-shang-jia-duan-ke-fu-shou-ji-hao-ma'),
          type: 'warning'
        })
      } else {
        ElMessageBox.confirm(`${t('que-ding-bao-cun-pei-zhi-ma')}？`, t('xi-tong-ti-shi'), {
          confirmButtonText: t('que-ding'),
          cancelButtonText: t('qu-xiao'),
          type: 'warning',
          center: true
        })
          .then(async () => {
            const arr = JSON.parse(JSON.stringify(customerInfo))
            arr.forEach((val) => {
              val.ruleValue = `${val.code}+${val.ruleValue}`
            })
            const res = await saveBizRule({
              forms: arr
            })
            if (res.data.code === 0) {
              ElMessage({
                message: t('bao-cun-cheng-gong'),
                type: 'success'
              })
              getRule()
            }
          })
          .catch(() => {})
      }
    }
    return {
      customerInfo,
      phoneCode,
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  padding: 20px 0;
  ul {
    li {
      width: 100%;
      float: left;
      font-size: 14px;
      color: #333;
      line-height: 50px;
      span {
        display: block;
        float: left;
      }
      .el-select {
        width: 80px;
        float: left;
        margin: 10px 20px;
      }
      .el-input {
        width: 230px;
        float: left;
        margin: 10px 0;
      }
    }
  }
  .my-btn {
    width: 400px;
    margin-top: 40px;
    margin-left: 30px;
  }
}
</style>
