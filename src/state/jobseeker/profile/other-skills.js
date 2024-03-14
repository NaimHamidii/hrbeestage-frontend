// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'

const state = {
    other_skills: [],
}

const mutations = {
    SET_OTHER_SKILLS(state, data) {
        state.other_skills = data
    },
    RESET(state) {
        state.other_skills = []
    },
}

const actions = {
    // Jobseeker Get other_skills
    get_other_skills({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowSkills'
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
                localStorage.setItem('jobseeker_other_skills', JSON.stringify(response.data))
                commit('SET_OTHER_SKILLS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST other-skills
    add_other_skill({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddSkill'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            skill_name: submitted_experience_data.other_skill_name,
            skill_value: submitted_experience_data.other_skill_value,
            type: 'other',
            level: submitted_experience_data.level_value,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_other_skills')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST other-skills
    delete_other_skill({ dispatch }, skill_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteSkill'
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
                dispatch('get_other_skills')
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
        return JSON.parse(JSON.stringify(state.other_skills))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
