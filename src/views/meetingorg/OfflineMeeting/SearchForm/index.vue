<template>
  <div class="searchForm">
    <el-form :model="searchForm" ref="searchRef" :inline="true">
      <el-form-item>
        <el-select v-model="searchForm.name" placeholdler="选择会议室" clearable>
          <template v-for="(option, index) in options.meetingList" :key="index">
            <el-option :label="option.name" :value="option.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholdler="请选择时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="meetingApply">会议申请</el-button>
      </el-form-item>
      <el-form-item class="mold">
        <el-radio-group v-model="searchForm.mold">
          <el-radio-button label="全部会议" />
          <el-radio-button label="我的会议" />
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const emits = defineEmits('apply')
const searchRef = ref<FormInstance>()
const searchForm = reactive({
  name: null,
  date: null,
  mold: '全部会议'
})
const options = reactive({
  meetingList: []
})
const rules = reactive({})
const meetingApply = () => {
  emits('apply')
}
</script>
<style lang="less">
.mold {
  float: right;
}
</style>
