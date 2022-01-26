<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('xiang-xi-xin-xi') }}</span>
      </div>
    </template>
    <div class="my-pile-class">
      <ul>
        <li>
          <span>{{ $t('chong-dian-zhuang-id') }}：VHGD123281</span>
        </li>
        <li>
          <span>{{ $t('gui-ge') }}：8口</span>
        </li>
        <li>
          <span>{{ $t('bang-ding-shang-jia') }}：xxx披萨店</span>
          <span>
            <el-button size="small" @click="openDialog">{{ $t('geng-huan-bang-ding') }}</el-button>
          </span>
          <span>
            <el-button type="primary" size="small" @click="remove">{{ $t('jie-chu-bang-ding') }}</el-button>
          </span>
        </li>
        <li>
          <span>{{ $t('bang-ding-shang-jia') }}：暂无</span>
          <span>
            <el-button type="primary" size="small" @click="openDialog">{{ $t('li-ji-bang-ding') }}</el-button>
          </span>
        </li>
        <li>
          <span>{{ $t('zhuang-tai') }}：投放运行中</span>
        </li>
        <li>
          <span>{{ $t('yi-yun-hang') }}4天2小时</span>
        </li>
      </ul>
    </div>
    <el-dialog v-model="dialog.isShow" :title="$t('xi-tong-ti-shi')" width="50%">
      <qp-search :show-label="false" :data="searchData" @data-search="searchFun"></qp-search>
      <qp-table
        showSelection
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        :page-no="pageNo"
        :page-size="pageSize"
        :total-count="total"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center" width="120px">
            <template v-slot="scope">
              {{ scope.row.status ? $t('zheng-chang-shi-yong') : $t('dong-jie-zhong') }}
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ $t('qu-xiao') }}</el-button>
          <el-button type="primary" @click="submit">{{ $t('que-ding') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { merchant } from './model/pileEdit'
import { qpTable, qpSearch } from '/@/components/index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { t } = useI18n()
    const { merchantList } = merchant()
    const dialog = reactive({
      isShow: false
    })
    const searchFun = () => {
      //点击搜索按钮
    }
    const handleCurrentChange = (val) => {
      //翻页方法
      console.log(val)
    }
    const handleSelectionChange = (val) => {
      console.log(val)
    }
    const openDialog = () => {
      dialog.isShow = true
    }
    const submit = () => {
      dialog.isShow = false
    }
    const cancel = () => {
      dialog.isShow = false
    }
    const remove = () => {
      ElMessageBox({
        title: t('xi-tong-ti-shi'),
        message: `${t('que-ding-jie-chu-bang-ding-ma')}？`,
        showCancelButton: true,
        confirmButtonText: t('que-ding'),
        center: true,
        cancelButtonText: t('qu-xiao')
      })
        .then(() => {
          ElMessage({
            message: t('cao-zuo-cheng-gong'),
            type: 'success'
          })
        })
        .catch(() => {})
    }
    return {
      ...toRefs(merchantList),
      dialog,
      searchFun,
      handleCurrentChange,
      handleSelectionChange,
      openDialog,
      submit,
      remove,
      cancel
    }
  }
})
</script>
<style lang="scss" scoped>
.my-pile-class {
  padding: 10px 20px;
  ul {
    li {
      font-size: 14px;
      color: #333;
      line-height: 40px;
      span {
        padding-right: 20px;
      }
    }
  }
}
</style>
