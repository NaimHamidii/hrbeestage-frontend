import { API_CONFIG } from '@state_src/config.js'

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
    get_all_company_invoices({ commit }, company_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyInvoices'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: company_id,
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
    get_invoice_details({ commit }, invoice_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyInvoices'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            invoice_id: invoice_data.invoice_id,
            company_id: invoice_data.company_id,
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
    delete_company_invoice({ dispatch }, invoice_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteCompanyInvoice'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            invoice_id: invoice_data.invoice_id,
            company_id: invoice_data.company_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_company_invoices', invoice_data.company_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    edit_invoice_details({ dispatch }, invoice_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/editCompanyInvoice'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: invoice_data.company_id,
            invoice_id: invoice_data.invoice_id,
            invoice_status: invoice_data.invoice_status,
            invoiced_due_date: invoice_data.invoiced_due_date,
            invoice_payment_date: invoice_data.invoice_payment_date,
            payment_method: invoice_data.payment_method,
            invoice_notes: invoice_data.invoice_notes,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_company_invoices', invoice_data.company_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    generate_company_invoice({ dispatch }, invoice_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/generateCompanyInvoice'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: invoice_data.company_id,
            invoice_type: invoice_data.invoice_type,
            invoice_date: invoice_data.invoice_date,
            invoiced_due_date: invoice_data.invoiced_due_date,
            invoice_month: invoice_data.invoice_month,
            invoice_year: invoice_data.invoice_year,
            invoice_notes: invoice_data.invoice_notes,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_company_invoices', invoice_data.company_id)
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
