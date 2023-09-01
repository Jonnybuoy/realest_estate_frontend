<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div class="row g-0 gx-5 align-items-end">
        <div class="col-lg-6">
          <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
            <h1 class="mb-3">Property Listing</h1>
            <p>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero
              ipsum sit eirmod sit diam justo sed rebum.
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="filteredListings && filteredListings.length > 0 || searchedListings && searchedListings.length > 0"
        class="text-start mx-auto mb-5 wow slideInLeft"
        data-wow-delay="0.1s"
      >
        <h1 class="mb-3">Searched Listings</h1>
        <div class="tab-content">
          <div id="tab-1" class="tab-pane fade show p-0 active">
            <div class="row g-4">
              <div
                class="col-lg-4 col-md-6 wow fadeInUp"
                v-for="(listing, key) in filteredListings"
                :key="key"
                data-wow-delay="0.1s"
              >
                <div class="property-item rounded overflow-hidden">
                  <div class="position-relative overflow-hidden">
                    <router-link :to="{name: 'propertydetails', params:{slug: listing.slug}}"><img class="img-fluid" :src="listing.photo_main" alt=""></router-link>
                    <div
                      class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"
                    >
                      {{ listing.sale_type }}
                    </div>
                    <div
                      class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3"
                    >
                      {{ listing.home_type }}
                    </div>
                  </div>
                  <div class="p-4 pb-0">
                    <h5 class="text-primary mb-3">KES {{ listing.price }}</h5>
                    <a class="d-block h5 mb-2" href="">{{ listing.title }}</a>
                    <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{{ listing.city }}</p>
                  </div>
                  <div class="d-flex border-top">
                    <small class="flex-fill text-center border-end py-2"
                      ><i class="fa fa-ruler-combined text-primary me-2"></i
                      >{{ listing.sqft }}</small
                    >
                    <small class="flex-fill text-center border-end py-2"
                      ><i class="fa fa-bed text-primary me-2"></i
                      >{{ listing.bedrooms }} Bedrooms</small
                    >
                    <small class="flex-fill text-center py-2"
                      ><i class="fa fa-bath text-primary me-2"></i
                      >{{ listing.bathrooms }} Bathrooms</small
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
          <h1 class="mb-3">All Properties</h1>
        </div>
      </div>

      <div class="text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
        <ul class="nav nav-pills d-inline-flex justify-content-end mb-5">
          <li class="nav-item me-2">
            <a
              class="btn btn-outline-primary active"
              data-bs-toggle="pill"
              href="#tab-1"
              @click="filter = 'all'"
              >Featured</a
            >
          </li>
          <li class="nav-item me-2">
            <a
              class="btn btn-outline-primary"
              data-bs-toggle="pill"
              href="#tab-2"
              @click="filter = 'sale'"
              >For Sell</a
            >
          </li>
          <li class="nav-item me-0">
            <a
              class="btn btn-outline-primary"
              data-bs-toggle="pill"
              href="#tab-3"
              @click="filter = 'rent'"
              >For Rent</a
            >
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <div id="tab-1" class="tab-pane fade show p-0 active">
          <div class="row g-4">
            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              v-if="filter === 'all'"
              v-for="(listing, index) in listings"
              :key="index"
              data-wow-delay="0.1s"
            >
              <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                  <router-link :to="{name: 'propertydetails', params:{slug: listing.slug}}"><img class="img-fluid" :src="listing.photo_main" alt=""></router-link>
                  <div
                    class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"
                  >
                    {{ listing.sale_type }}
                  </div>
                  <div
                    class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3"
                  >
                    {{ listing.home_type }}
                  </div>
                </div>
                <div class="p-4 pb-0">
                  <h5 class="text-primary mb-3">KES {{ listing.price }}</h5>
                  <a class="d-block h5 mb-2" href="">{{ listing.title }}</a>
                  <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{{ listing.city }}</p>
                </div>
                <div class="d-flex border-top">
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-ruler-combined text-primary me-2"></i>{{ listing.sqft }}</small
                  >
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-bed text-primary me-2"></i
                    >{{ listing.bedrooms }} Bedrooms</small
                  >
                  <small class="flex-fill text-center py-2"
                    ><i class="fa fa-bath text-primary me-2"></i
                    >{{ listing.bathrooms }} Bathrooms</small
                  >
                </div>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              v-else-if="filter === 'sale'"
              v-for="(listing, i) in listingsForSale"
              :key="i"
              data-wow-delay="0.1s"
            >
              <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                  <router-link :to="{name: 'propertydetails', params:{slug: listing.slug}}"><img class="img-fluid" :src="listing.photo_main" alt=""></router-link>
                  <div
                    class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"
                  >
                    {{ listing.sale_type }}
                  </div>
                  <div
                    class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3"
                  >
                    {{ listing.home_type }}
                  </div>
                </div>
                <div class="p-4 pb-0">
                  <h5 class="text-primary mb-3">KES {{ listing.price }}</h5>
                  <a class="d-block h5 mb-2" href="">{{ listing.title }}</a>
                  <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{{ listing.city }}</p>
                </div>
                <div class="d-flex border-top">
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-ruler-combined text-primary me-2"></i>{{ listing.sqft }}</small
                  >
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-bed text-primary me-2"></i
                    >{{ listing.bedrooms }} Bedrooms</small
                  >
                  <small class="flex-fill text-center py-2"
                    ><i class="fa fa-bath text-primary me-2"></i
                    >{{ listing.bathrooms }} Bathrooms</small
                  >
                </div>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 wow fadeInUp"
              v-else-if="filter === 'rent'"
              v-for="(listing, idx) in listingsForRent"
              :key="idx"
              data-wow-delay="0.1s"
            >
              <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                  <router-link :to="{name: 'propertydetails', params:{slug: listing.slug}}"><img class="img-fluid" :src="listing.photo_main" alt=""></router-link>
                  <div
                    class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3"
                  >
                    {{ listing.sale_type }}
                  </div>
                  <div
                    class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3"
                  >
                    {{ listing.home_type }}
                  </div>
                </div>
                <div class="p-4 pb-0">
                  <h5 class="text-primary mb-3">KES {{ listing.price }}</h5>
                  <a class="d-block h5 mb-2" href="">{{ listing.title }}</a>
                  <p><i class="fa fa-map-marker-alt text-primary me-2"></i>{{ listing.city }}</p>
                </div>
                <div class="d-flex border-top">
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-ruler-combined text-primary me-2"></i>{{ listing.sqft }}</small
                  >
                  <small class="flex-fill text-center border-end py-2"
                    ><i class="fa fa-bed text-primary me-2"></i
                    >{{ listing.bedrooms }} Bedrooms</small
                  >
                  <small class="flex-fill text-center py-2"
                    ><i class="fa fa-bath text-primary me-2"></i
                    >{{ listing.bathrooms }} Bathrooms</small
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useListingsStore } from '../stores/listings'
import { storeToRefs } from 'pinia'
import mainJs from '../main.js'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    filteredListings: Array
  },

  setup() {
    const route = useRoute()
    const listingsStore = useListingsStore()

    listingsStore.fetchListings()

    const {
      listings,
      firstThreeListings,
      listingsForSale,
      listingsForRent,
      firstThreeListingsForSale,
      firstThreeListingsForRent
    } = storeToRefs(listingsStore)

    onMounted(() => {
      mainJs(this)
    })

    const filter = ref('all')

    const filteredListings = JSON.parse(route.query.filter || '[]')


    return {
      filter,
      listingsStore,
      listings,
      firstThreeListings,
      listingsForSale,
      listingsForRent,
      firstThreeListingsForSale,
      firstThreeListingsForRent,
      filteredListings,
    }
  }
}
</script>

<style></style>
