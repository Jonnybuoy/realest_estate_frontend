<template>
  <div v-if="listingDetails" class="container mt-5">
    <div class="row">
      <div class="property-details col-md-8">
        <!-- Main Property Photo -->
        <img :src="listingDetails.photo_main" alt="Property Photo" class="img-fluid mb-4">

        <!-- Property Details -->
        <h2>{{ listingDetails.title }}</h2>
        <p class="property-price"> KES {{ listingDetails.price }}</p>
        <p><font-awesome-icon icon="fa-solid fa-location-dot" /> {{ listingDetails.city }}, {{ listingDetails.state }}</p>
        
        <p><strong>Home Type:</strong> {{ listingDetails.home_type }}</p>
        <p><strong>Square Feet:</strong> {{ listingDetails.sqft }} sqft</p>
        <p><strong>Sale Type:</strong> {{ listingDetails.sale_type }}</p>
        <p><strong>Bedrooms:</strong> {{ listingDetails.bedrooms}} </p>
        <p><strong>Bathrooms:</strong>{{ listingDetails.bathrooms }}</p>
      </div>
      <div class="col-md-12 mt-4">
        <!-- Gallery Section -->
        <h2>Gallery</h2>
        <div class="row">
          <!-- Loop through listingDetails.photo_1 to listingDetails.photo_16 -->
          <div v-for="photoNumber in 16" :key="photoNumber" class="gallery col-md-4 mb-3">
            <img v-if="listingDetails['photo_' + photoNumber] !== null" :src="listingDetails['photo_' + photoNumber]" :alt="'Gallery Photo ' + photoNumber" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'
import 'owl.carousel/dist/assets/owl.carousel.min.css'

import mainJs from '../main.js'

import { useListingsStore } from '../stores/listings'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {

    setup() {
        const router = useRouter()
        const listingsStore = useListingsStore()

        console.log('router', router)

        // const selectedListing = ref(null)

        const {
            listings,
            listingDetails,
            getListingDetails
        } = storeToRefs(listingsStore)

        watchEffect(() => {
            const listingSlug = router.currentRoute._value.params.slug;
            console.log('slug', listingSlug)
            if (listingSlug) {
                listingsStore.getListingDetails(listingSlug);
            }

        })

        onMounted(() => {
          mainJs(this)
        })

        return {
            listingsStore,
            listings,
            listingDetails,
            getListingDetails,
            router,
        }




    }

}
</script>

<style>

</style>