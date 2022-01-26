<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t('yuan-gong-guan-li') }}</span>
        </div>
      </template>
      <qp-search
        :show-label="false"
        :data="searchData"
        @data-search="getList()"
        :btnText="$t('xin-zeng-yuan-gong')"
        showBtn
        @data-btnclick="addStaff"
      ></qp-search>
      <qp-table
        :showPage="false"
        :loading="loading"
        :columns="columns"
        :table-data="tableData"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #status>
          <el-table-column :label="$t('zhuang-tai')" align="center" fixed="right" width="100px">
            <template #default="scope">
              {{ getStatus(scope.row.status) }}
            </template>
          </el-table-column>
        </template>
        <template #operate>
          <el-table-column :label="$t('cao-zuo')" align="center" fixed="right" width="300px">
            <template #default="scope">
              <el-button size="mini" class="my-btn-class" @click="getInfo(scope.row.id, 0)">
                {{ $t('cha-kan') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="primary" @click="getInfo(scope.row.id, 1)">
                {{ $t('bian-ji') }}
              </el-button>
              <el-button
                size="mini"
                class="my-btn-class"
                :type="scope.row.status ? 'warning' : 'success'"
                @click="freezeAdmin(scope.row)"
              >
                {{ scope.row.status === 1 ? $t('dong-jie') : $t('jie-dong') }}
              </el-button>
              <el-button size="mini" class="my-btn-class" type="danger" @click="delFun(scope.row.id)">
                {{ $t('shan-chu') }}
              </el-button>
            </template>
          </el-table-column>
        </template>
      </qp-table>
      <el-dialog
        v-model="dialogInfo.isShow"
        :title="dialogInfo.title"
        :width="dialogInfo.type === 1 ? '40%' : '60%'"
        center
        :close-on-click-modal="false"
        @close="onCancel"
      >
        <el-form
          label-position="left"
          label-width="70px"
          :model="dialogInfo.userInfo"
          ref="form"
          :rules="dialogInfo.rules"
        >
          <el-row :gutter="20">
            <el-col :span="15">
              <el-form-item :label="$t('xing-ming')" prop="name" :required="dialogInfo.type === 1 ? false : true">
                <el-input
                  v-model="dialogInfo.userInfo.name"
                  maxlength="30"
                  show-word-limit
                  v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                ></el-input>
                <span v-if="dialogInfo.type === 1">{{ dialogInfo.userInfo.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('jiao-se')" prop="role" :required="dialogInfo.type === 1 ? false : true">
                <el-input
                  v-model="dialogInfo.userInfo.role"
                  maxlength="15"
                  show-word-limit
                  v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                ></el-input>
                <span v-if="dialogInfo.type === 1">{{ dialogInfo.userInfo.role }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('quan-xian')" :required="dialogInfo.type === 1 ? false : true">
                <el-select
                  v-model="dialogInfo.userInfo.authority"
                  :placeholder="$t('qing-xuan-ze')"
                  v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                >
                  <el-option
                    v-for="item in dialogInfo.roleList"
                    :key="item.id"
                    :label="item.role"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <span v-if="dialogInfo.type === 1">{{ dialogInfo.userInfo.authority }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('zhang-hao')" prop="userName" v-if="dialogInfo.type === 0" required>
                <el-input
                  v-model="dialogInfo.userInfo.userName"
                  v-if="dialogInfo.type === 0"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('zhang-hao')" v-else>
                <span>{{ dialogInfo.userInfo.userName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('mi-ma')" prop="password" v-if="dialogInfo.type === 0" required>
                <el-input
                  v-model="dialogInfo.userInfo.password"
                  v-if="dialogInfo.type === 0"
                  maxlength="16"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('mi-ma')" v-else>
                <span>{{ dialogInfo.userInfo.password }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('shou-ji-hao')" prop="phone" :required="dialogInfo.type === 1 ? false : true">
                <span v-if="dialogInfo.type === 1">{{ dialogInfo.userInfo.phone }}</span>
                <el-col :span="8" v-if="dialogInfo.type !== 1">
                  <el-select
                    v-model="dialogInfo.userInfo.phoneCode"
                    :placeholder="$t('qing-xuan-ze')"
                    v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                  >
                    <el-option
                      v-for="item in dialogInfo.phoneCode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="16" v-if="dialogInfo.type !== 1">
                  <el-input
                    v-model.number="dialogInfo.userInfo.phone"
                    maxlength="10"
                    show-word-limit
                    v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('you-xiang')" prop="email" :required="dialogInfo.type === 1 ? false : true">
                <span v-if="dialogInfo.type === 1">{{ dialogInfo.userInfo.email }}</span>
                <el-input
                  v-model="dialogInfo.userInfo.email"
                  maxlength="30"
                  show-word-limit
                  v-if="dialogInfo.type === 0 || dialogInfo.type === 2"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer v-if="dialogInfo.type === 0 || dialogInfo.type === 2">
          <span class="dialog-footer">
            <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
            <el-button type="primary" @click="onSubmit">{{ $t('bao-cun') }}</el-button>
          </span>
        </template>
        <template #footer v-else>
          <span class="dialog-footer">
            <el-button @click="onCancel">{{ $t('guan-bi') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, ref } from 'vue'
import { qpTable, qpSearch } from '/@/components/index'
import { staff } from './model/index'
import { useI18n } from 'vue-i18n'
import { resetFields } from '/@/utils/formExtend'

export default defineComponent({
  name: '',
  components: {
    qpTable,
    qpSearch
  },
  setup() {
    const { t } = useI18n()
    let form = ref(null)
    const { staffList, getList, getRole, addUser, freezeAdmin, delFun, getInfo } = staff()
    onMounted(() => {
      getRole()
      getList()
    })
    const addStaff = () => {
      staffList.dialogInfo.title = t('xin-zeng-yuan-gong')
      staffList.dialogInfo.isShow = true
      staffList.dialogInfo.type = 0
      staffList.dialogInfo.userInfo.authority = 1
      getRole()
    }
    const getStatus = (val) => {
      switch (val) {
        case 0:
          return t('yi-dong-jie')
        case 1:
          return t('shi-yong-zhong')
      }
    }
    const onSubmit = () => {
      form.value.validate((valid) => {
        if (valid) {
          addUser()
        }
      })
    }
    const onCancel = () => {
      resetFields(form.value)
      staffList.dialogInfo.userInfo.userName = ''
      staffList.dialogInfo.userInfo.password = ''
      staffList.dialogInfo.isShow = false
    }

    return {
      ...toRefs(staffList),
      form,
      onSubmit,
      onCancel,
      delFun,
      getList,
      getStatus,
      addStaff,
      getInfo,
      freezeAdmin
    }
  }
})
</script>
