<template>
  <SearchComp
    :searchConfig="searchConfig"
    @searchInfo="searchInfo"
    @addNewData="addNewData"
    @deleteData="deleteData"
  ></SearchComp>
  <TableComp :contentConfig="contentConfig" ref="tableRef" @edit="editHandle">
    <template #status="scope">
      <span v-if="scope.row.status == '请假中'" style="color: orange">{{ scope.row.status }}</span>
      <span v-if="scope.row.status == '已同意'" style="color: #17b3a3">{{ scope.row.status }}</span>
      <span v-if="scope.row.status == '不同意'" style="color: #f56c6c">{{ scope.row.status }}</span>
    </template>
   
  </TableComp>
  <DialogComp ref="dialogRef" :dialogConfig="dialogConfig" @confirm="confirm"></DialogComp>
</template>
<script setup lang="ts">
import SearchComp from '../leave/SearchComp/index.vue'
import TableComp from '../leave/TableComp/index.vue'
import DialogComp from '../leave/DialogComp/index.vue'
import searchConfig from '../leave/constants/searchConfig.ts'
import contentConfig from '../leave/constants/contentConfig.ts'
import dialogConfig from '../leave/constants/dialogConfig.ts'
import { ref } from 'vue'
const tableRef = ref()
const dialogRef = ref()
const searchInfo = (searchForm) => {
  tableRef.value?.loadList(searchForm)
}
const addNewData = () => {
  dialogRef.value?.show()
}
const editHandle = (row) => {
  dialogRef.value?.show(row)
}
const confirm = () => {
  tableRef.value?.loadList()
}
const deleteData = () => {
  tableRef.value?.deleteHandle()
}
</script>
<style scope lang="less">
.desc {
  margin-left: 10px;
}
</style>
