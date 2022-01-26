<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('bao-xiu-lie-biao') }}</span>
      </div>
    </template>
    <qp-search :show-label="false" :data="searchData" @data-search="searchFun"></qp-search>
    <qp-table
      :loading="loading"
      :columns="columns"
      :table-data="tableData"
      :page-no="pageNo"
      :page-size="pageSize"
      :total-count="total"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #device>
        <el-table-column :label="$t('gu-zhang-she-bei')" align="center" width="150px">
          <template #default="scope">
            【{{ scope.row.termType === 1 ? $t('chong-dian-bao') : $t('chong-dian-zhuang') }}】{{ scope.row.termNo }}
          </template>
        </el-table-column>
      </template>
      <template #images>
        <el-table-column :label="$t('tu-pian')" align="center" width="380px">
          <template #default="scope">
            <div class="flex" v-if="scope.row.images[0] !== ''">
              <div v-for="(item, index) in scope.row.images" :key="index" @click="showPreview(item, scope.row)">
                <el-popover placement="left" trigger="hover" width="225px">
                  <template #reference>
                    <el-image :src="item" style="margin: 0 10px; width: 100px; height: 100px" fit="cover" />
                  </template>
                  <el-image style="width: 200px; height: 200px" fit="cover" :src="item"></el-image>
                </el-popover>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <template #createTime>
        <el-table-column :label="$t('ti-jiao-shi-jian')" align="center" width="200px">
          <template #default="scope">
            {{ time(scope.row.createTime) }}
          </template>
        </el-table-column>
      </template>
      <template #updateTime>
        <el-table-column :label="$t('shang-ci-chu-li-shi-jian')" align="center" width="200px">
          <template #default="scope">
            {{ time(scope.row.updateTime) }}
          </template>
        </el-table-column>
      </template>
      <template #status>
        <el-table-column :label="$t('zhuang-tai')" align="center" width="100px">
          <template #default="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
      </template>
      <template #operate>
        <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="100px">
          <template #default="scope">
            <el-popover placement="left" :width="100" trigger="click" class="my-popover">
              <template #reference>
                <el-button size="mini" type="primary" :disabled="scope.row.status !== 0 && scope.row.status !== 1">
                  {{ $t('biao-ji') }}
                </el-button>
              </template>
              <div v-if="scope.row.status === 0">
                <div class="my-btn" @click="changeStatus(0, 1, scope.row.id, scope.row.termNo)">
                  {{ $t('wei-xiu') }}
                </div>
                <div class="my-btn" @click="changeStatus(0, 3, scope.row.id, scope.row.termNo)">
                  {{ $t('fei-gu-zhang') }}
                </div>
              </div>
              <div v-if="scope.row.status === 1">
                <div class="my-btn" @click="changeStatus(0, 2, scope.row.id, scope.row.termNo)">
                  {{ $t('yi-wei-xiu') }}
                </div>
                <div class="my-btn" @click="changeStatus(1, 4, scope.row.id)">{{ $t('bao-fei-chu-li') }}</div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </template>
    </qp-table>
  </el-card>
</template>
<script>
import { defineComponent, onMounted, toRefs, getCurrentInstance } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { list } from './model/list'
import { useI18n } from 'vue-i18n'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { t } = useI18n()
    const { proxy } = getCurrentInstance()
    const { errList, getList, time, changeStatus } = list()
    onMounted(() => {
      getList()
    })
    const searchFun = _.debounce(() => {
      errList.pageNo = 1
      getList()
    }, 500)
    const handleCurrentChange = (val) => {
      //分页
      errList.pageNo = val
      getList()
    }
    const getStatus = (val) => {
      switch (val) {
        case 0:
          return t('dai-pai-cha')
        case 1:
          return t('wei-xiu-zhong')
        case 2:
          return t('yi-wei-xiu')
        case 3:
          return t('fei-gu-zhang')
        case 4:
          return t('yi-bao-fei')
      }
    }
    const showPreview = (url, row) => {
      proxy.$viewerApi({
        options: { rebuild: true, zIndex: 99999 },
        images: url ? row.images : row
      })
    }
    return {
      ...toRefs(errList),
      searchFun,
      handleCurrentChange,
      getStatus,
      changeStatus,
      time,
      showPreview
    }
  }
})
</script>
<style lang="scss" scoped>
.my-btn {
  cursor: pointer;
  width: 100%;
  line-height: 40px;
  color: #333;
  font-size: 14px;
  text-align: center;
  &:hover {
    color: #409eff;
  }
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
