import request from '../../index'
export const getDepartmentList = (callback: Function) => {
  return request('/department', 'GET', null, true, callback)
}
export const getRoleList = (callback: Function) => {
  return request('/role', 'GET', null, true, callback)
}
//获取用户表格数据
export const getUserTableList = (pageName:string,data: any, callback: Function) => {
  return request(`/${pageName}/search`, 'POST', data, true, callback)
}
//添加用户、部门、角色
export const addUser = (pageName:string,data: any, callback: Function) => {
  return request(`/${pageName}/add`, 'POST', data, false, callback)
}
//更新用户、部门、角色
export const updateUser = (pageName:string,data: any, callback: Function) => {
  return request(`/${pageName}/update`, 'POST', data, false, callback)
}
//删除用户、部门、角色
export const deleteUser = (pageName:string,data: number[], callback: Function) => {
  return request(`/${pageName}/delete`, 'POST', data, false, callback)
}
//离职用户
export const leaveUser = (id: any, callback: Function) => {
  return request(`/user/resign/${id}`, 'POST', null, false, callback)
}
//查询所有角色权限
export const getRolePermission=(callback:Function)=>{
  return request(`/role/permission`,'GET',null,true,callback)
}
