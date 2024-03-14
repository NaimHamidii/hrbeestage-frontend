import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_invoices: [],
    company_invoice_item: [],
}

const mutations = {
    SET_COMPANY_INVOICES(state, data) {
        state.company_invoices = data
    },
    SET_COMPANY_INVOICE_ITEM(state, data) {
        state.company_invoice_item = data
    },
    RESET(state) {
        state.company_invoices = []
        state.company_invoice_item = []
    },
}

const actions = {
    get_all_company_invoices({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyInvoices'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INVOICES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_company_invoices_with_page({ commit }, page_number) {
        /*
        let current_api = API_CONFIG.API_ENDPOINT+ 'api/companyShowSocialPosts?page='+page_number
        let user_id    = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token');
        let data = {
            "company_id" : user_id
        }
        let config = {
            headers: {'Authorization': "Bearer " + current_user_access_token}
        };
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
        .then((response) => {
            commit('SET_COMPANY_INVOICES', response)
            return response
        }).catch((error) => {
            return error.response
        })
        */
    },
    get_invoice_details({ commit }, invoice_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyInvoices'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            invoice_id: invoice_number,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_INVOICE_ITEM', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_company_invoices(state) {
        return JSON.parse(JSON.stringify(state.company_invoices))
    },
    get_current_invoice(state) {
        return JSON.parse(JSON.stringify(state.company_invoice_item))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
