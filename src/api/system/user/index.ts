// import request from '../../index'
import request from "../../index"
export const getDepartmentList = (callback: Function) => {
  return request('/department', 'GET', null, true, callback)
}
export const getRoleList = (callback: Function) => {
  return request('/role', 'GET', null, true, callback)
}
//获取用户表格数据
export const getUserTableList = (data: any, callback: Function) => {
  return request('/user/search', 'POST', data, true, callback)
}
//添加用户
export const addUser = (data: any, callback: Function) => {
  return request('/user/add', 'POST', data, false, callback)
}
//更新用户
export const updateUser = (data: any, callback: Function) => {
  return request('/user/update', 'POST', data, false, callback)
}
//删除用户
export const deleteUser = (data: string[], callback: Function) => {
  return request('/user/delete', 'POST', data, true, callback)
}
//离职用户
export const leaveUser = (id: string, callback: Function) => {
  return request(`/user/resign/${id}`, 'POST', null, true, callback)
}
