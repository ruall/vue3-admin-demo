import Layout from '/@/layout/index.vue'

export default {
  path: '/system',
  component: Layout,
  meta: { title: '系统设置' },
  redirect: '/system/main',
  name: 'System',
  children: [
    {
      path: '/system/main',
      component: () => import('/@/views//system/index.vue'),
      name: 'SystemMain',
      meta: { title: '系统设置', icon: 'my-icon-operatesetting' }
    }
  ]
}
