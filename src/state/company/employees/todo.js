import { API_CONFIG } from '@state_src/config.js'

const state = {
    to_dos: [],
}

const mutations = {
    SET_EMPLOYEE_TODOS(state, data) {
        state.to_dos = data
    },
    RESET(state) {
        state.to_dos = []
    },
}

const actions = {
    getCompanyTodos({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyTodos'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            "employee_id": employee_id
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_TODOS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    storeTodo({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/store-todo'
        let current_user_access_token = localStorage.getItem('auth.access_token')
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
    completeTodo({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/completeTodo/${id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.to_dos))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}