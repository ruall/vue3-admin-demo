import Layout from '/@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  meta: { title: '用户' },
  redirect: '/user/main',
  name: 'User',
  children: [
    {
      path: '/user/main',
      component: () => import('/@/views/user/index.vue'),
      name: 'UserList',
      meta: { title: '用户管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
