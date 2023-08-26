<template>
  <aside class="site-sidebar site-sidebar--dark">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'Home'"
        :collapse="sidebar.isFold"
        :collapseTransition="false"
        @select="selectHandle"
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
          <el-menu-item index="Dept" @click="$router.push({ name: 'Dept' })">
            <SvgIcon name="company_fill" class="icon-svg" />
            <span>部门管理</span>
          </el-menu-item>
          <el-menu-item index="Role" @click="$router.push({ name: 'Role' })">
            <SvgIcon name="role_fill" class="icon-svg" />
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="User" @click="$router.push({ name: 'User' })">
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
          <el-menu-item index="Approval" @click="$router.push({ name: 'Approval' })">
            <SvgIcon name="warehouse_fill" class="icon-svg" />
            <span>审批任务</span>
          </el-menu-item>
          <el-menu-item index="Leave" @click="$router.push({ name: 'Leave' })">
            <SvgIcon name="night_fill" class="icon-svg" />
            <span>员工请假</span>
          </el-menu-item>
          <el-menu-item index="Amect" @click="$router.push({ name: 'Amect' })">
            <SvgIcon name="cry_fill" class="icon-svg" />
            <span>违纪罚款</span>
          </el-menu-item>
          <el-menu-item index="Reim" @click="$router.push({ name: 'Reim' })">
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
          <el-menu-item index="MeetingRoom" @click="$router.push({ name: 'MeetingRoom' })">
            <SvgIcon name="warehouse_fill" class="icon-svg" />
            <span>会议室</span>
          </el-menu-item>
          <el-menu-item index="OfflineMeeting" @click="$router.push({ name: 'OfflineMeeting' })">
            <SvgIcon name="trust_fill" class="icon-svg" />
            <span>线下会议</span>
          </el-menu-item>
          <el-menu-item index="OnlineMeeting" @click="$router.push({ name: 'OnlineMeeting' })">
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
          <el-menu-item index="AmectType" @click="$router.push({ name: 'AmectType' })">
            <SvgIcon name="tool_fill" class="icon-svg" />
            <span>罚款类型</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const menuActiveName = ref('')
const route = useRoute()
const sidebar = reactive({
  //是否折叠左边栏
  isFold: false,
  sidebarSkin: 'dark'
})
//关闭侧边栏
const closeAside = () => {
  sidebar.isFold = !sidebar.isFold
}
watch(
  () => route.name,
  (oldValue, newValue) => {
    menuActiveName.value = oldValue
  }
)
const selectHandle=(value,v)=>{
  console.log(value,v)
}
defineExpose({ closeAside })
</script>
<style lang="scss" scope>
@import url('../../assets/scss/index.scss');
</style>
