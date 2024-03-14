// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    hrbee_modules: [],
}

const mutations = {
    SET_HRBEE_MODULES(state, data) {
        state.hrbee_modules = data
    },
    RESET(state) {
        state.hrbee_modules = []
    },
}
const actions = {
    delete_offer_package({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/offer-packages/${id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    post_offer_package({ commit }, module_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/offer-packages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, module_data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_offer_packages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getOfferPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            // headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_module_pricing({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/module-pricing/${id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_module_pricing({ commit }, module_data) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/module-pricing-update/${module_data.id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, module_data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    post_module_pricing({ commit }, module_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/module-pricing'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, module_data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_module_pricing({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/module-pricing'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_hrbee_modules({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_MODULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_hrbee_module({ commit }, module_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/editPackage'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            package_id: module_data.package_id,
            package_slug: module_data.package_slug,
            package_style_icon: module_data.package_style_icon,
            package_style_bg: module_data.package_style_bg,
            yearly_price_per_employee: module_data.yearly_price_per_employee,
            monthly_price_per_employee: module_data.monthly_price_per_employee,
            currency: module_data.currency,
            status: module_data.status,
            percentage: module_data.percentage
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_hrbee_modules')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_public_job({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let data = {
            search: search_query,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_MODULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    apply_to_public_job({ dispatch }, posted_data) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/applyToJob'
        let data = {
            job_id: posted_data.job_id,
            company_id: posted_data.company_id,
            job_seeker_id: user_id,
            job_seeker_cover_letter: posted_data.cover_letter,
            job_seeker_reference_letter: posted_data.reference_letter,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_public_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_public_job({ commit }, job_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_id: job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_public_company_jobs({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    // End of getPageAlerts getter
    get(state) {
        return JSON.parse(JSON.stringify(state.hrbee_modules))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
