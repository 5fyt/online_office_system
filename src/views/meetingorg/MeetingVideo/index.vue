<template>
  <div>
    <el-row :gutter="15">
      <!-- 视频墙 -->
      <el-col :span="19">
        <div class="meeting-container">
          <el-scrollbar height="650px" id="videoListContainer">
            <div class="video-list">
              <div class="video">
                <!-- <div class="user">
                  <el-image class="photo" :src="mine.photo" />

                </div> -->
                <span class="name">{{ mine.name }}{{ mine.isSelf ? '（共享中）' : '' }}</span>
                <div id="local_stream"></div>
              </div>
              <div class="video" v-for="one in videoList.users">
                <!-- <div class="user">
                  <el-image class="photo" :src="one.photo" />
                  <span class="name">{{ one.name }}</span>
                </div> -->
                <div :id="one.id" class="remote-stream" @dblclick="smallChangeVideo(one.id)"></div>
              </div>
            </div>
          </el-scrollbar>
          <div id="videoBig" @dblclick="bigChangeVideo()"></div>
        </div>
        <p class="desc">
          会议过程中，不需要发言的会场要主动将本地会场的MIC关闭，保证会场安静，当需要发言时要及时打开MIC。会议过程中，需要发言讨论时，先打开MIC向主会场提出请求，得到同意后再继续发言，否则请继续保持静音。发言时，要—个人一个人的发言，不要多人同时讲话，因为全向MIC会把所有人的声音混合，远端听到的声音会非常嘈杂，听不清具体说话内容。在会议进行过程中，尽量控制会场噪音，不要在会场中随意走动
        </p>
      </el-col>
      <UserList></UserList>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import UserList from './UserList/index.vue'
import useVideoStore from '@/stores/meetingorg/meetingvideo/index.ts'
import { reactive, ref ,watch} from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import TRTC from 'trtc-js-sdk'

const videoStore = useVideoStore()
const { sdkAppId, userId, userSig, users, rid } = storeToRefs(videoStore)
const route = useRoute()
const videoList = reactive({
  sdkAppId: '',
  userId: 0,
  userSig: '',
  users: []
})
const mine = ref(null)
const meetingId = ref(null)
const roomId = ref(null)

//获取client对象基本配置
const getSdkInfo = () => {
  meetingId.value = route.params.meetingId
  videoStore.getVideoInfo()
  videoList.sdkAppId = sdkAppId.value
  videoList.userId = userId.value
  videoList.userSig = userSig.value
  //如果要实时更新store里的值应该是同步获取ajax
}
getSdkInfo()
const loadList = () => {
  let id = meetingId.value
  videoStore.getOnlineParticipantInfo(id)
  let meetings = users.value
  if (meetings.length > 0) {
    mine.value = meetings[0]
    videoList.users = meetings.filter((item, index) => index !== 0)
  }
  videoStore.getRoomId(id)
  if (!rid.value) {
    ElMessage({
      message: '不存在视频会议',
      type: 'error'
    })
  } else {
    roomId.value = rid.value
  }
}
loadList()
const client = TRTC.createClient({
    mode: 'rtc',
    sdkAppId: videoList.sdkAppId,
    userId: videoList.userId.toString(),
    userSig: videoList.userSig,
    useStringRoomId: true
  })

  //  进入房间
  // try {
  //   await client.join({ roomId: roomId.value })
  //   console.log('进房成功')
  // } catch (error) {
  //   console.error('进房失败，请稍后再试' + error)
  // }
  client
    .join({ roomId: roomId.value })
    .then(() => {
      console.log('进房成功')
    })
    .catch((error) => {
      console.error('进房失败', +error)
    })
  //创建本地流
  const localStream = TRTC.createStream({
    userId: userId.value.toString(),
    audio: true,
    video: true
  })
  console.log(localStream)
  localStream
    .initialize()
    .then(() => {
      localStream.play('local_stream')
      console.log('初始化本地流成功')
    })
    .catch((error) => {
      console.log('初始化本地流失败 ' + error)
    })

//发布
// client
//   .publish(localStream)
//   .then(() => {
//     console.log('本地流发布成功')
//   })
//   .catch((error) => {
//     console.error('本地流发布失败 ' + error)
//   })
/*
try {
  await localStream.initialize()
  localStream.play('local_stream')
  console.log('初始化本地流成功')
} catch (error) {
  console.error('初始化本地流失败 ' + error)
}

try {
  await client.publish(localStream)
  console.log('本地流发布成功')
} catch (error) {
  console.error('本地流发布失败 ' + error)
}
*/

/*
//订阅远端流
client.on('stream-added', (event) => {
  const remoteStream = event.stream
  console.log('远端流增加: ')
  //订阅远端流
  client.subscribe(remoteStream)
})
//释放远端流
client.on('stream-subscribed', (event) => {
  const remoteStream = event.stream
  console.log('远端流订阅成功：')
  // // 创建播放容器
  // let remotePlayerElement = document.createElement('div')
  // remotePlayerElement.id = 'remote-stream-' + remoteStream.getId()
  // document.body.appendChild(remotePlayerElement)
  // 开始播放远端流，传入 play 方法的 Element ID 必须是页面里存在的 div 元素
  remoteStream.play('local_stream')
})
//退出房间
client
  .leave()
  .then(() => {
    // 退房成功，需要关闭本地流和远程流
    console.log('离开房间')
  })
  .catch((error) => {
    console.error('退房失败 ' + error)
  })
*/
const smallChangeVideo = () => {}
const bigChangeVideo = () => {}
</script>
<style lang="less">
@import url('./index.less');
</style>
