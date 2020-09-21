import VueRouter from 'vue-router'
import Router from 'vue-router'

const login = () => import('./pages/login.vue')
const Home = () => import('./pages/Home.vue')
const Welcome = () => import('./pages/Welcome.vue')
const User = () => import('./pages/User.vue')
const Roles = () => import('./pages/Roles.vue')
const Rights = () => import('./pages/Rights.vue')
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home', component: Home,
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      ]
    }
  ]
})
//挂载路由导航卫士
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next  一个函数 ，表示放行
  // next() 放行  / next（'/login'）强制跳转
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => { return err })
}
export default router
