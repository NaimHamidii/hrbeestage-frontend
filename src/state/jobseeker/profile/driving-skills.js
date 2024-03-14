// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
const state = {
    driving_skills: [],
}

const mutations = {
    SET_DRIVING_SKILLS(state, data) {
        state.driving_skills = data
    },
    RESET(state) {
        state.driving_skills = []
    },
}

const actions = {
    // Jobseeker Get driving_skills
    get_driving_skills({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowDrivingLicences'

        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            type: 'other',
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('jobseeker_driving_skills', JSON.stringify(response.data))
                commit('SET_DRIVING_SKILLS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST other-skills
    add_driving_skill({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddDrivingLicence'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            driving_category: submitted_experience_data.driving_category,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_driving_skills')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST other-skills
    delete_driving_skill({ dispatch }, skill_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteDrivingLicence'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            job_seeker_id: user_id,
            seq_id: skill_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_driving_skills')
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
        return JSON.parse(JSON.stringify(state.driving_skills))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
