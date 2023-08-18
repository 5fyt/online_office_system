<template>
  <el-dialog title="缴纳罚款" :close-on-click-modal="false" v-model="visible" width="305px" center>
    <img :src="qrCode" class="qrcode" v-if="!result" />
    <div v-if="result" class="pay-success">
      <el-result icon="success" title="付款成功" subTitle="请根据提示进行操作"></el-result>
    </div>
    <div class="dialog-footer-style">
      <el-button type="danger"  v-if="!result" @click="cancelHandle"
        >取消支付</el-button
      >
      <el-button type="primary"  v-if="!result" @click="successHandle"
        >支付成功</el-button
      >
      <el-button type="primary"  v-if="result" @click="closeHandle"
        >关闭窗口</el-button
      >
    </div>
  </el-dialog>
</template>
