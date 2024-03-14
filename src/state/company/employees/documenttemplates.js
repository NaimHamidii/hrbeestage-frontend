import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    document_templates: [],
    current_document: [],
    list_contracts: [],
    list_warning_letters: [],
}

const mutations = {
    SET_DOCUMENT_TEMPLATES(state, data) {
        state.document_templates = data
    },
    SET_CURRENT_DOCUMENT(state, data) {
        state.current_document = data
    },
    SET_LIST_CONTRACTS(state, data) {
        state.list_contracts = data
    },
    SET_LIST_WARNING_LETTERS(state, data) {
        state.list_warning_letters = data
    },
    RESET(state) {
        state.document_templates = []
        state.current_document = []
        state.list_contracts = []
        state.list_warning_letters = []
    },
}

const actions = {
    get_warning_letters({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/listWarningLetter'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            employee_id: id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_LIST_WARNING_LETTERS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_contracts({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/listContracts'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            employee_id: id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_LIST_CONTRACTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_contract({}, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteContract'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            id: id,
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

    show_single_document({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getdocument'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            id: id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_DOCUMENT', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    show_document_template({ commit }, submited_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getcompanydocumenttemplates'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: submited_data.c_id ?? Helpers.getCurrentCompanyIdForAdmin(),
            type: submited_data.type,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_DOCUMENT_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    show_document_template_with_pagination({ commit }, submited_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getcompanydocumenttemplates?page=' + submited_data.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            type: submited_data.type,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_DOCUMENT_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_document_template({}, submitData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateCompanyDocumentTemplate'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            id: submitData.id,
            title: submitData.title,
            type: submitData.type,
            content: submitData.content,
            company_base_leave_definitions_id: submitData.vacation_id,
            two_columns_template: submitData.two_columns_template,
            second_content: submitData.second_content
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_DOCUMENT_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_document_template({}, submitData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storecompanydocumenttemplates'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            title: submitData.title,
            type: submitData.type,
            content: submitData.content,
            company_base_leave_definitions_id: submitData.vacation_id,
            two_columns_template: submitData.two_columns_template,
            second_content: submitData.second_content
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_DOCUMENT_TEMPLATES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_document_template({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deletecompanydocumenttemplate'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            id: id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_document_templates')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    download_contract({}, submited_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/downloadContract'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        // In the future we need to check for jobseeker_data.template_nr in order
        // to download the required email template

        let data = {
            employee_id: submited_data.employee_id,
            id: submited_data.document_id,
            position_id: submited_data.position_id,
            position: submited_data.position,
            contract_start_date: submited_data.contract_start_date,
            contract_end_date: submited_data.contract_end_date,
            salary_type: submited_data.salary_type,
            gross_salary: submited_data.gross_salary,
            net_salary: submited_data.net_salary,
            contract: submited_data.contract,
            two_columns_template: submited_data.two_columns,
            second_content: submited_data.second_content,
            indefinite_term: submited_data.indefinite_term ? 1 : 0,
            department_id: submited_data.department_id,
            department: submited_data.department,
            workplace_location: submited_data.workplace_location,
            contract_number: submited_data.contract_number
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                // let contract_url = ''
                // if (response.status == 200) {
                //     contract_url = submited_data.SERVER_URL + submited_data.CONTRACTS_FOLDER + response.data
                //     window.open(contract_url, '_newtab')
                // }
                return response;
            })
            .catch((error) => {
                return error.response
            })
    },
    download_warning_letter({}, submited_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addWarningLetter'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        // In the future we need to check for jobseeker_data.template_nr in order
        // to download the required email template

        let data = {
            employee_id: submited_data.employee_id,
            id: submited_data.document_id,
            warning_letter: submited_data.warning_letter,
            date: submited_data.date,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                let contract_url = ''
                if (response.status == 200) {
                    contract_url = submited_data.SERVER_URL + submited_data.WARNING_LETTERS_FOLDER + response.data
                    window.open(contract_url, '_newtab')
                }
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_list_warning_letters(state) {
        return JSON.parse(JSON.stringify(state.list_warning_letters))
    },
    get_list_with_contracts(state) {
        return JSON.parse(JSON.stringify(state.list_contracts))
    },
    get_document_templates(state) {
        return JSON.parse(JSON.stringify(state.document_templates))
    },
    get_current_document(state) {
        return JSON.parse(JSON.stringify(state.current_document))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
