<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ $t('ji-ben-xin-xi') }}</span>
      </div>
    </template>
    <div class="my-merchant-class">
      <div class="img">
        <ul>
          <li>
            <span>{{ $t('shang-jia-logo') }}</span>
            <qp-uploader fileType="image" ref="logoRef" :file-list="logoUrl" @file-change="onFileChange1" />
          </li>
          <li>
            <span>{{ $t('shang-jia-men-dian-zhao-pian') }}</span>
            <qp-uploader fileType="image" ref="imgRef" :file-list="images" @file-change="onFileChange2" />
          </li>
          <li>
            <span>{{ $t('shang-jia-he-tong') }}</span>
            <qp-uploader
              fileType="file"
              ref="fileRef"
              :placeholder="$t('zhi-chi-docdocxpdf-ge-shi-wen-jian')"
              :file-list="contractUrl"
              @file-change="onFileChange3"
            />
          </li>
        </ul>
      </div>
      <div class="info">
        <el-form ref="form" :model="formInfo" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="24" v-if="!merchantId">
              <el-form-item :label="$t('rvgas')" prop="phoneNo">
                <el-row :gutter="20">
                  <el-col :span="7">
                    <el-select v-model="formInfo.countryCode">
                      <el-option
                        v-for="item in phoneType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="17">
                    <el-input
                      v-model.number="formInfo.phoneNo"
                      maxlength="10"
                      show-word-limit
                      :placeholder="$t('qaz')"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="!merchantId">
              <el-form-item :label="$t('mi-ma')" prop="password">
                <el-input
                  v-model="formInfo.password"
                  show-word-limit
                  maxlength="16"
                  type="password"
                  show-password
                  :placeholder="$t('tbgsa')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="!merchantId">
              <el-form-item :label="$t('zai-ci-que-ren')" prop="checkPassword">
                <el-input
                  v-model="formInfo.checkPassword"
                  show-word-limit
                  maxlength="16"
                  type="password"
                  show-password
                  :placeholder="$t('tbgsa')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="merchantId">
              <el-form-item :label="$t('rvgas')">
                <span>{{ formInfo.phoneNo }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('qwex')" prop="corpName">
                <el-input
                  v-model="formInfo.corpName"
                  maxlength="50"
                  show-word-limit
                  :placeholder="$t('ijngs')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('dmna')">
                <el-input
                  v-model="formInfo.corpDesc"
                  maxlength="50"
                  show-word-limit
                  :placeholder="$t('majnj')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('shang-jia-ming-cheng')" prop="merchantName">
                <el-input
                  v-model="formInfo.merchantName"
                  maxlength="50"
                  show-word-limit
                  :placeholder="$t('oljs')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('mdkam')" prop="linkman">
                <el-input
                  v-model="formInfo.linkman"
                  maxlength="30"
                  show-word-limit
                  :placeholder="$t('okna')"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('ybfs')" prop="email">
                <el-input v-model="formInfo.email" :placeholder="$t('ybsa')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('qwxsa')" prop="accountPayee">
                <el-row>
                  <el-col :span="5">
                    <el-select v-model="formInfo.accountPayeeType">
                      <el-option
                        v-for="item in payType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="19">
                    <el-input
                      v-model="formInfo.accountPayee"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      show-word-limit
                      maxlength="30"
                      :placeholder="$t('tysb')"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('shui-hao')" prop="taxId">
                <el-input
                  v-model.number="formInfo.taxId"
                  show-word-limit
                  maxlength="11"
                  :placeholder="$t('moda')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('lmhs')" prop="greenCardNo">
                <el-input
                  v-model="formInfo.greenCardNo"
                  show-word-limit
                  maxlength="16"
                  :placeholder="$t('ghvs')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('fa-piao-ma-you-xiang')" :prop="emailVal ? 'pecEmail' : 'invoiceCode'">
                <el-row>
                  <el-col :span="8">
                    <el-select v-model="emailVal" @change="changeVal">
                      <el-option
                        v-for="item in emailType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="16">
                    <el-input
                      v-if="emailVal === 0"
                      v-model="formInfo.invoiceCode"
                      show-word-limit
                      maxlength="7"
                      :placeholder="$t('tgvs')"
                    ></el-input>
                    <el-input
                      v-if="emailVal === 1"
                      v-model="formInfo.pecEmail"
                      show-word-limit
                      maxlength="30"
                      :placeholder="$t('tgbs')"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('asdd')" prop="time">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="formInfo.weekStart" @change="checkWeek">
                      <el-option
                        v-for="item in weekList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" class="center">{{ $t('zhi') }}</el-col>
                  <el-col :span="3">
                    <el-select v-model="formInfo.weekEnd" @change="checkWeek">
                      <el-option
                        v-for="item in weekList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="14">
                    <el-time-picker
                      v-model="formInfo.time"
                      is-range
                      range-separator="-"
                      :start-placeholder="$t('kai-shi-shi-jian')"
                      :end-placeholder="$t('jie-shu-shi-jian')"
                      value-format="HH:mm"
                      format="HH:mm"
                    ></el-time-picker>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('pbsab')" prop="address">
                <el-row>
                  <el-col :span="2">{{ $t('najndk') }}</el-col>
                  <el-col :span="12">
                    <el-input
                      v-model="formInfo.address"
                      show-word-limit
                      maxlength="80"
                      readonly
                      :placeholder="$t('rvxgav')"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="23" :offset="1">
              <!-- componentRestrictions: { country: 'it' }, -->
              <GMapAutocomplete
                :placeholder="$t('qweyba')"
                class="mb-20"
                ref="mapSearch"
                :options="{
                  strictBounds: true
                }"
                @place_changed="setPlace"
              ></GMapAutocomplete>
              <GMapMap
                class="mb-20"
                :center="center"
                :zoom="12"
                :options="{ gestureHandling: 'cooperative' }"
                @click="addMarker"
              >
                <GMapMarker :key="id" :position="position" :clickable="true" :draggable="true" />
              </GMapMap>
            </el-col>
            <el-col :span="24" v-if="!merchantId">
              <el-form-item :label="$t('tui-guang-ma')" prop="promotionCode">
                <el-input
                  v-model.number="formInfo.promotionCode"
                  show-word-limit
                  maxlength="6"
                  :placeholder="$t('daslkd')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="my-center">
              <el-button @click="getDetail">{{ $t('wuesx') }}</el-button>
              <el-button type="primary" @click="addMerchantFn">{{ submitTxt }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, toRefs, watch, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Maps from './model/map'
import { getInfo } from './model/merchantEditModel'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { editDetail } from '/@/api/admin/merchant'
import { qpUploader } from '/@/components/index'
import { resetFields } from '/@/utils/formExtend'

export default defineComponent({
  name: '',
  components: { qpUploader },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const form = ref(null)
    const logoRef = ref(null)
    const imgRef = ref(null)
    const fileRef = ref(null)
    const logoUrl = ref([])
    const mapSearch = ref(null)
    const images = ref([])
    const contractUrl = ref([])
    const merchantId = route.query.id || ''
    const { merchantInfo, addMerchant } = getInfo()
    const { center, markers, addMarker } = Maps()
    onMounted(() => {
      if (merchantId) getDetail()
    })

    const getDetail = async () => {
      if (merchantId) {
        const res = await editDetail({
          merchantId: merchantId
        })
        if (res.data.code === 0) {
          merchantInfo.emailVal = res.data.data.invoiceCode ? 0 : 1
          merchantInfo.formInfo = res.data.data
          merchantInfo.formInfo.time = [res.data.data.dayStart, res.data.data.endStart]
          markers.position.lat = center.lat = merchantInfo.formInfo.latitude
          markers.position.lng = center.lng = merchantInfo.formInfo.longitude
          markers.pointInfo = merchantInfo.formInfo.address
          logoRef.value.fileList = [{ name: t('shang-jia-logo'), url: merchantInfo.formInfo.logoUrl }]
          logoRef.value.isMax = true
          imgRef.value.fileList = [{ url: merchantInfo.formInfo.images }]
          imgRef.value.isMax = true
          fileRef.value.fileList = [{ name: `${t('shang-jia-he-tong')}.pdf`, url: merchantInfo.formInfo.contractUrl }]
        }
      } else {
        resetFields(form.value)
        merchantInfo.formInfo.logoUrl = ''
        merchantInfo.formInfo.images = ''
        merchantInfo.formInfo.contractUrl = ''
        logoRef.value.fileList = []
        logoRef.value.isMax = false
        imgRef.value.fileList = []
        imgRef.value.isMax = false
        fileRef.value.fileList = []
      }
    }

    const setPlace = (res) => {
      markers.position.lat = center.lat = res.geometry.location.lat()
      markers.position.lng = center.lng = res.geometry.location.lng()
      markers.pointInfo = res.formatted_address
    }
    const submitTxt = computed(() => {
      if (merchantId) {
        return t('bao-cun')
      } else {
        return t('ybash')
      }
    })
    watch(markers, (value) => {
      merchantInfo.formInfo.latitude = value.position.lat
      merchantInfo.formInfo.longitude = value.position.lng
      merchantInfo.formInfo.address = value.pointInfo
    })
    watch(merchantInfo, (value) => {
      if (value.success) {
        mapSearch.value.$el.value = ''
        logoRef.value.fileList = []
        logoRef.value.isMax = false
        imgRef.value.fileList = []
        imgRef.value.isMax = false
        fileRef.value.fileList = []
        merchantInfo.formInfo.corpDesc = ''
        merchantInfo.formInfo.greenCardNo = ''
        merchantInfo.formInfo.promotionCode = ''
        merchantInfo.formInfo.longitude = ''
        merchantInfo.formInfo.latitude = ''
        if (merchantId) {
          router.push({ name: 'Merchant' })
        } else {
          resetFields(form.value)
        }
      }
    })

    const addMerchantFn = () => {
      form.value.validate((valid) => {
        if (!merchantInfo.formInfo.logoUrl) {
          ElMessage({
            message: t('qing-shang-chuan-shang-jia-logo'),
            type: 'warning'
          })
        } else if (!merchantInfo.formInfo.images) {
          ElMessage({
            message: t('qing-shang-chuan-men-dian-zhao-pian'),
            type: 'warning'
          })
        } else if (!merchantInfo.formInfo.contractUrl) {
          ElMessage({
            message: t('qing-shang-chuan-he-tong-wen-jian'),
            type: 'warning'
          })
        } else if (!merchantInfo.formInfo.longitude || !merchantInfo.formInfo.latitude) {
          ElMessage({
            message: t('qing-zai-di-tu-shang-xuan-ze-wei-zhi-xin-xi'),
            type: 'warning'
          })
        } else {
          if (valid) {
            if (merchantId) {
              addMerchant(merchantId)
            } else {
              addMerchant()
            }
          }
        }
      })
    }
    const checkWeek = () => {
      if (merchantInfo.formInfo.weekStart > merchantInfo.formInfo.weekEnd) {
        ElMessageBox.alert(t('qing-xuan-ze-zheng-que-de-ying-ye-shi-jian'), t('xi-tong-ti-shi'), {
          confirmButtonText: t('que-ding'),
          callback: (action) => {
            merchantInfo.formInfo.weekEnd = merchantInfo.formInfo.weekStart
          }
        })
      }
    }
    const onFileChange1 = (logoUrl) => {
      const filemap = logoUrl.map((v) => v.url)[0]
      merchantInfo.formInfo.logoUrl = filemap
    }
    const onFileChange2 = (images) => {
      const filemap = images.map((v) => v.url)[0]
      merchantInfo.formInfo.images = filemap
    }
    const onFileChange3 = (contractUrl) => {
      const filemap = contractUrl.map((v) => v.url)[0]
      merchantInfo.formInfo.contractUrl = filemap
    }
    const changeVal = () => {
      if (!merchantId) {
        if (merchantInfo.emailVal === 0) {
          form.value.clearValidate('pecEmail')
          merchantInfo.formInfo.pecEmail = ''
        } else {
          form.value.clearValidate('invoiceCode')
          merchantInfo.formInfo.invoiceCode = ''
        }
      }
    }
    return {
      center,
      form,
      merchantId,
      ...toRefs(merchantInfo),
      ...toRefs(markers),
      addMarker,
      submitTxt,
      setPlace,
      addMerchantFn,
      checkWeek,
      getDetail,
      logoUrl,
      images,
      contractUrl,
      onFileChange1,
      onFileChange2,
      onFileChange3,
      resetFields,
      logoRef,
      imgRef,
      fileRef,
      changeVal,
      mapSearch
    }
  }
})
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
.my-center {
  text-align: center;
}
.center {
  text-align: center;
}
.vue-map-container {
  width: 100%;
  height: 500px;
}
.pac-target-input {
  width: 100%;
  height: 40px;
  border: 1px solid #ededed;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  padding: 10px;
}
.my-merchant-class {
  display: flex;
  justify-content: flex-start;
  .img {
    width: 260px;
    height: 100%;
    text-align: center;
    ul {
      li {
        margin-bottom: 20px;
        span {
          font-size: 16px;
          color: #666;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
