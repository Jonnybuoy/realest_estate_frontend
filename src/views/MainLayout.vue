<template>
  <!-- Header Start -->
  <div class="container-fluid header bg-white p-0">
    <div class="row g-0 align-items-center flex-column-reverse flex-md-row">
      <div class="col-md-6 p-5 mt-lg-5">
        <h1 class="display-5 animated fadeIn mb-4">
          Find A <span class="text-primary">Perfect Home</span> To Live With Your Family
        </h1>
        <p class="animated fadeIn mb-4 pb-2">
          Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et
          diam justo clita et kasd rebum sea elitr.
        </p>
        <a href="" class="btn btn-primary py-3 px-5 me-3 animated fadeIn">Get Started</a>
      </div>
      <div class="col-md-6 animated fadeIn">
        <div class="owl-carousel header-carousel">
          <div class="owl-carousel-item">
            <img class="img-fluid" src="src/img/carousel-1.jpg" alt="" />
          </div>
          <div class="owl-carousel-item">
            <img class="img-fluid" src="src/img/carousel-2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Header End -->

  <!-- Search Start -->
  <div
    class="container-fluid bg-primary mb-5 wow fadeIn"
    data-wow-delay="0.1s"
    style="padding: 35px"
  >
    <div class="container">
      <div class="row g-2">
        <div class="col-md-10">
          <div class="row g-2">
            <div class="col-md-4">
              <input
                v-model="searchKeyword"
                type="text"
                class="form-control border-0 py-3"
                placeholder="Search Keyword"
              />
            </div>
            <div class="col-md-4">
              <select v-model="selectedPropertyType" class="form-select border-0 py-3">
                <option selected>Property Type</option>
                <option value="1">House</option>
                <option value="2">Bedsitter</option>
                <option value="3">Studio Apartment</option>
              </select>
            </div>
            <div class="col-md-4">
              <select v-model="selectedLocation" class="form-select border-0 py-3">
                <option selected>Location</option>
                <option value="1">Nairobi</option>
                <option value="2">Kajiado</option>
                <option value="3">Kisumu</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-dark border-0 w-100 py-3" @click="searchProperty">Search</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Search End -->

  <Categories />
  <About />
  <PropertyList
    :firstThreeListings="firstThreeListings"
    :firstThreeListingsForSale="firstThreeListingsForSale"
    :firstThreeListingsForRent="firstThreeListingsForRent"
  />
  <CallToAction />
  <Agents />
  <Testimonials />
  <Footer />
</template>

<script>
import 'animate.css/animate.min.css'
import 'owl.carousel/dist/assets/owl.carousel.min.css'

import mainJs from '../main.js'
import Categories from '../components/Categories.vue'
import About from '../components/About.vue'
import PropertyList from '../components/PropertyList.vue'
import CallToAction from '../components/CallToAction.vue'
import Agents from '../components/Agents.vue'
import Testimonials from '../components/Testimonials.vue'
import Footer from '../components/Footer.vue'

import { useListingsStore } from '../stores/listings'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  name: 'MainLayout',

  components: {
    Categories,
    About,
    PropertyList,
    CallToAction,
    Agents,
    Testimonials,
    Footer
  },
  setup() {
    const router = useRouter()
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

    console.log('listings', listings)

    const searchKeyword = ref('')
    const selectedPropertyType = ref('')
    const selectedLocation = ref('')

    const searchProperty = () => {
        console.log("Search button clicked");
        // Filter based on search attributes
        const filteredListings = listings.value.filter((listing) => {
            const keywordMatch = listing.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
            const propertyTypeMatch =
            selectedPropertyType.value === '' || listing.property_type === selectedPropertyType.value
            const locationMatch =
            selectedLocation.value === '' || listing.location === selectedLocation.value
        })
        router.push({
            name: 'allproperties',
            params: {
            filteredListings
            }
        });
    }

    return {
      listingsStore,
      listings,
      firstThreeListings,
      listingsForSale,
      listingsForRent,
      firstThreeListingsForSale,
      firstThreeListingsForRent,
      selectedPropertyType,
      selectedLocation,
      searchKeyword,
      searchProperty
    }
  }
}
</script>

<style></style>
