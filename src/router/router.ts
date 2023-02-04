import * as VueRouter from 'vue-router';
import routes from './routes';

// configure router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    }
    if (to.hash) {
        return { el: to.hash,  behavior: 'smooth'};
    }
    return { top: 0, left: 0 };
}
});

export default router;
