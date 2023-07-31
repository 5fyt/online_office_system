<template>
  <aside class="site-sidebar site-sidebar--dark">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="siteContent.menuActiveName || 'Home'"
        :collapse="sidebar.isFold"
        :collapseTransition="false"
        class="site-sidebar__menu"
        background-color="#263238"
        active-text-color="#fff"
        text-color="#8a979e"
      >
        <el-menu-item index="Home" @click="$router.push({ name: 'Home' })">
          <SvgIcon name="home" class="icon-svg" />
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu
          index="组织管理"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="users_fill" class="icon-svg" />
            <span>组织管理</span>
          </template>
          <el-menu-item index="MisDept" @click="$router.push({ name: 'Dept' })">
            <SvgIcon name="company_fill" class="icon-svg" />
            <span>部门管理</span>
          </el-menu-item>
          <el-menu-item index="MisRole" @click="$router.push({ name: 'Role' })">
            <SvgIcon name="role_fill" class="icon-svg" />
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="MisUser" @click="$router.push({ name: 'User' })">
            <SvgIcon name="user_fill" class="icon-svg" />
            <span>用户管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="在线办公"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="meeting_fill" class="icon-svg" />
            <span>在线办公</span>
          </template>
          <el-menu-item index="approval" @click="$router.push({ name: 'Approval' })">
            <SvgIcon name="warehouse_fill" class="icon-svg" />
            <span>审批任务</span>
          </el-menu-item>
          <el-menu-item index="leave" @click="$router.push({ name: 'Leave' })">
            <SvgIcon name="night_fill" class="icon-svg" />
            <span>员工请假</span>
          </el-menu-item>
          <el-menu-item index="amect" @click="$router.push({ name: 'Amect' })">
            <SvgIcon name="cry_fill" class="icon-svg" />
            <span>违纪罚款</span>
          </el-menu-item>
          <el-menu-item index="reim" @click="$router.push({ name: 'Reim' })">
            <SvgIcon name="assurance_fill" class="icon-svg" />
            <span>报销管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="会议管理"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="meeting_fill" class="icon-svg" />
            <span>会议管理</span>
          </template>
          <el-menu-item index="meeting-room" @click="$router.push({ name: 'MeetingRoom' })">
            <SvgIcon name="warehouse_fill" class="icon-svg" />
            <span>会议室</span>
          </el-menu-item>
          <el-menu-item
            index="demo-echarts"
            @click="$router.push({ name: 'OfflineMeeting' })"
          >
            <SvgIcon name="trust_fill" class="icon-svg" />
            <span>线下会议</span>
          </el-menu-item>
          <el-menu-item
            index="demo-echarts"
            @click="$router.push({ name: 'OnlineMeeting' })"
          >
            <SvgIcon name="service_fill" class="icon-svg" />
            <span>线上会议</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu
          index="系统设置"
          :popper-class="'site-sidebar--' + sidebar.sidebarSkin + '-popper'"
        >
          <template #title>
            <SvgIcon name="system_fill" class="icon-svg" />
            <span>系统设置</span>
          </template>
          <el-menu-item
            index="amect-type"
            @click="$router.push({ name: 'AmectType' })"
          >
            <SvgIcon name="tool_fill" class="icon-svg" />
            <span>罚款类型</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
const props = defineProps({
  siteContent: {
    type: Object,
    required: true
  }
})

const sidebar = reactive({
  //是否折叠左边栏
  isFold: false,
  sidebarSkin: 'dark'
})
//关闭侧边栏
const closeAside = () => {
  sidebar.isFold = !sidebar.isFold
}
watch(props, ({ siteContent }) => {
  props.siteContent.menuActiveName = siteContent.menuActiveName
})
defineExpose({ closeAside })
</script>
<style lang="scss">
@import url('../../assets/scss/index.scss');
</style>
