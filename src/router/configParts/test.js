export default {
  exact: true,
  routes: [
    {
      path: '/bulletin',
      name: '公告',
      component: () => import('src/views/Bulletin')
    }, {
      path: '/comment',
      name: '评论',
      component: () => import('src/views/Comment')
    }, {
      path: '/data',
      name: '公告',
      component: () => import('src/views/Data')
    }, {
      path: '/course',
      name: '公告',
      component: () => import('src/views/Course')
    }, {
      path: '/userManage',
      name: '用户',
      component: () => import('src/views/Users')
    }
  ]
};
