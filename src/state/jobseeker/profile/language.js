// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'

const state = {
    languages: [],
}

const mutations = {
    SET_LANGUAGES(state, data) {
        state.languages = data
    },
    RESET(state) {
        state.languages = []
    },
}

const actions = {
    // Jobseeker Get languages
    get_languages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowLanguages'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_LANGUAGES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST languages
    add_language({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddLanguage'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            job_seeker_id: user_id,
            language_value: submitted_experience_data.language_value,
            listening: submitted_experience_data.listening,
            reading: submitted_experience_data.reading,
            speaking: submitted_experience_data.speaking,
            writing: submitted_experience_data.writing,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_languages')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST languages
    delete_language({ dispatch }, language_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteLanguage'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            seq_id: language_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_languages')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    // End of getPageAlerts getter
    get(state) {
        return JSON.parse(JSON.stringify(state.languages))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
