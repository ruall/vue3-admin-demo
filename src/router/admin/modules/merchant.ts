import Layout from '/@/layout/index.vue'

export default {
  path: '/index',
  component: Layout,
  meta: { title: '企业' },
  redirect: '/merchant/main',
  name: 'Merchant',
  children: [
    {
      path: '/merchant/main',
      component: () => import('/@/views/merchant/index.vue'),
      name: 'MerchantList',
      meta: { title: '企业管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
