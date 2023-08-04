<template>
  <div class="search">
    <el-form :model="searchForm" :inline="true" :rule="searchRule" ref="form">
      <template v-for="(item, index) in props.searchConfig.searchList" :key="index">
        <el-form-item :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder"
              clearable="clearable"
              :max-length="item.maxlength"
              :class="item.class"
            />
          </template>
          <template v-if="item.type === 'selected'">
            <el-select
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder"
              clearable="clearable"
              :max-length="item.maxlength"
              :class="item.class"
            >
              <template v-for="(option, index) in item.options" :key="index">
                <el-option :label="option.label" :value="option.value" />
              </template>
            </el-select>
          </template>
        </el-form-item>
      </template>
      <template v-if="searchConfig.pageName === 'user'">
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
      </template>

      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button
          type="success"
          @click="addFn"
          v-if="
            !auth(['root', 'user:insert']) ||
            !auth(['root', 'role:insert']) ||
            !auth(['root', 'department:insert']) ||
            !auth(['root', 'meeting:insert'])
          "
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="moreDelete"
          v-if="
            !auth(['root', 'user:delete']) ||
            !auth(['root', 'role:delete']) ||
            !auth(['root', 'department:delete']) ||
            !auth(['root', 'meeting:delete'])
          "
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/system/user/index.ts'
import type { FormInstance } from 'element-plus'
import { objTransArrayObj } from '@/utils/translate.ts'
import { auth } from '@/utils/auth.ts'
const userStore = useUserStore()
const emit = defineEmits(['queryUser', 'addUser'])
const props = defineProps({
  searchConfig: {
    required: true
  }
})

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
const moreDelete = () => {
  emit('deleteUser')
}
getDeptmentList()
getRolesList()
</script>
