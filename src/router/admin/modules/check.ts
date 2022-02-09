import Layout from '/@/layout/index.vue'

export default {
  path: '/check',
  component: Layout,
  meta: { title: '审核管理' },
  redirect: '/check/enterprise',
  name: 'Check',
  children: [
    {
      path: '/check/enterprise',
      component: () => import('/@/views/check/index.vue'),
      name: 'Enterprise',
      meta: { title: '审核管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
