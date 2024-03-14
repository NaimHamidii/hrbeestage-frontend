import { API_CONFIG } from '@state_src/config.js'

const state = {
    current_employee_salaries: [],
}

const mutations = {
    SET_CURRENT_EMPLOYEE_SALARIES(state, data) {
        state.current_employee_salaries = data
    },
    RESET(state) {
        state.current_employee_salaries = []
    },
}

const actions = {
    get_salary_generations({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: employee_data.company_id,
            employee_id: employee_data.employee_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_EMPLOYEE_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_salary_generations_with_page({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary?page=' + employee_data.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: employee_data.company_id,
            employee_id: employee_data.employee_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_EMPLOYEE_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.current_employee_salaries))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
