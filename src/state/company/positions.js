import { API_CONFIG } from "@state_src/config.js";

const state = {
  company_positions: [],
  positions_by_departments: [],
};

const mutations = {
  SET_COMPANY_POSITIONS(state, data) {
    state.company_positions = data;
  },
  SET_POSITIONS_BY_DEPARTMENTS(state, data) {
    state.positions_by_departments = data;
  },
  RESET(state) {
    state.company_positions = [];
  },
};

const actions = {
  get_positions_by_department({ commit }, submitted_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/getPositionByDepartment";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      department_id: submitted_data.department_id,
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_POSITIONS_BY_DEPARTMENTS", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
  add_company_position({ dispatch }, submitted_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/addCompanyPositions";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      department_id: submitted_data.department_id,
      name: submitted_data.name,
      report_to: submitted_data.report_to,
      job_description: submitted_data.job_description,
      head_of_department: submitted_data.head_of_department
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        // dispatch("get_company_departments");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  update_company_position({ dispatch }, update_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/updateCompanyPosition";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let data = {
      id: update_data.id,
      name: update_data.name,
      department_id: update_data.department_id,
      job_description: update_data.job_description,
      head_of_department: update_data.head_of_department
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

  show_company_position({ commit }, id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/showCompanyPosition";
    let current_user_access_token = localStorage.getItem("auth.access_token");

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

  delete_company_position({ dispatch }, id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/destroyDepartmentPosition";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let data = {
      id: id,
    };

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        dispatch("get_positions_by_departments");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
};

const getters = {
  get(state) {
    return JSON.parse(JSON.stringify(state.company_positions));
  },
  get_positions_by_departments(state) {
    return JSON.parse(JSON.stringify(state.positions_by_departments));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
