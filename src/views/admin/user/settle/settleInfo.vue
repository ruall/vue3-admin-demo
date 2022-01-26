<template>
  <div>
    <el-card>
      <div class="my-settle-class">
        <div class="img">
          <ul>
            <li>
              <span>{{ $t('shang-jia-logo') }}</span>
              <img :src="info.logoUrl" alt="" />
            </li>
            <li>
              <span>{{ $t('tvbha') }}</span>
              <img :src="info.images" alt="" />
            </li>
            <li>
              <span>{{ $t('shang-jia-he-tong') }}</span>
              <qp-uploader
                ref="fileRef"
                fileType="file"
                :placeholder="$t('zhi-chi-docdocxpdf-ge-shi-wen-jian')"
                :file-list="contractUrl"
                @file-change="onFileChange"
              />
            </li>
          </ul>
        </div>
        <div class="info">
          <ul>
            <li>
              <span>{{ $t('ubdusa') }}：{{ info.phoneNo }}</span>
            </li>
            <li>
              <span>{{ $t('shang-jia-ming-cheng') }}：{{ info.merchantName }}</span>
            </li>
            <li>
              <span>{{ $t('mdkam') }}：{{ info.linkman }}</span>
            </li>
            <!-- <li>
              <span>{{ $t('ybfs') }}：{{info.email}}</span>
            </li> -->
            <li>
              <span>{{ $t('asdd') }}：{{ info.bizTime }}</span>
            </li>
            <li>
              <span>{{ $t('qwxsa') }}：{{ info.accountPayee }}</span>
            </li>
            <li>
              <span>{{ $t('shui-hao') }}：{{ info.taxId }}</span>
              <span>{{ $t('lmhs') }}：{{ info.greenCardNo }}</span>
            </li>
            <li>
              <span>{{ $t('asegh') }}：{{ info.invoiceCode }}</span>
              <span>{{ $t('vdca') }}：{{ info.pecEmail }}</span>
            </li>
            <li>
              <span>{{ $t('pbsab') }}：{{ info.address }}</span>
            </li>
            <li>
              <span>{{ $t('ubsaa') }}：{{ info.longitude }}</span>
              <span>{{ $t('dbahb') }}：{{ info.latitude }}</span>
            </li>
            <li>
              <span>{{ $t('tui-guang-ma') }}：{{ info.promotionCode }}</span>
            </li>
            <li class="submit">
              <span>{{ $t('tradc') }}：</span>
              <el-radio v-model="form.type" label="0">{{ $t('tgsd') }}</el-radio>
              <el-radio v-model="form.type" label="1">{{ $t('mkds') }}</el-radio>
              <el-input
                v-if="form.type === '1'"
                v-model="form.text"
                :rows="2"
                type="textarea"
                :placeholder="$t('ubsdbu')"
              />
              <div class="btn">
                <el-button @click="onCancel">{{ $t('qu-xiao') }}</el-button>
                <el-button type="primary" @click="onSubmit">{{ $t('que-ding') }}</el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, onMounted, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detailForCheck, enterCheck } from '/@/api/admin/merchant'
import { qpUploader } from '/@/components/index'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: { qpUploader },
  name: '',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const contractUrl = ref([])
    const fileRef = ref(null)
    const id = route.query.id || ''
    const submitInfo = reactive({
      form: {
        type: '0',
        text: '',
        url: ''
      }
    })
    const merchantDetail = reactive({
      info: {}
    })
    const getDetail = async () => {
      const res = await detailForCheck({ merchantId: id })
      if (res.data.code === 0) {
        merchantDetail.info = res.data.data
      }
    }
    onMounted(() => {
      getDetail()
    })
    const onFileChange = (contractUrl) => {
      const filemap = contractUrl.map((v) => v.url)[0]
      submitInfo.form.url = filemap
    }
    const onCancel = () => {
      submitInfo.form.url = ''
      submitInfo.form.text = ''
      submitInfo.form.type = '0'
      fileRef.value.fileList = []
      router.push({ name: 'Settle' })
    }
    const onSubmit = async () => {
      let isReq = false
      if (submitInfo.form.type === '0') {
        if (!submitInfo.form.url) {
          ElMessage({
            message: t('qing-shang-chuan-he-tong-wen-jian'),
            type: 'warning'
          })
          isReq = false
        } else {
          isReq = true
        }
      } else {
        if (!submitInfo.form.text) {
          ElMessage({
            message: t('qing-tian-xie-ju-jue-li-you'),
            type: 'warning'
          })
          isReq = false
        } else {
          isReq = true
        }
      }
      if (isReq) {
        const res = await enterCheck({
          contractUrl: submitInfo.form.url,
          isPass: submitInfo.form.type === '0' ? 1 : 0,
          merchantId: id,
          reason: merchantDetail.info.text
        })
        if (res.data.code === 0) {
          ElMessage({
            message: t('cao-zuo-cheng-gong'),
            type: 'success'
          })
          router.push({ name: 'Settle' })
        }
      }
    }
    return {
      ...toRefs(submitInfo),
      ...toRefs(merchantDetail),
      contractUrl,
      onFileChange,
      onCancel,
      onSubmit,
      fileRef
    }
  }
})
</script>
<style lang="scss" scoped>
.my-settle-class {
  padding: 10px 20px;
  overflow: hidden;
  .img {
    width: 200px;
    padding: 0 20px;
    text-align: center;
    float: left;
    ul {
      li {
        width: 100%;
        margin-bottom: 20px;
        img {
          width: 130px;
          margin: 0 10px;
        }
      }
    }
  }
  .info {
    float: left;
    ul {
      li {
        font-size: 14px;
        color: #333;
        line-height: 40px;
        &.submit {
          margin-top: 30px;
        }
        .btn {
          margin-top: 20px;
        }
        span {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
