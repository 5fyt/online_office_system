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
      <div class="mold">
        <el-form-item prop="type">
          <el-select v-model="SearchForm.type" placeholder="类别" clearable="clearable">
            <el-option label="会议申请" value="会议申请"></el-option>
            <el-option label="员工请假" value="员工请假"></el-option>
            <el-option label="报销申请" value="报销申请"></el-option>
          </el-select>
        </el-form-item>
        <el-radio-group v-model="SearchForm.status" @change="searchHandle()">
          <el-radio-button label="待审批" />
          <el-radio-button label="已审批" />
          <el-radio-button label="已结束" />
        </el-radio-group>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const emits = defineEmits(['queryHandler'])
const searchRef = ref()
const SearchForm = reactive({
  name: null,
  status: '待审批',
  type: '员工请假'
})
const searchRule = reactive({
  name: [{ required: false, pattern: '^[\u4e00-\u9fa5]{2,20}$', message: '姓名格式错误' }]
  // instanceId: [{ required: true, pattern: '^[0-9a-zA-Z\\-]{36}$', message: '编号格式错误' }]
})
const searchHandle = () => {
  emits('queryHandler', { ...SearchForm })
  searchRef.value?.resetFields()
}
</script>
<style lang="less">
.mold {
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
}
.el-radio-group {
  margin-right: 32px;
  margin-bottom: 18px;
}
</style>
