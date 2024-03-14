// Important imports that always should be present
//import {API_CONFIG} from '@state_src/config.js';
//import router from '@router'

const state = {
    company_employee_data: [],
}

const mutations = {
    SET_COMPANY_EMPLOYEE_DATA(state, data) {
        state.company_employee_data = data
    },
    RESET(state) {
        state.company_employee_data = []
    },
}

const actions = {}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_employee_data))
    },
}

import employees from './employees'
import performances from './performances'
import workDetails from './work-details'
import documents from './documents'
import vacations from './vacations'
import finances from './finances'
import work_schedules from './work-schedules'
import documenttemplates from './documenttemplates'
import access from './access'
import insurances from './insurances'
import todo from './todo'
import assets from './assets'

const modules = {
    employees,
    performances,
    workDetails,
    documents,
    vacations,
    finances,
    work_schedules,
    documenttemplates,
    access,
    insurances,
    todo,
    assets
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    modules,
}
