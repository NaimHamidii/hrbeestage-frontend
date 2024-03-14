import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    position_interview_candidates: [],
    position_single_interview_candidates: [],
}

const mutations = {
    SET_POSITIONS_WITH_INTERVIEW(state, data) {
        state.position_interview_candidates = data
    },
    SET_POSITION_SINGLE_INTERVIEW_CANDIDATE(state, data) {
        state.position_single_interview_candidates = data
    },
    RESET(state) {
        ;(state.position_interview_candidates = []), (state.position_single_interview_candidates = [])
    },
}
const actions = {
    get_positions_with_interview_candidates({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewsPosition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITIONS_WITH_INTERVIEW', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_positions_with_interview_candidates_with_page({ commit }, page_number) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewsPosition?page=' + page_number
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITIONS_WITH_INTERVIEW', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_position_with_interview_candidates({ commit }, filters) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewCandidates'
        let data = {
            job_id: filters.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            application_status: filters.application_status,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITION_SINGLE_INTERVIEW_CANDIDATE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_single_position_with_interview_candidates_with_page({ commit }, query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewCandidates?page=' + query.page_number
        let data = {
            job_id: query.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            application_status: query.application_status,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITION_SINGLE_INTERVIEW_CANDIDATE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_position_with_interview_candidates_search({ commit }, search) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewCandidatesSearch'
        let data = {
            job_id: search.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            application_status: search.application_status,
            job_seeker_name: search.job_seeker_name,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITION_SINGLE_INTERVIEW_CANDIDATE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_single_position_with_interview_candidates_search_with_page({ commit }, search) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showInterviewCandidatesSearch?page=' + search.page_number
        let data = {
            job_id: search.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            application_status: search.application_status,
            job_seeker_name: search.job_seeker_name,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITION_SINGLE_INTERVIEW_CANDIDATE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.position_interview_candidates))
    },
    get_single_position_with_interviews(state) {
        return JSON.parse(JSON.stringify(state.position_single_interview_candidates))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
