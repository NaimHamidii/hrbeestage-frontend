import { API_CONFIG } from '@state_src/config.js'

const state = {}

const mutations = {}

const actions = {
    invite_job_seeker({ dispatch }, submitted_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/inviteJobSeeker'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_data, config)

            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
