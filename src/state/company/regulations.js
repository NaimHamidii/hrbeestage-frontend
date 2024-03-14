import { API_CONFIG } from "@state_src/config.js";

const state = {
  company_regulations: [],
};

const mutations = {
  SET_COMPANY_REGULATIONS(state, data) {
    state.company_regulations = data;
  },
  RESET(state) {
    state.company_regulation = [];
  },
};

const actions = {
  add_company_regulation({ dispatch }, submitted_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/addRegulationCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, submitted_data, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  show_company_regulation({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getRegulationCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let user_id = localStorage.getItem("auth.user_id");

    let data = {
      id: user_id,
    };

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit('SET_COMPANY_REGULATIONS', response.data)
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  show_single_regulation({ commit }, id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/showSingleRegulation";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let user_id = localStorage.getItem("auth.user_id");

    let data = {
      id: id,
    };

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

  update_company_regulation({ dispatch }, submitted_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/updateRegulationCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, submitted_data, config)
      .then((response) => {
        // dispatch("get_company_departments");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  destroy_regulation({ dispatch }, regulation_id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/deleteRegulation";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      id: regulation_id
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
    return JSON.parse(JSON.stringify(state.company_regulations));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
