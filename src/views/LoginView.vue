<template>
  <div class="container-center">
    <form class="form-container" v-on:submit.prevent="submitForm">
      <div class="form-outline mb-4">
          <h1 class="mb-3">Sign In</h1>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1">Email address</label>
        <input type="email" v-model="form.email" placeholder="Your email address" class="form-control" />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2">Password</label>
        <input type="password" v-model="form.password" placeholder="Your password" class="form-control" />
        
      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <!-- Checkbox -->
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Remember me </label>
          </div>
        </div>

        <div class="col">
          <!-- Simple link -->
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <!-- Submit button -->
      <button class="btn btn-primary btn-block mb-4">Sign in</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Not a member? <router-link :to="{name: 'signup'}">Register</router-link></p>
        <p>or sign up with:</p>
        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-facebook-f"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-google"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-twitter"></i>
        </button>

        <button type="button" class="btn btn-link btn-floating mx-1">
          <i class="fab fa-github"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }

    },

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errors: []
        }
    },

    methods: {
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your email is missing')
            }

            if (this.form.password === '') {
                this.errors.push('Your password is missing')
            }

            if (this.errors.length === 0) {
                await axios
                    .post('/api/token/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
                
                await axios
                    .get('/api/accounts/me')
                    .then(response => {
                        this.userStore.setUserInfo(response.data)

                        this.$router.push('/') // return to home page
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }

        }
    }
}

</script>

<style scoped>
.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 500px; /* Adjust the width as needed */
}

/* Center form inputs and elements */
.form-container .form-outline {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container .form-outline h1{
    color: rgb(83, 160, 5);
    
}

.form-container .btn-primary {
  width: 100%;
}

/* Add more styling as needed */
</style>