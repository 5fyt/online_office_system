<template>
  <div class="table">
    <el-table
      ref="tableRef"
      :data="tableData.dataList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in contentConfig.contentList" :key="index">
        <template v-if="item.type === 'selection'">
          <el-table-column type="selection" :selectable="selectable" width="50" />
        </template>
        <template v-if="item.type === 'index'">
          <el-table-column
            :type="item.type"
            :label="item.label"
            :width="item.width"
            header-algin="center"
            algin="center"
          >
            <template #default="scope">
              <span>{{ (tableData.pageIndex - 1) * tableData.pageSize + scope.$index + 1 }}</span>
              <!-- 获得index scope.$index -->
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'expand'">
          <el-table-column
            :width="item.width"
            :prop="item.prop"
            header-align="center"
            align="center"
            type="expand"
          >
            <template #default="scope"> 罚款原因：{{ scope.row[item.desc] }} </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'custom'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'handler'">
          <el-table-column
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          >
            <template #default="scope">
              <el-button
                type="primary"
                text
                @click="editHandle(scope.row)"
                :disabled="auth(['root', 'amect:update'])"
                >修改</el-button
              >
              <el-button type="primary" v-if="item.btnShow" text @click="dismissHandle(scope.row)"
                >交款</el-button
              >
              <el-button
                type="danger"
                :disabled="scope.row.count > 0 || auth(['root', 'amect:delete'])"
                text
                @click="deleteHandle(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'normal'">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            header-algin="center"
            algin="center"
            :min-width="item.minWidth"
          />
        </template>
      </template>
    </el-table>
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
</template>
<script setup lang="ts">
import { reactive } from 'vue'
interface IProps{
  contentConfig: {
    pageName: string
    contentList: any
  }
}
interface tableType {
  dataList: any[]
  pageIndex: number
  pageSize: number
  totalCount: number
}
const props=defineProps<IProps>()
//用户表格里的数据
const tableData = reactive:tableType({
  dataList: [],
  pageIndex: 1, //当前页
  pageSize: 10,
  totalCount: 0
})
</script>
