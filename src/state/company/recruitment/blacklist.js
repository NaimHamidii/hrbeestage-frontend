import { API_CONFIG } from '@state_src/config.js'

const state = {
    blacklist: [],
    jobs_with_blacklist: [],
}

const mutations = {
    SET_BLACKLIST(state, blacklist) {
        state.blacklist = blacklist
    },
    SET_JOBS_WITH_BLACKLIST(state, jobsWithBlacklist) {
        state.jobs_with_blacklist = jobsWithBlacklist
    },
    RESET(state) {
        state.blacklist = []
        state.jobs_with_blacklist = []
    },
}
const actions = {
    get_company_blacklist({ commit }) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                commit('SET_BLACKLIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_removed_users_if_update_company_blacklist_definition({ dispatch }, updateData) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/getRemovedUsersIfUpdateCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_seeker_blacklist_definition_id: updateData.job_seeker_blacklist_definition_id,
            job_seeker_full_name: updateData.job_seeker_full_name,
            job_seeker_email: updateData.job_seeker_email,
            job_seeker_phone_number: updateData.job_seeker_phone_number,
            reason: updateData.reason,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_blacklist')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    create_company_blacklist_definition({ dispatch }, updateData) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/createCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_seeker_blacklist_definition_id: updateData.job_seeker_blacklist_definition_id,
            job_seeker_full_name: updateData.job_seeker_full_name,
            job_seeker_email: updateData.job_seeker_email,
            job_seeker_phone_number: updateData.job_seeker_phone_number,
            reason: updateData.reason,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_blacklist')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_company_blacklist_definition({ dispatch }, updateData) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/updateCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_seeker_blacklist_definition_id: updateData.job_seeker_blacklist_definition_id,
            job_seeker_full_name: updateData.job_seeker_full_name,
            job_seeker_email: updateData.job_seeker_email,
            job_seeker_phone_number: updateData.job_seeker_phone_number,
            reason: updateData.reason,
            create_new_blacklist_for_removed_users: updateData.create_new_blacklist_for_removed_users,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_blacklist')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_company_blacklist_definition({ dispatch }, blacklistDefinitionId) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/deleteCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_seeker_blacklist_definition_id: blacklistDefinitionId,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_blacklist')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    add_to_company_blacklist({}, job_seeker_id) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/addToCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const data = {
            job_seeker_id,
        }
        const config = {
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
    remove_user_from_blacklist({ dispatch }, { job_seeker_blacklist_definition_id, job_seeker_id }) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/removeUserFromCompanyJobSeekerBlacklist'
        const current_user_access_token = localStorage.getItem('auth.access_token')
        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        const data = {
            job_seeker_blacklist_definition_id,
            job_seeker_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_blacklist')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_blacklist(state) {
        return JSON.parse(JSON.stringify(state.blacklist))
    },
    get_jobs_with_blacklist(state) {
        return JSON.parse(JSON.stringify(state.jobs_with_blacklist))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
