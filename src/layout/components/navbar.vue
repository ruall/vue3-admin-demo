<template>
  <div class="flex items-center px-4">
    <el-icon class="text-2xl cursor-pointer" @click="changeCollapsed">
      <Fold v-if="!menubar.status" />
      <Expand v-if="menubar.status" />
    </el-icon>
  </div>
  <div class="flex items-center flex-row-reverse px-4 min-width-32">
    <!-- 用户下拉 -->
    <el-dropdown>
      <span class="el-dropdown-link flex flex-center mx-2">
        <span class="ml-2">{{ userInfo.nickName }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onChangePWD">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog
    v-model="changePwdDialog"
    title="修改密码"
    width="40%"
    center
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="old">
        <el-input v-model="ruleForm.old" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="ruleForm.newPwd" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="check">
        <el-input v-model="ruleForm.check" type="password" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changePwdDialog = false">取消</el-button>
        <el-button type="primary" @click="changePwdDialog = false">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from '/@/store/index'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import Notice from '/@/layout/components/notice.vue'
import 'element-plus/es/components/message-box/style/css'
import { ElMessageBox } from 'element-plus'
import { getLocal } from '/@/utils'
import { ArrowDown, Fold, Expand } from '@element-plus/icons-vue'

interface IBreadcrumbList {
  path: string
  title: string | symbol
}
// 面包屑导航
const breadcrumb = (route: RouteLocationNormalizedLoaded) => {
  const fn = () => {
    const breadcrumbList: Array<IBreadcrumbList> = []
    const notShowBreadcrumbList = ['Dashboard', 'RedirectPage'] // 不显示面包屑的导航
    if (route.matched[0] && notShowBreadcrumbList.includes(route.matched[0].name as string)) return breadcrumbList
    route.matched.forEach((v) => {
      const obj: IBreadcrumbList = {
        // @ts-ignore
        title: v.meta.title,
        path: v.path
      }
      breadcrumbList.push(obj)
    })
    return breadcrumbList
  }
  let data = reactive({
    breadcrumbList: fn()
  })
  watch(
    () => route.path,
    () => (data.breadcrumbList = fn())
  )

  return { data }
}

export default defineComponent({
  name: 'LayoutNavbar',
  components: {
    Notice,
    ArrowDown,
    Fold,
    Expand
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const userInfo = getLocal('userInfo') as any
    const changePwdDialog = ref(false)
    const ruleForm = reactive({
      newPwd: '',
      old: '',
      check: ''
    })
    const Checks = (rule: { field: string }, value: any, callback: (arg0?: Error | undefined) => void) => {
      if (rule.field === 'newPwd') {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        if (!reg.test(value)) {
          callback(new Error('请输入6—15位的密码，允许输入数字、字母、特殊符号。'))
        }
      } else if (rule.field === 'check') {
        if (ruleForm.check !== ruleForm.newPwd) {
          callback(new Error('两次输入的密码不一致'))
        }
      }
      callback()
    }
    const rules = reactive({
      newPwd: [
        { required: true, message: '请输入新密码' },
        { validator: Checks, trigger: 'blur' }
      ],
      old: [{ required: true, message: '请输入旧密码' }],
      check: [
        { required: true, message: '请确认新密码' },
        { validator: Checks, trigger: 'blur' }
      ]
    }) as IObj
    const ruleFormRef = ref<HTMLElement | null>(null)

    const changeCollapsed = () => store.commit('layout/changeCollapsed')
    const logout = () => {
      ElMessageBox.confirm('确定要退出登录吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          store.commit('layout/logout')
        })
        .catch(() => {})
    }
    const onChangePWD = () => {
      changePwdDialog.value = true
    }
    return {
      menubar: store.state.layout.menubar,
      userInfo,
      changeCollapsed,
      logout,
      ...breadcrumb(route),
      onChangePWD,
      changePwdDialog,
      ruleForm,
      rules,
      ruleFormRef,
      ArrowDown,
      Fold,
      Expand
    }
  }
})
</script>

<style lang="postcss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.translation-icon {
  width: 17px;
  height: 17px;
  font-size: 14px;
  background: url('/@/assets/logo/translation.png') no-repeat center;
  background-size: cover;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
