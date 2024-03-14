// Important imports that always should be present
import { API_CONFIG } from '@state_src/config.js'
//import router from '@router'

const state = {
    company_profile: [],
    company_invoice_type: '',
    hrbee_companies: [],
    hrbee_company_item: [],
    hrbee_company_item_employee_count: '',
}

const mutations = {
    SET_COMPANY_DATA(state, data) {
        state.company_profile = data
    },
    SET_COMPANY_INVOICE_TYPE(state, data) {
        state.company_invoice_type = data
    },
    SET_HRBEE_COMPANIES(state, data) {
        state.hrbee_companies = data
    },
    SET_HRBEE_COMPANY_ITEM(state, data) {
        state.hrbee_company_item = data
    },
    SET_HRBEE_COMPANY_EMPLOYEE_COUNT(state, data) {
        state.hrbee_company_item_employee_count = data
    },
    RESET(state) {
        ;(state.company_profile = []), (state.company_invoice_type = ''), (state.hrbee_companies = []), (state.hrbee_company_item = []), (state.hrbee_company_item_employee_count = '')
    },
}
const actions = {
    get_company_profile_data({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowInformation'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: company_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DATA', response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    },
    get_company_invoice_type({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyInvoiceType'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: company_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INVOICE_TYPE', response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    },
    get_hrbee_companies({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/getCompanies'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_COMPANIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_contracts({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/superadmin/getCompanyContracts/${id}`
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_company({ dispatch }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/deleteCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_company_contract({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/updateCompanyContract'
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
    partner_company({ dispatch }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/partnerCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    unpartner_company({ dispatch }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/unpartnerCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_hrbee_companies_with_pagination({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/superadmin/getCompanies?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {}
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_COMPANIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    hrbee_get_single_company_profile({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowInformation'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_COMPANY_ITEM', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    hrbee_get_company_total_employees({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeCount'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: company_id,
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_COMPANY_EMPLOYEE_COUNT', response.data.total_employees)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    upload_excel({ dispatch }, submitted_image) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storeEmployeesFromExcelFile'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_image, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + current_user_access_token,
            },
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    verify_user({ dispatch }, companyId) {
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const current_api = API_CONFIG.API_ENDPOINT + 'api/verifyUser'

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            company_id: companyId,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('hrbee_get_single_company_profile', companyId)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_company_profile(state) {
        return JSON.parse(JSON.stringify(state.company_profile))
    },
    get_company_invoice_type(state) {
        return JSON.parse(JSON.stringify(state.company_invoice_type))
    },
    get(state) {
        return JSON.parse(JSON.stringify(state.hrbee_companies))
    },
    get_single_company_data(state) {
        return JSON.parse(JSON.stringify(state.hrbee_company_item))
    },
    get_single_company_employee_count(state) {
        return JSON.parse(JSON.stringify(state.hrbee_company_item_employee_count))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
