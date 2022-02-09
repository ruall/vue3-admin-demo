import Layout from '/@/layout/index.vue'

export default {
  path: '/dynamic',
  component: Layout,
  meta: { title: '动态管理' },
  redirect: '/dynamic/info',
  name: 'Dynamic',
  children: [
    {
      path: '/dynamic/info',
      component: () => import('/@/views/dynamic/index.vue'),
      name: 'DynamicInfo',
      meta: { title: '动态管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
