// import DashboardLayout from '@/layouts/DashboardLayout.vue';
import BaseLayout from '../layouts/BaseLayout.vue';
// import CreatePostLayout from '@/layouts/CreatePostLayout.vue';


const routes = [
    {
        path: '/',
        component: BaseLayout,
        redirect: 'pools',
        children: [
            {
                path: '/pools',
                name: 'home',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../pages/Home.vue')
            },
            {
                path: '/pool/:id/:title',
                name: 'pool-details',
                props: true,
                component: () => import('../pages/LiquidSwap.vue')
            }
        ]
    },
];


export default routes;
