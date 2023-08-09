<template>
  <div class="searchForm">
    <el-form :model="searchForm" ref="searchRef" :inline="true">
      <el-form-item>
        <el-select v-model="searchForm.name" placeholdler="选择会议室" clearable>
          <template v-for="(option, index) in options.meetingList" :key="index">
            <el-option :label="option" :value="option"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholdler="请选择时间"
          value-format="YYYY-MM-DD"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="success" @click="meetingApply">会议申请</el-button>
      </el-form-item>
      <el-form-item class="type">
        <el-radio-group v-model="searchForm.type" @click="queryData">
          <el-radio-button label="全部会议" />
          <el-radio-button label="我的会议" />
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
import type { FormInstance } from 'element-plus'
const offlineStore = useOfflineStore()
const { meetingNames } = storeToRefs(offlineStore)
const emits = defineEmits(['apply', 'queryHandler', 'queryCalendar'])
const searchRef = ref<FormInstance>()
const searchForm = reactive({
  name: null,
  date: null,
  type: '全部会议'
})
const options = reactive({
  meetingList: []
})
const rules = reactive({})
//获取会议室列表
const getNames = () => {
  offlineStore.getMeetingNames()
  options.meetingList = JSON.parse(localStorage.getItem('meetingNames'))

}
getNames()
//查询时间甘特图
const queryData = () => {
  if (searchForm.name === '' || searchForm.name === null) {
    let queryInfo = {
      date: searchForm.date,
      type: searchForm.type
    }
    emits('queryHandler', { ...queryInfo })
    searchRef.value?.resetFields()
  } else {
    let queryCalendarInfo = {
      date: searchForm.date,
      type: searchForm.type,
      room: searchForm.name
    }
    emits('queryCalendar', { ...queryCalendarInfo })
    searchRef.value?.resetFields()
  }
}
const clear = () => {
  searchForm.name = ''
  searchForm.date = ''
}
//申请会议
const meetingApply = () => {
  emits('apply')
}
defineExpose({ clear })
</script>
<style lang="less">
.type {
  float: right;
}
</style>
