<template>
  <el-dialog
    v-model="visible"
    title="会议概要信息"
    :close-on-click-modal="false"
    v-model="visible"
    width="450px"
  >
    <div class="banner"></div>
    <el-row class="info">
      <el-col :span="3" class="label">主题</el-col>
      <el-col :span="21" class="value">{{ title }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">时间：</el-col>
      <el-col :span="9" class="value">{{ start }} ~ {{ end }}</el-col>
      <el-col :span="3" class="label">状态：</el-col>
      <el-col :span="9" class="value">{{ status }}</el-col>
    </el-row>
    <el-row class="info">
      <el-col :span="3" class="label">人员</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <li v-for="(member, index) in members" :key="index">
            <img src="" class="photo" />
            <span></span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="info member">
      <el-col :span="3" class="label">参会：</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <li v-for="(member, index) in attendance" :key="index">
            <img src="" class="photo" />
            <span></span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="info member">
      <el-col :span="3" class="label">缺席：</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <li v-for="(member, index) in absence" :key="index">
            <img src="" class="photo" />
            <span></span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer"><el-button @click="visible = false">关闭</el-button></span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const visible = ref(false)
const infoData = reactive({
  title: '',
  startTime: '',
  eneTime: '',
  status: '',
  members: [],
  attendance: [], //出席人员
  absence: [] //缺席人员
})
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
