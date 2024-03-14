// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    jobseeker_ratings: [],
}

const mutations = {
    SET_JOBSEEKER_RATINGS(state, data) {
        state.jobseeker_ratings = data
    },
    RESET(state) {
        state.jobseeker_ratings = []
    },
}
const actions = {
    get_jobseeker_ratings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationRatingsForJobSeeker'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_seeker_id: user_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOBSEEKER_RATINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_jobseeker_job_applications_with_page({ commit }, page_number) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationRatingsForJobSeeker?page=' + page_number

        let data = {
            job_seeker_id: user_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOBSEEKER_RATINGS', response.data)
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
        return JSON.parse(JSON.stringify(state.jobseeker_ratings))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
