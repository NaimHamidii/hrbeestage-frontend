import { API_CONFIG } from '@state_src/config.js'

const state = {
    experience: [],
}

const mutations = {
    SET_EXPERIENCE(state, data) {
        state.experience = data
    },
    RESET(state) {
        state.experience = []
    },
}

const actions = {
    // Jobseeker Get experiences
    get_experiences({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowExperiences'

        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_seeker_id: user_id,
            type: 'work',
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('jobseeker_experience', JSON.stringify(response.data))
                commit('SET_EXPERIENCE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_experience({ commit }, experience_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowExperiences'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_seeker_id: user_id,
            seq_id: experience_id,
            type: 'work',
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_experience_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddExperience'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_experiences')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST experiences
    add_experience({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            job_title: submitted_experience_data.job_title,
            profession: submitted_experience_data.profession,
            total_experience_in_this_field: submitted_experience_data.total_experience_in_this_field,
            company_name: submitted_experience_data.company_name,
            country: submitted_experience_data.country,
            city: submitted_experience_data.city,
            join_date: submitted_experience_data.join_date,
            still_working: submitted_experience_data.still_working,
            leave_date: submitted_experience_data.leave_date,
            description: submitted_experience_data.description,
            type: 'work',
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_experiences')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST experiences
    delete_experience({ dispatch }, experience_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            seq_id: experience_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_experiences')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_experience_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditExperience'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_experiences')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker UPDATE experiences
    update_experience({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            seq_id: submitted_experience_data.experience_id,
            job_seeker_id: user_id,
            job_title: submitted_experience_data.job_title,
            profession: submitted_experience_data.profession,
            total_experience_in_this_field: submitted_experience_data.total_experience_in_this_field,
            company_name: submitted_experience_data.company_name,
            country: submitted_experience_data.country,
            city: submitted_experience_data.city,
            join_date: submitted_experience_data.join_date,
            still_working: submitted_experience_data.still_working,
            leave_date: submitted_experience_data.leave_date,
            description: submitted_experience_data.description,
            type: 'work',
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_experiences')
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
        return JSON.parse(JSON.stringify(state.experience))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
