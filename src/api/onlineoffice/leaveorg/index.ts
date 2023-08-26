import request from '../../index'
export const leaveInfo = (id: number, callback: Function) => {
  return request(`/leave/leave-form/${id}`, 'GET', null, false, callback)
}
