<template>
  <el-dialog width="780px" :close-on-click-modal="false" v-model="visible" :show-close="false">
    <div id="pdfDom">
      <h2 class="title">员工请假单</h2>
      <table class="leave-table">
        <tr align="center">
          <td width="14%">姓名</td>
          <td width="16%">{{ leaveFormInfo.name }}</td>
          <td width="14%">性别</td>
          <td width="16%">{{ leaveFormInfo.gender }}</td>
          <td width="14%">部门</td>
          <td>{{ leaveFormInfo.department }}</td>
        </tr>
        <tr>
          <td align="center">请假类别</td>
          <td colspan="5">{{ leaveFormInfo.type }}</td>
        </tr>
        <tr>
          <td align="center">请假时间</td>
          <td colspan="5">{{ leaveFormInfo.start }} ~ {{ leaveFormInfo.end }}</td>
        </tr>
        <tr>
          <td align="center">请假事由</td>
          <td colspan="5">{{ leaveFormInfo.reason }}</td>
        </tr>
        <tr>
          <td align="center">此处签字</td>
          <td colspan="2"></td>
          <td align="center">人事盖章</td>
          <td colspan="3"></td>
        </tr>
      </table>
      <p class="desc">
        备注：员工请假期间一切责任自负，假期结束后应及时返回工作岗位，否则按照旷工处理。
      </p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="getPdf">下载请假单</el-button>
        <el-button @click="visible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useleaveStore from '@/stores/onlineoffice/leaveorg/index.ts'
import { transPdf } from '@/utils/translate.ts'
const leaveStore = useleaveStore()
const { leaveForm } = storeToRefs(leaveStore)
const visible = ref(false)
const leaveFormInfo = ref(null)
const show = (id) => {
  console.log(id)
  visible.value = true
  leaveStore.getLeaveInfo(id)
  leaveFormInfo.value = leaveForm.value
}
const getPdf = () => {
  let title = '请假单'
  transPdf(title)
}
defineExpose({ show })
</script>
<style scope lang="less">
.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 10px;
}
.leave-table {
  border: solid 1px #333;
  // border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  color: #333;
  width: 100%;

  td {
    border: solid 1px #333;
    padding: 15px;
    height: 38px;
    box-sizing: border-box;
  }
}
.operate {
  text-align: center;
  margin-top: 0px;
}
.el-dialog__body {
  padding-top: 10px;
}
.desc {
  margin-top: 20px;
  margin-bottom: 0;
}
#pdfDom {
  padding: 30px 40px 0px 40px;
  position: relative;
  top: -30px;
}
</style>
