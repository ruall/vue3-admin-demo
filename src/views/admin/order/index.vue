<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('ding-dan-lie-biao') }}</span>
      </div>
    </template>
    <qp-search
      :show-label="false"
      showExport
      :data="searchData"
      @data-search="searchFun"
      @data-export="exportExcels"
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
        <el-table-column :label="$t('zu-jie-shi-jian')" align="center" width="180px">
          <template v-slot="scope">{{ time(new Date(scope.row.createTime)) }}</template>
        </el-table-column>
      </template>
      <template #payType>
        <el-table-column :label="$t('zhi-fu-fang-shi')" align="center" width="120px">
          <template v-slot="scope">{{ PayPalType(scope.row.payType) }}</template>
        </el-table-column>
      </template>
      <template #status>
        <el-table-column :label="$t('ding-dan-zhuang-tai')" align="center" width="120px">
          <template v-slot="scope">{{ pType(scope.row.status) }}</template>
        </el-table-column>
      </template>
      <template #operate>
        <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="180px">
          <template #default="scope">
            <el-button size="mini" @click="getOrderInfo(scope.row)">{{ $t('cha-kan') }}</el-button>
            <span v-if="scope.row.status !== 5 && scope.row.status !== 6" class="my-btn-class">
              <el-button size="mini" type="danger" v-if="scope.row.status === 3" @click="deduction(scope.row)">
                {{ $t('kou-chu-ya-jin') }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.status === 2 && scope.row.totalAmount != 0"
                @click="refund(0, scope.row)"
              >
                {{ $t('tui-kuan') }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.status === 0 || scope.row.status === 1"
                @click="refund(1, scope.row)"
              >
                {{ $t('shou-dong-jie-suan') }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </template>
    </qp-table>
    <!--弹出框-->
    <el-dialog
      v-model="dialogInfo.dialogVisible"
      :title="dialogInfo.title"
      width="40%"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form
        ref="refundRef"
        :model="dialogInfo.orderInfo"
        label-width="150px"
        class="demo-ruleForm"
        :rules="dialogInfo.rules"
        label-position="left"
      >
        <el-form-item :label="$t('ding-dan-hao')">
          <span>{{ dialogInfo.orderInfo.id }}</span>
        </el-form-item>
        <el-form-item :label="$t('yong-hu-zhang-hao')">
          <span>{{ dialogInfo.orderInfo.phone }}</span>
        </el-form-item>
        <el-form-item :label="$t('zu-jie-shi-chang')">
          <span>{{ dialogInfo.orderInfo.time }}</span>
        </el-form-item>
        <el-form-item :label="$t('ding-dan-jin-e')">
          <span>€ {{ dialogInfo.orderInfo.price }}</span>
        </el-form-item>
        <el-form-item :label="$t('tui-kuan-fang-shi')" v-if="dialogInfo.type === 0">
          <span>{{ dialogInfo.orderInfo.status }}</span>
        </el-form-item>
        <el-form-item
          :label="dialogInfo.type === 0 ? $t('shu-ru-tui-kuan-jin-e') : $t('shu-ru-jie-suan-jin-e')"
          prop="money"
        >
          <!-- (/[^\d.]/g,'').replace(/^\./g,'').replace(/\.{2,}/g,'.') -->
          <el-input
            type="text"
            v-model="dialogInfo.orderInfo.money"
            oninput="value=value.replace(/[^0-9]{0,1}(\d*(?:\.\d{0,1})?).*$/g, '$1')"
            clearable
            @input="checkVal"
            :placeholder="$t('qing-shu-ru-jine-jing-que-dao-xiao-shu-dian-hou-yi-wei')"
          />
        </el-form-item>

        <el-form-item
          :label="dialogInfo.type === 0 ? $t('tui-kuan-li-you') : $t('shou-dong-jie-suan-li-you')"
          prop="txt"
        >
          <el-input
            v-model="dialogInfo.orderInfo.txt"
            class="my-textarea-input"
            maxlength="50"
            :placeholder="$t('qing-shu-ru-li-you')"
            show-word-limit
            rows="2"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">{{ $t('qu-xiao') }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ $t('que-ding') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script>
import { defineComponent, toRefs, onMounted, ref, onBeforeUnmount } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { order } from './model/index'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import _ from 'lodash'

export default defineComponent({
  name: 'orderList',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const refundRef = ref(null)
    const { t } = useI18n()
    const router = useRouter()
    let timer = null
    const { getLists, orderList, refund, deduction, closeDialog, submitDialog, exportExcels } = order()
    onMounted(() => {
      getLists()
      timer = setInterval(() => {
        getLists()
      }, 1000 * 60)
    })
    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null
    })
    const pType = (val) => {
      switch (val) {
        case 0:
          return t('zu-jie-zhong')
        case 1:
          return t('dai-zhi-fu')
        case 2:
          return t('yi-wan-cheng')
        case 3:
          return t('yi-yu-qi')
        case 4:
          return t('tui-kuan-zhong')
        case 5:
          return t('yi-tui-kuan')
        case 6:
          return t('yi-kou-ya-jin')
      }
    }
    const PayPalType = (val) => {
      switch (val) {
        case 0:
          return t('yu-e')
        case 1:
          return 'PayPal'
        case 4:
          return t('ya-jin-zhi-fu')
      }
    }
    const handleCurrentChange = (currentPage) => {
      orderList.pageNo = currentPage
      getLists()
    }
    const searchFun = _.debounce(() => {
      orderList.pageNo = 1
      getLists()
    }, 500)
    const getOrderInfo = (row) => {
      router.push({ name: 'OrderInfo', query: { id: row.id } })
    }
    const time = (date) => {
      return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : ''
    }
    const onSubmit = () => {
      refundRef.value.validate((valid) => {
        if (valid) {
          submitDialog()
        }
      })
    }
    const checkVal = (val) => {
      if (!val.includes('.') && val) {
        orderList.dialogInfo.orderInfo.money = parseInt(val)
      }
    }
    return {
      ...toRefs(orderList),
      exportExcels,
      pType,
      PayPalType,
      refund,
      deduction,
      time,
      getLists,
      closeDialog,
      submitDialog,
      getOrderInfo,
      handleCurrentChange,
      searchFun,
      onSubmit,
      refundRef,
      checkVal
    }
  }
})
</script>
<style lang="scss">
.my-btn-class {
  margin-left: 10px;
}
.my-page-class {
  margin-top: 10px;
}
.el-loading-spinner {
  text-align: -webkit-center;
}
.my-dialog-class {
  width: 100%;
  padding: 10px 20px;
  span {
    font-size: 14px;
    &:first-of-type {
      color: #333;
    }
    &:last-of-type {
      color: #999;
    }
  }
  .my-number-input {
    display: block;
    width: 100%;
    margin-top: 10px;
    input {
      text-align: left;
    }
  }
  .my-textarea-input {
    margin-top: 10px;
  }
}
</style>
