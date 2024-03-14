// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    employee_profile: [],
}

const mutations = {
    SET_PROFILE(state, data) {
        state.employee_profile = data
    },
    RESET(state) {
        state.employee_profile = []
    },
}

const actions = {
    get_employee_profile({ commit }) {
        let user_id = localStorage.getItem('auth.user_id')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showLoggedInEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            employee_id: user_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_PROFILE', response.data)
                localStorage.setItem('employee_profile', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.employee_profile))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
