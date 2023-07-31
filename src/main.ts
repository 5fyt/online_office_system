import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//导入jquery ajax请求
import './api/index'
import './App.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//导入svg依赖库
import 'virtual:svg-icons-register'
//注册中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//注册权限
import './permission'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})

//注册icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册pinia
app.use(createPinia())
app.use(router)

app.mount('#app')
