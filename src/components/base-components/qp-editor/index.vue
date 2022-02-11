<template>
  <div ref="editor"></div>
</template>

<script>
import WangEditor from 'wangeditor'
import { defineComponent, onMounted, ref, onBeforeUnmount, watch } from 'vue'
import axios from 'axios'
import { store } from '/@/store/index'
import { ElMessage } from 'element-plus'
import { fileExt } from '/@/utils/file'
export default defineComponent({
  name: 'qp-editor',
  components: { WangEditor },
  props: {
    modelValue: {
      String,
      default: ''
    }
  },
  setup(props, context) {
    const editor = ref()
    const content = ref()

    let instance
    onMounted(() => {
      content.value = props.modelValue

      instance = new WangEditor(editor.value)

      instance.config.height = 600

      instance.config.zIndex = 100

      instance.config.uploadImgShowBase64 = true

      // instance.config.uploadImgServer = import.meta.env.VITE_BASE_API + '/common/uploadFile' // 填写配置服务器端地址
      // instance.config.uploadImgHeaders = {
      // Authorization: store.state.layout.token.ACCESS_TOKEN
      // } // 自定义 header
      // instance.config.uploadFileName = 'file' // 后端接受上传文件的参数名
      // instance.config.uploadImgParams = {
      // fileType: 'png'
      // }
      instance.config.uploadImgAccept = ['jpg', 'jpeg', 'png']

      instance.config.uploadImgMaxSize = 20 * 1024 * 1024 // 将图片大小限制为 20M
      instance.config.uploadImgMaxLength = 50 // 限制一次最多上传 6 张图片
      instance.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      instance.config.showLinkImg = false

      instance.config.onchangeTimeout = 10000

      instance.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      instance.config.colors = [
        '#000000',
        '#ffffff',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#55b1d2',
        '#ffffe0',
        '#afeeee',
        '#00ff00'
      ]

      instance.config.uploadImgHooks = {
        // 上传图片之前
        before: function (xhr, editor, files) {
          instance.config.uploadImgParams = {
            fileType: fileExt(files[0].name)
          }
          // // 可阻止图片上传
          // return {
          //   prevent: true,
          //   msg: '需要提示给用户的错误信息'
          // }
        },
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log('result: ', result)
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          console.log('editor: ', editor)
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          console.log('result: ', result)
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          if (result.code == 0) {
            let url = result.data.fileUrl
            JSON.stringify(url)
            insertImg(url)
          } else {
            ElMessage.error(result.message)
          }
          // }
        }
      }

      instance.config.customUploadImg = (files, insert) => {
        var formData = new FormData()
        for (var i = 0; i < files.length; i++) {
          formData.append('file', files[i])
          formData.append('fileType', fileExt(files[i].name))
        }

        axios
          .post(import.meta.env.VITE_BASE_API + '/common/uploadFile', formData, {
            // 上传图片接口
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: store.state.layout.token.ACCESS_TOKEN
            }
          })
          .then((result) => {
            console.log('result: ', result)
            if (result.data.code == 0) {
              let url = result.data.data.fileUrl
              JSON.stringify(url)
              insert(url)
            } else {
              ElMessage.error(result.data.message)
            }
          })
      }

      instance.config.onchange = (html) => {
        content.value = html
      }

      instance.create()
    })

    watch(
      () => props.modelValue,
      (val) => {
        if (val && val.length > 0) {
          if (val !== content.value) {
            setContent(val)
          }
        } else {
          setContent('')
        }
      }
    )

    watch(content, (val) => {
      context.emit('update:modelValue', val)
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    const setContent = (val) => {
      instance.txt.html(val)
    }
    return { editor, content }
  }
})
</script>
