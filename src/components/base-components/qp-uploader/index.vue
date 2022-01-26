<template>
  <div>
    <el-upload
      v-if="!loading"
      :list-type="fileType === 'image' ? 'picture-card' : 'text'"
      :action="`${baseUrl}${path}`"
      name="file"
      :class="{ isHidden: isMax }"
      :file-list="fileList"
      :headers="headers"
      :data="data"
      :disabled="disabled"
      :limit="limit"
      :on-success="onHandleImageSuccess"
      :on-preview="handlePreview"
      :on-exceed="onExceed"
      :on-change="onChange"
      :on-remove="onRemove"
      :before-upload="onImageBeforeUpload"
    >
      <i v-if="fileType === 'image'" class="el-icon-plus"></i>
      <el-button v-else>{{ $t('shang-chuan') }}</el-button>
      <template #tip>
        <div class="el-upload__tip" v-if="!loading">{{ placeholderStr }}</div>
      </template>
    </el-upload>
    <div class="w-20 h-20 loading-box flex justify-center items-center" v-else-if="loading">
      <i class="el-icon-loading"></i>
      <i>{{ $t('shang-chuan-zhong') }}</i>
    </div>
    <el-dialog v-model="dialogVisible" append-to-body style="text-align: center">
      <img style="width: 100%" :src="imageUrl" alt />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, PropType, onMounted, watch, computed } from 'vue'
import { store } from '/@/store/index'
import { ElMessage } from 'element-plus'
import { fileExt } from '/@/utils/file'
import Compressor from 'compressorjs'
import { preview } from '/@/utils/file'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'qp-uploader',
  props: {
    fileType: {
      type: String as PropType<string>,
      default: 'image',
      validator: (val: string) => {
        return ['image', 'file'].includes(val)
      }
    },
    path: {
      type: String as PropType<string>,
      default: '/common/uploadFile'
    },
    limit: {
      type: Number as PropType<number>,
      default: 1
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<Boolean>,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 9999
    },
    height: {
      type: Number,
      default: 9999
    }
  },
  emits: ['file-change'],
  setup(props, { emit }) {
    const { t, locale } = useI18n()
    const state = reactive({
      baseUrl: import.meta.env.VITE_BASE_API,
      headers: {
        Authorization: 'bearer ' + store.state.layout.token.ACCESS_TOKEN,
        'Language-Type': locale
      },
      data: {
        fileType: 'png'
      },
      fileList: [],
      loading: false,
      isMax: false,
      dialogVisible: false,
      imageUrl: ''
    })

    const { width, height } = toRefs(props)

    const placeholderStr = computed(() => {
      if (props.placeholder.length > 0) {
        return props.placeholder
      }
      return `${t('mksadl')}`
    })

    watch(
      () => props.fileList,
      (val) => {
        if (val.length > 0) {
          // @ts-ignore
          state.fileList = val
        } else {
          state.fileList = []
        }

        if (val.length >= props.limit) {
          state.isMax = true
        } else {
          state.isMax = false
        }
      },
      { deep: true }
    )

    const onHandleImageSuccess = (response: any, file: any, fileList: any) => {
      if (response.code === 0) {
        ElMessage.success(t('mklans'))
        // @ts-ignore
        state.fileList.push({ url: response.data.fileUrl, name: file.name })
        state.loading = false
        emit('file-change', state.fileList)
      } else {
        ElMessage.error(response.message)
      }
    }

    const onImageBeforeUpload = (file: any) => {
      const ext = fileExt(file.name)
      state.data.fileType = ext
      state.loading = true
      if (props.fileType === 'image') {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        const size = file.size / 1024 / 1024 < 20
        if (!isImage) {
          state.loading = false
          ElMessage.error(`${t('hgfsas')}!`)
          return false
        }
        if (!size) {
          state.loading = false
          ElMessage.error(`${t('fabsdja')}!`)
          return false
        }
        const compressor = new Promise((resolve) => {
          // compressorjs 默认开启 checkOrientation 选项
          // 会将图片修正为正确方向
          new Compressor(file, {
            quality: 0.6,
            success: resolve,
            error(err) {
              state.loading = false
              ElMessage.error(err.message)
              console.log(err.message)
            }
          })
        })
        // const isSize = new Promise((resolve, reject) => {
        //   let _URL = window.URL || window.webkitURL
        //   let img = new Image()
        //   img.onload = function () {
        //     let valid = img.width <= width.value && img.height <= height.value
        //     if (valid) {
        //       // @ts-ignore
        //       resolve()
        //     } else {
        //       reject()
        //     }
        //   }
        //   img.src = _URL.createObjectURL(file)
        // }).then(
        //   () => {
        //     return file
        //   },
        //   () => {
        //     state.loading = false
        //     ElMessage.error(`上传图片尺寸要小于${width.value}*${height.value}px`)
        //     return Promise.reject()
        //   }
        // )

        // return Promise.all([compressor, isSize])
        return compressor
      } else {
        const isFile = file.type === 'application/pdf'
        if (!isFile) {
          state.loading = false
          ElMessage.error(`${t('knjsa')}!`)
          return false
        }
        return isFile
      }
    }

    const onChange = (file: any, fileList: []) => {
      if (file && file.status === 'success') {
        if (fileList.length >= props.limit) {
          state.isMax = true
        } else {
          state.isMax = false
        }
      }
    }

    const onRemove = (file: any, fileList: []) => {
      if (file && file.status === 'success') {
        state.fileList = fileList
      }
      if (fileList.length >= props.limit) {
        state.isMax = true
      } else {
        state.isMax = false
      }
      emit('file-change', state.fileList)
    }

    const onExceed = () => {
      ElMessage.warning(
        `${t('njhvh')}${props.limit}${t('zhang')}${props.fileType === 'image' ? t('tu-pian') : t('ubhbh')}~`
      )
    }

    const handlePreview = (file: any) => {
      if (fileExt(file.url) === 'jpg' || fileExt(file.url) === 'png' || fileExt(file.url) === 'jpeg') {
        state.imageUrl = file.url
        state.dialogVisible = true
      } else if (fileExt(file.url) === 'pdf') {
        preview(file.url)
      }
    }

    return {
      ...toRefs(state),
      onHandleImageSuccess,
      onImageBeforeUpload,
      onExceed,
      onChange,
      onRemove,
      handlePreview,
      placeholderStr
    }
  }
})
</script>

<style lang="scss">
.isHidden .el-upload--picture-card {
  display: none;
}

.el-upload-list__item {
  display: block !important;
  width: 148px !important;
}
</style>
