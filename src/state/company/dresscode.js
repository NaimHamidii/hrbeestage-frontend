import { API_CONFIG } from "@state_src/config.js";

const state = {
    company_dress_code: [],
};

const mutations = {
  SET_COMPANY_DRESS_CODE(state, data) {
    state.company_dress_code = data;
  },
  RESET(state) {
    state.company_dress_code = [];
  },
};

const actions = {
  add_dress_code({ dispatch }, submitted_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/addDressCodeCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      description: submitted_data.description,
      gender: submitted_data.gender,
      department_id: submitted_data.department_id,
      position_id: submitted_data.position_id
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_COMPANY_DRESS_CODE", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  destroy_dress_code({ dispatch }, dress_code_id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/deleteDressCodeCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      id: dress_code_id
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        dispatch('show_dress_codes', response.data)
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  show_dress_codes({ commit }, dress_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getDressCodesCompany";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let user_id = localStorage.getItem("auth.user_id");

    let data = {
      id: user_id,
      gender: dress_data.gender,
      department_id: dress_data.department_id,
      position_id: dress_data.position_id
    };

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_COMPANY_DRESS_CODE", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};

const getters = {
  get(state) {
    return JSON.parse(JSON.stringify(state.company_dress_code));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
