import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'
import AllProperties from '../views/AllProperties.vue'
import About from '../components/About.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: MainLayout
        },
        {
            path: '/properties',
            name: 'allproperties',
            component: AllProperties
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },

    ]
})

export default router