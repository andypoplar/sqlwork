import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserRole = store.getters.roleToken
      if (hasGetUserRole) {
        next()
      } else {
        try {
          // get user info
          // const userinfo = await store.dispatch('user/login')
          const userinfo = store.getters.userinfo

          // const userinfo = { 'isavaiable': 1, 'type_flag': 1 }

          // user is avaiable
          if (userinfo.isavaiable === 1) {
            // user is admin or editor
            if (userinfo.type_flag === 1) {
              await store.dispatch('user/setRoleToken', 'admin')
            } else {
              await store.dispatch('user/setRoleToken', 'editor')
            }
          } else {
            throw '你已被封号'
          }

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')

          Message.error(error || 'Has Error')

          next(`/login?redirect=${to.path}`)

          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
