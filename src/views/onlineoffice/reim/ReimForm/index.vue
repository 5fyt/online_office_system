<template>
  <el-dialog
    width="800px"
    :close-on-click-modal="false"
    v-model="visible"
    :show-close="false"
    center
  >
    <div id="pdfDom">
      <img :src="qrCodeBase64" class="qrCode" />
      <h2 class="title">
        费&nbsp;&nbsp;&nbsp;用&nbsp;&nbsp;&nbsp;报&nbsp;&nbsp;&nbsp;销&nbsp;&nbsp;&nbsp;单
      </h2>
      <div class="top-info-container">
        <span class="info">报销部门：{{ reimFormInfo.department }}</span>
        <span class="info">报销人：{{ reimFormInfo.name }}</span>
        <span class="info">报销日期：{{ reimFormInfo.date }}</span>
      </div>
      <div class="reim-table-container">
        <table class="reim-table">
          <tr>
            <th width="30%">报销项目</th>
            <th width="34%">备注</th>
            <th width="20%">类别</th>
            <th width="16%">金额</th>
          </tr>
          <tr v-for="one in reimFormInfo.content">
            <td align="center">{{ one.title }}</td>
            <td align="center">{{ one.description }}</td>
            <td>{{ one.type }}</td>
            <td align="center">{{ one.money ? one.money + '元' : '' }}</td>
          </tr>
          <tr>
            <th>报销合计</th>
            <td colspan="3">{{ reimFormInfo.total }}元</td>
          </tr>
          <tr>
            <th>人民币大写</th>
            <td colspan="3">{{ smalltoBIG(Number(reimFormInfo.total)) }}</td>
          </tr>
          <tr>
            <td colspan="5">
              <div class="info-container">
                <span class="info">借款金额：{{ reimFormInfo.debit }}元</span>
                <span class="info">应退金额：{{ computeBackMoney }}元</span>
                <span class="info">应补金额：{{ computeReturnMoney }}元</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="bottom-info-container"></div>
      <div class="bottom-info-container">
        <span class="sig">会计主管：</span>
        <span class="sig">复核：</span>
        <span class="sig">出纳：</span>
        <span class="sig">报销人：</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="getPdf">下载报销单</el-button>
        <el-button @click="visible = false">关闭窗口</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import QRCode from 'qrcode'
import useReimStore from '@/stores/onlineoffice/Reim/index.ts'
import { transPdf, smalltoBIG } from '@/utils/translate.ts'
const reimStore = useReimStore()
const { reimForm } = storeToRefs(reimStore)
const visible = ref(false)
const reimFormInfo = ref(null)
const qrCodeBase64 = ref(null)
const showPdf = (id) => {
  console.log(id)
  visible.value = true
  reimStore.getReimInfo(id)
  reimFormInfo.value = reimForm.value
  for (let i = 0; i < 3; i++) {
    reimFormInfo.value.content.push({})
  }
  getQrCode(id)
}
const getQrCode = (id) => {
  QRCode.toDataURL(String(id))
    .then((url) => {
      qrCodeBase64.value = url
    })
    .catch((err) => {
      console.error(err)
    })
}
const getPdf = () => {
  let title = '报销单'
  transPdf(title)
}
const computeReturnMoney = computed(() => {
  if (reimFormInfo.value.total < reimFormInfo.value.debit) {
    return (reimFormInfo.value.total - reimFormInfo.value.debit).toFixed(2)
  } else {
    return '0'
  }
})
const computeBackMoney = computed(() => {
  if (reimFormInfo.value.total > reimFormInfo.value.debit) {
    return (reimFormInfo.value.debit - reimFormInfo.value.total).toFixed(2)
  } else {
    return '0'
  }
})
defineExpose({ showPdf })
</script>
<style scope lang="less">
@import url('./index.less');
</style>
