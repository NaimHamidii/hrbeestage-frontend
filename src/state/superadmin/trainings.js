import { API_CONFIG } from '@state_src/config.js'

const state = {
    all_trainings: [],
    single_training: [],
    applications: [],
}

const mutations = {
    SET_ALL_TRAININGS(state, data) {
        state.all_trainings = data
    },

    SET_SINGLE_TRAINING(state, data) {
        state.single_training = data
    },

    SET_APPLICATIONS(state, data) {
        state.applications = data
    },

    RESET(state) {
        state.all_trainings = []
        state.single_training = []
        state.applications = []
    },
}

const actions = {
    get_applications({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/getApplications/${id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_trainings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/training'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_ALL_TRAININGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    store_training({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/training'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_training({ dispatch }, submit_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateTraining'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data, { headers: { Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_training({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteTraining/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                dispatch('get_trainings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    single_training({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/training/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_SINGLE_TRAINING', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    apply_training({ dispatch }, submit_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/applytraining'
        return API_CONFIG.SITE_AXIOS.post(current_api, submit_data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.all_trainings))
    },
    get_single(state) {
        return JSON.parse(JSON.stringify(state.single_training))
    },
    get_applications(state) {
        return JSON.parse(JSON.stringify(state.applications))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
