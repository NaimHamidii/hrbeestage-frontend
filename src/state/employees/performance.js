// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'

const state = {
    company_performance_definitions: [],
    employee_performances: [],
}

const mutations = {
    SET_COMPANY_PERFORMANCE_DEFINITIONS(state, data) {
        state.company_performance_definitions = data
    },
    SET_EMPLOYEE_PERFORMANCES(state, data) {
        state.employee_performances = data
    },

    RESET(state) {
        state.company_performance_definitions = []
        state.employee_performances = []
    },
}
const actions = {
    get_company_performance_definitions({ commit }) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPerformanceDefinitions'
        const employee_company_id = localStorage.getItem('employee_company_id')
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const e_id = localStorage.getItem('auth.user_id');
        const data = {
            company_id: employee_company_id,
            employee_id: e_id
        }
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_PERFORMANCE_DEFINITIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    // Employee performance functions
    get_employee_performances({ commit }, data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeePerformanceRatings'
        const employee_id = localStorage.getItem('employee_id')
        const employee_company_id = localStorage.getItem('employee_company_id')
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                // const employeePerformances = response.data
                // const mergedPerformances = state.company_performances.map((companyPerformance) => {
                //     for (const employeePerformance of employeePerformances) {
                //         if (employeePerformance.performance_definition_id == companyPerformance.performance_definition_id) return employeePerformance
                //     }
                //     return { ...companyPerformance, rating: 0 }
                // })

                commit('SET_EMPLOYEE_PERFORMANCES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_company_performance_definitions(state) {
        return JSON.parse(JSON.stringify(state.company_performance_definitions))
    },
    get_employee_performances(state) {
        return JSON.parse(JSON.stringify(state.employee_performances))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
