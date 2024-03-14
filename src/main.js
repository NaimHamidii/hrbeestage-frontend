import Vue from 'vue'

import App from './App.vue'
import router from '@router'
import { store } from '@state'

import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import Vue2Editor from 'vue2-editor'
import vueSmoothScroll from 'vue2-smooth-scroll'
import Vuelidate from 'vuelidate'
import Helpers from './components/helpers'

import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(vueSmoothScroll)

Vue.use(Vue2Editor)

Vue.use(VueIziToast)

Vue.use(Vuelidate)

// Main SASS
import '@sass'

// load vuex i18n module
import vuexI18n from 'vuex-i18n'
Vue.use(vuexI18n.plugin, store)
import translationsEn from '@src/resources/languages/en.js'
import translationsSq from '@src/resources/languages/sq.js'

// add translations directly to the application
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('sq', translationsSq)

// set the start locale to use
Vue.i18n.set('en')

import global_alerts from '@src/plugins/alerts.js'
Vue.use(global_alerts)

import global_plugins from '@src/plugins/global_plugins.js'
Vue.use(global_plugins)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    mixins: [
        Vue.mixin({
            methods: {
                $getCurrentCompanyIdForAdmin: Helpers.getCurrentCompanyIdForAdmin,
                $scrollToFirstError: Helpers.scrollToFirstError,
            },
            created: function () {
                const checkVersion = () => {
                    const CURRENT_APP_VERSION = 7
                    const version = localStorage.getItem('HRBEE_APP_VERSION')
                    if (version != CURRENT_APP_VERSION) {
                        this.$store.dispatch('auth/logOutUser')
                        localStorage.setItem('HRBEE_APP_VERSION', CURRENT_APP_VERSION)
                    }
                }

                checkVersion()
            },
        }),
    ],
    render: (h) => h(App),
}).$mount('#app')
