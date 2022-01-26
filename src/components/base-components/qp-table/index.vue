<!-- 全局列表方法 -->
<template>
  <div class="my-table">
    <div class="my-table-container">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :highlight-current-row="highlightCurrentRow"
        :stripe="stripe"
        max-height="630px"
        style="width: 100%"
        @select-all="handleSelectionChange"
        @selection-change="handleSelectionChange"
        @current-change="handleRadioChange"
      >
        <el-table-column align="center" v-if="showSelection" type="selection" width="55" />
        <el-table-column v-if="showIndex" type="index" align="center" :label="$t('xu-hao')" fixed="left" width="50">
          <template #default="scope">
            <span>{{ (pageNo - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <template v-for="(column, index) of columns">
          <slot v-if="column.slot" :name="column.slot" />
          <el-table-column
            v-else
            show-overflow-tooltip
            align="center"
            class-name="tooltip"
            :key="index"
            :prop="column.prop"
            :label="column.label"
            :width="column.width || ''"
          />
        </template>
      </el-table>
    </div>
    <div class="my-table-pagination" v-if="showPage">
      <el-pagination
        class="flex justify-center"
        background
        :current-page="pageNo"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'qp-table',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showPage: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showSort: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    // 翻页的属性
    showPagination: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: Number,
      default: 0
    },
    pageNo: {
      type: Number,
      default: 1
    }
  },
  emits: ['handleSelectionChange', 'handleCurrentChange', 'handleRadioChange'],
  setup(props, { emit, attrs }) {
    const { t } = useI18n()
    const tableRef = ref(null)
    const onChangeSort = (val) => {
      console.log(val)
    }

    const handleSelectionChange = (selection) => {
      emit('handleSelectionChange', selection)
    }
    const handleRadioChange = (selection) => {
      emit('handleRadioChange', selection)
    }
    // 翻页方法
    const handleCurrentChange = (currentPage) => {
      emit('handleCurrentChange', currentPage)
    }

    //清除所有选中状态
    const clearTable = () => {
      tableRef.value.clearSelection()
    }
    //清除某一项选中状态
    const clearRow = (row, isCheck) => {
      tableRef.value.toggleRowSelection(row, isCheck)
    }
    return {
      onChangeSort,
      handleSelectionChange,
      handleRadioChange,
      handleCurrentChange,
      tableRef,
      clearTable,
      clearRow
    }
  }
})
</script>

<style lang="scss" scoped>
.my-table :deep(.el-table) {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
  td {
    height: 50px;
    line-height: 50px;
    padding: 0;
  }
  th {
    height: 50px;
    line-height: 50px;
    padding: 0;
  }
}
.my-table {
  &-container {
    margin: 20px 0;
  }
}
</style>
