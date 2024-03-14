import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_general_settings: {},
}

const mutations = {
    SET_COMPANY_GENERAL_SETTINGS(state, data) {
        state.company_general_settings = data
    },
    RESET(state) {
        state.company_general_settings = []
    },
}

const actions = {
    get_company_general_settings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyGeneralSettings'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_GENERAL_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_company_general_settings({ dispatch }, updateData) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/updateCompanyGeneralSettings'

        const current_user_access_token = localStorage.getItem('auth.access_token')

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            locale: updateData.locale,
            allow_email_when_generating_wages: updateData.allow_email_when_generating_wages,
            allow_birthday_emails: updateData.allow_birthday_emails,
            allow_anniversary_emails: updateData.allow_anniversary_emails,
            vacation_weekend_count: updateData.vacation_weekend_count
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_general_settings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_general_settings))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
