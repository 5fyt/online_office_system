import request from '@/api'
//获取会议名称
export const getMeetingName = (callback: Function) => {
  return request('/meeting', 'GET', null, true, callback)
}
//获取线下会议
export const getofflineList = (data: any, callback: Function) => {
  return request('/meeting/search-offline-meeting', 'POST', data, false, callback)
}
//获取周日历
export const getCalendarList = (data: any, callback: Function) => {
  return request('/meeting/meeting-name', 'POST', data, false, callback)
}
//获取成员名称
export const getMemberName = (callback: Function) => {
  return request('/meeting/member', 'GET', null, true, callback)
}
//添加新会议
export const addMeeting = (data: any, callback: Function) => {
  return request('/meeting/create', 'POST', data, false, callback)
}
//会议详情
export const meetingInfo = (id: number, callback: Function) => {
  return request(`/meeting/info/${id}`, 'GET', null, false, callback)
}
//删除会议
export const meetingdelete = (id: number, callback: Function) => {
  return request(`/meeting/delete/${id}`, 'POST', null, true, callback)
}
