const routes = [
    {
        path: '/',
        redirect: '/loginPage',
    },
    {
        name: 'loginPage',
        path: '/loginPage',
        component: () => import('../views/loginPage/index.vue')
    },
    {
        name: 'mainPage',
        path: '/mainPage',
        component: () => import('@/views/mainPage/index.vue')
    },
    {
        name: 'backstagePage',
        path: '/backstagePage',
        component: () => import('@/views/backstagePage/index.vue')
    },
    
];
 
export default routes