// Important imports that always should be present
import {API_CONFIG} from '@state_src/config.js';
//import router from '@router'

const state = {
    hrbee_jobseekers: []
   
}

const mutations = {
    SET_HRBEE_JOBSEEKERS (state, data) {
        state.hrbee_jobseekers = data
    },
    RESET (state) {
        state.hrbee_jobseekers = []
    },
}
const actions = {
         
        get_hrbee_jobseekers({commit}) {
            let current_api = API_CONFIG.API_ENDPOINT+ 'api/showAllJobSeekerProfiles'
            let current_user_access_token = localStorage.getItem('auth.access_token');
           
            let config = {
                headers: {'Authorization': "Bearer " + current_user_access_token}
            };
            
            let data = {}
             return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_JOBSEEKERS', response.data)
                return response
            }).catch((error) => {
                return error.response
            })
            
        },
        
        get_hrbee_jobseekers_with_pagination({commit},page_number) {
            let current_api = API_CONFIG.API_ENDPOINT+ 'api/showAllJobSeekerProfiles?page='+page_number
            let current_user_access_token = localStorage.getItem('auth.access_token');
           
            let config = {
                headers: {'Authorization': "Bearer " + current_user_access_token}
            };
            
            let data = {}
             return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_HRBEE_JOBSEEKERS', response.data)
                return response
            }).catch((error) => {
                return error.response
            })
            
        },

}

const getters = {
   // End of getPageAlerts getter
    get(state){
        return JSON.parse(JSON.stringify(state.hrbee_jobseekers))
    }
 
   
   
};
export default {
namespaced : true, 
    state, mutations, actions, getters
}

