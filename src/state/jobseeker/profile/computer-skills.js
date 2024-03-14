// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'

const state = {
    computer_skills: [],
}

const mutations = {
    SET_COMPUTER_SKILLS(state, data) {
        state.computer_skills = data
    },
    RESET(state) {
        state.computer_skills = []
    },
}
const actions = {
    // Jobseeker Get computer_skills
    get_computer_skills({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowSkills'

        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            type: 'IT',
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPUTER_SKILLS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST computer-skills
    add_computer_skill({ dispatch }, submitted_experience_data) {
        // http://yourapi.com/api/languages/21
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddSkill'

        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            skill_name: submitted_experience_data.computer_skill_name,
            skill_value: submitted_experience_data.computer_skill_value,
            type: 'IT',
            level: submitted_experience_data.level_value,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_computer_skills')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST computer-skills
    delete_computer_skill({ dispatch }, skill_id) {
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
                dispatch('get_computer_skills')
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
        return JSON.parse(JSON.stringify(state.computer_skills))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
