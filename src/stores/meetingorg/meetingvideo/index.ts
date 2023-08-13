import { defineStore } from 'pinia'
import {
  videoInfo,
  onlineParticipant,
  onlineRoom,
  addVideoUser,
  autoCheckin
} from '@/api/meetingorg/meetingvideo/index'
const useVideoStore = defineStore('video', {
  state: () => ({
    sdkAppId: '',
    userId: 0,
    userSig: '',
    rid: '',
    users: [],
    newUsers: []
  }),
  actions: {
    getVideoInfo() {
      let that = this
      videoInfo(function (res: any) {
        console.log('zhi')
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
    checkIn(id: number) {
      autoCheckin(id, function () {})
    },
    getNewEnterUserInfo(id: number) {
      let that = this
      addVideoUser(id, function (res: any) {
        let { code, message, ...other } = res
        that.newUsers = other
      })
    }
  }
})
export default useVideoStore
