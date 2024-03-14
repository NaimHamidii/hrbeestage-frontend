import { API_CONFIG } from '@state_src/config.js'

const state = {
    employee_general_vacations: [],
    employee_leave_definitions: [],
    employee_leaves: [],
    employee_all_requested_vacations: [],
    employee_approved_leaves: [],
    employee_public_holidays: [],
}

const mutations = {
    SET_COMPANY_GENERAL_VACATIONS(state, data) {
        state.employee_general_vacations = data
    },
    SET_SINGLE_EMPLOYEE_LEAVE_DEFINITIONS(state, data) {
        state.employee_leave_definitions = data
    },
    SET_SINGLE_EMPLOYEE_LEAVES(state, data) {
        state.employee_leaves = data
    },
    SET_ALL_REQUESTED_EMPLOYEE_VACATIONS(state, data) {
        state.employee_all_requested_vacations = data
    },
    SET_SINGLE_EMPLOYEE_APPROVED_LEAVES(state, data) {
        state.employee_approved_leaves = data
    },
    SET_COMPANY_PUBLIC_HOLIDAYS(state, data) {
        state.employee_public_holidays = data
    },

    RESET(state) {
        ;(state.employee_general_vacations = []), (state.employee_leave_definitions = [])
        state.employee_leaves = []
        state.employee_approved_leaves = []
        state.employee_public_holidays = []
    },
}
const actions = {
    /* GET COMPANY General vacations - Pushim vjetore, pushim mjeksor */
    get_general_vacations({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companygetBaseLeaveDefinitions'
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
                commit('SET_COMPANY_GENERAL_VACATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    /* GET SINGLE EMPLOYEE LEAVE DEFINITIONS - for single employee - Pushim vjetore, pushim mjeksor */
    get_employee_leave_defitions({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaveDefinitions'

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
                commit('SET_SINGLE_EMPLOYEE_LEAVE_DEFINITIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_employee_public_holidays({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPublicHolidayDefinitions'
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
                commit('SET_COMPANY_PUBLIC_HOLIDAYS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    /* GET SINGLE EMPLOYEE VACATIONS - ALL VACATIONS REQUEST - APPROVED, REJECTED, NEW */
    get_all_single_employee_vacations({ commit }, { company_id, for_year }) {
        alert('here')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id,
            employee_id: user_id,
            for_year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_EMPLOYEE_LEAVES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    /* GET SINGLE EMPLOYEE VACATIONS - ALL VACATIONS REQUEST - APPROVED, REJECTED, NEW */
    get_all_requested_employee_vacations({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
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
                commit('SET_ALL_REQUESTED_EMPLOYEE_VACATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    /* GET SINGLE EMPLOYEE VACATIONS - ALL VACATIONS REQUEST - APPROVED, REJECTED, NEW */
    get_all_single_employee_approved_vacations({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeApprovedLeaves'
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
                commit('SET_SINGLE_EMPLOYEE_APPROVED_LEAVES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    /* COMPANY BOOK A VACATIONS FOR AN EMPLOYEE */
    company_book_time_off({ dispatch }, requested_vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeLeave'
        let user_id = localStorage.getItem('auth.user_id')
        let c_id = localStorage.getItem('employee_company_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: c_id,
            employee_id: user_id,
            type: requested_vacation_data.type,
            company_employee_leave_definitions_id: requested_vacation_data.company_employee_leave_definitions_id,
            start_date: requested_vacation_data.start_date,
            end_date: requested_vacation_data.end_date,
            requested_half_days: requested_vacation_data.requested_half_days ? 1 : 0,
            reason: requested_vacation_data.reason,
            request_status: requested_vacation_data.request_status,
            leave_of_year: requested_vacation_data.leave_of_year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                let reload_data = {
                    company_id: c_id,
                    employee_id: requested_vacation_data.employee_id,
                }
                dispatch('get_general_vacations', reload_data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    // End of getPageAlerts getter
    get_general_vacations(state) {
        return JSON.parse(JSON.stringify(state.employee_general_vacations))
    },
    get_employee_leave_defitions(state) {
        return JSON.parse(JSON.stringify(state.employee_leave_definitions))
    },
    get_public_holidays(state) {
        return JSON.parse(JSON.stringify(state.employee_public_holidays))
    },

    get_single_employee_leaves(state) {
        return JSON.parse(JSON.stringify(state.employee_leaves))
    },
    get_all_employee_requested_vacations(state) {
        return JSON.parse(JSON.stringify(state.employee_all_requested_vacations))
    },
    get_single_employee_approved_leaves(state) {
        return JSON.parse(JSON.stringify(state.employee_approved_leaves))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
