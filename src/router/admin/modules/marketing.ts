import Layout from '/@/layout/index.vue'

export default {
  path: '/marketing',
  component: Layout,
  meta: { title: '营销管理' },
  redirect: '/marketing/main',
  name: 'Marketing',
  children: [
    {
      path: '/marketing/main',
      component: () => import('/@/views/marketing/index.vue'),
      name: 'Virtual',
      meta: { title: '营销管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
