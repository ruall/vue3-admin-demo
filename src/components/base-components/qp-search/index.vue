<!-- 全局公共搜索方法 -->
<template>
  <!-- <el-card class="header-search"> -->
  <el-form ref="formRef" :model="initData" :inline="true" class="my-form-class">
    <el-form-item
      v-for="(item, name, index) in initData"
      :key="index"
      :label="showLabel ? item.label : ''"
      :prop="item.prop && name"
    >
      <el-input
        v-if="!item.type"
        v-model="item.val"
        :style="{ width: item.width + 'px' }"
        clearable
        :prefix-icon="item.showIcon ? item.showIcon : ''"
        :placeholder="inputComputed(item.label)"
      />
      <el-date-picker
        v-if="item.type === 'time'"
        v-model="item.val"
        type="date"
        format="YYYY-MM-DD"
        placeholder="选择日期"
        clearable
      />
      <el-date-picker
        v-if="item.type === 'timerange'"
        v-model="item.val"
        type="datetimerange"
        :editable="false"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
        clearable
        :default-time="defaultTime"
      />
      <el-select v-if="item.type === 'select'" v-model="item.val" :placeholder="item.label" clearable>
        <el-option v-for="data in item.list" :key="data.val" :label="data.label" :value="data.val" />
      </el-select>
      <el-cascader
        v-if="item.type === 'cascader'"
        v-model="item.val"
        :options="item.list"
        :props="{ checkStrictly: true }"
        clearable
      />
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmitForm()">搜索</el-button>
    <el-button v-if="showReset" icon="el-icon-refresh" @click="onResetForm()">重置</el-button>
    <el-button type="primary" v-if="showExport" @click="exportBtn()">导出数据</el-button>
    <el-button type="primary" v-if="showBtn" @click="btnClick()">{{ btnText }}</el-button>
    <el-button v-for="(item, index) in btnList" :key="index" :type="item.type" @click="item.fun(item.obj)">
      {{ item.name }}
    </el-button>
  </el-form>
  <!-- </el-card> -->
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  name: 'qp-search',
  props: {
    data: {
      type: [Array, Object],
      default: () => []
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    showExport: {
      type: Boolean,
      default: false
    },
    showReset: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    btnText: String,
    btnList: {
      type: [Array, Object] as any,
      default: []
    }
  },
  emits: ['data-search', 'data-export', 'data-btnclick'],
  setup(props, context) {
    const initData = props.data as any
    const showLabel = props.showLabel as any
    const showExport = props.showExport as any
    const formRef = ref()

    const inputComputed = computed(() => {
      return (val: any) => {
        return `请输入${val}`
      }
    })

    const onSubmitForm = () => {
      context.emit('data-search', initData)
    }
    const exportBtn = () => {
      context.emit('data-export')
    }
    const btnClick = () => {
      context.emit('data-btnclick')
    }

    const onResetForm = () => {
      formRef.value.resetFields()
      for (const item in initData) {
        if (initData[item].val !== '') {
          initData[item].val = ''
        }
      }
    }

    const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

    return {
      initData,
      showLabel,
      showExport,
      exportBtn,
      formRef,
      inputComputed,
      onSubmitForm,
      onResetForm,
      defaultTime,
      btnClick
    }
  }
})
</script>
<style lang="scss" scoped>
.my-form-class {
  display: inline-block;
}
</style>
