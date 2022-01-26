<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('ye-wu-yuan-guan-li') }}</span>
        </div>
      </template>
      <qp-search
        :show-label="false"
        :data="searchData"
        @data-search="searchFun"
        showBtn
        :btnText="$t('lu-ru-ye-wu-yuan')"
        @data-btnclick="addSales"
      ></qp-search>
      <qp-table
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        :page-no="pageNo"
        :page-size="pageSize"
        :total-count="total"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #createTime>
          <el-table-column :label="$t('lu-ru-shi-jian')" align="center" fixed="right" width="260px">
            <template #default="scope">
              {{ time(scope.row.createTime) }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="260px">
            <template #default="scope">
              <el-button size="mini" class="my-btn-class" type="primary" @click="edit(scope.row)">
                {{ $t('cha-kan-ye-ji') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <el-dialog v-model="showDialog" width="60%" :close-on-click-modal="false">
        <pb-info :salesId="salesId"></pb-info>
      </el-dialog>
      <el-dialog v-model="showAddPop" width="40%" :title="$t('lu-ru-ye-wu-yuan')" center :close-on-click-modal="false">
        <div class="my-dialog">
          <el-form ref="form" :model="salesInfo" label-width="120px" label-position="top">
            <el-form-item :label="$t('ye-wu-yuan-xing-ming')">
              <el-input v-model.trim="salesInfo.name" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="$t('shou-ji-hao-ma')">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="salesInfo.code" placeholder="Select">
                    <el-option
                      v-for="item in phoneCodeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-input
                    type="text"
                    maxlength="10"
                    show-word-limit
                    v-model.number="salesInfo.phone"
                    :placeholder="$t('qing-shu-ru-shou-ji-hao-shou-ji-hao-wei-10-wei-shu-zi')"
                    clearable
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
            <el-button type="primary" @click="onSubmit">{{ $t('que-ding') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { sales } from './model/index'
import pbInfo from './info/index.vue'
import { ElMessage } from 'element-plus'
import _ from 'lodash'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch,
    pbInfo
  },
  setup() {
    const salesId = ref(0)
    const showDialog = ref(false)

    onMounted(() => {
      getList()
    })
    const { salesList, getList, time, addBizFn } = sales()
    const edit = (row) => {
      //点击查看按钮
      showDialog.value = true
      salesId.value = row.id
    }
    const addSales = () => {
      salesList.showAddPop = true
      salesList.salesInfo.phone = ''
      salesList.salesInfo.name = ''
    }
    const onCancel = () => {
      salesList.salesInfo.phone = ''
      salesList.salesInfo.name = ''
      salesList.showAddPop = false
    }
    const onSubmit = () => {
      const reg = /[^\d]/
      if (!salesList.salesInfo.phone || !salesList.salesInfo.name) {
        ElMessage({
          message: t('qing-shu-ru-zheng-que-de-shu-ju'),
          type: 'warning'
        })
      } else if (reg.test(salesList.salesInfo.phone) || salesList.salesInfo.phone.toString().length !== 10) {
        ElMessage({
          message: t('qing-shu-ru-zheng-que-de-shou-ji-hao'),
          type: 'warning'
        })
      } else {
        addBizFn(salesList.salesInfo.name, salesList.salesInfo.phone, salesList.salesInfo.code)
      }
    }
    const handleCurrentChange = (val) => {
      salesList.pageNo = val
      getList()
    }
    const searchFun = _.debounce(() => {
      salesList.pageNo = 1
      getList()
    }, 500)
    return {
      ...toRefs(salesList),
      showDialog,
      salesId,
      getList,
      edit,
      time,
      addSales,
      onSubmit,
      onCancel,
      handleCurrentChange,
      searchFun
    }
  }
})
</script>
<style lang="scss" scoped>
.my-dialog {
  padding: 0 20px;
}
</style>
