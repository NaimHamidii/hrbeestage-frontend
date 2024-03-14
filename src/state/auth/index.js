import { API_CONFIG } from '@state_src/config.js'
import router from '@router'
import Helpers from '@components/helpers'

const state = {
    isLoggedIn: false,
    role: '',
    company_invoice_cycle_period: '',
    userData: [],
    global_active_packages: [],
}

const mutations = {
    SET_USER(state) {
        state.isLoggedIn = true
    },
    SET_USER_ROLE(state, data) {
        state.role = data
    },
    SET_GLOBAL_ACTIVE_PACKAGES(state, data) {
        state.global_active_packages = data
    },
    SET_USER_DATA(state, data) {
        state.userData = data
    },
    SET_INVOICE_PERIOD(state, data) {
        state.company_invoice_cycle_period = data
    },
    RESET(state) {
        state.isLoggedIn = false
        state.role = ''
        state.userData = []
        state.company_invoice_cycle_period = ''
    },
}

const actions = {
    loginUser({ commit, dispatch }, login_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'oauth/token'

        const localClientId = '2'
        const productionClientId = '2'
        const localClientSecret = 'bsJ1J3YPdumqOrT3ABXTvitpEeRuq8E0PzqSYEdZ'
        const productionClientSecret = 'JjJVXlRsMcSyFR6qpCdTYZ48cgijl6pWN0bbfky5'

        let login_details = {
            grant_type: 'password',
            client_id: window.location.href.indexOf('localhost') > -1 ? localClientId : productionClientId,
            client_secret: window.location.href.indexOf('localhost') > -1 ? localClientSecret : productionClientSecret,
            username: login_data.username,
            password: login_data.password,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, login_details)
            .then((response) => {
                let reponse_data = {
                    access_token: response.data.access_token,
                    expires_in: response.data.expires_in,
                    refresh_token: response.data.refresh_token,
                    user_id: response.data.user_id,
                    user_role: response.data.user_info.user_type,
                }

                if (reponse_data.user_role == 'employee' && !response.data.user_info.isAdminEmployeeOfCompany) {
                    reponse_data = {
                        access_token: response.data.access_token,
                        expires_in: response.data.expires_in,
                        refresh_token: response.data.refresh_token,
                        user_id: response.data.user_id,
                        user_role: response.data.user_info.user_type,
                        employee_id: response.data.employee_info.employee_id,
                        employee_company_id: response.data.employee_info.company_id,
                        employee_job_seeker_id: response.data.employee_info.job_seeker_id,
                    }
                }

                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('auth.access_token', reponse_data.access_token)
                localStorage.setItem('auth.user_id', reponse_data.user_id)

                if (reponse_data.user_role == 'employee' && !response.data.user_info.isAdminEmployeeOfCompany) {
                    localStorage.setItem('employee_id', reponse_data.employee_id)
                    localStorage.setItem('employee_company_id', reponse_data.employee_company_id)
                    localStorage.setItem('employee_job_seeker_id', reponse_data.employee_job_seeker_id)
                }

                localStorage.setItem('user_auth', JSON.stringify(response.data))

                if (reponse_data.user_role == 'company') {
                    commit('SET_GLOBAL_ACTIVE_PACKAGES', response.data.package_info)
                }
                commit('SET_USER', response.data)
                commit('SET_USER_ROLE', reponse_data.user_role)
                dispatch('get_loggedin_user_data')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_loggedin_user_data({ commit }, noRedirect = false) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/user'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let login_details = {
            id: localStorage.getItem('auth.user_id'),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, login_details, config)
            .then((response) => {
                response.data.user_type = response.data.is_admin_employee_of_company ? 'company' : response.data.user_type
                localStorage.setItem('verifiedUser', response.data.email_verified_at)
                localStorage.setItem('auth_isAdminEmployeeOfCompany', response.data.is_admin_employee_of_company)
                localStorage.setItem('auth_canMakeSocialPosts', response.data.can_make_social_posts)
                localStorage.setItem('auth_isEmployeeInProbation', response.data.is_employee_in_probation)
                localStorage.setItem('auth_usertype', response.data.user_type)
                localStorage.setItem('user_profile', JSON.stringify(response.data))
                commit('SET_USER_DATA', response.data)

                if (noRedirect) return

                // We need to check the referal page when clicking on login
                // If the user trying to login is a jobseeker
                if (localStorage.getItem('auth_usertype') == 'job_seeker') {
                    // Check for referal existence
                    let referal_exists = localStorage.getItem('redirectRef')
                    if (referal_exists) {
                        // If referal comes from single public job
                        // Make sure to get JOB ID and redirect to job view public page
                        if (referal_exists == 'JobPublicView') {
                            let job_id = localStorage.getItem('redirectRefJobID')
                            router.push({ path: '/jobs/' + job_id })
                        } else {
                            // If it's not a single job page redirect to default referal
                            router.push({ name: localStorage.getItem('redirectRef') })
                        }
                    } else {
                        // If it's not a referal, then redirect to Jobseeker Profile
                        router.push({ name: 'JobseekerPageProfile' })
                    }
                    router.push({ name: 'JobseekerPageProfile' })
                } else if (localStorage.getItem('auth_usertype') == 'company' || localStorage.getItem('auth_isAdminEmployee') == 1) {
                    router.push({ name: 'CompanyJobsArchive' })
                } else if (localStorage.getItem('auth_usertype') == 'super_admin') {
                    router.push({ name: 'SuperAdminDashboard' })
                } else if (localStorage.getItem('auth_usertype') == 'employee') {
                    router.push({ name: 'EmployeeProfile' })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    },

    settings_get_user_data({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/user'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let login_details = {
            id: localStorage.getItem('auth.user_id'),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, login_details, config)
            .then((response) => {
                let user_data = JSON.parse(localStorage.getItem('vuex'))
                return user_data
            })
            .catch((error) => {
                console.error(error)
            })
    },

    set_invoice_payment_period_config({}) {},
    get_invoice_payment_period_config({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyInvoiceType'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_INVOICE_PERIOD', response.data)
                return response
            })
            .catch((error) => {
                alert('error')
            })
    },

    async changeUserPassword({}, user_password_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/changePassword'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let login_details = {
            email: user_password_data.email,
            old_password: user_password_data.old_password,
            password: user_password_data.password,
            password_confirmation: user_password_data.password_confirmation,
        }

        try {
            await API_CONFIG.SITE_AXIOS.post(current_api, login_details, config)
            return 'success'
        } catch (ex) {
            return 'invalid_password'
        }
    },
    logOutUser({ commit }) {
        localStorage.clear()
        router.push({ path: '/' })
        commit('RESET')
    },

    verify_email({}, token_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/verify'

        token_data = {
            token: token_data.token,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, token_data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    accept_jobseeker_invitation({}, submit_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/acceptJobSeekerInvitation'

        let data = {
            url_token: submit_data.token,
            password: submit_data.password,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    create_account({}, register_data) {
        let account_type = register_data.user_type
        let current_api = ''
        let register_details = ''

        if (account_type == 'job_seeker') {
            current_api = API_CONFIG.API_ENDPOINT + 'api/registerJobSeeker'

            register_details = {
                name: register_data.name,
                surname: register_data.surname,
                country_name: register_data.country_name,
                country_value: register_data.country_value,
                city_name: register_data.city_name,
                city_value: register_data.city_value,
                email: register_data.email,
                password: register_data.password,
                password_confirmation: register_data.password_confirmation,
                user_type: register_data.user_type,
                contact_number: register_data.contact_number,
            }
        } else {
            current_api = API_CONFIG.API_ENDPOINT + 'api/registerCompany'

            register_details = {
                name: register_data.name,
                category: register_data.category,
                email: register_data.email,
                fiscal_number: register_data.fiscal_number,
                numberofEmployee: register_data.numberofEmployee,
                country_name: register_data.country_name,
                country_value: register_data.country_value,
                city_name: register_data.city_name,
                city_value: register_data.city_value,

                password: register_data.password,
                password_confirmation: register_data.password_confirmation,
                user_type: register_data.user_type,

                packet: register_data.packet,
                contact_number: register_data.contact_number,
                contact_person: register_data.contact_person,
                how_do_you_hear_for_us: register_data.how_do_you_hear_for_us,
            }
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, register_details)
            .then((response) => {
                if (localStorage.getItem('auth_usertype') == 'job_seeker') {
                    // Check for referal existence
                    let referal_exists = localStorage.getItem('redirectRef')
                    if (referal_exists) {
                        // If referal comes from single public job
                        // Make sure to get JOB ID and redirect to job view public page
                        if (referal_exists == 'JobPublicView') {
                            let job_id = localStorage.getItem('redirectRefJobID')
                            router.push({ path: '/jobs/' + job_id })
                        } else {
                            // If it's not a single job page redirect to default referal
                            router.push({ name: localStorage.getItem('redirectRef') })
                        }
                    }
                }

                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    reset_password_send_email({ commit }, reset_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/resetPassword'

        let data = {
            email: reset_data.email,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    reset_password({ commit }, reset_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/changePasswordWithCode'

        let data = {
            email: reset_data.email,
            reset_password_code: reset_data.reset_password_code,
            password: reset_data.password,
            password_confirmation: reset_data.password_confirmation,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    loggedIn(state) {
        return state.isLoggedIn
    },
    get_role(state) {
        return state.role
    },
    get_current_user_info(state) {
        return JSON.parse(JSON.stringify(state.userData))
    },
    get_invoice_period(state) {
        return JSON.parse(JSON.stringify(state.company_invoice_cycle_period))
    },
    get_global_active_packages(state) {
        return JSON.parse(JSON.stringify(state.global_active_packages))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
