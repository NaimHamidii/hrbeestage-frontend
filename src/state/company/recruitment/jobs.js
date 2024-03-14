import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_jobs: [],
    current_job_details: [],
}

const mutations = {
    SET_COMPANY_JOBS(state, data) {
        state.company_jobs = data
    },
    SET_CURRENT_JOB_DETAILS(state, data) {
        state.current_job_details = data
    },
    RESET(state) {
        state.company_jobs = []
        state.current_job_details = []
    },
}

const actions = {
    get_jobs({ commit }, { withInterviewPanel } = { withInterviewPanel: false }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            with_interview_panel: withInterviewPanel ? 1 : 0,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_COMPANY_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_jobs_with_page({ commit }, { page, withInterviewPanel } = { page: 1, withInterviewPanel: false }) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs?page=' + page
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            with_interview_panel: withInterviewPanel ? 1 : 0,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_COMPANY_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_job({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs?search=' + search_query
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_COMPANY_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_jobs({ commit }, { year, month, status, type, withInterviewPanel } = { year: null, month: null, status: null, type: null, withInterviewPanel: false }) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs'
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            year: year,
            month: month,
            status: status,
            type: type,
            with_interview_panel: withInterviewPanel,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                localStorage.setItem('company_jobs', JSON.stringify(response.data))
                commit('SET_COMPANY_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    filter_jobs_with_page({ commit }, filters) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs?page=' + filters.page_number
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
                commit('SET_COMPANY_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_job({ commit }, job_id) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobs'
        let data = {
            job_id: job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

    add_job({ dispatch }, submitted_company_jobs_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addJob'
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            job_title: submitted_company_jobs_data.job_title,
            category_name: submitted_company_jobs_data.category_name,
            category_value: submitted_company_jobs_data.category_value,
            employment_type_name: submitted_company_jobs_data.employment_type_name,
            employment_type_value: submitted_company_jobs_data.employment_type_value,
            country_name: submitted_company_jobs_data.country_name,
            country_value: submitted_company_jobs_data.country_value,
            city_name: submitted_company_jobs_data.city_name,
            city_value: submitted_company_jobs_data.city_value,
            salary: submitted_company_jobs_data.salary,
            salary_type_name: submitted_company_jobs_data.salary_type_name,
            salary_type_value: submitted_company_jobs_data.salary_type_value,
            posted_date: submitted_company_jobs_data.posted_date,
            deadline: submitted_company_jobs_data.deadline,
            description: submitted_company_jobs_data.description,
            tags: submitted_company_jobs_data.tags,
            status: submitted_company_jobs_data.status,
            closed_reason: submitted_company_jobs_data.closed_reason,
            gender_name: submitted_company_jobs_data.gender_name,
            gender_value: submitted_company_jobs_data.gender_value,
            required_motivation: submitted_company_jobs_data.required_motivation,
            required_reference: submitted_company_jobs_data.required_reference,
            job_image_base64: submitted_company_jobs_data.job_image_base64,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_job({ dispatch }, job_id) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteJob'
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_id: job_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_jobs')
            })
            .catch((error) => {
                return error.response
            })
    },
    update_job({ dispatch }, submitted_company_jobs_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/editJob'
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            job_id: submitted_company_jobs_data.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            job_title: submitted_company_jobs_data.job_title,
            category_name: submitted_company_jobs_data.category_name,
            category_value: submitted_company_jobs_data.category_value,
            employment_type_name: submitted_company_jobs_data.employment_type_name,
            employment_type_value: submitted_company_jobs_data.employment_type_value,
            country_name: submitted_company_jobs_data.country_name,
            country_value: submitted_company_jobs_data.country_value,
            city_name: submitted_company_jobs_data.city_name,
            city_value: submitted_company_jobs_data.city_value,
            salary: submitted_company_jobs_data.salary,
            salary_type_name: submitted_company_jobs_data.salary_type_name,
            salary_type_value: submitted_company_jobs_data.salary_type_value,
            posted_date: submitted_company_jobs_data.posted_date,
            deadline: submitted_company_jobs_data.deadline,
            description: submitted_company_jobs_data.description,
            tags: submitted_company_jobs_data.tags,
            status: submitted_company_jobs_data.status,
            closed_reason: submitted_company_jobs_data.closed_reason,
            gender_name: submitted_company_jobs_data.gender_name,
            gender_value: submitted_company_jobs_data.gender_value,
            job_image_file_name: submitted_company_jobs_data.job_image_file_name,
            job_image_base64: submitted_company_jobs_data.job_image_base64,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_jobs')

                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_job_interview_panel_members({ dispatch }, update_data) {
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/updateMembers'
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_id: update_data.job_id,
            panel_member_ids: update_data.panel_member_ids,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_jobs', { withInterviewPanel: true })

                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_jobs))
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
