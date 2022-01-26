<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('fa-bu-gong-gao') }}</span>
      </div>
    </template>
    <el-form ref="form" :model="announcementInfo" label-position="top" label-width="120px">
      <el-form-item :label="$t('shu-ru-biao-ti')">
        <el-input v-model.trim="announcementInfo.title" clearable show-word-limit maxlength="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('shu-ru-zheng-wen')">
        <el-input
          :rows="5"
          type="textarea"
          show-word-limit
          maxlength="200"
          clearable
          v-model.trim="announcementInfo.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('fa-bu') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { addNotice } from '/@/api/admin/operation'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const announcementInfo = reactive({
      title: '',
      content: ''
    })
    const onSubmit = async () => {
      if (!announcementInfo.title) {
        ElMessage({
          message: t('qing-shu-ru-biao-ti'),
          type: 'warning'
        })
      } else if (!announcementInfo.content) {
        ElMessage({
          message: t('qing-shu-ru-zheng-wen'),
          type: 'warning'
        })
      } else {
        const res = await addNotice({
          content: announcementInfo.content,
          title: announcementInfo.title,
          createTime: new Date()
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('fa-bu-cheng-gong'),
            type: 'success'
          })
          router.push({ name: 'OpAnnouncement' })
        }
      }
    }
    const onCancel = () => {
      router.push({ name: 'OpAnnouncement' })
    }
    return {
      announcementInfo,
      onSubmit,
      onCancel
    }
  }
})
</script>
