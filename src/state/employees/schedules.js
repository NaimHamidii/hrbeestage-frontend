import { API_CONFIG } from '@state_src/config.js'

const state = {
    employee_schedule: [],
}

const mutations = {
    SET_EMPLOYEE_SCHEDULE(state, data) {
        employee_schedule
    },

    RESET(state) {
        state.employee_schedule = []
    },
}

const actions = {
    get_employee_schedule({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkSchedules'
        let user_id = localStorage.getItem('auth.user_id')
        let c_id = localStorage.getItem('employee_company_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: c_id,
            employee_id: user_id,
        }
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
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.employee_schedule))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
