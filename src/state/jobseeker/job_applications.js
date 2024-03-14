// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    jobseeker_job_applications: [],
}

const mutations = {
    SET_JOBSEEKER_JOB_APPLICATIONS(state, data) {
        state.jobseeker_job_applications = data
    },
    RESET(state) {
        state.jobseeker_job_applications = []
    },
}
const actions = {
    get_jobseeker_job_applications({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationsForJobSeeker'
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
                commit('SET_JOBSEEKER_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_jobseeker_job_applications_with_page({ commit }, page_number) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationsForJobSeeker?page=' + page_number
        let data = {
            job_seeker_id: user_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOBSEEKER_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    changeInterviewStatus({ commit, dispatch }, interview_details) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/acceptOrRejectInterview'
        let data = {
            job_application_id: interview_details.job_application_id,
            job_seeker_id: user_id,
            application_status: interview_details.application_status,
            notes: interview_details.notes,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then(() => {
                dispatch('get_jobseeker_job_applications')
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.jobseeker_job_applications))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
