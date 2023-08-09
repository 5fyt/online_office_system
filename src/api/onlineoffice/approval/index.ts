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
