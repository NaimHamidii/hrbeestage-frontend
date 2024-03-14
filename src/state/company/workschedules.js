import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    schedules: [],
}

const mutations = {
    SET_SCHEDULES(state, data) {
        state.schedules = data
    },
    RESET(state) {
        state.schedules = []
    },
}

const actions = {
    get_schedules({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetEmployeeScheduleDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_schedule({}, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeScheduleDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            id: id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    show_schedule({}, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEmployeeScheduleDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            id: id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_schedule({}, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateEmployeeScheduleDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

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

    add_setting_schedule({}, submitted_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeScheduleDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: submitted_data.name,
            monday_from: submitted_data.monday_from,
            monday_to: submitted_data.monday_to,
            tuesday_from: submitted_data.tuesday_from,
            tuesday_to: submitted_data.tuesday_to,
            wednesday_from: submitted_data.wednesday_from,
            wednesday_to: submitted_data.wednesday_to,
            thursday_from: submitted_data.thursday_from,
            thursday_to: submitted_data.thursday_to,
            friday_from: submitted_data.friday_from,
            friday_to: submitted_data.friday_to,
            saturday_from: submitted_data.saturday_from,
            saturday_to: submitted_data.saturday_to,
            sunday_from: submitted_data.sunday_from,
            sunday_to: submitted_data.sunday_to,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_settings_schedules(state) {
        return JSON.parse(JSON.stringify(state.schedules))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
