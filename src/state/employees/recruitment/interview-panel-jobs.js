import { API_CONFIG } from '@state_src/config.js'

const state = {
    interview_panel_jobs: [],
    current_job_details: [],
}

const mutations = {
    SET_JOBS(state, data) {
        state.interview_panel_jobs = data
    },
    SET_CURRENT_JOB_DETAILS(state, data) {
        state.current_job_details = data
    },
    RESET(state) {
        state.interview_panel_jobs = []
        state.current_job_details = []
    },
}

const actions = {
    get_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_jobs_with_page({ commit }, { page } = { page: 1 }) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs?page=' + page

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_job({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs?search=' + search_query

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_jobs({ commit }, { year, month, status, type } = { year: null, month: null, status: null, type: null }) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs'

        let data = {
            year: year,
            month: month,
            status: status,
            type: type,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_jobs_with_page({ commit }, filters) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs?page=' + filters.page_number

        let data = {
            year: filters.year,
            month: filters.month,
            status: filters.status,
            type: filters.type,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_job({ commit }, job_id) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobs'

        let data = {
            job_id: job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_JOB_DETAILS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.interview_panel_jobs))
    },

    getSingleJobDetails(state) {
        return JSON.parse(JSON.stringify(state.current_job_details))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
