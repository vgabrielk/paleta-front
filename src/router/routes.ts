import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import api from '../api/api';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/auth/LoginPage.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const response = await api.get('/auth/check');
        if (response.status === 200) {
          return next({ name: 'home' });
        }
        next();
      } catch {
        next();
      }
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/auth/RegisterPage.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        const response = await api.get('/auth/check');
        if (response.status === 200) {
          return next({ name: 'home' });
        }
        next();
      } catch {
        next();
      }
    },
  },
  {
    path: '/:portfolioUrl',
    name: 'portfolio-published',
    component: () => import('pages/templates/TemplatePreviewPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      try {
        const response = await api.get('/auth/check');
        if (response.status === 200) {
          next();
        } else {
          next({ name: 'login' });
        }
      } catch {
        next({ name: 'login' });
      }
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('src/pages/portfolio/PortfolioPage.vue'),
      },
      {
        path: '/portfolio/create/:type?',
        name: 'portfolio-create',
        component: () => import('src/pages/portfolio/PortfolioForm.vue'),
      },
      {
        path: '/portfolio/edit/:id',
        name: 'portfolio-edit',
        component: () => import('src/pages/portfolio/PortfolioForm.vue'),
      },
      {
        path: '/show/test',
        name: 'teste',
        component: () => import('src/pages/TestPage.vue'),
      },
      {
        path: '/templates',
        children: [
          {
            path: '',
            name: 'templates',
            component: () => import('src/pages/templates/TemplateListPage.vue'),
          },
          {
            path: 'preview/:id/:portfolioUrl?',
            name: 'template-preview',
            component: () => import('pages/templates/TemplatePreviewPage.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    api
      .get('/auth/check')
      .then((response) => {
        if (response.status === 200) {
          next();
        } else {
          next({ name: 'login' });
        }
      })
      .catch(() => {
        next({ name: 'login' });
      });
  } else {
    next();
  }
});

export default routes;
