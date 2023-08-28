<template>
  <div v-if="selectedListing" class="container mt-5">
  <div class="row">
    <div class="col-md-8">
      <!-- Main Property Photo -->
      <img :src="selectedListing.photo_main" alt="Property Photo" class="img-fluid mb-4">
      
      <!-- Property Details -->
      <h2>{{ selectedListing.title }}</h2>
      <p><strong>Location:</strong> {{ selectedListing.city }}, {{ selectedListing.state }}</p>
      <p><strong>Price:</strong> KES {{ selectedListing.price }}</p>
      <p><strong>Home Type:</strong> {{ selectedListing.home_type }}</p>
      <p><strong>Square Feet:</strong> {{ selectedListing.sqft }} sqft</p>
      <p><strong>Sale Type:</strong> {{ selectedListing.sale_type }}</p>
      <p><strong>Bedrooms:</strong> {{ selectedListing.bedrooms}} </p>
      <p><strong>Bathrooms:</strong>{{ selectedListing.bathrooms }}</p>
    </div>
    <div class="col-md-4">
      <!-- Gallery Section -->
      <h2>Gallery</h2>
      <div class="row">
        <div class="col-md-6 mb-3">
          <img src="src/img/property-1.jpg" alt="Gallery Photo 1" class="img-fluid">
        </div>
        <div class="col-md-6 mb-3">
          <img src="src/img/property-1.jpg" alt="Gallery Photo 2" class="img-fluid">
        </div>
        <div class="col-md-6 mb-3">
          <img src="src/img/property-1.jpg" alt="Gallery Photo 3" class="img-fluid">
        </div>
        <div class="col-md-6 mb-3">
          <img src="src/img/property-1.jpg" alt="Gallery Photo 4" class="img-fluid">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useListingsStore } from '../stores/listings'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {

    setup() {
        const router = useRouter()
        const listingsStore = useListingsStore()

        console.log('router', router)

        const selectedListing = ref(null)

        const {
            listings,
            getListingDetails
        } = storeToRefs(listingsStore)

        watchEffect(() => {
            const listingSlug = router.currentRoute._value.params.slug;
            console.log('slug', listingSlug)
            if (listingSlug) {
                selectedListing.value = listingsStore.getListingDetails(listingSlug);
            }
            console.log('selected', selectedListing)

        })

        return {
            listingsStore,
            listings,
            getListingDetails,
            router,
            selectedListing
        }




    }

}
</script>

<style>

</style>