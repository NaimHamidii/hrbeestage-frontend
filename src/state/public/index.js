// Important imports that always should be present
import {API_CONFIG} from '@state_src/config.js';
//import router from '@router'

const state = {}

const mutations = {}

const actions = {
    get_offer_packages({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getOfferPackages'

        let config = {
            // headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_module_pricing({commit}, data) {
        let current_api = API_CONFIG.API_ENDPOINT+ 'api/calculatePriceForModules'
        let config = {
            //headers: {'Authorization': "Bearer " + current_user_access_token}
        };
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
        .then((response) => {
            return response
        }).catch((error) => {
            return error.response
        })
    },

    send_contact_form({commit}, contact_form_data) {
        let current_api = API_CONFIG.API_ENDPOINT+ 'api/addContactUs'
        let data = {
            name : contact_form_data.name,
            phone : contact_form_data.phone,
            email : contact_form_data.email,
            message: contact_form_data.message
        }
        return API_CONFIG.SITE_AXIOS.post(current_api,data)
        .then((response) => {
            return response
        }).catch((error) => {
            return error.response
        })
        
    },

    send_partnership_form({commit}, partnership_data){
        let current_api = API_CONFIG.API_ENDPOINT+ 'api/partnership'
        let data = {
            businessName : partnership_data.businessName,
            businessFiscalNumber : partnership_data.businessFiscalNumber,
            country : partnership_data.country,
            email: partnership_data.email,
            note: partnership_data.note
        }
        return API_CONFIG.SITE_AXIOS.post(current_api,data)
        .then((response) => {
            return response
        }).catch((error) => {
            return error.response
        })
    }
}

const getters = {};


import jobs from './jobs'
import companies from './companies'

const modules = {
    jobs,
    companies
};


export default {
    namespaced : true, 
    state, mutations, actions, getters, modules
}

