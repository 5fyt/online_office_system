<template>
  <div class="search">
    <el-form :model="searchForm" :inline="true" :rule="rulesForm" ref="form">
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
          <template v-if="item.type === 'selected' && item.customOption">
            <el-select
              v-model="searchForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-if="item.prop === 'departmentId'">
                <el-option
                  v-for="(dept, index) in options.deptList"
                  :key="index"
                  :label="dept.deptName"
                  :value="dept.id"
                />
              </template>
              <template v-if="item.prop === 'roleId'">
                <el-option
                  v-for="(role, index) in options.rolesList"
                  :key="index"
                  :label="role.roleName"
                  :value="role.id"
                />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'selected' && !item.customOption">
            <el-select
              v-model="searchForm[item.prop]"
              class="input"
              :placeholder="item.placeholder"
              clearable
            >
              <template v-for="(option, index) in item.options" :key="index">
                <el-option :label="option.label" :value="option.value" />
              </template>
            </el-select>
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button
          type="success"
          @click="addFn"
          v-if="auth(['root']) || auth(['root', 'meeting:insert'])"
          >新增</el-button
        >
        <el-button
          type="danger"
          @click="moreDelete"
          v-if="auth(['root']) || auth(['root', 'meeting:delete'])"
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

const initForm = {}
const rulesForm = {}
props.searchConfig.searchList.forEach((item) => {
  initForm[item.prop] = ''
})
props.searchConfig.searchList.forEach((item) => {
  rulesForm[item.prop] = item.rules
})
const searchForm = reactive(initForm)
const ruleData = reactive(rulesForm)
const options = reactive({
  rolesList: [],
  deptList: []
})
//获取部门列表
const getDeptmentList = () => {
  userStore.getDeptList()
  let deptObj = JSON.parse(localStorage.getItem('departList'))
  //封装后端返回的对象数据
  options.deptList = objTransArrayObj('dept', deptObj)
}
//获取角色列表
const getRolesList = () => {
  userStore.getRoleList()
  let roleObj = JSON.parse(localStorage.getItem('roleList'))
  options.rolesList = objTransArrayObj('role', roleObj)
}

//搜索后显示结果，查询
const queryData = () => {
  emit('queryUser', { ...searchForm })
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
