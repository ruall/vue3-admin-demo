<template>
  <div class="flex items-center px-4">
    <span
      class="text-2xl cursor-pointer"
      :class="{
        'el-icon-s-fold': !menubar.status,
        'el-icon-s-unfold': menubar.status
      }"
      @click="changeCollapsed"
    />
    <!-- 面包屑导航 -->
    <!-- <div class="px-4 hidden-xs-only">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item key="/" :to="{ path: '/' }"
            >主页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="v in data.breadcrumbList"
            :key="v.path"
            :to="v.path"
          >
            {{ v.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div> -->
  </div>
  <div class="flex items-center flex-row-reverse px-4 min-width-32">
    <!-- 用户下拉 -->
    <el-dropdown>
      <span class="el-dropdown-link flex flex-center mx-2">
        <!-- <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        /> -->
        <span class="ml-2">{{ userInfo.nickName }}</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onChangePWD">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- <Notice /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useStore } from '/@/store/index'
import { useRoute, RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import Notice from '/@/layout/components/notice.vue'
import { ElMessageBox } from 'element-plus'
import { getLocal } from '/@/utils'

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
    Notice
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const userInfo = getLocal('userInfo') as any
    const changeCollapsed = () => store.commit('layout/changeCollapsed')
    const logout = () => {
      ElMessageBox.confirm('确定要退出登录吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        store.commit('layout/logout')
      })
    }
    const onChangePWD = () => {
      router.push({ name: 'Changepwd' })
    }
    return {
      menubar: store.state.layout.menubar,
      userInfo,
      changeCollapsed,
      logout,
      ...breadcrumb(route),
      onChangePWD
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
</style>
