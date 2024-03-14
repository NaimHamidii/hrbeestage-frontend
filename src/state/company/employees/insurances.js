import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    employees: [],
    employee: [],
    employee_insurances: [],
}

const mutations = {
    SET_EMPLOYEES(state, data) {
        state.employees = data
    },
    SET_EMPLOYEE(state, data) {
        state.employee = data
    },
    SET_EMPLOYEE_INSURANCES(state, data) {
        state.employee_insurances = data
    },
    RESET(state) {
        state.employees = []
        state.employee = []
    },
}

const actions = {
    fetch_employees({ commit }, page) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees?page=' + page
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            status: 1,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_employees_search({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, { ...data, company_id: Helpers.getCurrentCompanyIdForAdmin() }, config)
            .then((response) => {
                commit('SET_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_employee({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_employee_insurances({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeInsurances?employee_id=' + employee_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_EMPLOYEE_INSURANCES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    post_employee_insurance({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeInsurances'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('fetch_employee_insurances', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    put_employee_insurance({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeInsurances/' + data.insurance_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.put(current_api, data, config)
            .then((response) => {
                dispatch('fetch_employee_insurances', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    destroy_employee_insurance({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeInsurances/' + data.insurance_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                dispatch('fetch_employee_insurances', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_employees(state) {
        return JSON.parse(JSON.stringify(state.employees))
    },
    get_employee(state) {
        return JSON.parse(JSON.stringify(state.employee))
    },
    get_employee_insurances(state) {
        return JSON.parse(JSON.stringify(state.employee_insurances))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
