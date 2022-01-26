<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('gong-gao-guan-li') }}</span>
      </div>
    </template>
    <el-button type="primary" @click="add">{{ $t('fa-bu-gong-gao') }}</el-button>
    <qp-table
      :showPage="false"
      :loading="loading"
      :columns="columns"
      :table-data="tableData"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #createTime>
        <el-table-column :label="$t('fa-bu-shi-jian')" align="center" width="260px">
          <template #default="scope">
            {{ time(scope.row.createTime) }}
          </template>
        </el-table-column>
      </template>
    </qp-table>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { qpTable } from '/@/components/index'
import { announcement } from './model/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  components: { qpTable },
  setup() {
    const router = useRouter()
    const { announcementList, time } = announcement()
    const handleCurrentChange = () => {}
    const add = () => {
      router.push({ name: 'AddAnnouncement' })
    }
    return {
      ...toRefs(announcementList),
      handleCurrentChange,
      add,
      time
    }
  }
})
</script>
