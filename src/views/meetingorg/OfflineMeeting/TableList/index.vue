<template>
  <SearchForm @apply="apply"></SearchForm>
  <div class="schedule" v-if="false">
    <div class="gantt" ref="ganttRef">
      <div class="row">
        <div class="cell-time"></div>
        <!-- 头部66 -->
        <div class="cell-time" v-for="(item, index) in time" :key="index">
          <span class="time">{{ item }}</span>
        </div>
      </div>
      <div class="row" v-for="(room, index) in gantt.meetingRoom" :key="index">
        <div class="cell room">{{ room.name }}</div>
        <div class="cell" v-for="(item, index) in time" :key="index">
          <!-- 甘特图是否显示 -->
          <div
            v-if="room.meeting.hasOwnProperty(item)"
            class="meeting"
            :class="room.meeting[item].split('#')[1]"
            :style="'width:' + room.meeting[item].split('#')[0] * gantt.cellWidth + 'px'"
          ></div>
        </div>
      </div>
    </div>
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
  <CalendarTable></CalendarTable>
  <DialogForm ref="dialogRef"></DialogForm>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import SearchForm from '../SearchForm/index.vue'
import DialogForm from '../DialogForm/index.vue'
import CalendarTable from '../CalendarTable/index.vue'
import initTime from '@/global/constants/offlinemeeting/index.ts'
interface GantteType {
  mettingRoom: { name: string; meeting: any }[]
  cellWidth: number
}
interface PageType {
  pageIndex: number
  pageSize: number
  totalCount: number
}
const ganttRef = ref()
const dialogRef = ref()
const time = reactive<string[]>(initTime)
const gantt = reactive<GantteType>({
  meetingRoom: [
    {
      name: '大会议室A01',
      meeting: {
        '13:00': '4#blue'
      }
    }
  ],
  cellWidth: 0
})
const tableData = reactive<PageType>({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0
})
const ganttWidth = () => {
  // nextTick(() => {
  //   let width = (ganttRef.value.offsetWidth - 1) * 0.042 + 0.01 // 这样处理完全是为了凑整， 获取整个盒子宽度，获取4.2%
  //   gantt.cellWidth = width
  // })
}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}
const apply = () => {
  dialogRef.value?.show()
}
//挂载时，计算出甘特图的宽度
onMounted(() => {
  ganttWidth()
  //屏幕尺寸发生变化时，重新计算尺寸
  window.addEventListener('resize', () => {
    ganttWidth()
  })
})
</script>
<style scope lang="less">
@import url('./index.less');
</style>
