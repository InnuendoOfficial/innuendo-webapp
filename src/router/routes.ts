import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('src/pages/LoginPage.vue'),
      },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
