import { API_CONFIG } from '@state_src/config.js'

const state = {
    public_jobs: [],
    current_public_job_details: [],
    saved_jobs: [],
}

const mutations = {
    SET_PUBLIC_JOBS(state, data) {
        state.public_jobs = data
    },
    SET_SINGLE_PUBLIC_JOB(state, data) {
        state.current_public_job_details = data
    },
    SET_SAVED_JOBS(state, data) {
        state.saved_jobs = data
    },

    RESET(state) {
        state.public_jobs = []
        state.current_public_job_details = []
        state.saved_jobs = []
    },
}
const actions = {
    delete_saved_jobs({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/destroySavedJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            id: id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_saved_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    add_saved_jobs({ dispatch }, submitData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addSaveJob'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_id: submitData.job_id,
            job_seeker_id: submitData.job_seeker_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_public_jobs')
                dispatch('get_saved_jobs')
                dispatch('get_single_public_job', submitData.job_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_saved_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showSavedJobs'
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
                commit('SET_SAVED_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_saved_jobs_with_pagination({ commit }, page_number) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showSavedJobs?page=' + page_number
        let data = {
            job_seeker_id: user_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SAVED_JOBS', response.data)
                return response
                // localStorage.setItem('company_jobs', JSON.stringify(response.data));
                // commit('SET_COMPANY_JOBS', response.data)
            })
            .catch((error) => {
                return error.response
            })
    },

    get_public_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('public_jobs', JSON.stringify(response.data))
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_public_jobs_withh_pagination({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('public_jobs', JSON.stringify(response.data))
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_public_job({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let data = {
            search: search_query,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    search_public_job_with_page({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs?page=' + search_query.page_number
        let data = {
            search: search_query.search,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_public_jobs({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let data = {
            search: search_query.search,
            // "salary_from" : search_query.salary_from,
            // "salary_to" : search_query.salary_to,
            category_value: search_query.category_value,
            country_value: search_query.country_value,
            city_value: search_query.city_value,
            salary_type_value: search_query.salary_type_value,
            employment_type_value: search_query.employment_type_value,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    filter_public_jobs_with_page({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs?page=' + search_query.page_number
        let data = {
            search: search_query.search,
            // "salary_from" : search_query.salary_from,
            // "salary_to" : search_query.salary_to,
            category_value: search_query.category_value,
            country_value: search_query.country_value,
            city_value: search_query.city_value,
            salary_type_value: search_query.salary_type_value,
            employment_type_value: search_query.employment_type_value,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    apply_to_public_job({ dispatch }, posted_data) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/applyToJob'
        let data = {
            job_id: posted_data.job_id,
            company_id: posted_data.company_id,
            job_seeker_id: user_id,
            job_seeker_cover_letter: posted_data.cover_letter,
            job_seeker_reference_letter: posted_data.reference_letter,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_public_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    apply_to_public_job_from_frontend({ dispatch }, posted_data) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/applyToJob'
        let data = {
            job_id: posted_data.job_id,
            company_id: posted_data.company_id,
            job_seeker_id: user_id,
            job_seeker_cover_letter: posted_data.cover_letter,
            job_seeker_reference_letter: posted_data.reference_letter,
            job_seeker_recommendation_letter: posted_data.recommendation_letter,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_single_public_job', posted_data.job_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_public_job({ commit }, job_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_id: job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_PUBLIC_JOB', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_public_company_jobs({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showAllPublicJobs'
        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data)
            .then((response) => {
                commit('SET_PUBLIC_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.public_jobs))
    },
    get_single_job_details(state) {
        return JSON.parse(JSON.stringify(state.current_public_job_details))
    },
    get_saved_jobs(state) {
        return JSON.parse(JSON.stringify(state.saved_jobs))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
