import router from './router/index'

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.name != 'Login') {
    let permission = localStorage.getItem('permission')
    let token = localStorage.getItem('token')
    if (permission == null || permission == '' || token == null || token == '') {
      console.log(1)
      next({
        name: 'Login'
      })
    }
  }
  
  return next()
})
