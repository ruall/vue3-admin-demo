<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('quan-xian-guan-li') }}</span>
        </div>
      </template>
      <el-button type="primary" @click="addAuth">{{ $t('xin-zeng-quan-xian') }}</el-button>
      <qp-table :showPage="false" :loading="loading" :columns="columns" :table-data="tableData">
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="260px">
            <template #default="scope">
              <el-button size="mini" class="my-btn-class" type="primary" @click="edit(scope.row)">
                {{ $t('bian-ji') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="danger" @click="del(scope.row)">
                {{ $t('shan-chu') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <el-dialog v-model="isShow" :title="title" width="50%" center :close-on-click-modal="false" @close="cancel">
        <el-form label-position="top" label-width="100px" :model="authInfo">
          <el-form-item :label="$t('quan-xian-ming-cheng')" class="my-form-item">
            <el-input v-model="authInfo.name" class="my-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('ke-fang-wen-cao-zuo-mo-kuai')">
            <el-tree
              :data="authInfo.routeList"
              ref="routeTree"
              show-checkbox
              node-key="permId"
              default-expand-all
              check-on-click-node
              :props="defaultProps"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">{{ $t('qu-xiao') }}</el-button>
            <el-button type="primary" @click="save(routeTree)">{{ $t('bao-cun') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref, toRefs, nextTick, onMounted, watch } from 'vue'
import { qpTable } from '/@/components/index'
import { authority } from './model/index'

export default defineComponent({
  name: '',
  components: { qpTable },
  setup() {
    const { getList, authorityList, dialogInfo, add, edit, del, save } = authority()
    const routeTree = ref()
    watch(
      () => dialogInfo.authInfo.checkedList,
      async (val) => {
        if (val.length > 0) {
          await nextTick()
          routeTree.value.setCheckedKeys(dialogInfo.authInfo.checkedList)
        }
      }
    )
    const cancel = async () => {
      dialogInfo.isShow = false
      await nextTick()
      dialogInfo.authInfo.checkedList = []
      routeTree.value.setCheckedKeys([])
    }
    const addAuth = async () => {
      add()
      await nextTick()
      routeTree.value.setCheckedKeys([])
    }
    onMounted(() => getList())
    return {
      ...toRefs(authorityList),
      ...toRefs(dialogInfo),
      routeTree,
      addAuth,
      del,
      edit,
      cancel,
      save
    }
  }
})
</script>
<style lang="scss" scoped>
.my-form-item {
  display: flex;
}
.my-input {
  width: 200px;
  margin-left: 20px;
}
.el-tree {
  width: 100%;
  max-height: 400px;
  overflow: scroll;
  border: 1px solid #ededed;
}
</style>
