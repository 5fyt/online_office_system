import request from '@/api'
export const getTypeList = (callback: Function) => {
  return request('/penalty/type', 'GET', null, false, callback)
}
export const getTableList = (pageName: string, data: any, callback: Function) => {
  return request(`/${pageName}/search`, 'POST', data, false, callback)
}
export const addData = (pageName: string, data: any, callback: Function) => {
  return request(`/${pageName}/add`, 'POST', data, false, callback)
}
export const updateData = (pageName: string, data: any, callback: Function) => {
  return request(`/${pageName}/update`, 'POST', data, false, callback)
}
export const deleteData = (pageName: string, data: any, callback: Function) => {
  return request(`/${pageName}/delete`, 'POST', data, false, callback)
}
