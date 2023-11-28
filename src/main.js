import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

import WOW from 'wowjs/dist/wow.js';
import 'owl.carousel/dist/owl.carousel.min.js'

import $ from 'jquery';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLocationDot, faTags } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faLocationDot, faTags)

const app = createApp(App)

axios.defaults.baseURL = 'https://hinainc.com/'

app.use(createPinia())
app.use(router, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')




export default function mainJs(Vue) {
    "use strict";
    (function($) {
        "use strict";

        // Spinner
        var spinner = function() {
            setTimeout(function() {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 1);
        };
        spinner();


        // Initiate the wowjs
        new WOW.WOW().init();


        // Sticky Navbar
        $(window).scroll(function() {
            if ($(this).scrollTop() > 45) {
                $('.nav-bar').addClass('sticky-top');
            } else {
                $('.nav-bar').removeClass('sticky-top');
            }
        });


        // Back to top button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });


        // Header carousel
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });


        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 24,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                }
            }
        });

    })(jQuery);
}