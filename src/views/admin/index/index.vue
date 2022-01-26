<template>
  <div class="my-class">
    <el-row :gutter="20" justify="space-around">
      <el-col :span="4" v-for="item in CardList.overview" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <template #header>
            <div :class="newClass">
              <span>
                {{ item.name }}
              </span>
            </div>
          </template>
          <div class="my-card">
            <div :class="[item.next ? '' : 'pb-50', pbClass, 'count']">
              <i v-if="item.name === $t('jin-ri-ding-dan-e')">€</i>
              {{ item.count }}
            </div>
            <div :class="newClass" v-if="item.next">
              <span>{{ item.next.name }}</span>
              <span class="right">
                <i v-if="item.name === $t('jin-ri-ding-dan-e')">€</i>
                {{ item.next.count }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="mt-10">
        <Chart />
      </el-col>
      <el-col :span="12" class="mt-10">
        <List />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { GetList } from './model/indexModel'
import Chart from './_Components/Chart.vue'
import List from './_Components/List.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  components: { Chart, List },
  setup() {
    const { locale } = useI18n()
    const { CardList } = GetList()
    const newClass = computed(() => {
      //@ts-ignore
      if (locale.value !== 'zh') {
        return 'newC card'
      } else {
        return 'card'
      }
    })
    const pbClass = computed(() => {
      if (locale.value !== 'zh') {
        return 'newC'
      }
    })
    return {
      CardList,
      newClass,
      pbClass
    }
  }
})
</script>
<style lang="scss" scoped>
.my-class {
  min-width: 1150px;
  padding: 10px;
  .card {
    &.newC {
      height: 72px;
    }
  }
  .mt-10 {
    margin-top: 10px;
  }
  .my-card {
    text-align: left;
    width: 100%;
    .count {
      line-height: 30px;
      font-size: 24px;
      color: #333;
      padding: 20px;
      font-weight: bold;
    }
    .card {
      width: 100%;
      line-height: 30px;
      color: #666;
      font-size: 12px;
      padding: 10px 20px;
      border-top: 1px solid #e5e7eb;
      position: relative;
      &.newC {
        height: 80px;
      }
      span {
        padding-right: 10px;
      }
    }
    .pb-50 {
      &.newC {
        padding-bottom: 100px;
      }
      padding-bottom: 70px;
    }
  }
}
</style>
