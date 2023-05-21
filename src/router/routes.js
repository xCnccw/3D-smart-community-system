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
        name: 'detailPage',
        path: '/detailPage',
        component: () => import('@/views/detailPage/index.vue')
    },
 //后台管理系统
 {
    name: '后台管理系统',
    path: '/adminMain',
    component: () => import('@/views/adminPage/main/index.vue'),
    children: [
        {
            name: '修改密码',
            path: '/pwdchange',
            component: () => import('@/views/adminPage/views/pwdchange/index.vue'),
        },
        {
            name: '智能对话',
            path: '/openai',
            component: () => import('@/views/adminPage/views/openAi/index.vue'),
        },
        {
            name: '用户管理',
            path: '/user',
            // component: () => import('@/views/adminPage/userlist/index.vue'),
            children: [
                {
                    name: '用户列表',
                    path: '/userlist',
                    component: () => import('@/views/adminPage/views/userlist/index.vue'),
                },
            ]
        },
        {
            name: '通知管理',
            path: '/notices',
            // component: () => import('@/views/adminPage/userlist/index.vue'),
            children: [
                {
                    name: '通知列表',
                    path: '/notificationslist',
                    component: () => import('@/views/adminPage/views/notificationslist/index.vue'),
                },
            ]
        },
        {
            name: '城市管理',
            path: '/user',
            // component: () => import('@/views/adminPage/carlist/index.vue'),
            children: [
                {
                    name: '车辆列表',
                    path: '/carlist',
                    component: () => import('@/views/adminPage/views/carlist/index.vue'),
                },
                {
                    name: '建筑列表',
                    path: '/buildingslist',
                    component: () => import('@/views/adminPage/views/buildings/index.vue'),
                },
            ]
        },
        {
            name: '图标管理',
            path: '/user',
            // component: () => import('@/views/adminPage/pie/index.vue'),
            children: [
                {
                    name: '雷达图',
                    path: '/piecharts',
                    component: () => import('@/views/adminPage/views/piecharts/index.vue'),
                },
                {
                    name: '饼图',
                    path: '/BDdetailslist',
                    component: () => import('@/views/adminPage/views/BDdetails/index.vue'),
                },
                {
                    name: '柱状图',
                    path: '/barcharts',
                    component: () => import('@/views/adminPage/views/barcharts/index.vue'),
                },
            ]
        }
    ]
},
];

export default routes
