import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_integrations: {},
}

const mutations = {
    SET_COMPANY_INTEGRATIONS(state, data) {
        state.company_integrations = data
    },
    RESET(state) {
        state.company_integrations = {}
    },
}

const actions = {
    get_company_integrations({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyIntegrations'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INTEGRATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_company_integrations({ dispatch }, updateData) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/updateCompanyIntegrations'

        const current_user_access_token = localStorage.getItem('auth.access_token')

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            integration_type: updateData.integration_type,
            auth_type: updateData.auth_type,
            auth_url: updateData.auth_url,
            auth_username: updateData.auth_username,
            auth_password: updateData.auth_password,
            api_url: updateData.api_url,
            disconnect: updateData.disconnect,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_integrations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_integrations))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
