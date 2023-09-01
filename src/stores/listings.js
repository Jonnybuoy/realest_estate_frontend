import { defineStore } from 'pinia'
import axios from 'axios'


export const useListingsStore = defineStore('listingsStore', {

    state: () => ({
        listings: [],
        listingDetails: []

    }),

    getters: {
        firstThreeListings() {
            return this.listings.slice(0, 3);
        },

        listingsForSale() {
            return this.listings.filter(listing => listing.sale_type === "For Sale")
        },

        listingsForRent() {
            return this.listings.filter(listing => listing.sale_type === "For Rent")

        },

        firstThreeListingsForSale(getters) {
            const filteredListings = getters.listingsForSale;
            return filteredListings.slice(0, 3);
        },

        firstThreeListingsForRent(getters) {
            const filteredListings = getters.listingsForRent;
            return filteredListings.slice(0);
        },

        getListingDetails() {
            return slug => {
                console.log('storeslug', slug)
                return this.fetchListingDetails(slug)
            }
        }
    },

    actions: {
        async fetchListings() {
            await axios
                .get('/api/listings/')
                .then(response => {
                    console.log('listings', response.data)

                    this.listings = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async fetchListingDetails(slug) {
            await axios
                .get(`/api/listings/${slug}`)
                .then(response => {
                    console.log('listingDetails', response.data)

                    this.listingDetails = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
})