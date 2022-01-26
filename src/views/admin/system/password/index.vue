<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('xiu-gai-mi-ma') }}</span>
      </div>
    </template>
    <div class="my-class">
      <el-form label-position="left" label-width="150px" :model="info" ref="form" :rules="rules">
        <el-form-item :label="$t('yuan-mi-ma')" prop="old">
          <el-input v-model.trim="info.old"></el-input>
        </el-form-item>
        <el-form-item :label="$t('xin-mi-ma')" prop="new">
          <el-input v-model.trim="info.new"></el-input>
        </el-form-item>
        <el-form-item :label="$t('zai-ci-que-ren')" prop="confirm">
          <el-input v-model.trim="info.confirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary" @click="changePwd">{{ $t('que-ding') }}</el-button>
          <span class="tips">{{ $t('nsakjda') }}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { pwd } from '/@/api/admin/setting'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const form = ref(null)
    const router = useRouter()
    const Checks = (rule, value, callback) => {
      if (rule.field === 'new') {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (!reg.test(value)) {
          callback(new Error(t('plm')))
        }
      } else if (rule.field === 'confirm') {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (!reg.test(value)) {
          callback(new Error(t('plm')))
        } else {
          if (pwdForm.info.new !== pwdForm.info.confirm) {
            callback(new Error(t('liang-ci-shu-ru-de-mi-ma-bu-yi-zhi')))
          }
        }
      }
      callback()
    }
    const pwdForm = reactive({
      info: {
        old: '',
        new: '',
        confirm: ''
      },
      rules: {
        old: [
          { required: true, message: t('qing-shu-ru-yuan-mi-ma') }
          // { validator: Checks, trigger: 'blur' }
        ],
        new: [
          { required: true, message: t('qing-shu-ru-xin-mi-ma') },
          { validator: Checks, trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: t('qing-zai-ci-shu-ru-xin-mi-ma') },
          { validator: Checks, trigger: 'blur' }
        ]
      }
    })
    const changePwd = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await pwd({
            newPassword: pwdForm.info.new,
            oldPassword: pwdForm.info.old
          })
          if (res.data.code === 0) {
            ElMessage({
              message: t('qxaxa'),
              type: 'success'
            })
            router.push({ name: 'UserInfo' })
          }
        }
      })
    }
    return {
      ...toRefs(pwdForm),
      changePwd,
      form
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  width: 500px;
  .my-btn {
    width: 100%;
  }
  .tips {
    width: 100%;
    display: block;
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 40px;
  }
}
</style>
