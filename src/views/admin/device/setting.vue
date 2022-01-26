<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('zong-he-she-zhi') }}</span>
      </div>
    </template>
    <div class="my-class">
      <el-row v-if="locale === 'zh'">
        <div class="list">
          <span>充电宝电量低于</span>
          <el-input type="text" class="number" size="small" v-model.number="power_limit" @input="changePL" />

          <span>% 时不弹出</span>
        </div>
        <div class="list">
          <span>当充电桩内充电宝数量低于</span>
          <el-input type="text" class="number" size="small" v-model.number="device_dispatch_limit" @input="changePDL" />
          <span>% 时发送调度预警</span>
        </div>
        <el-button type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
      </el-row>
      <el-row v-if="locale === 'en'">
        <div class="list">
          <span>The power bank does not pop up when the battery level is lower than</span>
          <el-input type="text" class="number" size="small" v-model.number="power_limit" @input="changePL" />
          <span>%</span>
        </div>
        <div class="list">
          <span>When the number of charging treasures in the charging pile is less than</span>
          <el-input type="text" class="number" size="small" v-model.number="device_dispatch_limit" @input="changePDL" />
          <span>% the dispatching warning is sent</span>
        </div>
        <el-button type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
      </el-row>
      <el-row v-if="locale === 'it'">
        <div class="list">
          <span>Il power bank non si apre quando il livello della batteria è inferiore al</span>
          <el-input type="text" class="number" size="small" v-model.number="power_limit" @input="changePL" />
          <span>%</span>
        </div>
        <div class="list">
          <span>Quando il numero di tesori in carica nella pila di carica è inferiore al</span>
          <el-input type="text" class="number" size="small" v-model.number="device_dispatch_limit" @input="changePDL" />
          <span>% viene inviato l'avviso di spedizione</span>
        </div>
        <el-button type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
      </el-row>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { setting } from '/@/api/admin/device'
import { queryBizRule } from '/@/api/admin/operation'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const { t, locale } = useI18n()
    const setInfo = reactive({
      power_limit: 0,
      device_dispatch_limit: 0
    })
    onMounted(() => {
      queryBizRuleFn()
    })
    const queryBizRuleFn = async () => {
      const res = await queryBizRule()
      if (res.data.code === 0) {
        // @ts-ignore
        const power_limit = res.data.data.filter((val) => val.ruleCode === 'power_limit')
        setInfo.power_limit = power_limit[0].ruleValue
        // @ts-ignore
        const device_dispatch_limit = res.data.data.filter((val) => val.ruleCode === 'device_dispatch_limit')
        setInfo.device_dispatch_limit = device_dispatch_limit[0].ruleValue
      }
    }
    const onSubmit = () => {
      if (setInfo.power_limit && setInfo.device_dispatch_limit) {
        ElMessageBox.confirm(`${t('que-ding-bao-cun-pei-zhi-ma')}？`, t('xi-tong-ti-shi'), {
          confirmButtonText: t('que-ding'),
          cancelButtonText: t('qu-xiao'),
          type: 'warning',
          center: true
        })
          .then(async () => {
            const res = await setting({
              deviceLevelLimit: setInfo.power_limit,
              deviceNumLimit: setInfo.device_dispatch_limit
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
      } else {
        ElMessage({
          message: t('qing-tian-xie-zheng-que-de-shu-ju'),
          type: 'warning'
        })
      }
    }
    const changePL = (val: number) => {
      if (val > 50) {
        setInfo.power_limit = 50
      }
    }
    const changePDL = (val: number) => {
      if (val > 50) {
        setInfo.device_dispatch_limit = 50
      }
    }
    return {
      ...toRefs(setInfo),
      onSubmit,
      changePL,
      changePDL,
      locale
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  padding: 10px 20px;
  .list {
    width: 100%;
    padding: 20px 0;
    font-size: 14px;
    color: #333;
    .number {
      width: 90px;
      margin: 0 10px;
    }
    .title {
      line-height: 40px;
    }
    ul {
      li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        float: left;
        span {
          display: block;
          width: 50px;
          float: left;
        }
        .el-input {
          float: left;
          width: 300px;
          margin: 10px 20px 10px 0;
        }
        .el-select {
          float: left;
          width: 80px;
          margin: 10px 20px 10px 0;
        }
      }
    }
  }
}
</style>
