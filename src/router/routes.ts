import Dashboard from '@/views/Dashboard.vue';
import EmptyRouterView from './EmptyRouterView.vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const routes: any[] = [
  {
    name: 'app',
    path: '/',
    component: EmptyRouterView,
    redirect: () => {
      return { name: 'main', query: { userRole: 'free' } };
    },
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!to.query.userRole) {
        next({ ...to, query: { ...to.query, userRole: 'free' } });
      } else {
        next();
      }
    },
    children: [
      {
        name: 'main',
        path: '',
        component: Dashboard,
      },
    ],
  },
];
