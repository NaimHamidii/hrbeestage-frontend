import Vue from 'vue'
import VueRouter from 'vue-router'
// ADD NEW PLUGINS HERE

import BootstrapVue from 'bootstrap-vue'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
VueCookies.config('30d')

import Meta from 'vue-meta'
import NProgress from 'nprogress/nprogress'
import Toasted from 'vue-toasted'

import vueCalendar from '@src/components/vue2-simple-calendar/src/'

Vue.use(vueCalendar, {
    firstDay: 1,
    showLimit: 3,
    locale: 'en',
    fullDayNames: false,
    fullMonthNames: false,
    componentName: 'vue-calendar',
    languages: {
        sq: {
            showMore: 'Trego më shumë',
            dayNameShort: ['Die', 'Hen', 'Mar', 'Mer', 'Enj', 'Pre', 'Sht'],
            dayNameLong: ['Dielë', 'Hënë', 'Martë', 'Mërkurë', 'Enjte', 'Premte', 'Shtunë'],
            monthNameShort: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Korr', 'Gush', 'Sht', 'Tet', 'Nen', 'Dhj'],
            monthNameLong: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
        },
    },
})

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment,
})

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import { store } from '@state'
import routes from './routes'

Vue.use(Toasted)
Vue.use(VueRouter)
Vue.use(Meta)

Vue.use(require('vue-moment'))

Vue.use(Toasted)
Vue.use(BootstrapVue)

// options to the toast
let TostedOptions = {
    type: 'error',
    position: 'bottom-right',
    duration: '4000',
}
// options to the toast
let ToastedSuccessOptions = {
    type: 'success',
    position: 'bottom-right',
    duration: '4000',
}
// register the toast with the custom message
Vue.toasted.register(
    'app_error',
    (payload) => {
        // if there is no message passed show default message
        if (!payload) {
            return 'Oops.. Something Went Wrong..'
        }

        // if there is a message show it with the message
        return payload
    },
    TostedOptions
)

// register the toast with the custom message
Vue.toasted.register(
    'app_api_success',
    (payload) => {
        // if there is no message passed show default message
        if (!payload) {
            return 'Oops.. Something Went Wrong..'
        }

        // if there is a message show it with the message
        return payload
    },
    ToastedSuccessOptions
)

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
    // If this isn't an initial page load...
    if (routeFrom.name !== null) {
        // Start the route progress bar.
        NProgress.start()
    }

    // Check if auth is required on this route
    // (including nested routes).
    const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

    // If auth isn't required for the route, just continue.
    if (!authRequired) return next()

    // If auth is required and the user is logged in...
    // Ktu duhet me shtu edhe ni kontroll tjeter qe e e kontrollon tokenin
    if (localStorage.getItem('isLoggedIn')) {
        return next()
    }

    // If auth is required and the user is NOT currently logged in,
    // redirect to login.
    next({ path: '/auth/login' })
})

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})

export default router
