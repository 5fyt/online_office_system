<template>
  <div>
    <el-row :gutter="15">
      <!-- 视频墙 -->
      <el-col :span="19">
        <div class="meeting-container">
          <el-scrollbar height="650px" id="videoListContainer">
            <div class="video-list">
              <div class="video" v-for="(item, index) in mine" :key="index">
                <div class="user">
                  <el-image class="photo" :src="'http://127.0.0.1:9002/' + item.photo" />
                  <span class="name">{{ item.name }}{{ shareStatus ? '（共享中）' : '' }}</span>
                </div>
                <div id="local_stream"></div>
              </div>
              <div class="video" v-for="one in videoList.users">
                <div class="user">
                  <el-image class="photo" :src="'http://127.0.0.1:9002/' + one.photo" />
                  <span class="name">{{ one.name }}</span>
                </div>
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
      <el-col :span="5">
        <el-card shadow="never">
          <template #header>
            <div class="card-header"><span>用户列表</span></div>
          </template>
          <el-scrollbar height="555px">
            <ul class="user-list">
              <li v-for="one in videoList.userList">
                <img class="mic" src="../../../../assets/trtc/mic.png" />
                <div class="mic-container">
                  <img
                    class="mic-green"
                    :id="'mic-' + one.userId"
                    src="../../../../assets/trtc/mic-green.png"
                  />
                </div>
                <span>{{ one.department }} - {{ one.name }}</span>
              </li>
            </ul>
          </el-scrollbar>
        </el-card>
        <div class="meeting-operate">
          <button
            :class="meetingStatus ? 'phone-btn-off' : 'phone-btn-on'"
            @click="phoneHandle"
          ></button>
          <button
            :class="videoStatus ? 'video-btn-on' : 'video-btn-off'"
            @click="openVideo"
          ></button>
          <button :class="micStatus ? 'mic-btn-on' : 'mic-btn-off'" @click="micHandle"></button>
          <button
            :class="shareStatus ? 'share-btn-on' : 'share-btn-off'"
            @click="shareHandle"
          ></button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
// import UserList from '../UserList/index.vue'
import useVideoStore from '@/stores/meetingorg/meetingvideo/index.ts'
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import $ from 'jquery'
import { ElMessage } from 'element-plus'
import TRTC from 'trtc-js-sdk'

const videoStore = useVideoStore()
const { sdkAppId, userId, userSig, users, rid, newUsers } = storeToRefs(videoStore)
const route = useRoute()
const videoList = reactive({
  sdkAppId: '',
  userId: 0,
  userSig: '',
  users: [],
  userList: []
})
const mine = ref(null)
const meetingId = ref(null)
const roomId = ref(null)
const meetingStatus = ref(false)
const videoStatus = ref(false)
const micStatus = ref(false)
const shareStatus = ref(false)
const stream = ref(null) //远端流对象
const clientObj = ref(null)
const localStream = ref(null) //本地流
const shareStream = ref(null) //共享流
const client = ref(null) //client对象
const bigUserId = ref(null) //大屏userId
//获取client对象基本配置
const getSdkInfo = () => {
  meetingId.value = route.params.meetingId
  videoStore.getVideoInfo()
  videoList.sdkAppId = sdkAppId.value
  videoList.userId = userId.value
  videoList.userSig = userSig.value
  //如果要实时更新store里的值应该是同步获取ajax
}
const loadList = () => {
  let id = meetingId.value
  videoStore.getOnlineParticipantInfo(id)
  let meetings = users.value
  if (meetings.length > 0) {
    mine.value = meetings.filter((item) => item.isSelf)
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
const createClient = () => {
  const Client = TRTC.createClient({
    mode: 'rtc',
    sdkAppId: videoList.sdkAppId,
    userId: videoList.userId.toString(),
    userSig: videoList.userSig,
    useStringRoomId: true
  })
  client.value = Client
}
const createStream = () => {
  const local_stream = TRTC.createStream({
    userId: userId.value.toString(),
    audio: true,
    video: true
  })
  localStream.value = local_stream
}
getSdkInfo()
loadList()

createClient()
createStream()
const videoHandle = async () => {
  //创建本地流
  createStream()
  try {
    await client.value.join({ roomId: roomId.value })
    // //执行签到功能
    await videoStore.checkIn(meetingId.value)
    console.log('进房成功')
  } catch (error) {
    console.error('进房失败，请稍后再试' + error)
  }
  //本地用户进入会议后也需要将本人添加到进入会议列表中
  try {
    let userId = videoList.userId
    videoStore.getNewEnterUserInfo(userId).then(() => {
      let newInfo = newUsers.value //照样获取的还是同步请求
      videoList.userList.push({ userId, ...newInfo })
    })
  } catch {}
  try {
    await localStream.value.initialize()
    $('#local_stream').css({ 'z-index': 1 })
    localStream.value.play('local_stream')
    console.log('初始化本地流成功')
  } catch (error) {
    console.error('初始化本地流失败 ' + error)
  }

  try {
    await client.value.publish(localStream.value)
    console.log('本地流发布成功')
  } catch (error) {
    console.error('本地流发布失败 ' + error)
  }
}
//点击通话
const phoneHandle = () => {
  TRTC.checkSystemRequirements().then((checkResult) => {
    if (!checkResult.result) {
      window.alert('当前浏览器不支持视频会议', '提示信息', { confirmButtonText: '确定' })
    } else {
      meetingStatus.value = !meetingStatus.value

      //打开电话，订阅远端流，推送本地流
      if (meetingStatus.value) {
        videoStatus.value = true
        micStatus.value = true
        //当有其他用户进入会议时，自动获取远端流数据(未测试)
        client.value.on('stream-added', (event) => {
          const remoteStream = event.stream
          console.log('远端流增加: ')
          //订阅远端流
          client.value.subscribe(remoteStream)
          let userId = remoteStream.getId()

          //将每个远端流的远端流对象保存起来
          stream.value[userId] = remoteStream

          //将进入的远端用户页渲染到页面中
          let userid = videoList.userId //用户进入会议id标识
          videoStore.addVideoUser(userid)
          let newInfo = newUsers.value
          videoList.userList.push({ userId, ...newInfo })
        })
        //释放远端流
        client.value.on('stream-subscribed', (event) => {
          const remoteStream = event.stream
          console.log('远端流订阅成功：')
          let userId = remoteStream.getId()
          $('#' + userId).css({ 'z-index': 1 }) //这个id要和查询在线人数会议那个id是同一个
          remoteStream.play(userId + '')
        })
        //删除远端流，当用户离开视频会议时，自动删除远端流
        client.value.on('stream-removed', (event) => {
          const remoteStream = event.stream
          client.unsubscribe(remoteStream) //取消订阅
          //删除保存的刚进入用户elementId
          let userId = remoteStream.getId()

          //当刚进入的用户离开时，自动剔除新进入列表
          videoList.userList = videoList.userList.filter((item) => item.userId !== userId)

          //停止播放远端流，并关闭远端流
          remoteStream.stop()
          remoteStream.close()
          $('#' + userId).css({ 'z-index': -1 })
          $('#' + userId).html('')
        })
        //订阅语音事件（无论本地还是远端说话，都会触发这个事件）
        client.value.on('audio-volume', (event) => {
          event.result.forEach(({ userId, audioVolume, stream }) => {
            //说话声音超过5，就设置话筒音量动画
            if (audioVolume > 5) {
              $('#mic-' + userId).css('top', `${100 - audioVolume * 3}%`)
            } else {
              $('#mic-' + userId).css('top', `100%`)
            }
          })
        })
        // 开启音量回调函数，并设置每 30ms 触发一次事件
        client.value.enableAudioVolumeEvaluation(30)

        //将创建本地流，初始化本地流，推送本地流
        videoHandle()
      } else {
        //关闭视频
        let stream = localStream.value ? localStream.value : shareStream.value
        client.value.unpublish(stream).then(() => {
          client.value
            .leave()
            .then(() => {
              // 退房成功，需要关闭本地流和远程流
              console.log('离开房间')
              stream.stop()
              stream.close()
              localStream.value = null
              shareStream.value = null
              videoList.userList = []
              stream.value=null //清除远端流保存对象
              videoStatus.value = false
              micStatus.value = false
              $('#local_stream').css({ 'z-index': -1 })
              $('#local_stream').html('')
              //远端流用户退出时，如果是还在播放大屏时，应该将大屏隐藏，展示视屏墙
              if (bigUserId.value !== null) {
                bigUserId.value = null
                $('#videoListContainer').show()
                $('#videoBig').hide()
              }
            })
            .catch((error) => {
              console.error('退房失败 ' + error)
            })
        })
      }
    }
  })
}
//小屏转到大屏 ,未测试
const smallChangeVideo = (id) => {
  console.log('dianjia')
  bigUserId.value = id
  $('#videoListContainer').hide()
  $('#videoBig').show()
  stream.value[id].stop()
  stream.value[id].play('videoBig')
}
//大屏转小屏,未测试
const bigChangeVideo = () => {
  stream.value[bigUserId.value].stop()
  stream.value[bigUserId.value].play(bigUserId.value)
  bigUserId.value = null
  $('#videoListContainer').show()
  $('#videoBig').hide()
}
//开启摄像头
const openVideo = () => {
  let stream = localStream.value ? localStream.value : shareStream.value
  if (shareStatus.value) {
    window.alert('屏幕正在共享中无法开关摄像头', '提示信息', {
      confirmButtonText: '确定'
    })
    return
  }
  videoStatus.value = !videoStatus.value
  videoStatus.value ? stream.unmuteVideo() : stream.muteVideo()
}
//开启语音
const micHandle = () => {
  let stream = localStream.value ? localStream.value : shareStream.value
  micStatus.value = !micStatus.value
  micStatus.value ? stream.unmuteAudio() : stream.muteAudio()
}

//开启共享屏幕
const shareHandle = () => {
  if (!meetingStatus.value) {
    window.alert('请先进入视频会议你才能共享屏幕', '提示信息', {
      confirmButtonText: '确定'
    })
    return
  }
  if (!TRTC.isScreenShareSupported()) {
    window.alert('该浏览器不支持屏幕共享', '提示信息', {
      confirmButtonText: '确定'
    })
    return
  }
  shareStatus.value = !shareStatus.value
  if (shareStatus.value) {
    let share_stream = TRTC.createStream({
      userId: userId.value.toString(),
      audio: micStatus.value,
      screen: true
    })
    shareStream.value = share_stream
    shareStream.value.setScreenProfile('1080p')
    shareStream.value
      .initialize()
      .then(() => {
        client.value.unpublish(localStream.value).then(() => {
          console.log('取消本地流')
          localStream.value.close()
          localStream.value = null
          $('#local_stream').css({ 'z-index': -1 })
          client.value.publish(shareStream.value)
        })
      })
      .catch((error) => {
        console.log('初始化共享流失败', error)
      })
    //关闭屏幕共享
  } else {
    createStream()
    localStream.value.setScreenProfile('720p')
    localStream.value
      .initialize()
      .then(() => {
        client.value.unpublish(shareStream.value).then(() => {
          console.log('取消共享流')
          shareStream.value.close()
          shareStream.value = null
          $('#local_stream').css({ 'z-index': 1 })
          localStream.value.play('local_stream')
          client.value
            .publish(localStream.value)
            .then(() => {
              console.log('本地流发布成功')
            })
            .catch((error) => {
              console.log('本地流发布失败', error)
            })
        })
      })
      .catch((error) => {
        console.log('初始化共享流失败', error)
      })
  }
}
</script>
<style lang="less">
@import url('./index.less');
</style>
