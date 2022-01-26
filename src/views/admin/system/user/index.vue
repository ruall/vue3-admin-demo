<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('ge-ren-xin-xi') }}</span>
      </div>
    </template>
    <div class="my-class">
      <ul>
        <li>
          <span>{{ $t('xing-ming') }}：{{ info.realName }}</span>
        </li>
        <li>
          <span>{{ $t('jiao-se') }}：{{ info.role }}</span>
        </li>
        <li>
          <span>{{ $t('dian-hua') }}：{{ info.phoneNo }}</span>
        </li>
        <li>
          <span>{{ $t('you-xiang') }}：{{ info.email }}</span>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { info } from '/@/api/admin/setting'

export default defineComponent({
  name: '',
  setup() {
    let userInfo = reactive({
      info: {
        realName: '',
        role: '',
        phoneNo: '',
        email: ''
      }
    })
    const getInfo = async () => {
      const res = await info()
      if (res.data.code === 0) {
        // @ts-ignore
        userInfo.info = res.data.data
      }
    }
    onMounted(() => {
      getInfo()
    })
    return {
      ...toRefs(userInfo)
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  padding: 20px;
  ul {
    li {
      width: 100%;
      line-height: 40px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
