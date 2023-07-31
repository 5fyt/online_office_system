<template>
  <SearchForm
    @queryUser="queryUser"
    @addUser="addUserVisible"
    @deleteUser="deleteUser"
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
      <el-table-column type="selection" :selectable="selectable" width="50" />
      <el-table-column type="index" label="序号" width="100" header-algin="center" algin="center">
        <template #default="scope">
          <span>{{ (tableData.pageIndex - 1) * tableData.pageSize + scope.$index + 1 }}</span>
          <!-- 获得index scope.$index -->
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
        header-algin="center"
        algin="center"
        min-width="100"
      />
      <el-table-column
        prop="gender"
        label="性别"
        header-algin="center"
        algin="center"
        min-width="60"
      />
      <el-table-column
        prop="phone"
        label="电话号码"
        header-algin="center"
        algin="center"
        min-width="130"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        header-algin="center"
        algin="center"
        min-width="240"
        show-overflow-tooltip
      />
      <el-table-column
        prop="hireDate"
        label="入职日期"
        header-algin="center"
        algin="center"
        min-width="130"
      />
      <el-table-column
        prop="role"
        label="角色"
        header-algin="center"
        algin="center"
        min-width="150"
        show-overflow-tooltip
      />
      <el-table-column
        prop="department"
        label="部门"
        header-algin="center"
        algin="center"
        min-width="120"
      />
      <el-table-column
        prop="status"
        label="状态"
        header-algin="center"
        algin="center"
        min-width="100"
      >
        <template #default="scope">
          <el-tag type="success">{{ scope.row.status === 1 ? '在职' : '离职' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-algin="center" algin="center" min-width="190">
        <template #default="scope">
          <el-button type="primary" text @click="editHandle(scope.row)">修改</el-button>
          <el-button type="primary" text @click="dismissHandle(scope.row)">离职</el-button>
          <el-button
            type="danger"
            :disabled="scope.row.role === '超级管理员'"
            text
            @click="deleteHandle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
  <dialogForm ref="dialogRef" @add="addUsers"></dialogForm>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '../SearchForm/index.vue'
import DialogForm from '../DialogForm/index.vue'
import useUserStore from '@/stores/system/user/index.ts'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
const userStore = useUserStore()
const { users, total, pages } = storeToRefs(userStore)
const dialogRef = ref()
const uid = ref<string>('') //判断是否是新增还是修改dialog
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
  userStore.getDeptTableList({ ...query, ...formData })
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
  return row.role.includes('超级管理员') ? false : true
}
//勾选中的每个数据组成的数组
const handleSelectionChange = (value) => {
  deleteId.value = value
}
//离职用户
const dismissHandle = ({ uid }) => {
  if (uid) {
    userStore.leaveUsers(uid)
    tableDataLoad()
  }
}

//删除用户，批量删除和单个删除
const deleteHandle = (id) => {
  //拿到一条或者多条id标识
  let ids = id ? [id] : deleteId.value.map((item) => item.uid)
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
        let uids = {
          uids: ids
        }
        userStore.deleteUsers(uids)
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
<style></style>
