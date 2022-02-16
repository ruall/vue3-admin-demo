<template>
  <el-sub-menu v-if="menuList.children && menuList.children.length > 0" :key="menuList.path" :index="menuList.path">
    <template #title>
      <!-- <i :class="menuList.meta.icon || 'el-icon-location'" /> -->
      <img :src="getIcon(menuList.meta.icon)" alt="" class="align-middle text-center" />
      <!-- <i :style="{ background: `url(${getIcon(menuList.meta.icon)}) no-repeat center`, backgroundSize: 'cover' }"></i> -->
      <span>{{ menuList.meta.title }}</span>
      <div v-if="menuList.meta.showRedPoint" class="inline-block">
        <div v-if="!isParentHidden" class="ml-2 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    </template>
    <el-menu-item-group>
      <menubar-item v-for="v in menuList.children" :key="v.path" :index="v.path" :menu-list="v" />
    </el-menu-item-group>
  </el-sub-menu>

  <el-menu-item v-else :index="menuList.path">
    <!-- <i :class="getIcon(menuList.meta.icon)" /> -->
    <img :src="getIcon(menuList.meta.icon)" alt="" class="align-middle text-center" />
    <template #title>
      {{ menuList.meta.title }}
      <div v-if="menuList.meta.showRedPoint" class="inline-block">
        <div v-if="isHidden(menuList.meta.title)" class="ml-2 w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { IMenubarList } from '/@/type/store/layout'
import { useStore } from '/@/store/index'
export default defineComponent({
  name: 'MenubarItem',
  props: {
    menuList: {
      type: Object as PropType<IMenubarList>,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const store = useStore()
    const redPoint = computed(() => store.state.layout.menubar.redPoint)

    const isHidden = computed(() => {
      return (title: string) => {
        if (title === '合同信息' && redPoint.value.isShowDocument) {
          return true
        } else if (title === '缴款单信息' && redPoint.value.isShowPlaylist) {
          return true
        }
        return false
      }
    })

    const isParentHidden = computed(() => {
      return !redPoint.value.isShowDocument && !redPoint.value.isShowPlaylist
    })

    const getSrc = (name: any) => {
      const path = `/src/assets/icon/${name}.png`
      const modules = import.meta.globEager('/src/assets/icon/*.png')
      if (modules[path]) {
        return modules[path].default
      } else {
        return ''
      }
    }

    const getIcon = (src: any) => {
      if (src) {
        return getSrc(src)
      } else {
        return 'el-icon-settting'
      }
    }
    return {
      isHidden,
      isParentHidden,
      getIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item,
.el-submenu__title {
  img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
}
</style>
