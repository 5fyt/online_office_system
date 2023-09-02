import request from '../../index'
export const approvalList = (data: any, callback: Function) => {
  return request('/approval/search', 'POST', data, true, callback)
}

export const approvalFn = (data: any, callback: Function) => {
  return request('/approval/approve', 'POST', data, false, callback)
}
//审批会议详情
export const meetingInfo = (id: string, callback: Function) => {
  return request(`/meeting/approval-info/${id}`, 'GET', null, false, callback)
}
//审批请假详情
export const leaveInfo = (id: string, callback: Function) => {
  return request(`/leave/approval-info/${id}`, 'GET', null, false, callback)
}
//审批报销详情
export const reimInfo = (id: string, callback: Function) => {
  return request(`/reimburse/approval-info/${id}`, 'GET', null, false, callback)
}
export const archiveFn = (data: any, callback: Function) => {
  return request('/approval/archive', 'POST', data, true, callback)
}
