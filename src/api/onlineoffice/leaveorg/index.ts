import request from '../../index'
export const leaveInfo = (id: number, callback: Function) => {
  return request(`/leave/leave-form/${id}`, 'GET', null, false, callback)
}
//图表数据
export const chartsData = (callback: Function) => {
  return request('/penalty/chart-info', 'GET', null, true, callback)
}
