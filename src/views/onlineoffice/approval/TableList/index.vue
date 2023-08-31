<template>
  <SearchForm @queryHandler="queryHandler"></SearchForm>
  <el-table
    ref="approvalRef"
    :data="dataList.tableData"
    border="border"
    v-loading="loadingShow"
    :header-cell-style="{ backgroundColor: '#f1f3f4' }"
    style="width: 100%"
    @expand-change="expandHandler"
  >
    <el-table-column prop="remark" header-align="center" align="center" type="expand">
      <template #default="scope">
        <div class="content-container">
          <table class="content-table">
            <tbody v-if="scope.row.type == '会议申请'">
              <tr>
                <th><span>主题</span></th>
                <td>{{ content.title }}</td>
              </tr>
              <tr>
                <th><span>内容</span></th>
                <td>{{ content.content }}</td>
              </tr>
              <tr>
                <th><span>日期</span></th>
                <td>
                  {{ content.date }}&nbsp;&nbsp;&nbsp;{{ content.start }} ~
                  {{ content.end }}
                </td>
              </tr>
              <tr>
                <th><span>地点</span></th>
                <td>{{ content.room }}</td>
              </tr>
              <tr>
                <th><span>参会人</span></th>
                <td>{{ content.participants.toString() }}</td>
              </tr>
              <tr>
                <th><span>审批结果</span></th>
                <td>
                  <span v-if="scope.row.status != '已结束'">审批中</span>
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '同意'"
                    >已同意</span
                  >
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '不同意'"
                    >已拒绝</span
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-if="scope.row.type == '员工请假'">
              <tr>
                <th><span>请假原因</span></th>
                <td :title="leave.reason">{{ leave.reason }}</td>
              </tr>
              <tr>
                <th><span>请假类型</span></th>
                <td>{{ leave.type == 1 ? '病假' : '事假' }}</td>
              </tr>
              <tr>
                <th><span>申请人</span></th>
                <td>{{ leave.name }}</td>
              </tr>
              <tr>
                <th><span>起始时间</span></th>
                <td>{{ leave.start }}</td>
              </tr>
              <tr>
                <th><span>截止时间</span></th>
                <td>{{ leave.end }}</td>
              </tr>
              <tr>
                <th><span>审批结果</span></th>
                <td>
                  <span v-if="scope.row.status != '已结束'">审批中</span>
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '同意'"
                    >已同意</span
                  >
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '不同意'"
                    >已拒绝</span
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-if="scope.row.type == '报销申请'">
              <tr>
                <th><span>申请人</span></th>
                <td>{{ reim.name }}</td>
              </tr>
              <tr>
                <th><span>报销金额</span></th>
                <td>{{ reim.total }}元</td>
              </tr>
              <tr>
                <th><span>借款金额</span></th>
                <td>{{ reim.debit }}元</td>
              </tr>
              <tr>
                <th><span>实际金额</span></th>
                <td>{{ reim.balance }}元</td>
              </tr>
              <tr>
                <th><span>报销类型</span></th>
                <td>{{ reim.type }}</td>
              </tr>
              <tr>
                <th><span>审批结果</span></th>
                <td>
                  <span v-if="scope.row.status != '已结束'">审批中</span>
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '同意'"
                    >已同意</span
                  >
                  <span v-if="scope.row.status == '已结束' && scope.row.result == '不同意'"
                    >已拒绝</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <template v-if="scope.row.type === '员工请假'">
            <img :src="leaveForm" alt="Image" style="width: 480px; height: 300px" />
          </template>
          <template v-if="scope.row.type === '报销申请'">
            <img :src="ReimForm" alt="Image" style="width: 480px; height: 300px" />
          </template>
          <img
            style="width: 480px; height: 300px"
            src="../../../../assets/trtc/uTools_1691583602082.png"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column type="index" header-align="center" align="center" label="序号" width="100" />
    <el-table-column
      prop="title"
      header-align="center"
      align="center"
      label="审批事项"
      min-width="200"
    />
    <el-table-column
      prop="type"
      header-align="center"
      align="center"
      label="类别"
      min-width="100"
    />
    <el-table-column
      prop="name"
      header-align="center"
      align="center"
      label="申请人"
      min-width="80"
    />
    <el-table-column
      prop="date"
      header-align="center"
      align="center"
      label="发起日期"
      min-width="80"
    />
    <el-table-column prop="status" header-align="center" align="center" label="状态" min-width="50">
      <template #default="scope">
        <el-tag v-if="scope.row.status === '审批中'" type="warning">{{ scope.row.status }}</el-tag>
        <el-tag v-if="scope.row.status === '已同意'" type="success">{{ scope.row.status }}</el-tag>
        <el-tag v-if="scope.row.status === '已拒绝'" type="info">{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" width="200" label="操作">
      <template #default="scope">
        <el-button
          text
          @click="approveHandler(scope.row.id)"
          type="primary"
          v-if="auth(['root', 'leave:approve:all']) || auth(['root', 'leave:approve:department'])"
          :disabled="status === 2"
        >
          审批
        </el-button>
        <el-button
          text
          v-if="scope.row.status !== '待审批'"
          type="success"
          @click="viewHandler(scope.row)"
        >
          查看
        </el-button>
        <!-- v-if="isAuth(['ROOT', 'FILE:ARCHIVE']) && scope.row.filing" -->
        <el-button text @click="archive(scope.row)" v-if="auth(['root', 'leave:approve:archive'])">
          归档
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <ArchiveDialog ref="dialogRef"></ArchiveDialog>
  <el-pagination
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :current-page="dataList.pageIndex"
    :page-sizes="[10, 20, 50]"
    :page-size="dataList.pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  ></el-pagination>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Action } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { auth } from '@/utils/auth.ts'
import SearchForm from '../SearchForm/index.vue'
import ArchiveDialog from '../ArchiveDialog/index.vue'
import useApprovalStore from '@/stores/onlineoffice/approval/index.ts'
const approvalStore = useApprovalStore()
const { total, tableList, approvalInfo, leaveInfo, reimInfo, reimForm, leaveForm } =
  storeToRefs(approvalStore)
const approvalRef = ref()
const dialogRef = ref(null)
const status = ref('待审批')
const type = ref('员工请假')
// const id = ref<string>('')
const loadingShow = ref<boolean>(false)
const content = ref(null)
const reim = ref(null)
const leave = ref(null)
const dataList = reactive({
  tableData: [],
  pageSize: 10,
  pageIndex: 1,
  total: 0
})
const loadData = () => {
  let data = {
    size: dataList.pageSize,
    page: dataList.pageIndex,
    status: status.value,
    type: type.value
  }
  approvalStore.getApprovalList(data)
  dataList.tableData = tableList
  loadingShow.value = false
}
loadData()
//查询审批会议
const queryHandler = (queryData) => {
  loadingShow.value = true
  if (queryData) {
    status.value = queryData.status
    type.value = queryData.type
  }
  loadData()
}
//展开后显示详细信息
const expandHandler = (row) => {
  let id = row.id
  approvalStore.getApprovalInfo(id, row)
  content.value = approvalInfo.value
  leave.value = leaveInfo.value
  reim.value = reimInfo.value
}

const sizeChangeHandle = (value) => {
  dataList.pageSize = value
  loadData()
}
const currentChangeHandle = (value) => {
  dataList.pageIndex = value
  loadData()
}
//展示折叠
const viewHandler = (row) => {
  approvalRef.value?.toggleRowExpansion(row, true)
}
const approvalFn = (id, result, type) => {
  loadingShow.value = true
  approvalStore.approval({ id, result, type })
  loadData()
}
//审批
const approveHandler = (id) => {
  ElMessageBox.confirm('请选择对该条申请的处理意见', '提示', {
    confirmButtonText: '同意',
    cancelButtonText: '拒绝',
    distinguishCancelAndClose: true,
    type: 'warning'
  })
    .then(() => {
      approvalFn(id, true, type.value)
      ElMessage({
        type: 'success',
        message: '审批成功'
      })
    })
    .catch((action: Action) => {
      if (action === 'cancel') {
        approvalFn(id, false, type.value)
        ElMessage({
          type: 'info',
          message: '审批失败'
        })
      }
    })
}
//归档
const archive = (type) => {
  dialogRef.value?.show(type)
}
</script>
<style lang="less">
@import url('./index.less');
</style>
