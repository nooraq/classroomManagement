import { PATHS } from 'src/router';
import user from './configParts/user'; // 用户
import test from './configParts/test';

export default [
  user,
  {
    path: '/',
    component: () => import('src/components/layout/BasicLayout'),
    routes: [
      { path: '/', redirect: PATHS.HOME_PAGE },
      test,
      { component: () => import('src/views/ErrorPage') }
    ]
  }
];
