<template>
  <div class="layout">
    <div
      class="site-wrapper"
      :class="{ 'site-sidebar--fold': sidebar.isFold }"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
    >
      <MisHeader @closeSwitch="closeSwitch"></MisHeader>
      <MisAside :siteContent="siteContent" ref="Maside"></MisAside>
      <div :class="['site-content', { 'site-content__wrapper': $route.meta.isTab }]">
        <main class="site-content--tabs">
          <el-tabs
            class="demo-tabs"
            v-model="siteContent.tabActiveName"
            v-if="$route.meta.isTab"
            @tab-click="tabClick"
            @tab-remove="tabRemove"
          >
            <el-tab-pane
              :label="tab.title"
              :name="tab.name"
              v-for="(tab, index) in siteContent.navTabs"
              :key="index"
              :closable="true"
            >
              <el-card :body-style="heightView.height"
                ><router-view :key="router.currentRoute.value.query.random"></router-view
              ></el-card>
            </el-tab-pane>
          </el-tabs>
          <el-card v-else :body-style="heightView.height"
            ><router-view :key="router.currentRoute.value.query.random"></router-view
          ></el-card>
        </main>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MisHeader from './MisHeader/MisHeader.vue'
import MisAside from './MisAside/MisAside.vue'
import { ref, reactive, watch } from 'vue'
//获取route,router
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const Maside = ref()
const sidebar = reactive({
  isFold: false,
  sidebarSkin: 'dark'
})
const loading = ref(false)
//tab 栏切换
const siteContent = reactive({
  navTabs: [], //tabs里面的tab元素数组
  tabActiveName: '', //当前选中的tab
  menuActiveName: ''
})
//card 组件高度适配
const heightView=reactive({
  viewClientHeight:0,
  height:{}
})
//获取页面可视化高度
const getClientHeight=()=>{
  heightView.viewClientHeight=document.documentElement.clientHeight
}
//计算卡片内容高度
const cardHeight=()=>{
  let height=heightView.viewClientHeight-50-30-2
  if(route.meta.isTab){
    height-=40
  }
  heightView.height={minHeight:height+'px'}
}
//浏览器更改尺寸时
window.onresize=()=>{
   heightView.viewClientHeight=document.documentElement.clientHeight
   cardHeight()
}

/*判断对应的菜单是否要展示tab组件，如果要展示的话再判断这个tab是否被创建过，
如果数组里面没有这个tab，就创建新的tab添加到数组里面去
将这个tab里面保存route.name 为了实现切换tab的时候也对应着切换menu,tab-pane 绑定name也绑定路由名称
将meunActive和tabActive都用路由名称赋值
 **/

const switchTab = (route) => {
  getClientHeight()
  cardHeight()
  if (route.meta.isTab) {
    let tab = siteContent.navTabs.find((item) => item.name === route.name)
    if (!tab) {
      tab = {
        name: route.name,
        title: route.meta.title
      }
      siteContent.navTabs.push(tab)
    }
    siteContent.tabActiveName = tab.name
    siteContent.menuActiveName = tab.name
  } else {
    //切换到首页时置空tab数组
    siteContent.navTabs = []
    siteContent.tabActiveName = ''
    siteContent.menuActiveName = 'Home'
  }
}
//进入页面就要展示对应的tab
switchTab(route)
//路由发生变化时，触发tab切换函数
watch(
  () => router,
  () => {
    switchTab(route)
  },
  {
    immediate: true,
    deep: true
  }
)
//点击tab对应的menu也要切换到对应的menu里
const tabClick = ({ paneName }) => {
  router.push({ name: paneName })
}
//筛选出删除后的tab ,删除后将最后一个tab显示出来，然后跳转到对应的menu路由
const tabRemove = (name) => {
  siteContent.navTabs = siteContent.navTabs.filter((item) => item.name !== name)
  if (siteContent.navTabs.length > 0) {
    siteContent.tabActiveName = siteContent.navTabs[siteContent.navTabs.length - 1].name
    router.push({ name: siteContent.tabActiveName })
  } else {
    siteContent.tabActiveName = ''
    router.push({ name: 'MisHome' })
  }
}
//收缩侧边栏
const closeSwitch = () => {
  Maside.value?.closeAside()
  sidebar.isFold=!sidebar.isFold //bug 忘记给最上层添加样式
}

</script>
<style>
@import url('../assets/scss/index.scss');
.site-content--tabs {
  padding: 7px 0 0 !important;
}
</style>
