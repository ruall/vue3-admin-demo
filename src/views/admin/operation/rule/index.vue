<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('djaqwe') }}</span>
      </div>
    </template>
    <div class="my-class" v-if="locale === 'zh'">
      <div class="title">{{ $t('ke-hu-duan-ji-fei-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1.前</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.free_duration"
              :min="0"
              :max="30"
              :controls="false"
              size="small"
            />
            <span>min免费</span>
          </li>
          <li>
            <span>2.每0.5h计费€</span>
            <el-input-number
              v-model="ruleInfo.billing"
              class="my-input"
              :precision="1"
              :step="0.1"
              :min="0"
              :controls="false"
              size="small"
            />
            <span>，不足0.5h按0.5h计</span>
          </li>
          <li>
            <span>3.每日计费上限</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.billing_limit"
              :min="0"
              :max="24"
              :controls="false"
              size="small"
            />
            <span>h，</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.overdue_duration"
              :min="0"
              :step="1"
              step-strictly
              :precision="0"
              :controls="false"
              size="small"
            />
            <span>天未归还视为逾期</span>
          </li>
          <li>
            <span>4.未绑定信用卡时，需要缴纳押金€</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.pledge"
              :precision="2"
              :step="0.01"
              :min="0"
              :controls="false"
              size="small"
            />
          </li>
        </ul>
      </div>
      <div class="title">{{ $t('shang-jia-duan-yong-jin-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1.商家收入为订单金额的</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_prop"
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              :controls="false"
              :precision="0"
              size="small"
            />
            <span>%（逾期订单除外）</span>
          </li>
          <li>
            <span>2.商家手动提现时，将扣除</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_fee_prop"
              :min="0"
              :max="30"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
            <span>%的手续费</span>
          </li>
          <li>
            <span>3.商家申请提现时最低金额为€</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.min_withdrew_limit"
              :min="0"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
          </li>
        </ul>
      </div>
      <el-button class="my-btn" type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
    </div>
    <div class="my-class" v-if="locale === 'en'">
      <div class="title">{{ $t('ke-hu-duan-ji-fei-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1. Free for the first</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.free_duration"
              :min="0"
              :max="30"
              :controls="false"
              size="small"
            />
            <span>min</span>
          </li>
          <li>
            <span>2. Every 0.5h is billed at €</span>
            <el-input-number
              v-model="ruleInfo.billing"
              class="my-input"
              :precision="1"
              :step="0.1"
              :min="0"
              :controls="false"
              size="small"
            />
            <span>client billing rule，less than 0.5h is calculated as 0.5h</span>
          </li>
          <li>
            <span>3. The daily billing limit is</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.billing_limit"
              :min="0"
              :max="24"
              :controls="false"
              size="small"
            />
            <span>h，and if it is not returned within</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.overdue_duration"
              :min="0"
              :step="1"
              step-strictly
              :precision="0"
              :controls="false"
              size="small"
            />
            <span>days, it will be regarded as overdue</span>
          </li>
          <li>
            <span>4. When the credit card is not bound, a deposit of €</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.pledge"
              :precision="2"
              :step="0.01"
              :min="0"
              :controls="false"
              size="small"
            />
            <span>is required</span>
          </li>
        </ul>
      </div>
      <div class="title">{{ $t('shang-jia-duan-yong-jin-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1. Merchant income is</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_prop"
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              :controls="false"
              :precision="0"
              size="small"
            />
            <span>% of the order amount (except for late orders)</span>
          </li>
          <li>
            <span>2. When merchants manually withdraw cash, a</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_fee_prop"
              :min="0"
              :max="30"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
            <span>% handling fee will be deducted</span>
          </li>
          <li>
            <span>3.The minimum amount for merchants to apply for cash withdrawal is €</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.min_withdrew_limit"
              :min="0"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
          </li>
        </ul>
      </div>
      <el-button class="my-btn" type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
    </div>
    <div class="my-class" v-if="locale === 'it'">
      <div class="title">{{ $t('ke-hu-duan-ji-fei-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1. Gratuito per il primo</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.free_duration"
              :min="0"
              :max="30"
              :controls="false"
              size="small"
            />
            <span>min</span>
          </li>
          <li>
            <span>2. Ogni 0.5 h viene fatturata a €</span>
            <el-input-number
              v-model="ruleInfo.billing"
              class="my-input"
              :precision="1"
              :step="0.1"
              :min="0"
              :controls="false"
              size="small"
            />
            <span>regola di fatturazione del cliente，meno di 0.5 h viene calcolata come 0.5 h</span>
          </li>
          <li>
            <span>3. Il limite di fatturazione giornaliero è di</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.billing_limit"
              :min="0"
              :max="24"
              :controls="false"
              size="small"
            />
            <span>ore e，se non viene restituito entro</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.overdue_duration"
              :min="0"
              :step="1"
              step-strictly
              :precision="0"
              :controls="false"
              size="small"
            />
            <span>giorni, sarà considerato scaduto</span>
          </li>
          <li>
            <span>4. Quando la carta di credito non è vincolata, è richiesto un deposito di €</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.pledge"
              :precision="2"
              :step="0.01"
              :min="0"
              :controls="false"
              size="small"
            />
          </li>
        </ul>
      </div>
      <div class="title">{{ $t('shang-jia-duan-yong-jin-gui-ze') }}</div>
      <div class="info">
        <ul>
          <li>
            <span>1. Il reddito del commerciante è del</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_prop"
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              :controls="false"
              :precision="0"
              size="small"
            />
            <span>% dell'importo dell'ordine (ad eccezione degli ordini in ritardo)</span>
          </li>
          <li>
            <span>
              2. Quando i commercianti prelevano manualmente contanti, verrà detratta una commissione di gestione del
            </span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.merchant_fee_prop"
              :min="0"
              :max="30"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
            <span>%</span>
          </li>
          <li>
            <span>3.L'importo minimo per i commercianti per richiedere il prelievo di contanti è di €</span>
            <el-input-number
              class="my-input"
              v-model="ruleInfo.min_withdrew_limit"
              :min="0"
              :step="1"
              step-strictly
              :controls="false"
              size="small"
            />
          </li>
        </ul>
      </div>
      <el-button class="my-btn" type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, reactive, onMounted } from 'vue'
import { saveBizRule, queryBizRule } from '/@/api/admin/operation'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const { t, locale } = useI18n()
    const ruleInfo = reactive({
      free_duration: '',
      billing: '',
      billing_limit: '',
      overdue_duration: '',
      pledge: '',
      merchant_prop: '',
      merchant_fee_prop: '',
      min_withdrew_limit: ''
    })
    const ruleForms = reactive({
      forms: []
    })
    onMounted(() => {
      queryBizRuleFn()
    })
    const queryBizRuleFn = async () => {
      const res = await queryBizRule()
      if (res.data.code === 0) {
        ruleForms.forms = res.data.data
        // @ts-ignore
        res.data.data.forEach((val) => {
          ruleInfo[val.ruleCode] = val.ruleValue
        })
      }
    }
    const onSubmit = () => {
      ElMessageBox.confirm(`${t('que-ding-bao-cun-pei-zhi-ma')}？`, t('xi-tong-ti-shi'), {
        confirmButtonText: t('que-ding'),
        cancelButtonText: t('qu-xiao'),
        type: 'warning',
        center: true
      })
        .then(async () => {
          ruleForms.forms.forEach((val) => {
            val.ruleValue = ruleInfo[val.ruleCode]
          })
          const res = await saveBizRule({
            forms: ruleForms.forms
          })
          if (res.data.code === 0) {
            ElMessage({
              message: t('bao-cun-cheng-gong'),
              type: 'success'
            })
            queryBizRuleFn()
          }
        })
        .catch(() => {})
    }
    return {
      ruleInfo,
      onSubmit,
      locale
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  .title {
    font-size: 14px;
    line-height: 40px;
    color: #333;
  }
  .info {
    padding: 20px;
    overflow: hidden;
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
        .my-input {
          float: left;
          width: 80px;
          margin: 10px;
        }
      }
    }
  }
  .my-btn {
    width: 300px;
    margin-left: 20px;
  }
}
</style>
