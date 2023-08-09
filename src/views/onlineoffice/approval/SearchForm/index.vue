<template>
  <div class="searchForm">
    <el-form :inline="true" :model="SearchForm" :rules="searchRule" ref="searchRef">
      <el-form-item prop="name">
        <el-input
          v-model="SearchForm.name"
          placeholder="申请人"
          clearable="clearable"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
      </el-form-item>
      <el-form-item class="mold">
        <el-radio-group v-model="SearchForm.status" @change="searchHandle()">
          <el-radio-button label="待审批" />
          <el-radio-button label="已审批" />
          <el-radio-button label="已结束" />
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const emits = defineEmits(['queryHandler'])
const searchRef = ref()
const SearchForm = reactive({
  name: null,
  status: '待审批'
})
const searchRule = reactive({
  name: [{ required: false, pattern: '^[\u4e00-\u9fa5]{2,20}$', message: '姓名格式错误' }]
  // instanceId: [{ required: true, pattern: '^[0-9a-zA-Z\\-]{36}$', message: '编号格式错误' }]
})
const searchHandle = () => {
  let status=0
  if (SearchForm.status === '待审批') {
    status = 1
  } else if (SearchForm.status === '已审批') {
    status = 2
  } else {
    status = 3
  }
  let data = {
    status
  }
  emits('queryHandler', { ...SearchForm, ...data })
  searchRef.value?.resetFields()
}
</script>
<style lang="less">
.mold {
  float: right;
}
</style>
