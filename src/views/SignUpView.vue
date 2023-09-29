<template>
  <div class="container-center">
    <form class="form-container" v-on:submit.prevent="submitForm">
      <div class="form-outline mb-4">
          <h1 class="mb-3">Register Your Account</h1>
      </div>
      <!-- Name input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1">Name</label>
        <input type="text" v-model="form.name"  placeholder="Your full name" class="form-control" />
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example1">Email address</label>
        <input type="email" v-model="form.email" placeholder="Your email address" class="form-control" />
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2">Password</label>
        <input type="password" v-model="form.password1" placeholder="Your password" class="form-control" />
        
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="form2Example2">Confirm Password</label>
        <input type="password" v-model="form.password2" placeholder="Confirm your password" class="form-control" />

      </div>

      <!-- 2 column grid layout for inline styling -->
      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <!-- Checkbox -->
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Accept <router-link :to="{name: 'terms&conditions'}">Terms And Conditions</router-link> </label>
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
        <p>Already have an account? <router-link :to="{name: 'login'}">Log In</router-link></p>
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

import { useToastStore } from '@/stores/toast'

export default {
    setup() {
        const toastStore = useToastStore()

        return {
            toastStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                name: '',
                password1: '',
                password2: ''
            },
            errors: [],
        }
    },

    methods: {
        submitForm() {
            this.errors = []

            if (this.form.name === '') {
                this.errors.push('Your name is missing')
            }

            if (this.form.email === '') {
                this.errors.push('Your email is missing')
            }

            if (this.form.password1 === '') {
                this.errors.push('Your password is missing')
            }

            if (this.form.password1 !== this.form.password2) {
                this.errors.push('The passwords do not match')
            }

            if (this.errors.length === 0) {
                axios
                    .post('/api/accounts/signup/', this.form)
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.toastStore.showToast(5000, 'The user is registered. Please log in', 'bg-emerald-500')

                            this.form.email = ''
                            this.form.name = ''
                            this.form.password1 = ''
                            this.form.password2 = ''
                            
                            this.$router.push('/login')
                        } else {
                            this.toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-300')
                        }
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