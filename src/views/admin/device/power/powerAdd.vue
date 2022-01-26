<template>
  <el-card>
    <el-form :model="info" class="my-form-class" label-width="120px" label-position="left">
      <el-form-item :label="$t('chong-dian-bao-id')" required>
        <el-input v-model="info.deviceNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel">{{ $t('qu-xiao') }}</el-button>
        <el-button type="primary" @click="submit">{{ $t('que-ding') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { addDevice } from '/@/api/admin/device'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const info = reactive({
      deviceNo: ''
    })
    const submit = async () => {
      if (info.deviceNo) {
        const res = await addDevice({
          deviceNo: info.deviceNo
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('lu-ru-cheng-gong'),
            type: 'success'
          })
          router.push({ name: 'PowerBank' })
        }
      } else {
        ElMessage({
          message: t('qing-shu-ru-chong-dian-bao-id'),
          type: 'warning'
        })
      }
    }
    const cancel = () => {
      router.push({ name: 'PowerBank' })
    }
    return {
      info,
      submit,
      cancel
    }
  }
})
</script>
<style lang="scss" scoped>
.my-form-class {
  width: 500px;
}
</style>
