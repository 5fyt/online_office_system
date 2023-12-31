//封装用于判断用户是否具有某些权限的公共函数
const auth = (permission: string[]) => {
  const permissions: string | null = localStorage.getItem('permission')
  if (permissions) {
    let flag = false
    for (let one of permission) {
      if (permissions.includes(one)) {
        flag = true
        break
      }
    }
    return flag
  } else {
    return false
  }
}
export { auth }
