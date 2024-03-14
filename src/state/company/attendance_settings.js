import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    attendance_settings: [],
    general_attendance_settings: null,
}

const mutations = {
    SET_COMPANY_ATTENDANCE_SETTINGS(state, data) {
        state.attendance_settings = data
    },
    SET_COMPANY_GENERAL_ATTENDANCE_SETTINGS(state, data) {
        state.general_attendance_settings = data
    },
    RESET(state) {
        state.attendance_settings = [];
        state.general_attendance_settings = null;
    },
}

const actions = {
    get_company_attendance_settings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getAttendanceSettings'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
            .then((response) => {
                commit('SET_COMPANY_ATTENDANCE_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_company_attendance_settings({ dispatch }, data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/addAttendanceSettings'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
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

    update_company_attendance_settings({ dispatch }, data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/updateAttendanceSettings'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
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

    delete_company_attendance_settings({ dispatch }, data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/deleteAttendanceSetting'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
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



    get_company_general_attendance_settings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getGeneralAttendanceSettings'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
            .then((response) => {
                commit('SET_COMPANY_GENERAL_ATTENDANCE_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_company_general_attendance_settings({ dispatch }, data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/addOrUpdateGeneralAttendanceSettings'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_GENERAL_ATTENDANCE_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.attendance_settings))
    },
    get_general(state) {
        return JSON.parse(JSON.stringify(state.general_attendance_settings))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
