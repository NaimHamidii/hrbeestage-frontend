import { API_CONFIG } from '@state_src/config.js'

const state = {
    supports: [],
    support_items: [],
}

const mutations = {
    SET_SUPPORTS(state, data) {
        state.supports = data
    },

    SET_SUPPORT_ITEMS(state, data) {
        state.support_items = data
    },
}

const actions = {
    get_supports({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getSupports'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_SUPPORTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    store_support_section({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storeSupportSection'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_support_section({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateSupportSection'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_support_section({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteSupportSection/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },



    get_support_items({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getSupportItems'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_SUPPORT_ITEMS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    store_support_item({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storeSupportItem'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_support_item({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateSupportItem'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_support_item({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteSupportItem/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_supports(state) {
        return JSON.parse(JSON.stringify(state.supports))
    },
    get_support_items(state) {
        return JSON.parse(JSON.stringify(state.support_items))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
