<template>
  <!-- 用户列表区域 -->
  <el-col :span="5">
    <!-- <el-card shadow="never">
      <template #header>
        <div class="card-header"><span>用户列表</span></div>
      </template>
      <el-scrollbar height="555px">
        <ul class="user-list">
          <li v-for="one in userList">
            <img class="mic" src="../assets/trtc/mic.png" />
            <div class="mic-container">
              <img class="mic-green" :id="'mic-' + one.userId" src="../assets/trtc/mic-green.png" />
            </div>
            <span>{{ one.dept }} - {{ one.name }}</span>
          </li>
        </ul>
      </el-scrollbar>
    </el-card>
    <div class="meeting-operate">
      <button
        :class="meetingStatus ? 'phone-btn-off' : 'phone-btn-on'"
        @click="phoneHandle"
      ></button>
      <button :class="videoStatus ? 'video-btn-on' : 'video-btn-off'" @click="videoHandle"></button>
      <button :class="micStatus ? 'mic-btn-on' : 'mic-btn-off'" @click="micHandle"></button>
      <button :class="shareStatus ? 'share-btn-on' : 'share-btn-off'" @click="shareHandle"></button>
    </div>
    -->
  </el-col>
</template>
<script setup lang="ts"></script>
