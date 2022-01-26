<template>
  <el-card shadow="hover" class="mb-2">
    <template #header>
      <div class="card-header flex justify-between items-center">
        <span>{{ $t('men-dian-shou-ru-pai-ming') }}</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          unlink-panels
          range-separator="-"
          :clearable="false"
          :start-placeholder="$t('kai-shi-shi-jian')"
          :end-placeholder="$t('jie-shu-shi-jian')"
          :shortcuts="shortcuts"
          @change="getRankInfo"
        ></el-date-picker>
      </div>
    </template>
    <div class="my-rank">
      <div class="list">
        <ul v-if="list.length > 0">
          <li v-for="(item, index) in list" :key="index">
            <div class="content">
              <div class="icon">{{ index >= 3 ? index + 1 : '' }}</div>
              <div class="name">{{ item.merchantName }}</div>
              <div class="price">¥{{ item.totalAmount }}</div>
            </div>
          </li>
        </ul>
        <p v-else class="empty">{{ $t('zan-wu-shu-ju') }}</p>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getRank } from '/@/api/layout/index'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { getThisWeekFirstDay, getThisMonthFirstDay, getThisYearFirstDay } from '/@/components/Day'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const rankInfo = reactive({
      time: [],
      list: [],
      shortcuts: [
        {
          text: t('jin-ri'),
          value: [new Date(), new Date()]
        },
        {
          text: t('ben-zhou'),
          value: [getThisWeekFirstDay(), new Date()]
        },
        {
          text: t('ben-yue'),
          value: [getThisMonthFirstDay(), new Date()]
        },
        {
          text: t('quan-nian'),
          value: [getThisYearFirstDay(), new Date()]
        }
      ]
    })
    // @ts-ignore
    rankInfo.time = [new Date(), new Date()]
    const getRankInfo = async () => {
      console.log(rankInfo.time)
      const res = await getRank({
        endTime: dayjs(rankInfo.time[1]).format('YYYY-MM-DD'),
        startTime: dayjs(rankInfo.time[0]).format('YYYY-MM-DD'),
        type: 4
      })
      if (res.data.data) {
        rankInfo.list = res.data.data
      }
    }
    getRankInfo()
    return {
      ...toRefs(rankInfo),
      getRankInfo
    }
  }
})
</script>
<style lang="scss" scoped>
.my-rank {
  width: 100%;
  height: 256px;
  overflow: scroll;
  .empty {
    text-align: center;
    line-height: 256px;
  }
  ul {
    overflow: hidden;
    li {
      width: 100%;
      position: relative;
      float: left;
      .content {
        height: 50px;
        font-size: 14px;
        color: #666;
        line-height: 50px;
        .icon {
          position: absolute;
          left: 4px;
          top: 12.5px;
          width: 25px;
          height: 25px;
          color: #999;
          text-align: center;
          line-height: 25px;
          border-radius: 50%;
          background-color: #f0f4f7;
        }
        .name {
          position: absolute;
          left: 50px;
        }
        .price {
          position: absolute;
          right: 20px;
          color: #666;
        }
      }
      &:nth-of-type(1) {
        .icon {
          width: 35px;
          height: 35px;
          top: 7.5px;
          left: 0;
          background: url('/@/assets/logo/01.png') no-repeat bottom;
          background-size: 35px;
          border-radius: unset;
          background-color: unset;
        }
      }
      &:nth-of-type(2) {
        .icon {
          width: 35px;
          height: 35px;
          top: 7.5px;
          left: 0;
          background: url('/@/assets/logo/02.png') no-repeat bottom;
          background-size: 35px;
          border-radius: unset;
          background-color: unset;
        }
      }
      &:nth-of-type(3) {
        .icon {
          width: 35px;
          height: 35px;
          top: 7.5px;
          left: 0;
          background: url('/@/assets/logo/03.png') no-repeat bottom;
          background-size: 35px;
          border-radius: unset;
          background-color: unset;
        }
      }
    }
  }
}
</style>
