import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

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
    get_company_single_job_applications({ commit }, job_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_id: job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
    get_company_single_job_applications_with_pagination({ commit }, query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications?page=' + query.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_id: query.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications'

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications?page=' + search_query.page_number
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications'
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications?page=' + filters.page_number
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobSeekerFullProfile'
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplications'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            job_id: job_data.job_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

    add_note_for_candidate({ commit }, application_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addNoteForCandidate'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            job_application_id: application_data.job_application_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            note_about_candidate: application_data.note_about_candidate,
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

    change_application_status({ commit }, application_data) {
        let current_api = ''
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = []
        if (application_data.application_status == 'rejected_candidate' || application_data.application_status == 'blacklisted') {
            current_api = API_CONFIG.API_ENDPOINT + 'api/changeApplicationStatus'
            data = {
                job_application_id: application_data.job_application_id,
                company_id: Helpers.getCurrentCompanyIdForAdmin(),
                application_status: application_data.application_status,
                reason: application_data.reason,
                reject_notify_candidate: application_data.reject_notify_candidate,
            }
        } else if (application_data.application_status == 'invited_to_interview' || application_data.application_status == 'accepted_interview' || application_data.application_status == 'rejected_interview') {
            current_api = API_CONFIG.API_ENDPOINT + 'api/editJobApplicationInterview'
            data = {
                job_application_id: application_data.job_application_id,
                company_id: Helpers.getCurrentCompanyIdForAdmin(),
                application_status: application_data.application_status,
                interview_category_name: application_data.interview_category_name,
                interview_category: application_data.interview_category,
                interview_time: application_data.interview_time,
                interview_date: application_data.interview_date,
                interview_description: application_data.interview_description,
                interview_comments: application_data.interview_comments,
            }
        } else if (application_data.application_status == 'potential_candidate' || application_data.application_status == 'hired_candidate') {
            current_api = API_CONFIG.API_ENDPOINT + 'api/changeApplicationStatus'
            data = {
                job_application_id: application_data.job_application_id,
                company_id: Helpers.getCurrentCompanyIdForAdmin(),
                application_status: application_data.application_status,
            }
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationInterview'
        let data = {
            job_application_id: application_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/editJobApplicationRatings'
        let data = {
            job_application_id: rating_data.job_application_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            job_application_id: rating_data.job_application_id,
            education_rate: rating_data.education_rate,
            experience_rate: rating_data.experience_rate,
            foreign_languages_rate: rating_data.foreign_languages_rate,
            general_knowledge_rate: rating_data.general_knowledge_rate,
            it_skills_rate: rating_data.it_skills_rate,
            judgment_capability_rate: rating_data.judgment_capability_rate,
            knowledge_about_position_rate: rating_data.knowledge_about_position_rate,
            logical_questions_rate: rating_data.logical_questions_rate,
            other_skills_rate: rating_data.other_skills_rate,
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
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobApplicationRatings'
        let data = {
            job_application_id: rating_data.job_application_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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
