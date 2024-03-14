import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_performance_definitions: [],
    company_performance_definitions_for_employee: [],
    company_employee_performance_ratings: [],
}

const mutations = {
    SET_COMPANY_PERFORMANCE_DEFINITIONS(state, data) {
        state.company_performance_definitions = data
    },
    SET_COMPANY_PERFORMANCE_DEFINITIONS_FOR_EMPLOYEE(state, data) {
        state.company_performance_definitions_for_employee = data
    },
    SET_company_employee_performance_ratings(state, data) {
        state.company_employee_performance_ratings = data
    },
    RESET(state) {
        state.company_performance_definitions = []
        state.company_performance_definitions_for_employee = []
        state.company_employee_performance_ratings = []
    },
}
const actions = {
    get_company_performance_definitions({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPerformanceDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
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
    get_company_performance_definitions_for_employee({ commit }, employeeId) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPerformanceDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employeeId,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_PERFORMANCE_DEFINITIONS_FOR_EMPLOYEE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    add_company_performance_definition({ dispatch }, performance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddPerformanceDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: performance_data.employee_id,
            name: performance_data.name,
            rating_interval_months: performance_data.rating_interval_months,
            icon: performance_data.icon,
            icon_color: performance_data.icon_color,
            description: performance_data.description,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_performance_definitions_for_employee', performance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_company_performance_definition({}, performance_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeletePerformanceDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            performance_definition_id: performance_id,
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

    edit_company_performance_definition({ dispatch }, performance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditPerformanceDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            performance_definition_id: performance_data.performance_definition_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: performance_data.name,
            rating_interval_months: performance_data.rating_interval_months,
            icon: performance_data.icon,
            icon_color: performance_data.icon_color,
            description: performance_data.description,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_performance_definitions')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_employee_performances({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyshowEmployeePerformanceRatings'
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
                commit('SET_company_employee_performance_ratings', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_employee_performances_for_definition({ commit }, performance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyshowEmployeePerformanceRatings'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: performance_data.employee_id,
            performance_definition_id: performance_data.performance_definition_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_PERFORMANCES_FOR_DEFINITION', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_new_employee_performance({ dispatch }, submitted_performance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeePerformances'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: submitted_performance_data.employee_id,
            user_id_who_rated: Helpers.getCurrentCompanyIdForAdmin(),
            for_month: submitted_performance_data.for_month,
            for_year: submitted_performance_data.for_year,
            performance_definition_id: submitted_performance_data.performance_definition_id,
            rating: submitted_performance_data.rating,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_performances', submitted_performance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_employee_performance_for_definition({ dispatch }, submitted_performance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateOneEmployeePerformance'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: submitted_performance_data.employee_id,
            user_id_who_rated: Helpers.getCurrentCompanyIdForAdmin(),
            for_month: submitted_performance_data.for_month,
            for_year: submitted_performance_data.for_year,
            performance_definition_id: submitted_performance_data.performance_definition_id,
            rating: submitted_performance_data.rating,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_performance_definitions_for_employee', submitted_performance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_performance_definitions))
    },
    get_current_employee_performance_definitions(state) {
        return JSON.parse(JSON.stringify(state.company_performance_definitions_for_employee))
    },
    get_current_employee_performances(state) {
        return JSON.parse(JSON.stringify(state.company_employee_performance_ratings))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
