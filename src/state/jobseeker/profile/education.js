// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'

const state = {
    education: [],
}

const mutations = {
    SET_EDUCATION(state, data) {
        state.education = data
    },
    RESET(state) {
        state.education = []
    },
}

const actions = {
    // Jobseeker Get experiences
    get_educations({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowEducation'
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
                localStorage.setItem('jobseeker_education', JSON.stringify(response.data))
                commit('SET_EDUCATION', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_education({ commit }, experience_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerShowEducation'

        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_seeker_id: user_id,
            seq_id: experience_id,
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

    add_education_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddEducation'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_educations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker POST experiences
    add_education({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerAddEducation'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_seeker_id: user_id,
            field_of_study: submitted_experience_data.field_of_study,
            other_field_of_study: submitted_experience_data.other_field_of_study,
            school: submitted_experience_data.school_name,
            degree: submitted_experience_data.degree,
            other_degree: submitted_experience_data.other_degree,
            from_date: submitted_experience_data.from_date,
            ongoing: submitted_experience_data.ongoing,
            to_date: submitted_experience_data.to_date,
            description: submitted_experience_data.description,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_educations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    // Jobseeker POST experiences
    delete_education({ dispatch }, experience_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerDeleteEducation'
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
                dispatch('get_educations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_education_with_file({ dispatch }, submitted_experience_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditEducation'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_experience_data, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                dispatch('get_educations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Jobseeker UPDATE experiences
    update_education({ dispatch }, submitted_experience_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/jobSeekerEditEducation'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            seq_id: submitted_experience_data.education_id,
            job_seeker_id: user_id,
            field_of_study: submitted_experience_data.field_of_study,
            other_field_of_study: submitted_experience_data.other_field_of_study,
            school: submitted_experience_data.school_name,
            degree: submitted_experience_data.degree,
            other_degree: submitted_experience_data.other_degree,
            from_date: submitted_experience_data.from_date,
            ongoing: submitted_experience_data.ongoing,
            to_date: submitted_experience_data.to_date,
            description: submitted_experience_data.description,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_educations')
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
        return JSON.parse(JSON.stringify(state.education))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
