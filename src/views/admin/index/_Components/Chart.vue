<template>
  <el-card shadow="hover" class="mb-2">
    <template #header>
      <div class="card-header flex justify-between items-center">
        <span>{{ $t('ding-dane-shu-tong-ji') }}</span>
        <el-date-picker
          v-model="month"
          type="month"
          :clearable="false"
          :default-value="new Date()"
          :placeholder="$t('xuan-ze-yue-fen')"
          @change="getList"
        ></el-date-picker>
      </div>
    </template>
    <div ref="chartDom" class="w-full h-64" />
  </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { echarts, ECOption } from '/@/components/Echart'
import { getOrderView } from '/@/api/layout/index'
import dayjs from 'dayjs'
import I18n from '/@/lang/index'
const { t } = I18n.global

// 雷达图
const chartRadar: (data: any) => ECOption = (data) => {
  const option: ECOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: [t('xiao-shou-e'), t('ding-dan-shu')]
    },
    xAxis: {
      type: 'category',
      min: 1,
      boundaryGap: false,
      axisLabel: {
        formatter: `{value} ${t('ri')}`
      },
      data: data.data && data.data.map((val: any) => val.date)
    },
    yAxis: [
      {
        type: 'value',
        name: t('xiao-shou-e'),
        position: 'left',
        axisLabel: {
          formatter: `{value} ${t('yuan')}`
        }
      },
      {
        type: 'value',
        name: t('ding-dan-shu'),
        position: 'right',
        axisLabel: {
          formatter: `{value} ${t('jian')}`
        }
      }
    ],
    series: [
      {
        name: t('xiao-shou-e'),
        smooth: true,
        type: 'line',
        yAxisIndex: 0,
        lineStyle: {
          color: '#8BC8F4'
        },
        data: data.data && data.data.map((val: any) => val.totalAmount)
      },
      {
        name: t('ding-dan-shu'),
        smooth: true,
        type: 'line',
        yAxisIndex: 1,
        lineStyle: {
          color: '#2AA5A3'
        },
        data: data.data && data.data.map((val: any) => val.orderNum)
      }
    ]
  }
  return option
}

export default defineComponent({
  setup() {
    const month = ref('')
    // @ts-ignore
    month.value = new Date()
    const getList = async (val: any) => {
      let month = dayjs(val).format('YYYY-MM-DD')
      console.log(month)
      const res = await getOrderView({ dateCondition: month })
      let myChart = echarts.init((chartDom.value as unknown) as HTMLElement)
      myChart.setOption(chartRadar(res.data))
    }
    const chartDom = ref(null)
    onMounted(() => {
      getList(month.value)
    })

    return {
      chartDom,
      month,
      getList
    }
  }
})
</script>
