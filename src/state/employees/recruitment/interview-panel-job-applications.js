import { API_CONFIG } from '@state_src/config.js'

const state = {
    current_job_applications: [],
    current_application_jobseeker_profile: [],
    current_application_jobseeker_info: [],
}

const mutations = {
    SET_JOB_APPLICATIONS(state, data) {
        state.current_job_applications = data
    },
    SET_CURRENT_APPLICATION_JOBSEEKER_PROFILE(state, data) {
        state.current_application_jobseeker_profile = data
    },
    SET_CURRENT_JOB_APPLICATION_INFO(state, data) {
        state.current_application_jobseeker_info = data
    },
    RESET(state) {
        state.current_job_applications = []
        state.current_application_jobseeker_profile = []
        state.current_application_jobseeker_info = []
    },
}

const actions = {
    get_single_job_applications({ commit }, job_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_id: job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_job_applications_with_pagination({ commit }, query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/InterviewPanel/showJobApplications?page=' + query.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_id: query.job_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_job_application({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications'

        let data = {
            job_id: search_query.job_id,
            job_seeker_name: search_query.name,
            job_seeker_surname: search_query.surname,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_job_application_with_page({ commit }, search_query) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications?page=' + search_query.page_number

        let data = {
            job_id: search_query.job_id,
            job_seeker_name: search_query.name,
            job_seeker_surname: search_query.surname,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_candidates({ commit }, filters) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications'

        let data = {
            job_id: filters.job_id,
            filter_profession: filters.filter_profession,
            filter_years_in_profession: filters.filter_years_in_profession,
            filter_degree: filters.filter_degree,
            filter_by_skills: filters.filter_by_skills,
            filter_by_language: filters.filter_by_language,
            filter_by_gender: filters.filter_by_gender,
            filter_field_of_study: filters.field_of_study,
            filter_by_cover_letter: filters.filter_by_cover_letter,
            filter_by_reference: filters.filter_by_reference,
            filter_application_status: filters.filter_application_status,
            filter_rating_applied: filters.filter_rating_applied,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_candidates_with_page({ commit }, filters) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications?page=' + filters.page_number

        let data = {
            job_id: filters.job_id,
            filter_profession: filters.filter_profession,
            filter_years_in_profession: filters.filter_years_in_profession,
            filter_degree: filters.filter_degree,
            filter_by_skills: filters.filter_by_skills,
            filter_by_language: filters.filter_by_language,
            filter_by_gender: filters.filter_by_gender,
            filter_field_of_study: filters.field_of_study,
            filter_by_cover_letter: filters.filter_by_cover_letter,
            filter_by_reference: filters.filter_by_reference,
            filter_application_status: filters.filter_application_status,
            filter_rating_applied: filters.filter_rating_applied,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_JOB_APPLICATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_jobseeker_resume({ commit }, jobseeker_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobSeekerFullProfile'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_seeker_id: jobseeker_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_APPLICATION_JOBSEEKER_PROFILE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_job_application({ commit }, job_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplications'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_id: job_data.job_id,
            job_seeker_id: job_data.jobseeker_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_JOB_APPLICATION_INFO', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    getInterviewStatusData({}, application_id) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplicationInterview'

        let data = {
            job_application_id: application_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    rateCandidate({}, rating_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/editJobApplicationRatings'

        let data = {
            job_application_id: rating_data.job_application_id,
            job_application_id: rating_data.job_application_id,
            education_rating: rating_data.education_rating,
            experience_rating: rating_data.experience_rating,
            foreign_languages_rating: rating_data.foreign_languages_rating,
            general_knowledge_rating: rating_data.general_knowledge_rating,
            it_skills_rating: rating_data.it_skills_rating,
            judgment_capability_rating: rating_data.judgment_capability_rating,
            knowledge_about_position_rating: rating_data.knowledge_about_position_rating,
            logical_questions_rating: rating_data.logical_questions_rating,
            other_skills_rating: rating_data.other_skills_rating,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    showCandidateRating({}, rating_data) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/interviewPanel/showJobApplicationRatings'

        let data = {
            job_application_id: rating_data.job_application_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.current_job_applications))
    },
    get_current_jobseeker_profile(state) {
        return JSON.parse(JSON.stringify(state.current_application_jobseeker_profile))
    },
    get_current_jobseeker_application(state) {
        return JSON.parse(JSON.stringify(state.current_application_jobseeker_info))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
