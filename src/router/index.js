import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // 尝试获取token
    const token = localStorage.getItem('token');

    // 检查路由是否需要认证
    const isAuthRequired = to.matched.some(record => record.meta.requiresAuth);

    if (isAuthRequired && !token) {
        // 如果路由需要认证，并且没有token，则重定向到登录页面
        next({ name: 'loginPage' });
    } else {
        // 否则，继续导航
        next();
    }
});

export default router