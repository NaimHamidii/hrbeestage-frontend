import { API_CONFIG } from "@state_src/config.js";

const state = {
  company_events: [],
};

const mutations = {
  SET_COMPANY_EVENTS(state, data) {
    state.company_events = data;
  },
  RESET(state) {
    state.company_events = [];
  },
};

const actions = {
  get_company_events({ commit }) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/companyShowEvents";
    let user_id = localStorage.getItem("auth.user_id");
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let data = {
      company_id: user_id,
    };
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_COMPANY_EVENTS", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  get_company_events_with_page({ commit }, page_number) {
    let current_api =
      API_CONFIG.API_ENDPOINT + "api/companyShowEvents?page=" + page_number;
    let user_id = localStorage.getItem("auth.user_id");
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let data = {
      company_id: user_id,
    };
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_COMPANY_EVENTS", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  add_new_event({ dispatch }, data_received) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/companyAddEvent";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      date: data_received.date,
      location: data_received.location,
      invited: data_received.invited,
      note: data_received.note,
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        // dispatch("get_company_feeds");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  show_company_event({ commit }, id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/companyShowSingleEvent";
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

  update_company_event({ dispatch }, update_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/companyUpdateEvent";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let data = {
      id: update_data.id,
      date: update_data.date,
      location: update_data.location,
      invited: update_data.invited,
      note: update_data.note,
    };
    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        dispatch("get_company_events");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  delete_company_event({ commit }, id) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/companyDeleteEvent";
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
};

const getters = {
  get(state) {
    return JSON.parse(JSON.stringify(state.company_events));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
