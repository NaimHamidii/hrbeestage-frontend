import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_employee_work_details: [],
}

const mutations = {
    SET_EMPLOYEE_WORK_DETAILS(state, data) {
        state.company_employee_work_details = data
    },
    RESET(state) {
        state.company_employee_work_details = []
    },
}
const actions = {
    get_employee_work_details({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkDetails'
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
                commit('SET_EMPLOYEE_WORK_DETAILS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_work_detail({}, work_details) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkDetails'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: work_details.employee_id,
            work_detail_id: work_details.work_detail_id,
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

    update_single_work_detail({ dispatch }, work_details) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeWorkDetails'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: work_details.employee_id,
            work_detail_id: work_details.work_detail_id,
            department: work_details.department,
            position: work_details.position,
            undefined_end_date: work_details.undefined_end_date,
            start_date: work_details.start_date,
            end_date: work_details.end_date,
            conditions: work_details.conditions,
            description: work_details.description,
            is_active: work_details.is_active,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_work_details', work_details.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_new_work_experience({ dispatch }, work_details) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeWorkDetails'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: work_details.employee_id,
            department: work_details.department,
            position: work_details.position,
            undefined_end_date: work_details.undefined_end_date,
            start_date: work_details.start_date,
            end_date: work_details.end_date,
            conditions: work_details.conditions,
            description: work_details.description,
            is_active: work_details.is_active,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_work_details', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_work_experience({ dispatch }, work_details) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeWorkDetails'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: work_details.employee_id,
            work_detail_id: work_details.work_detail_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_work_details', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_employee_work_details))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
