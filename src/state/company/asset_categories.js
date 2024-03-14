import { API_CONFIG } from "@state_src/config.js";

const state = {
  company_asset_categories: [],
};

const mutations = {
  SET_COMPANY_ASSET_CATEGORIES(state, data) {
    state.company_asset_categories = data;
  },
  RESET(state) {
    state.company_asset_categories = [];
  },
};

const actions = {
  get_company_asset_categories({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getCompanyAssetCategory";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
      .then((response) => {
        commit("SET_COMPANY_ASSET_CATEGORIES", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  add_new_asset_category({ dispatch }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/storeCompanyAssetCategory";
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

  update_asset_category({ dispatch }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/updateCompanyAssetCategory";
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

  delete_asset_category({ commit }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/deleteCompanyAssetCategory";
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
};

const getters = {
  get(state) {
    return JSON.parse(JSON.stringify(state.company_asset_categories));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
