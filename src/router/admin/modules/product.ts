import Layout from '/@/layout/index.vue'

export default {
  path: '/product',
  component: Layout,
  meta: { title: '商品管理' },
  redirect: '/user/sell',
  name: 'Product',
  children: [
    {
      path: '/product/sell',
      component: () => import('/@/views/product/index.vue'),
      name: 'Sell',
      meta: { title: '商品信息管理', icon: 'my-icon-operatesetting' }
    }
  ]
}
