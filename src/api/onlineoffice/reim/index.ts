import request from '../../index'
export const reimInfo = (id: number, callback: Function) => {
  return request(`/reimburse/get/${id}`, 'GET', null, false, callback)
}
export const addReimApi = (data: any, callback: Function) => {
  return request('/reimburse/add', 'POST', data, false, callback)
}
