<template>
  <SearchForm
    @apply="apply"
    @queryHandler="queryGantt"
    @queryCalendar="queryCalendar"
    ref="searchRef"
  ></SearchForm>
  <div v-if="visible">
    <div class="schedule">
      <div class="gantt" ref="ganttRef">
        <div class="row">
          <div class="cell-time"></div>
          <!-- 头部66 -->
          <div class="cell-time" v-for="(item, index) in time" :key="index">
            <span class="time">{{ item }}</span>
          </div>
        </div>
        <div class="row" v-for="(room, index) in gantt.meetings" :key="index">
          <div class="cell room">{{ room.name }}</div>
          <div class="cell" v-for="(item, index) in time" :key="index">
            <!-- 甘特图是否显示 -->
            <template v-for="(one, index) in room.meeting" :key="index">
              <div
                v-if="one.start === item"
                class="meeting"
                :class="colors"
                :style="'width:' + widthNum * gantt.cellWidth + 'px'"
              ></div>
            </template>
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
  </div>
  <DialogForm ref="dialogRef"></DialogForm>
  <CalendarTable
    v-if="!visible"
    :queryInfo="queryCalendarInfo.queryInfo"
    ref="calendarRef"
  ></CalendarTable>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, nextTick, toRefs, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useOfflineStore from '@/stores/meetingorg/offlinemeeting/index.ts'
import initTime from '@/global/constants/offlinemeeting/index.ts'
import { transColors, transWidthNum } from '@/utils/translate.ts'
import SearchForm from '../SearchForm/index.vue'
import DialogForm from '../DialogForm/index.vue'
import CalendarTable from '../CalendarTable/index.vue'
interface GantteType {
  mettings: { name: string; meeting: any[] }[]
  cellWidth: number
}
interface PageType {
  pageIndex: number
  pageSize: number
  totalCount: number
}
const offlineStore = useOfflineStore()
const { total, meetings } = storeToRefs(offlineStore)

const ganttRef = ref()
const dialogRef = ref()
const calendarRef = ref(null)
const searchRef = ref()
const show = ref(false)
const visible = ref(true)

const time: string[] = reactive(initTime)
const gantt: GantteType = reactive({
  meetings: [],
  cellWidth: 0
})

const tableData: PageType = reactive({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0
})
const queryCalendarInfo = reactive({
  queryinfo: null
})
//根据查询渲染数据
const loadData = (queryData: any = {}) => {
  // visible.value = queryData === false ? false : true
  let data = {
    page: tableData.pageIndex,
    size: tableData.pageSize,
    type: '全部会议'
  }
  offlineStore.getOfflineTableList({ ...data, ...queryData })
  tableData.totalCount = total
  // let { meetings } = toRefs(offlineStore) //浅复制里面的数组meetings
  gantt.meetings = meetings.value
 
}
const ganttWidth = () => {
  nextTick(() => {
    let width = (ganttRef.value?.offsetWidth - 1) * 0.042 + 0.01 // 这样处理完全是为了凑整， 获取整个盒子宽度，获取4.2%
    gantt.cellWidth = width
  })
}
ganttWidth()
loadData()
//查询甘特图
const queryGantt = (value) => {
  visible.value = true
  searchRef.value?.clear()
  loadData(value)
}
//查询日历会议
const queryCalendar = (value) => {
  visible.value = false
  queryCalendarInfo.queryInfo = value
  //解决Vue3+elementPlus defineExpose暴露后 父组件获取不到子组件的方法或者属性问题
  nextTick(() => {
    calendarRef.value?.loadCalendarData()
  })
  searchRef.value?.clear()
}
const handleSizeChange = (value) => {
  tableData.pageSize = value
  loadData()
}
const handleCurrentChange = (value) => {
  tableData.pageIndex = value
  loadData()
}
//申请会议
const apply = () => {
  dialogRef.value?.show()
}

//挂载时，计算出甘特图的宽度
onMounted(() => {
  //屏幕尺寸发生变化时，重新计算尺寸
  window.addEventListener('resize', () => {
    ganttWidth()
  })
})
//计算status对应的颜色
const colors = computed(() => {
  nextTick(() => {
    let { meetings } = toRefs(gantt)
  })
  return transColors(meetings.value)
})

//计算起始时间和结束时间隔了几个半小时
const widthNum = computed(() => {
  nextTick(() => {
    let { meetings } = toRefs(gantt)
  })
  return transWidthNum(meetings.value)
})
</script>
<style scope lang="less">
@import url('./index.less');
</style>
