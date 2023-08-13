<template>
  <div class="search_form">
    <el-form :inline="true" :model="searchForm" ref="searchRef" class="form">
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholder="选择日期"
          class="input"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandler()">查询</el-button>
        <el-button type="success" @click="addHandler()">会议申请</el-button>
      </el-form-item>
      <el-form-item class="mold">
        <el-radio-group v-model="searchForm.type" @change="searchHandler">
          <el-radio-button label="全部会议"></el-radio-button>
          <el-radio-button label="我的会议"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table
      :data="dataList.tableList"
      border
      style="width: 100%"
      :header-cell-style="{ backgroundColor: '#f1f3f4' }"
    >
      <el-table-column width="40px" prop="desc" header-align="center" align="center" type="expand">
        <template #default="scope"> 会议内容：{{ scope.row.content }} </template>
      </el-table-column>
      <el-table-column type="index" header-align="center" align="center" width="100" label="序号">
        <template #default="scope">
          <span>{{ (dataList.pageIndex - 1) * dataList.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="会议主题"
        width="450"
      />
      <el-table-column prop="name" header-align="center" align="center" label="创建者" />
      <el-table-column prop="date" header-align="center" align="center" label="日期" />
      <el-table-column header-align="center" align="center" label="时间">
        <template #default="scope">
          <span>{{ scope.row.start }} ~ {{ scope.row.end }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" header-align="center" align="center" label="人数" />
      <el-table-column prop="status" header-align="center" align="center" label="状态" />
      <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作">
        <template #default="scope">
          <el-button
            text
            type="primary"
            :disabled="!scope.row.canEnterMeeting"
            @click="enterHandler(scope.row.id)"
          >
            进入
          </el-button>
          <el-button
            text
            type="danger"
            @click="deleteHandle(scope.row.id)"
            :disabled="!(scope.row.status === '审批中' || scope.row.status === '已拒绝')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="dataList.pageIndex"
        v-model:page-size="dataList.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <DialogForm ref="dialogRef" @confirm="confirm"></DialogForm>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
// import router from '@/router/index.ts'
import { useRouter } from 'vue-router'
import useOnlineStore from '@/stores/meetingorg/onlinemeeting/index.ts'
import DialogForm from '../DialogForm/index.vue'
const onlineStore = useOnlineStore()
const router = useRouter()
const { total, tableList } = storeToRefs(onlineStore)
const dialogRef = ref()
const searchForm = reactive({
  date: null,
  type: '全部会议'
})
const dataList = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  tableList: []
})

const searchHandler = () => {
  if (searchForm.date) {
    let data = {
      date: dayjs(searchForm.date).format('YYYY-MM-DD'),
      type: searchForm.type
    }
    loadData(data)
  } else {
    loadData()
  }
}
const addHandler = () => {
  dialogRef.value?.show()
}
const loadData = (info) => {
  let data = {
    page: dataList.pageIndex,
    size: dataList.pageSize,
    type: '全部会议'
  }

  onlineStore.getTableList({ ...data, ...info })
  dataList.total = total
  dataList.tableList = tableList
}
loadData()
const enterHandler = (id) => {
  console.log('进入')
  router.push({ name: 'MeetingVideo', params: { meetingId: id } })
}
const confirm = () => {
  loadData()
}
const deleteHandler = (id) => {
  ElMessageBox.confirm('是否删除该会议', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      console.log(id)
      onlineStore.deleteMeeting(id)
    })
    .catch(() => {
      console.log('删除失败')
    })
}
const handleSizeChange = (value) => {
  dataList.pageSize = value
  loadData()
}
const handleCurrentChange = (value) => {
  dataList.pageIndex = value
  loadData()
}
</script>
<style lang="less">
.mold {
  float: right;
}
</style>
