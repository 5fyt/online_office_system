<template>
  <div>
    <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm">
      <el-form-item>
        <el-select
          v-model="dataForm.deptId"
          class="input"
          placeholder="部门"
          size="medium"
          clearable="clearable"
        >
          <el-option v-for="one in deptList" :label="one.deptName" :value="one.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="dataForm.typeId"
          class="input"
          placeholder="罚款类型"
          size="medium"
          clearable="clearable"
        >
          <el-option v-for="one in amectTypeList" :label="one.type" :value="one.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dataForm.date"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="medium"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="searchHandle()">生成报表</el-button>
      </el-form-item>
    </el-form>
    <div id="chart-container">
      <el-row :gutter="100">
        <el-col :span="8"><div class="chart" id="chart-1"></div></el-col>
        <el-col :span="8"><div class="chart" id="chart-2"></div></el-col>
        <el-col :span="8"><div class="chart" id="chart-3"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div id="chart-4"></div></el-col>
      </el-row>
    </div>
  </div>
</template>
