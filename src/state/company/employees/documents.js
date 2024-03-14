import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_employee_documents: [],
}

const mutations = {
    SET_COMPANY_PERFORMANCE_DEFINITIONS(state, data) {
        state.company_employee_documents = data
    },
    RESET(state) {
        state.company_employee_documents = []
    },
}
const actions = {
    get_employee_documents({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeDocuments'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id,
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
    get_company_employees_with_page({ commit }, document_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeDocuments?page=' + document_data.next_page
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: document_data.employee_id,
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

    get_employee_documents_with_filters({ commit }, filter_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeDocuments?page=' + filter_data.next_page
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: filter_data.employee_id,
            document_type: filter_data.filter_type,
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

    upload_employee_document({}, submitted_image) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeDocument'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_image, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + current_user_access_token } })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_employee_document({ dispatch }, document_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeDocuments'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: document_data.employee_id,
            employee_document_id: document_data.employee_document_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_documents', data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_employee_documents))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
