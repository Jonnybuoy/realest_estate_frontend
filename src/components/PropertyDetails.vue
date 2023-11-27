<template>
  <div class="container mt-5">
    <div v-if="!userStore.user.id">
      <p>Please <router-link :to="{name: 'login'}">login</router-link> to your account to view property details.</p>

    </div>
    <div v-else class="row">
      <div v-if="listingDetails" class="property-details col-md-8">
        <!-- Main Property Photo -->
        <img :src="listingDetails.photo_main" alt="Property Photo" class="img-fluid mb-4" />

        <!-- Property Details -->
        <h2>{{ listingDetails.title }}</h2>
        <p class="property-price">KES {{ listingDetails.price }}</p>
        <p>
          <font-awesome-icon icon="fa-solid fa-location-dot" /> {{ listingDetails.city }},
          {{ listingDetails.state }}
        </p>

        <p><strong>Home Type:</strong> {{ listingDetails.home_type }}</p>
        <p><strong>Square Feet:</strong> {{ listingDetails.sqft }} sqft</p>
        <p><strong>Sale Type:</strong> {{ listingDetails.sale_type }}</p>
        <p><strong>Bedrooms:</strong> {{ listingDetails.bedrooms }}</p>
        <p><strong>Bathrooms:</strong>{{ listingDetails.bathrooms }}</p>
      </div>
      <div class="col-md-12 mt-4">
        <!-- Gallery Section -->
        <h2>Gallery</h2>
        <div class="row" :id="galleryID">
          <!-- Loop through listingDetails.photo_1 to listingDetails.photo_16 -->
            <a
             v-for="(photo, index) in galleryImages"
             :key="index"
             :href="photo.largeURL"
             data-pswp-width="800"
             data-pswp-height="800"
             class="gallery col-md-4 mb-3">
            <img
              v-if="photo.thumbnailURL"
              :src="photo.thumbnailURL"
              :alt="'Gallery Photo ' + (index + 1)"
              class="img-fluid"
            />
            </a>
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
import { useUserStore } from '@/stores/user'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css';



export default {
  setup() {
    const router = useRouter()
    const listingsStore = useListingsStore()
    const userStore = useUserStore()

    console.log('router', router)

    // const selectedListing = ref(null)

    const { listings, listingDetails, getListingDetails } = storeToRefs(listingsStore)

    const galleryImages = ref([]);

    const getGalleryImages = (listingDetails) => {
      const images = []
      for (let photoNumber = 1; photoNumber <= 16; photoNumber++) {
        const photoUrl = listingDetails['photo_' + photoNumber];
        if (photoUrl) {
          images.push({
            largeURL: photoUrl,
            thumbnailURL: photoUrl,
          });
        }
      }
      return images;
    }

    watchEffect(() => {
      const listingSlug = router.currentRoute._value.params.slug
      console.log('slug', listingSlug)
      if (listingSlug) {
        listingsStore.getListingDetails(listingSlug).then(() => {
          galleryImages.value = getGalleryImages(listingDetails.value)
        });
      }
    });


    onMounted(() => {
      mainJs(this)
    });

    const galleryID = 'my-gallery';



    return {
      userStore,
      listingsStore,
      listings,
      listingDetails,
      getListingDetails,
      router,
      galleryImages,
      getGalleryImages,
      galleryID
    }
  },

  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe')
      })
      this.lightbox.init()
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy()
      this.lightbox = null
    }
  },
}
</script>

<style></style>
