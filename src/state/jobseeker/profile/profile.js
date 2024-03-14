// Important imports that always should be present
import { API_CONFIG } from "@state_src/config.js";
//import router from '@router'

const state = {
  jobseeker_profile: [],
};

const mutations = {
  SET_PROFILE(state, data) {
    state.jobseeker_profile = data;
  },
  RESET(state) {
    state.jobseeker_profile = [];
  },
};
/*
var api_endpoint = 'http://yourapi/api/';

export const API_CONFIG = {
  SITE_AXIOS : site_axios,
  API_ENDPOINT: api_endpoint
}
*/
const actions = {
  // Jobseeker Get languages
  get_jobseeker_profile({ commit }) {
    let current_jobseeker_id = localStorage.getItem("auth.user_id");
    let current_api = API_CONFIG.API_ENDPOINT + "api/jobSeekerShowInformation";
    let current_user_access_token = localStorage.getItem("auth.access_token");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    let data = {
      job_seeker_id: current_jobseeker_id,
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        commit("SET_PROFILE", response.data);
        localStorage.setItem("jobseeker_profile", response.data);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  // Jobseeker UPDATE profile
  update_jobseeker_profile({ dispatch }, submitted_profile_data) {
    // Get job seeker ID
    let current_jobseeker_id = localStorage.getItem("auth.user_id");

    // Get jobseeker Auth token
    let current_jobseeker_token = localStorage.getItem("auth.access_token");

    let update_data = {
      job_seeker_id: current_jobseeker_id,
      name: submitted_profile_data.name,
      surname: submitted_profile_data.surname,
      national_id: submitted_profile_data.national_id,
      gender: submitted_profile_data.gender,
      date_of_birth: submitted_profile_data.date_of_birth,
      title: submitted_profile_data.title,
      city_name: submitted_profile_data.city_name,
      city_value: submitted_profile_data.city_value,
      country_name: submitted_profile_data.country_name,
      country_value: submitted_profile_data.country_value,
      phone_number: submitted_profile_data.phone_number,
      image_url: submitted_profile_data.image_url,
      biography: submitted_profile_data.biography,
      linkedin_url: submitted_profile_data.linkedin_url,
      skype_url: submitted_profile_data.skype_url,
      github_url: submitted_profile_data.github_url,
      dribble_url: submitted_profile_data.dribble_url,
      facebook_url: submitted_profile_data.facebook_url,
      instagram_url: submitted_profile_data.instagram_url,
      twitter_url: submitted_profile_data.twitter_url,
      youtube_url: submitted_profile_data.youtube_url,
    };

    // http://yourapi.com/api/experience/21
    let current_api =
      API_CONFIG.API_ENDPOINT + "api/jobSeekerUpdateInformation";
    return API_CONFIG.SITE_AXIOS.post(current_api, update_data, {
      headers: { Authorization: "Bearer " + current_jobseeker_token },
    })
      .then((response) => {
        dispatch("get_jobseeker_profile");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  // Jobseeker UPDATE profile
  upload_jobseeker_profile_image({ dispatch }, submitted_image) {
    // Get job seeker ID
    let current_jobseeker_id = localStorage.getItem("auth.user_id");

    // Get jobseeker Auth token
    let current_jobseeker_token = localStorage.getItem("auth.access_token");

    // http://yourapi.com/api/experience/21
    let current_api = API_CONFIG.API_ENDPOINT + "api/uploadProfileImage";
    return API_CONFIG.SITE_AXIOS.post(current_api, submitted_image, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + current_jobseeker_token,
      },
    })
      .then((response) => {
        dispatch("get_jobseeker_profile");
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },

  download_jobseeker_cv({}, jobseeker_data) {
    let current_api = API_CONFIG.API_ENDPOINT + "api/generateCV";
    let current_user_access_token = localStorage.getItem("auth.access_token");
    let current_jobseeker_id = localStorage.getItem("auth.user_id");

    let config = {
      headers: { Authorization: "Bearer " + current_user_access_token },
    };
    // In the future we need to check for jobseeker_data.template_nr in order
    // to download the required email template
    let data = {
      job_seeker_id: current_jobseeker_id,
    };

    return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
      .then((response) => {
        let cv_url = "";
        if (response.status == 200) {
          cv_url =
            jobseeker_data.SERVER_URL +
            jobseeker_data.CV_GENERATED_FOLDER +
            response.data;
          window.open(cv_url, "_newtab");
        }
      })
      .catch((error) => {
        return error.response;
      });
  },
};

const getters = {
  // End of getPageAlerts getter
  get(state) {
    return JSON.parse(JSON.stringify(state.jobseeker_profile));
  },
};

import experience from "./experience";
import education from "./education";
import trainings from "./trainings";
import languages from "./language";
import computer_skills from "./computer-skills";
import other_skills from "./other-skills";
import driving_skills from "./driving-skills";

const modules = {
  experience,
  education,
  trainings,
  languages,
  computer_skills,
  other_skills,
  driving_skills,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules,
};
