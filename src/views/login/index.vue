<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- <img class="mx-auto w-auto" :src="logo" alt="Workflow" /> -->
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">后台管理系统</h2>
      </div>

      <div class="mt-8 space-y-6" @keyup="enterSubmit">
        <el-form ref="ruleForm" label-position="right" :model="form" :rules="rules">
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              prefix-icon="el-icon-user"
              placeholder="请输入账号 "
              clearable
              maxlength="30"
            />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              v-model="form.pwd"
              prefix-icon="el-icon-lock"
              show-password
              type="password"
              maxlength="15"
              placeholder="请输入密码"
              autocomplete="off"
              clearable
            />
          </el-form-item>

          <el-button class="w-full" type="primary" @click="onSubmit">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { store } from '/@/store/index'
import { ElNotification } from 'element-plus'
import { validate } from '/@/utils/formExtend'

const formRender = () => {
  let form = reactive({
    name: '',
    pwd: ''
  })
  const ruleForm = ref(null)
  const enterSubmit = (e: { key: string }) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  const onSubmit = async () => {
    let { name, pwd } = form
    if (!(await validate(ruleForm))) {
      return
    } else {
      await store.dispatch('layout/login', { adminNo: name, adminPwd: pwd })
      ElNotification({
        title: '欢迎',
        message: '欢迎回来',
        customClass: 'my-notify',
        type: 'success'
      })
    }
  }
  const rules = reactive({
    name: [
      {
        // @ts-ignore
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入用户名'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        // @ts-ignore
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ]
  })

  return {
    form,
    onSubmit,
    enterSubmit,
    rules,
    ruleForm
  }
}
export default defineComponent({
  name: 'Login',
  setup() {
    return {
      ...formRender()
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-login {
  padding-top: 200px;
  width: 400px;
  margin: 0 auto;
}
.my-template-class {
  .el-input-group__append {
    position: relative;

    .my-primary {
      width: 140px;
      background-color: var(--el-button-background-color, var(--el-color-white));
      border: 1px solid var(--el-button-background-color, var(--el-color-white));
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: var(--el-button-font-color, var(--el-text-color-regular));
      margin: -10px -21px;

      i {
        font-style: normal;
      }
    }
  }
}
</style>
