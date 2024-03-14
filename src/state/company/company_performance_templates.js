import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    employee: [],
    employees: [],
    company_performance_templates: [],
    company_performance_sections: [],
    employee_performance_templates: [],
    employee_ratings: [],
    section: [],
    company_departments_with_performance_templates: [],
    positions_with_performance_templates: [],
    total_percentage: 0
}

const mutations = {
    SET_TOTAL_PERCENTAGE(state, data) {
        state.total_percentage = data
    },
    SET_COMPANY_DEPARTMENTS_WITH_PERFORMANCE_TEMPLATES(state, data) {
        state.company_departments_with_performance_templates = data
    },
    SET_POSITIONS_WITH_PERFORMANCE_TEMPLATES(state, data) {
        state.positions_with_performance_templates = data
    },
    SET_EMPLOYEE(state, data) {
        state.employee = data
    },
    SET_SECTION(state, data) {
        state.section = data
    },
    SET_EMPLOYEE_RATINGS(state, data) {
        state.employee_ratings = data
    },
    SET_EMPLOYEES(state, data) {
        state.employees = data
    },
    SET_COMPANY_PERFORMANCE_TEMPLATES(state, data) {
        state.company_performance_templates = data
    },
    SET_COMPANY_PERFORMANCE_SECTIONS(state, data) {
        state.company_performance_sections = data
    },
    SET_EMPLOYEE_PERFORMANCE_TEMPLATES(state, data) {
        state.employee_performance_templates = data
    },
    RESET(state) {
        state.company_performance_templates = [];
        state.company_performance_sections = [];
        state.employees = [];
        state.employee = [];
        state.employee_performance_templates = [];
        state.employee_ratings = [];
    },
}

const actions = {
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

    fetch_company_performance_templates({ commit }, department_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/performanceTemplates?department_id=' + department_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_COMPANY_PERFORMANCE_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_performance_templates_for_employee({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeePerformanceTemplates?employee_id=' + employee_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_EMPLOYEE_PERFORMANCE_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_company_performance_sections({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/getSectionsOfCompanyPerformance/` + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_COMPANY_PERFORMANCE_SECTIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    post_company_performance_template({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/performanceTemplates'
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

    put_company_performance_template({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/performanceTemplates/' + data.template_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.put(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_company_departments_with_performance_templates({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithPerformanceTemplates'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_WITH_PERFORMANCE_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_positions_with_performance_templates({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/getPositionsOfDepartmentWithPerformanceTemplates/` + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_POSITIONS_WITH_PERFORMANCE_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    destroy_company_performance_template({ dispatch }, template_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/performanceTemplates/' + template_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_employee_rating({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeRate?employee_id=' + data.employee_id + '&section_performance_id=' + data.section_performance_id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_EMPLOYEE_RATINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    rate_employee({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeRate'
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

    add_comment_to_rating({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addCommentToRatingPerformance'
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

    get_rated_percentage({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeRatedPercentage'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_TOTAL_PERCENTAGE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_employee_rated_performances({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeePerformancesForPDF'
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

    fetch_section({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showSection/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_SECTION', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    fetch_rated_and_not_yet_rated_performance({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getRatedPerformancesAndNotYetRated'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SECTION', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    post_performance_of_section({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storePerformanceOfSection'
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

    put_performance_of_section({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updatePerformanceOfSection/' + data.id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.put(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    destroy_performance_of_section({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/destroyPerformanceOfSection/' + id
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_total_percentage(state) {
        return JSON.parse(JSON.stringify(state.total_percentage))
    },
    get_employee(state) {
        return JSON.parse(JSON.stringify(state.employee))
    },
    get_employee_rates(state) {
        return JSON.parse(JSON.stringify(state.employee_ratings))
    },
    get_employee_performance_templates(state) {
        return JSON.parse(JSON.stringify(state.employee_performance_templates))
    },
    get_employees(state) {
        return JSON.parse(JSON.stringify(state.employees))
    },
    get_company_performance_templates(state) {
        return JSON.parse(JSON.stringify(state.company_performance_templates))
    },
    get_company_performance_sections(state) {
        return JSON.parse(JSON.stringify(state.company_performance_sections))
    },
    get_section(state){
        return JSON.parse(JSON.stringify(state.section))
    },
    get_company_departments_with_performance_templates(state) {
        return JSON.parse(JSON.stringify(state.company_departments_with_performance_templates))
    },
    get_positions_with_performance_templates(state) {
        return JSON.parse(JSON.stringify(state.positions_with_performance_templates))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
