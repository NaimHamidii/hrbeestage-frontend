import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    total_employees: null,
    company_packages: [],
    company_not_active_packages: [],
}

const mutations = {
    SET_COMPANY_CURRENT_PACKAGES(state, data) {
        state.company_packages = data
    },
    SET_COMPANY_NOT_ACTIVE_PACKAGES(state, data) {
        state.company_not_active_packages = data
    },
    SET_COMPANY_TOTAL_EMPLOYEES(state, data) {
        state.total_employees = data
    },

    RESET(state) {
        state.total_employees = null
        state.company_packages = []
        state.company_not_active_packages = []
    },
}

const actions = {
    get_company_purchased_packages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_CURRENT_PACKAGES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_purchased_packages_with_company_id({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: company_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_CURRENT_PACKAGES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_not_purchased_packages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            get_not_included_packages: 1,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_NOT_ACTIVE_PACKAGES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    request_package_activation_from_company({ commit }, package_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addCompanyPackage'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            package_id: package_data.package_id,
            name: package_data.name,
            package_slug: package_data.package_slug,
            package_style_icon: package_data.package_style_icon,
            package_style_bg: package_data.package_style_bg,
            yearly_price_per_employee: package_data.yearly_price_per_employee,
            monthly_price_per_employee: package_data.monthly_price_per_employee,
            currency: package_data.currency,
            status: package_data.status,
            invoice_type: package_data.invoice_type,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_purchased_packages')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_total_employees({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeCount'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_TOTAL_EMPLOYEES', response.data.total_employees)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_hrbee_packages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, config)
            .then((response) => {
                commit('SET_COMPANY_FEED_DATA', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_company_total_employees(state) {
        return JSON.parse(JSON.stringify(state.total_employees))
    },
    get_company_purchased_packages(state) {
        return JSON.parse(JSON.stringify(state.company_packages))
    },
    get_company_not_purchased_packages(state) {
        return JSON.parse(JSON.stringify(state.company_not_active_packages))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
