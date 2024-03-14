import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_data: [],
}

const mutations = {
    SET_COMPANY_DATA(state, data) {
        state.company_data = data
    },
    RESET(state) {
        state.company_data = []
    },
}

const actions = {
    has_access_to({}, package_slug) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/hasAccessTo'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let user_type = localStorage.getItem('auth_usertype')

        let data = {}
        if (user_type == 'company') {
            data = {
                company_id: Helpers.getCurrentCompanyIdForAdmin(),
                package_slug: package_slug,
            }
        } else {
            data = {
                company_id: localStorage.getItem('employee_company_id'),
                package_slug: package_slug,
            }
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
    },
    get_company_profile_data({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowInformation'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DATA', response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    },

    generate_access_control_token({ commit, dispatch }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/generateAccessControlToken'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {})
            .catch((error) => {
                console.error(error)
            })
    },

    update_company_profile_data({ dispatch }, update_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateInformation'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: update_data.name,
            company_ceo: update_data.company_ceo,
            head_of_hr: update_data.head_of_hr,
            fiscal_number: update_data.fiscal_number,
            country_name: update_data.country_name,
            country_value: update_data.country_value,
            city_name: update_data.city_name,
            city_value: update_data.city_value,
            responsible_name_surname: update_data.responsible_name_surname,
            phone_number: update_data.phone_number,
            address: update_data.address,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config).then((response) => {
            dispatch('get_company_profile_data')
        })
    },

    upload_company_document({ dispatch }, submitted_image) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/uploadCompanyDocument'
        return API_CONFIG.SITE_AXIOS.post(current_api, submitted_image, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + current_user_access_token,
            },
        })
            .then((response) => {
                dispatch('get_company_profile_data')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    download_report({}, { reportType, jobId }) {
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let current_api = API_CONFIG.API_ENDPOINT + 'api/downloadCompanyReport'
        return API_CONFIG.SITE_AXIOS.post(
            current_api,
            { report_type: reportType, job_id: jobId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + current_user_access_token,
                },
            }
        )
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
        return JSON.parse(JSON.stringify(state.company_data))
    },
}

import recruitment from './recruitment'
import feed from './feed.js'
import employee from './employees'
import payments from './payments'
import packages from './packages'
import notifications from './notifications'
import departments from './departments'
import positions from './positions'
import regulations from './regulations'
import event from './event.js'
import dresscode from './dresscode.js'
import workschedules from './workschedules.js'
import permissions from './permissions.js'
import general_settings from './general_settings.js'
import integrations from './integrations.js'
import api from './api.js'
import company_performance_templates from './company_performance_templates'
import assets from './assets.js'
import attendance_settings from './attendance_settings'
import asset_categories from './asset_categories'

const modules = {
    recruitment,
    feed,
    employee,
    payments,
    packages,
    notifications,
    departments,
    positions,
    regulations,
    event,
    dresscode,
    workschedules,
    permissions,
    general_settings,
    integrations,
    api,
    company_performance_templates,
    assets,
    attendance_settings,
    asset_categories
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    modules,
}
