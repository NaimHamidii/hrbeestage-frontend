const state = {
    company_recruitment_data: [],
}

const mutations = {
    SET_COMPANY_RECRUITMENT_DATA(state, data) {
        state.company_recruitment_data = data
    },
    RESET(state) {
        state.company_recruitment_data = []
    },
}

const actions = {}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_recruitment_data))
    },
}

import jobs from './jobs'
import job_applications from './job_applications'
import interviews from './interviews'
import blacklist from './blacklist'
import rating from './ratings'
import template_jobs from './template_jobs'
import invitejobseeker from './invitejobseeker'

const modules = {
    jobs,
    job_applications,
    interviews,
    blacklist,
    rating,
    template_jobs,
    invitejobseeker,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    modules,
}
