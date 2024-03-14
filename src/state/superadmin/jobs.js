import { API_CONFIG } from "@state_src/config.js";

const state = {
    all_jobs: [],
    single_job: [],
};

const mutations = {
    SET_ALL_JOBS(state, data) {
      state.all_jobs = data;
    },
    SET_SINGLE_JOB(state, data) {
      state.single_job = data;
    },
    RESET(state) {
      state.all_jobs = [];
      state.single_job = [];
    },
};

const actions = {
    get_notapproved_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/getJobsNotApproved";
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_ALL_JOBS", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    get_notapproved_jobs_with_pagination({ commit }, page_number) {
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let current_api =
          API_CONFIG.API_ENDPOINT + "api/getJobsNotApproved?page=" + page_number;
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_ALL_JOBS", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    get_approved_jobs({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/getJobsApproved";
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_ALL_JOBS", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    get_approved_jobs_with_pagination({ commit }, page_number) {
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let current_api =
          API_CONFIG.API_ENDPOINT + "api/getJobsApproved?page=" + page_number;
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_ALL_JOBS", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    get_single_job({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/getSingleJob/"+id;
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_SINGLE_JOB", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    approve_job({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/approveJob/"+id;
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
          .then((response) => {
            commit("SET_SINGLE_JOB", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },

    delete_job({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + "api/deleteJob/"+id;
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.delete(current_api, config)
          .then((response) => {
            commit("SET_SINGLE_JOB", response.data);
            return response;
          })
          .catch((error) => {
            return error.response;
          });
    },
}

const getters = {
    // End of getPageAlerts getter
    get(state) {
      return JSON.parse(JSON.stringify(state.all_jobs));
    },
    get_single_job(state){
        return JSON.parse(JSON.stringify(state.single_job));
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};