import { defineStore } from 'pinia'
import {
  videoInfo,
  onlineParticipant,
  onlineRoom,
  addVideoUser,
  autoCheckin
} from '@/api/meetingorg/meetingvideo/index'
import { ElMessage } from 'element-plus'
const useVideoStore = defineStore('video', {
  state: () => ({
    sdkAppId: '',
    userId: 0,
    userSig: '',
    rid: '',
    users: [],
    newUsers: null
  }),
  actions: {
    getVideoInfo() {
      let that = this
      videoInfo(function (res: any) {
        let { sdkAppId, userId, userSig } = res
        that.sdkAppId = sdkAppId
        that.userId = userId
        that.userSig = userSig
      })
    },
    getOnlineParticipantInfo(id: number) {
      let that = this
      onlineParticipant(id, function (res: any) {
        that.users = res.users
      })
    },
    getRoomId(id: number) {
      let that = this
      onlineRoom(id, function (res: any) {
        that.rid = res.id
      })
    },
    async checkIn(id: number) {
      await autoCheckin(id, function () {
        ElMessage({
          message: '签到成功',
          type: 'success'
        })
      })
    },
    async getNewEnterUserInfo(id: number) {
      let that = this
      addVideoUser(id, function (res: any) {
        const { code, message, ...other } = res
        that.newUsers = other
      })
    }
  }
})
export default useVideoStore
