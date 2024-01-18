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
    path: '/code_generator',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'code_generator',
        path: '',
        component: () => import('src/pages/CodeGeneration.vue'),
      },
    ],
  },

  {
    path: '/patiente',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'patiente',
        path: '',
        component: () => import('src/pages/PatientePage.vue'),
      },
    ],
  },

  {
    path: '/params',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'params',
        path: '',
        component: () => import('src/pages/UserPage.vue'),
      },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'admin',
        path: '',
        component: () => import('src/pages/AdminAccess.vue'),
      },
    ],
  },

  {
    path: '/admin_home',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'admin_home',
        path: '',
        component: () => import('src/pages/AdminHome.vue'),
      },
    ],
  },

  {
    path: '/admin_recap',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'admin_recap',
        path: '',
        component: () => import('src/pages/UserRecap.vue'),
      },
    ],
  },

  {
    path: '/acc',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'acc',
        path: '',
        component: () => import('src/pages/AdminPage.vue'),
      },
    ],
  },

  {
    path: '/suppok',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'suppok',
        path: '',
        component: () => import('src/pages/SuppValidation.vue'),
      },
    ],
  },

  {
    path: '/mobileResetOK',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'mobileResetOK',
        path: '',
        component: () => import('src/pages/MobileResetValidation.vue'),
      },
    ],
  },

  {
    path: '/reset',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'reset',
        path: '',
        component: () => import('src/pages/ResetMobile.vue'),
      },
    ],
  },
  
  {
    path: '/sup',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'sup',
        path: '',
        component: () => import('src/pages/SuppMobile.vue'),
      },
    ],
  },

  {
    path: '/mobileSuppOK',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'mobileSuppOK',
        path: '',
        component: () => import('src/pages/SuppMobileOK.vue'),
      },
    ],
  },

  {
    path: '/forgot_pwd',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'forgot_pwd',
        path: '',
        component: () => import('src/pages/ForgotPwd.vue'),
      },
    ],
  },

  {
    path: '/contact_validation',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: '',
        path: '',
        component: () => import('src/pages/ContactValidation.vue'),
      },
    ],
  },
  {
    path: '/resi_va',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: '',
        path: '',
        component: () => import('src/pages/ResillationValidation.vue'),
      },
    ],
  },

  {
    path: '/contact',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'contact',
        path: '',
        component: () => import('src/pages/ContactPage.vue'),
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
        name: 'login',
        path: '',
        component: () => import('src/pages/LoginPage.vue'),
      }
    ]
  },

  {
    path: '/home',
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
    path: '/paiementsucceed',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'paiement_succeed',
        path: '',
        component: () => import('src/pages/PaiementSucceed.vue'),
      }
    ]
  },

  {
    path: '/paiementfailed',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'paiement_failed',
        path: '',
        component: () => import('src/pages/PaiementFailed.vue'),
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
