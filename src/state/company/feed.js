import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_feed_data: [],
    company_feed_permissions_data: [],
    comments: [],
}

const mutations = {
    SET_COMPANY_FEED_DATA(state, data) {
        state.company_feed_data = data
    },
    SET_COMPANY_FEED_PERMISSIONS_DATA(state, data) {
        state.company_feed_permissions_data = data
    },
    SET_COMMENTS(state, data) {
        state.comments = data
    },
    RESET(state) {
        state.company_feed_data = []
    },
    resetComments(state) {
        state.comments = []
    },
}

const actions = {
    reset_comments({ commit }) {
        commit('resetComments')
    },

    delete_comment({ dispatch }, submit_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteSocialPostComment'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let auth_usertype = localStorage.getItem('auth_usertype')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            comment_id: submit_data.comment_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                if (auth_usertype === 'employee') {
                    let employee_data = {
                        employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                        employee_user_id: localStorage.getItem('auth.user_id'),
                        employee_id: localStorage.getItem('employee_id'),
                        employee_company_id: localStorage.getItem('employee_company_id'),
                    }
                    dispatch('get_all_company_feeds', employee_data)
                } else {
                    dispatch('get_all_company_feeds', Helpers.getCurrentCompanyIdForAdmin())
                }
                dispatch('get_all_comments', submit_data.social_post_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_comments({ commit }, social_post_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetSocialPostComment'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            social_post_id: social_post_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMMENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_comment({ dispatch }, submit_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddSocialPostComment'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let auth_usertype = localStorage.getItem('auth_usertype')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            social_post_id: submit_data.social_post_id,
            comment: submit_data.comment,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                if (auth_usertype === 'employee') {
                    let employee_data = {
                        employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                        employee_user_id: localStorage.getItem('auth.user_id'),
                        employee_id: localStorage.getItem('employee_id'),
                        employee_company_id: localStorage.getItem('employee_company_id'),
                    }
                    dispatch('get_all_company_feeds', employee_data)
                } else {
                    dispatch('get_all_company_feeds', Helpers.getCurrentCompanyIdForAdmin())
                }
                dispatch('get_all_comments', submit_data.social_post_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    like_or_unlike({ dispatch }, social_post_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyLikeSocialPost'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let auth_usertype = localStorage.getItem('auth_usertype')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            social_post_id: social_post_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                if (auth_usertype === 'employee') {
                    let employee_data = {
                        employee_jobseeker_id: localStorage.getItem('employee_job_seeker_id'),
                        employee_user_id: localStorage.getItem('auth.user_id'),
                        employee_id: localStorage.getItem('employee_id'),
                        employee_company_id: localStorage.getItem('employee_company_id'),
                    }
                    dispatch('get_all_company_feeds', employee_data)
                } else {
                    dispatch('get_all_company_feeds', Helpers.getCurrentCompanyIdForAdmin())
                }

                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_company_feeds({ commit }, data_received) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowSocialPosts'
        let user_id = ''
        let employee_company_id = ''
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {}

        if (typeof data_received === 'object') {
            employee_company_id = data_received.employee_company_id
            data = {
                company_id: employee_company_id,
            }
        } else {
            user_id = data_received
            data = {
                company_id: user_id,
            }
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_FEED_DATA', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_company_feeds_with_page({ commit }, data_received) {
        let current_api = ''
        let page_number = ''
        let employee_company_id = ''
        let employee_id = ''
        let employee_jobseeker_id = ''
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {}

        if (typeof data_received === 'object') {
            page_number = data_received.page_number_to
            employee_id = data_received.employee_id
            employee_company_id = data_received.employee_company_id
            employee_jobseeker_id = data_received.employee_jobseeker_id
            current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowSocialPosts?page=' + page_number
            data = {
                company_id: employee_company_id,
            }
        } else {
            page_number = data_received
            current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowSocialPosts?page=' + page_number
            data = {
                company_id: Helpers.getCurrentCompanyIdForAdmin(),
            }
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_FEED_DATA', response.data)
            })
            .catch((error) => {
                return error.response
            })
    },

    add_new_post_feed({ dispatch }, data_received) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddSocialPost'
        let post_data = ''
        let employee_company_id = ''
        let employee_id = ''
        let employee_jobseeker_id = ''
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {}
        let is_employee = false

        if (typeof data_received === 'object') {
            is_employee = true
            post_data = data_received.post_data
            employee_id = data_received.employee_id
            employee_jobseeker_id = data_received.employee_jobseeker_id

            data = {
                employee_id: employee_id,
                post: post_data,
                share_with_department_ids: data_received.share_with_department_ids,
            }
        } else {
            post_data = data_received.post_data
            data = {
                employee_id: '',
                post: post_data,
                share_with_department_ids: data_received.share_with_department_ids,
            }
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                if (is_employee) {
                    dispatch('get_all_company_feeds', employee_company_id)
                } else {
                    dispatch('get_all_company_feeds', company_id)
                }
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_post_feed({ dispatch }, data_received) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteSocialPost'
        let post_id = ''
        let company_id = ''
        let employee_company_id = ''
        let employee_id = ''
        let employee_jobseeker_id = ''
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {}
        let is_employee = false

        if (typeof data_received === 'object') {
            is_employee = true
            post_id = data_received.post_to_delete
            employee_id = data_received.employee_id
            employee_company_id = data_received.employee_company_id
            employee_jobseeker_id = data_received.employee_jobseeker_id

            data = {
                social_post_id: post_id,
                job_seeker_id: employee_jobseeker_id,
            }
        } else {
            company_id = Helpers.getCurrentCompanyIdForAdmin()
            post_id = data_received
            data = {
                social_post_id: post_id,
                job_seeker_id: company_id,
            }
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                if (is_employee) {
                    dispatch('get_all_company_feeds', employee_company_id)
                } else {
                    dispatch('get_all_company_feeds', company_id)
                }
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_feed_permissions({ commit }) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetSocialPostsPermissions'
        const current_user_access_token = localStorage.getItem('auth.access_token')

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                commit('SET_COMPANY_FEED_PERMISSIONS_DATA', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_company_feed_permissions({ dispatch }, employeeIds) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateSocialPostsPermissions'
        const current_user_access_token = localStorage.getItem('auth.access_token')

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, { employee_ids: employeeIds }, config)
            .then((response) => {
                dispatch('get_company_feed_permissions')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_feed_data))
    },

    get_comments(state) {
        return JSON.parse(JSON.stringify(state.comments))
    },

    get_permissions(state) {
        return JSON.parse(JSON.stringify(state.company_feed_permissions_data))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
