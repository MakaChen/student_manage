import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import backIndex from '@/components/backIndex'
import userList from '@/components/userList'
import indexContent from '@/components/indexContent'
import adminList from '@/components/adminList'
import scoreList from '@/components/scoreList'
import searchIndex from '@/components/searchIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/backIndex', //首页框架
      name: 'backIndex',
      component: backIndex,
      children: [
        {
          path: 'userList', //课程列表
          component: userList
        },
        {
          path: 'scoreList', //首页统计
          component: scoreList
        }, {
          path: 'indexContent', //首页统计
          component: indexContent
        }, {
          path: 'adminList', //后台用户
          component: adminList
        }, 
        {
          path: 'searchIndex', //课程列表
          component: searchIndex
        },
        {
          path: '*',           //其他路径都跳转到首页
          redirect: 'indexContent'
        }
      ]
    }
  ]
})
