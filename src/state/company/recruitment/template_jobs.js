import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    template_jobs: [],
    single_template_job: [],
}

const mutations = {
    SET_TEMPLATE_JOBS(state, data) {
        state.template_jobs = data
    },
    SET_SINGLE_TEMPLATE_JOB(state, data) {
        state.single_template_job = data
    },
    RESET(state) {
        state.template_jobs = []
        state.single_template_job = []
    },
}

const actions = {
    add_template_job({ dispatch }, submitData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storejobtemplate'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            title: submitData.title,
            category_name: submitData.category_name,
            category_value: submitData.category_value,
            country_name: submitData.country_name,
            country_value: submitData.country_value,
            city_name: submitData.city_name,
            city_value: submitData.city_value,
            job_description: submitData.job_description,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_template_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_template_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showjobtemplates'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_TEMPLATE_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_template_jobs_with_pagination({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showjobtemplates?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_TEMPLATE_JOBS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_template_job({ commit }, template_job_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showjobtemplates'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            id: template_job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_TEMPLATE_JOB', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_template_job({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/destroyjobtemplate'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            id: id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_template_jobs')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.template_jobs))
    },
    get_template_jobs(state) {
        return JSON.parse(JSON.stringify(state.template_jobs))
    },
    get_single_template_job(state) {
        return JSON.parse(JSON.stringify(state.single_template_job))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
