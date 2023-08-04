<template>
  <SearchForm
    @queryUser="queryUser"
    @addUser="addUserVisible"
    @deleteUser="deleteUser"
    :searchConfig="searchConfig"
  ></SearchForm>
  <div class="table">
    <el-table
      ref="TableRef"
      :data="tableData.dataList"
      style="width: 100%"
      border
      :header-cell-style="{ backgroundColor: '#f1f3f4' }"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in contentConfig.contentList" :key="index">
        <template v-if="item.type === 'selection'">
          <el-table-column type="selection" :selectable="selectable" width="50" />
        </template>
        <template v-if="item.show === 'index'">
          <el-table-column
            :type="item.type"
            :label="item.label"
            :width="item.width"
            header-algin="center"
            algin="center"
          >
            <template #default="scope">
              <span>{{ (tableData.pageIndex - 1) * tableData.pageSize + scope.$index + 1 }}</span>
              <!-- 获得index scope.$index -->
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'custom'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <el-tag type="success">{{ scope.row.status === 1 ? '在职' : '离职' }}</el-tag>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'handler'">
          <el-table-column
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <el-button
                type="primary"
                text
                @click="editHandle(scope.row)"
                :disabled="auth(['root', 'department:update'])"
                >修改</el-button
              >
              <el-button type="primary" v-if="item.btnShow" text @click="dismissHandle(scope.row)"
                >离职</el-button
              >
              <el-button
                type="danger"
                :disabled="scope.row.count > 0 || auth(['root', 'department:delete'])"
                text
                @click="deleteHandle(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'normal'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          />
        </template>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="tableData.pageIndex"
        v-model:page-size="tableData.pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <dialogForm ref="dialogRef" @add="addUsers" :dialogConfig="dialogConfig"></dialogForm>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
// import SearchForm from '../SearchForm/index.vue'
// import DialogForm from '../DialogForm/index.vue'
import SearchForm from '@/components/baseUI/SearchForm/index.vue'
import DialogForm from '@/components/baseUI/DialogForm/index.vue'

import contentConfig from '../constant/content.config.ts'
import searchConfig from '../constant/search.config.ts'
import dialogConfig from '../constant/dialog.config.ts'

import useUserStore from '@/stores/system/user/index.ts'
import { auth } from '@/utils/auth.ts'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
const userStore = useUserStore()
const { users, total, pages } = storeToRefs(userStore)
const dialogRef = ref()
const id = ref<number>(0) //判断是否是新增还是修改dialog
const dialogShow = ref(false)
const deleteId = ref<array>([])
interface tableType {
  dataList: any[]
  pageIndex: number
  pageSize: number
  totalCount: number
}
//用户表格里的数据
const tableData = reactive<tableType>({
  dataList: [],
  pageIndex: 1, //当前页
  pageSize: 10,
  totalCount: 0
})
//渲染表格数据
const tableDataLoad = (formData: any = {}) => {
  let query = {
    page: tableData.pageIndex,
    pageSize: tableData.pageSize
  }
  userStore.getDeptTableList(contentConfig.pageName, { ...query, ...formData })
  tableData.dataList = users
  tableData.totalCount = total
}
tableDataLoad()
//通过相关数据查询表格中的数据
const queryUser = (formData) => {
  tableDataLoad(formData)
}
//选项发生变化时触发 ,将超级管理员设置为禁止删除
const selectable = (row) => {
  if (row.hasOwnProperty('count')) {
    return row.count > 0 ? false : true
  } else {
    return true
  }
}
//勾选中的每个数据组成的数组
const handleSelectionChange = (value) => {
  deleteId.value = value
}
//离职用户
const dismissHandle = ({ id }) => {
  if (id) {
    userStore.leaveUsers(id)
    tableDataLoad()
  }
}

//删除用户，批量删除和单个删除
const deleteHandle = (id) => {
  //拿到一条或者多条id标识
  let ids = id ? [id] : deleteId.value.map((item) => item.id)
  if (!ids.length) {
    ElMessage({
      message: '未选中需要删除的用户',
      type: 'warning'
    })
  } else {
    ElMessageBox.confirm('确定要删除选中记录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let data = {
          ids: ids
        }
        userStore.deleteUsers(contentConfig.pageName, data)
        tableDataLoad()
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: '取消删除'
        })
      })
  }
}

//修改用户
const editHandle = (data) => {
  dialogRef.value?.showVisible(data)
}
//当前页数发生变化时
const handleSizeChange = (value) => {
  tableData.pageSize = value
  tableDataLoad()
}
//当前页发生变化时
const handleCurrentChange = (value) => {
  tableData.pageIndex = value
  tableDataLoad()
}
//新增用户
const addUserVisible = () => {
  dialogRef.value?.showVisible()
}

//弹出层确定后，继续刷新页面
const addUsers = () => {
  tableDataLoad()
}
const deleteUser = () => {
  deleteHandle()
}
</script>
<style>
.el-table .el-table__cell {
  text-align: center !important;
}
</style>
