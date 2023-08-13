import request from '../../index'
export const getDataList = (data: any, callback: Function) => {
  return request('/meeting/search-online-meeting', 'POST', data, true, callback)
}
export const deleteMeeting = (id: number, callback: Function) => {
  return request(`/meeting/delete/${id}`, 'POST', null, false, callback)
}
export const addMeeting = (data: any, callback: Function) => {
  return request('/meeting/create', 'POST', data, false, callback)
}
