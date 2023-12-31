import { createRouter, createWebHistory } from 'vue-router'

//不能直接用这是一个类型
import type { RouteRecordRaw } from 'vue-router'
// import TestDemo from '@/views/meetingorg/TestDemo/index.vue'
// import MeetingVideo from '@/views/meetingorg/MeetingVideo/index.vue'
const history = createWebHistory()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Main' }
  },

  {
    path: '/main',
    redirect: { name: 'Home' },
    name: 'Main',
    component: () => import('@/MisLayout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/system/department/index.vue'),
        meta: {
          title: '部门',
          isTab: true
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色',
          isTab: true
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户',
          isTab: true
        }
      },
      {
        path: 'offline_meeting',
        name: 'OfflineMeeting',
        component: () => import('@/views/meetingorg/OfflineMeeting/index.vue'),
        meta: {
          title: '线下会议',
          isTab: true
        }
      },
      {
        path: 'online_meeting',
        name: 'OnlineMeeting',
        component: () => import('@/views/meetingorg/OnlineMeeting/index.vue'),
        meta: {
          title: '线上会议',
          isTab: true
        }
      },
      {
        path: 'meeting_room',
        name: 'MeetingRoom',
        component: () => import('@/views/meetingorg/MeetingRoom/index.vue'),
        meta: {
          title: '会议室',
          isTab: true
        }
      },
      {
        path: 'approval',
        name: 'Approval',
        component: () => import('@/views/onlineoffice/approval/index.vue'),
        meta: {
          title: '在线审批',
          isTab: true
        }
      },
      {
        path: 'meeting_video/:meetingId',
        name: 'MeetingVideo',
        component: () => import('@/views/meetingorg/MeetingVideo/index.vue'),
        meta: {
          title: '视频会议',
          isTab: true
        }
      },
      {
        path: 'amect',
        name: 'Amect',
        component: () => import('@/views/onlineoffice/PenaltyFine/index.vue'),
        meta: {
          title: '违纪罚款',
          isTab: true
        }
      },
      {
        path: 'leave',
        name: 'Leave',
        component: () => import('@/views/onlineoffice/leave/index.vue'),
        meta: {
          title: '员工请假',
          isTab: true
        }
      },
      {
        path: 'report',
        name: 'AmectReport',
        component: () => import('@/views/onlineoffice/PayCharts/index.vue'),
        meta: {
          title: '违纪报告',
          isTab: true
        }
      },
      {
        path: 'amect_type',
        name: 'AmectType',
        component: () => import('@/views/systemsetting/PenaltyType/index.vue'),
        meta: {
          title: '罚款类型',
          isTab: true
        }
      },
      {
				path: 'reim',
				name: 'Reim',
        component: () => import('@/views/onlineoffice/reim/index.vue'),
				meta: {
					title: '报销管理',
					isTab: true
				}
			}
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue')
  }
]
const router = createRouter({
  history,
  routes
})

export default router
