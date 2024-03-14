// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    company_notifications: [],
}

const mutations = {
    SET_COMPANY_NOTIFICATIONS(state, data) {
        state.company_notifications = data
    },

    RESET(state) {
        state.company_notifications = []
    },
}

const actions = {
    get_company_notifications({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showNotifications'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            user_id: user_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_NOTIFICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    mark_single_notification_as_read({ dispatch }, notification_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/markNotificationAsRead'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            user_id: user_id,
            notification_id: notification_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_notifications')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    mark_all_notification_as_read({ dispatch }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/markAllNotificationsAsRead'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            user_id: user_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_notifications')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_company_notifications(state) {
        return JSON.parse(JSON.stringify(state.company_notifications))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
