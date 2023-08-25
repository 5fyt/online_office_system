<template>
  <SearchComp
    :searchConfig="searchConfig"
    @searchInfo="searchInfo"
    @addNewData="addNewData"
    @deleteData="deleteData"
  ></SearchComp>
  <TableComp :contentConfig="contentConfig" ref="tableRef" @edit="editHandle">
    <template #money="scope">
      <span>{{ scope.row[scope.prop] }}元</span>
    </template>
  </TableComp>
  <DialogComp ref="dialogRef" :dialogConfig="dialogConfig" @confirm="confirm"></DialogComp>
</template>
<script setup lang="ts">
import SearchComp from '@/components/onlineoffice/SearchComp/index.vue'
import TableComp from '@/components/onlineoffice/TableComp/index.vue'
import DialogComp from '@/components/onlineoffice/DialogComp/index.vue'
import searchConfig from '../PenaltyFine/constants/searchConfig.ts'
import contentConfig from '../PenaltyFine/constants/contentConfig.ts'
import dialogConfig from '../PenaltyFine/constants/dialogConfig.ts'
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
