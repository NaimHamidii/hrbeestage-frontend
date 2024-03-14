import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    api: null,
}

const mutations = {
    SET_COMPANY_API(state, data) {
        state.api = data
    },
    RESET(state) {
        state.api = null
    },
}

const actions = {
    get_company_api({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/company/api-key'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_COMPANY_API', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    store_company_api({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/company/api-key'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
            .then((response) => {
                commit('SET_COMPANY_API', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.api))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
