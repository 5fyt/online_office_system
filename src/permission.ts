import router from './router/index'
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.name != "Login") {
		let permissions = localStorage.getItem("permissions")
		let token = localStorage.getItem("token")
		if (permissions == null || permissions == ""||token == null || token == "") {
			next({
				name: 'Login'
			})
		}
	}
	return next()
})
