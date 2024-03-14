// Important imports that always should be present
import {API_CONFIG} from '@state_src/config.js';
//import router from '@router'

const state = {}

const mutations = {}

const actions = {}

const getters = {};


import companies from './companies'
import packages from './packages'
import payments from './payments'
import hr_modules from './modules'
import messages from './messages'
import jobseekers from './jobseekers'
import jobs from './jobs'
import trainings from './trainings';
import supports from './supports';

const modules = {
    companies,
    packages,
    payments,
    hr_modules,
    messages,
    jobseekers,
    jobs,
    trainings,
    supports
};


export default {
    namespaced : true, 
    state, mutations, actions, getters, modules
}

