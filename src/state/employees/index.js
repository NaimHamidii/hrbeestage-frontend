import { API_CONFIG } from '@state_src/config.js'

const state = {}
const mutations = {}
const actions = {
    has_access_to({}, package_slug) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/employeeHasAccessTo'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        const data = {
            package_slug: package_slug,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
    },
}
const getters = {}

import interviewPanelJobs from './recruitment/interview-panel-jobs'
import interviewPanelJobApplications from './recruitment/interview-panel-job-applications'
import finances from './finances'
import vacations from './vacations'
import profile from './profile'
import schedules from './schedules'
import performances from './performance'
import companysettings from './companysettings'
import todo from './todo'

const modules = {
    interviewPanelJobs,
    interviewPanelJobApplications,
    finances,
    vacations,
    profile,
    schedules,
    performances,
    companysettings,
    todo
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    modules,
}
