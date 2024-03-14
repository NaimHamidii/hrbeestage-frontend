import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_interviews: [],
}

const mutations = {
    SET_COMPANY_INTERVIEWS(state, data) {
        state.company_interviews = data
    },
    RESET(state) {
        state.company_interviews = []
        state.current_job_details = []
    },
}
const actions = {
    get_interviews_by_month({ commit }, current_month) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationInterviewsPerMonth'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            month: current_month,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INTERVIEWS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    search_interviews({ commit }, search_query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationInterviewsPerMonth'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: search_query.name,
            surname: search_query.surname,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INTERVIEWS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    filter_interviews({ commit }, filter_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationInterviewsPerMonth'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            year: filter_data.year,
            month: filter_data.month,
            status: filter_data.status,
            job_id: filter_data.job_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INTERVIEWS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_interviews))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
