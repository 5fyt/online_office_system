<template>
  <div class="search">
    <el-form :model="searchForm" :inline="true" :rule="searchRule" ref="form">
      <el-form-item prop="name">
        <el-input
          v-model="searchForm.name"
          placeholder="姓名"
          clearable="clearable"
          max-length="10"
          class="input"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.sex"
          placeholder="性别"
          clearable="clearable"
          max-length="10"
          class="input"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.roles"
          placeholder="角色"
          clearable="clearable"
          max-length="10"
          class="input"
        >
          <el-option
            v-for="(role, index) in searchForm.rolesList"
            :key="index"
            :label="role.roleName"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.dept"
          placeholder="部门"
          clearable="clearable"
          max-length="10"
          class="input"
        >
          <el-option
            v-for="(dept, index) in searchForm.deptList"
            :key="index"
            :label="dept.deptName"
            :value="dept.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="searchForm.status"
          placeholder="状态"
          clearable="clearable"
          max-length="10"
          class="input"
        >
          <el-option label="离职" value="0" />
          <el-option label="在职" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="success" @click="addFn">新增</el-button>
        <el-button type="danger" @click="moreDelete">批量删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import useUserStore from '@/stores/background/user/index.ts'
import { objTransArrayObj } from '@/utils/translate.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
const userStore = useUserStore()
const emit = defineEmits(['queryUser', 'addUser'])
const { departLists, roleLists } = storeToRefs(userStore)
const form = ref<FormInstance>()

//搜索 表单数据
const searchForm = reactive({
  name: '',
  sex: '',
  role: '',
  dept: '',
  status: '',
  rolesList: [],
  deptList: [],
  deptObj: null, //一定得置null 如果设置成{}拿不到具体的数据
  roleObj: null
})
//表单数据校验规则
const searchRule = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 9, message: '姓名格式错误', trigger: 'blur' }
  ]
})
//获取部门列表
const getDeptmentList = () => {
  userStore.getDeptList()
  searchForm.deptObj = JSON.parse(localStorage.getItem('departList'))
  //封装后端返回的对象数据
  searchForm.deptList = objTransArrayObj('dept', searchForm.deptObj)
}
//获取角色列表
const getRolesList = () => {
  userStore.getRoleList()
  searchForm.roleObj = JSON.parse(localStorage.getItem('roleList'))
  searchForm.rolesList = objTransArrayObj('role', searchForm.roleObj)
}

//搜索后显示结果，查询
const queryData = () => {
  let formData = {
    name: searchForm.name,
    gender: searchForm.sex,
    roleId: searchForm.role,
    departmentId: searchForm.dept,
    stauts: searchForm.status
  }
  emit('queryUser', formData)
  form.value?.resetFields()
}
//新增用户
const addFn = () => {
  emit('addUser')
}
//批量删除用户
const moreDelete=()=>{
  emit('deleteUser')
}
getDeptmentList()
getRolesList()
</script>
