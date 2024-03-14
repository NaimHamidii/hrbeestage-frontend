import { API_CONFIG } from '@state_src/config.js'

const state = {
    trainings: [],
}

const mutations = {
    SET_TRAININGS(state, data) {
        state.trainings = data
    },
    RESET(state) {
        state.trainings = []
    },
}

const actions = {
    // Jobseeker Get trainings
    get_trainings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowExperiences'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_seeker_id: user_id,
            type: 'training',
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('jobseeker_trainings', JSON.stringify(response.data))
                commit('SET_TRAININGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_training({ commit }, training_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowExperiences'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_seeker_id: user_id,
            seq_id: training_id,
            type: 'training',
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
    add_training_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddExperience'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_trainings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST trainings
    add_training({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            job_title: submitted_experience_data.job_title,
            company_name: submitted_experience_data.company_name,
            total_experience_in_this_field: 0,
            country: submitted_experience_data.country,
            city: submitted_experience_data.city,
            join_date: submitted_experience_data.join_date,
            still_working: submitted_experience_data.still_working,
            leave_date: submitted_experience_data.leave_date,
            description: submitted_experience_data.description,
            type: 'training',
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_trainings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST trainings
    delete_training({ dispatch }, training_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            seq_id: training_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_trainings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_training_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditExperience'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_trainings')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker UPDATE trainings
    update_training({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditExperience'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            seq_id: submitted_experience_data.training_id,
            job_seeker_id: user_id,
            job_title: submitted_experience_data.job_title,
            company_name: submitted_experience_data.company_name,
            total_experience_in_this_field: 0,
            country: submitted_experience_data.country,
            city: submitted_experience_data.city,
            join_date: submitted_experience_data.join_date,
            still_working: submitted_experience_data.still_working,
            leave_date: submitted_experience_data.leave_date,
            description: submitted_experience_data.description,
            type: 'training',
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_trainings')
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
        return JSON.parse(JSON.stringify(state.trainings))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
