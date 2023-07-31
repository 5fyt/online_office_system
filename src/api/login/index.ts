import request from '..'

export const login = (data: any, callback: Function) => {
  return request('/user/login', 'POST', data, true, callback)
}
export const updatePassword=(data:any,callback:Function)=>{
  return request('/user/change-password','POST',data,true,callback)
}
