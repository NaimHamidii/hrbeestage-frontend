import { API_CONFIG } from '@state_src/config.js'

const state = {
    todos: [],
}

const mutations = {
    SET_TODOS(state, data) {
        state.todos = data
    },

    RESET(state) {
        state.todos = []
    },
}

const actions = {
    get_employee_todos({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeTodos'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_TODOS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.todos))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
