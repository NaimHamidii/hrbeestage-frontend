import { API_CONFIG } from "@state_src/config.js";

const state = {
  company_assets: [],
  company_available_assets: [],
};

const mutations = {
  SET_COMPANY_ASSETS(state, data) {
    state.company_assets = data;
  },
  SET_COMPANY_AVAILABLE_ASSETS(state, data) {
    state.company_available_assets = data;
  },
  RESET(state) {
    state.company_assets = [];
  },
};

const actions = {
  get_company_assets({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getCompanyAssets";
    let user_id = localStorage.getItem("auth.user_id");
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
      .then((response) => {
        commit("SET_COMPANY_ASSETS", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  get_company_available_assets({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getAvailableAssets";
    let user_id = localStorage.getItem("auth.user_id");
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
      .then((response) => {
        commit("SET_COMPANY_AVAILABLE_ASSETS", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  add_new_asset({ dispatch }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/storeCompanyAsset";
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

  update_asset({ dispatch }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/updateCompanyAsset";
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

  delete_asset({ commit }, data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/deleteCompanyAsset";
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
    return JSON.parse(JSON.stringify(state.company_assets));
  },
  get_available_assets(state) {
    return JSON.parse(JSON.stringify(state.company_available_assets));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
