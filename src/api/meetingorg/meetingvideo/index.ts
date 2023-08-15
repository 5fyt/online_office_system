import request from '@/api'
//获取多人视频会议的基本配置信息
export const videoInfo = (callback: Function) => {
  return request('/meeting/online/user-info', 'GET', null, false, callback)
}
//获取在线参会人员信息
export const onlineParticipant = (id: number, callback: Function) => {
  return request(`/meeting/online/participants-info/${id}`, 'GET', null, false, callback)
}
//获取在线视频id
export const onlineRoom = (id: number, callback: Function) => {
  return request(`/meeting/online/room-id/${id}`, 'GET', null, false, callback)
}
//已经进入视频会议的人员
export const addVideoUser = (id: number, callback: Function) => {
  return request(`/meeting/online/department-info/${id}`, 'GET', null, false, callback)
}
//自动签到功能
export const autoCheckin = (id: number, callback: Function) => {
  return request(`/meeting/online/checkin/${id}`, 'POST', null, true, callback)
}
