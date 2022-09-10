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
      {
        name: 'code',
        path: '/code',
        component: () => import('src/pages/CodePage.vue'),
      }
    ]
  },

  {
    path: '/forms',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'forms',
        path: '',
        component: () => import('src/pages/FormPage.vue'),
      },
    ],
  },

  {
    path: '/validation',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'validation',
        path: '',
        component: () => import('src/pages/FormValidation.vue'),
      },
    ],
  },


  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('src/pages/HomePage.vue'),
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
