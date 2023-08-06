<template>
  <el-dialog v-model="visible" title="会议概要信息" :close-on-click-modal="false" width="450px">
    <div class="banner"></div>
    <el-row class="info">
      <el-col :span="3" class="label">主题</el-col>
      <el-col :span="21" class="value">{{ infoData.title }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3" class="label">时间：</el-col>
      <el-col :span="9" class="value">{{ infoData.start }} ~ {{ infoData.end }}</el-col>
      <el-col :span="3" class="label">状态：</el-col>
      <el-col :span="9" class="value">{{ status }}</el-col>
    </el-row>
    <el-row class="info" v-if="infoData.status === 1 || infoData.status === 3">
      <el-col :span="3" class="label">人员</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <li v-for="(member, index) in infoData.participants" :key="index">
            <img :src="member.photo" class="photo" />
            <span>{{ member.name }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="info member" v-if="infoData.status === 4 || infoData.status === 5">
      <el-col :span="3" class="label">参会：</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <li v-for="(member, index) in infoData.present" :key="index">
            <img :src="member.photo" class="photo" />
            <span>{{ member.name }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="info member" v-if="infoData.status === 4 || infoData.status === 5">
      <el-col :span="3" class="label">缺席：</el-col>
      <el-col :span="21" class="value">
        <ul class="list">
          <template v-for="(member, index) in infoData.absent">
            <li class="item">
              <img :src="member.photo" class="photo" /> <span>{{ member.name }}</span>
            </li></template
          >
        </ul>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer"><el-button @click="visible = false">关闭</el-button></span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, nextTick, toRefs, computed } from 'vue'

import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
const offlineStore = useOfflineStore()

const visible = ref(false)
const infoData = ref()

const show = () => {
  visible.value = true
}
//bug 因为请求是异步请求，导致pinia数据刷新但是传过来的数据不是最新值，应该用同步，
// reactive 局限性不能直接将object对象赋值给reactive对象，会失去响应式，应该用ref才可以使用
const showInfo = (id) => {
  offlineStore.showMeetingInfo(id)
  let infos = offlineStore.infoDatas
  infoData.value = infos
}
const status = computed(() => {
  let name = ''
  if (infoData.value.status === 1) {
    name = '审批中'
  } else if (infoData.value.status === 3) {
    name = '审批通过'
  } else if (infoData.value.status === 4) {
    name = '会议开始'
  } else {
    name = '会议结束'
  }
  return name
})
defineExpose({ show, showInfo })
</script>
<style lang="less" scope>
@import url('./index.less');
</style>
