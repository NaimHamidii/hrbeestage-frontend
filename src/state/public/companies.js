// Important imports that always should be present
import {API_CONFIG} from '@state_src/config.js';
//import router from '@router'

const state = {
    hrbee_public_companies: [],
    hrbee_single_company_profile: []
}

const mutations = {
    SET_HRBEE_PUBLIC_COMPANIES (state, data) {
        state.hrbee_public_companies = data
    },
    SET_HRBEE_SINGLE_PUBLIC_COMPANY_PROFILE (state, data) {
        state.hrbee_single_company_profile = data
    },
   
    RESET (state) {
        state.hrbee_public_companies = []
        state.hrbee_single_company_profile = []
    },
}
const actions = {
         
         get_hrbee_public_companies({commit}) {
            let current_api = API_CONFIG.API_ENDPOINT+ 'api/showPublicCompanyInformation'
            let current_user_access_token = localStorage.getItem('auth.access_token');
           
            let config = {
                //headers: {'Authorization': "Bearer " + current_user_access_token}
            };
            let data = {}
             return API_CONFIG.SITE_AXIOS.post(current_api,data, config)
            .then((response) => {
                commit('SET_HRBEE_PUBLIC_COMPANIES', response.data)
                return response
            }).catch((error) => {
                return error.response
            })
            
        },

        get_hrbee_public_company_single_profile({commit}, company_id) {
            let current_api = API_CONFIG.API_ENDPOINT+ 'api/showPublicCompanyInformation'
            let current_user_access_token = localStorage.getItem('auth.access_token');
           
            let config = {
                //headers: {'Authorization': "Bearer " + current_user_access_token}
            };
            let data = {
                "company_id": company_id
            }
             return API_CONFIG.SITE_AXIOS.post(current_api,data, config)
            .then((response) => {
                commit('SET_HRBEE_SINGLE_PUBLIC_COMPANY_PROFILE', response.data)
                return response
            }).catch((error) => {
                return error.response
            })
            
        },

        get_hrbee_clients({ commit}) {
            let current_api = API_CONFIG.API_ENDPOINT+ 'api/jobshrbee/getPartnerCompanies'
            let config = {
                //headers: {'Authorization': "Bearer " + current_user_access_token}
            };
            return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                commit('SET_HRBEE_SINGLE_PUBLIC_COMPANY_PROFILE', response.data)
                return response
            }).catch((error) => {
                return error.response
            })
        }
}

const getters = {
   // End of getPageAlerts getter
    get_public_companies(state){
        return JSON.parse(JSON.stringify(state.hrbee_public_companies))
    },
    get_single_public_company_profile(state){
        return JSON.parse(JSON.stringify(state.hrbee_single_company_profile))
    }
 
   
   
};
export default {
namespaced : true, 
    state, mutations, actions, getters
}

