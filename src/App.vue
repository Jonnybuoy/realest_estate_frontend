<template>
  <div class="container-xxl bg-white p-0">
    <div class="container-fluid nav-bar bg-transparent">
    <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
        <a href="index.html" class="navbar-brand d-flex align-items-center text-center">
            <div class="icon p-2 me-2">
                <img class="img-fluid" src="src/img/icon-deal.png" alt="Icon" style="width: 30px; height: 30px;">
            </div>
            <h1 class="m-0 text-primary">Hina Homes</h1>
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto">
                <router-link :to="{name: 'home'}" class="nav-item nav-link active">Home</router-link>
                <router-link :to="{name: 'about'}" class="nav-item nav-link">About</router-link>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</a>
                    <div class="dropdown-menu rounded-0 m-0">
                        <router-link :to="{name: 'allproperties'}" class="dropdown-item">Property List</router-link>
                        <a href="" class="dropdown-item">Property Agent</a>
                    </div>
                </div>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div class="dropdown-menu rounded-0 m-0">
                        <a href="" class="dropdown-item">Testimonial</a>
                        <a href="" class="dropdown-item">Blog</a>
                    </div>
                </div>
                <a href="" class="nav-item nav-link">Contact</a>
            </div>
            <div>
            <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                <router-link :to="{name: 'home'}" class="btn btn-primary px-3 d-none d-lg-flex" @click="logout">
                    Logout
                </router-link>
            </template>

            <template v-else>
                <router-link :to="{name: 'login'}" class="btn btn-primary px-3 d-none d-lg-flex">
                    Login
                </router-link>
                <router-link :to="{name: 'signup'}" class="btn btn-primary px-3 d-none d-lg-flex">
                    Signup
                </router-link>
            </template>
            </div>
        </div>
    </nav>
    </div>

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
// import NavBar from './components/NavBar.vue'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    beforeCreate() {
        this.userStore.initStore()

        const token = this.userStore.user.access

        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            axios.defaults.headers.common["Authorization"] = "";
        }
    },

    methods: {
        logout() {
            console.log('Log out')

            this.userStore.removeToken()

            this.$router.push('/login')
        }
    }
}

</script>

<style>
@import 'src/assets/bootstrap.min.css';
@import 'src/assets/style.css';

</style>
