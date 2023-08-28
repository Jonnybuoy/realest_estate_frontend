import { defineStore } from 'pinia'
import axios from 'axios'


export const useListingsStore = defineStore('listingsStore', {

    state: () => ({
        listings: [],

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
                return this.listings.find(listing => listing.slug === slug)
            }
        }
    },

    actions: {
        async fetchListings() {
            await axios
                .get('/api/listings/')
                .then(response => {
                    console.log('response', response.data)

                    this.listings = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    }
})