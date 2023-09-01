import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'
import AllProperties from '../views/AllProperties.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import About from '../components/About.vue'
import PropertyDetails from '../components/PropertyDetails.vue'
import TermsAndConditions from '../components/TermsAndConditions.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: MainLayout
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
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
        {
            path: '/propertydetails/:slug',
            name: 'propertydetails',
            component: PropertyDetails
        },
        {
            path: '/terms&conditons',
            name: 'terms&conditions',
            component: TermsAndConditions
        },

    ]
})

export default router