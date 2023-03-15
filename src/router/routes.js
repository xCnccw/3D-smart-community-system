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
    //后台管理系统
    {
        name: '后台管理系统',
        path: '/adminMain',
        component: () => import('@/views/adminPage/main/index.vue'),
        children: [
            {
                name: '用户管理',
                path: '/user',
                component: () => import('@/views/adminPage/userlist/index.vue'),
                children: [
                    {
                        name: '用户列表',
                        path: '/userlist',
                        component: () => import('@/views/adminPage/userlist/index.vue'),
                    },
                ]
            },
            {
                name: '城市管理',
                path: '/user',
                component: () => import('@/views/adminPage/carlist/index.vue'),
                children: [
                    {
                        name: '车辆列表',
                        path: '/carlist',
                        component: () => import('@/views/adminPage/carlist/index.vue'),
                    },
                ]
            },
            {
                name: '图标管理',
                path: '/user',
                component: () => import('@/views/adminPage/pie/index.vue'),
                children: [
                    {
                        name: '饼图',
                        path: '/pie',
                        component: () => import('@/views/adminPage/pie/index.vue'),
                    },
                ]
            }
        ]
    },
];

export default routes