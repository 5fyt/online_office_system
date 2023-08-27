import request from '../../index'
export const approvalList = (data: any, callback: Function) => {
  return request('/approval/search', 'POST', data, true, callback)
}
export const approvalInfo = (id: string, callback: Function) => {
  return request(`/approval/info/${id}`, 'GET', null, false, callback)
}
export const approvalFn = (data: any, callback: Function) => {
  return request('/approval/approve', 'POST', data, false, callback)
}
export const leaveInfo = (id: string, callback: Function) => {
  return request(`/leave/approval-info/${id}`, 'GET', null, false, callback)
}

export const reimInfo = (id: string, callback: Function) => {
  return request(`/reimburse/approval-info/${id}`, 'GET', null, false, callback)
}
export const archiveFn = (data: any, callback: Function) => {
  return request('/approval/archive', 'POST', data, true, callback)
}
