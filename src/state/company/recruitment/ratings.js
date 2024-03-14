import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    position_ratings_candidates: [],
    position_single_ratings_candidates: [],
}

const mutations = {
    SET_POSITONS_WITH_RATINGS(state, data) {
        state.position_ratings_candidates = data
    },
    SET_POSITION_SINGLE_RATED_CANDIDATE(state, data) {
        state.position_single_ratings_candidates = data
    },
    RESET(state) {
        state.position_ratings_candidates = []
    },
}

const actions = {
    get_positions_with_ratings_candidates({ commit }, current_month) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showRatingsPositions'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITONS_WITH_RATINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_positions_with_ratings_candidates_with_page({ commit }, page_number) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showRatingsPositions?page=' + page_number

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITONS_WITH_RATINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_single_position_with_rated_candidates({ commit }, job_id) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showRatedCandidates'

        let data = {
            job_id: job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITION_SINGLE_RATED_CANDIDATE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.position_ratings_candidates))
    },
    get_single_position_with_rated(state) {
        return JSON.parse(JSON.stringify(state.position_single_ratings_candidates))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
