import { API_CONFIG } from '@state_src/config.js'

const state = {
    employee_assets: [],
}

const mutations = {
    SET_EMPLOYEE_ASSETS(state, data) {
        state.employee_assets = data
    },
    RESET(state) {
        state.to_dos = []
    },
}

const actions = {
    get_employee_assets({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeAssets'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        const data = {
            "employee_id": employee_id
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_ASSETS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    assign_employee_asset({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/assignEmployeeAsset";
        let current_user_access_token = localStorage.getItem("auth.access_token");
    
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
    
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    return_employee_asset({ dispatch }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/returnEmployeeAsset";
        let current_user_access_token = localStorage.getItem("auth.access_token");
    
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
    
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
      },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.employee_assets))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}