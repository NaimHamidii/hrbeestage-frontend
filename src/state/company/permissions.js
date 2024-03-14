import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    employees: [],
    modules: [],
}

const mutations = {
    SET_COMPANY_EMPLOYEES(state, data) {
        state.employees = data
    },
    SET_COMPANY_MODULES(state, data) {
        state.modules = data
    },
    RESET(state) {
        state.employees = []
        state.modules = []
    },
}

const actions = {
    get_employees({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_modules({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/listPackages'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_MODULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.employees))
    },
    get_modules(state) {
        return JSON.parse(JSON.stringify(state.modules))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
