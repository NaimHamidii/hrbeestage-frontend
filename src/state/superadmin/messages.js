// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    current_messages: [],
}

const mutations = {
    SET_HRBEE_MESAGES(state, data) {
        state.current_messages = data
    },

    RESET(state) {
        state.current_messages = []
    },
}
const actions = {
    get_hrbee_website_messages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showContactUs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_MESAGES', response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    },
    get_hrbee_website_messages_with_pagination({ commit }, pageNumber) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showContactUs?page=' + pageNumber
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_MESAGES', response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    },
    delete_hrbee_website_message({ dispatch }, message_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteContactUs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            contact_us_id: message_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_hrbee_website_messages')
            })
            .catch((error) => {
                console.error(error)
            })
    },
}

const getters = {
    // End of getPageAlerts getter
    get_messages(state) {
        return JSON.parse(JSON.stringify(state.current_messages))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
