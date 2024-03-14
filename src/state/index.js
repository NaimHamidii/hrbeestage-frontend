import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/'

import createPersistedState from 'vuex-persistedstate'

import notifications from './notifications'
import jobseeker_profile from './jobseeker/profile/profile'
import jobseeker_job_applications from './jobseeker/job_applications'
import jobseeker_job_ratings from './jobseeker/ratings'
import company_data from './company/'
import public_data from './public/'
import superadmin from './superadmin/'
import employee_data from './employees/'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const persistedPaths = ['auth']

export const store = new Vuex.Store({
    plugins: [
        createPersistedState(
            {
                paths: persistedPaths,
            },
            {
                storage: {
                    getItem: (key) => $cookies.get(key),
                    setItem: (key, value) => $cookies.set(key, value, { expires: 3, secure: true }),
                    removeItem: (key) => $cookies.remove(key),
                },
            }
        ),
    ],
    actions: {
        reset_vuex({ commit, dispatch }) {
            /* Reset user main data */
            dispatch('auth/logOutUser')
            commit('auth/RESET')

            /* Reset jobseeker vuex store */
            commit('jobseeker_profile/RESET')
            commit('jobseeker_profile/experience/RESET')
            commit('jobseeker_profile/trainings/RESET')
            commit('jobseeker_profile/languages/RESET')
            commit('jobseeker_profile/computer_skills/RESET')
            commit('jobseeker_profile/other_skills/RESET')
            commit('jobseeker_profile/education/RESET')
            commit('jobseeker_profile/driving_skills/RESET')

            /* Reset company vuex store */
            commit('company_data/RESET')
            commit('company_data/recruitment/RESET')
            commit('company_data/recruitment/jobs/RESET')
            commit('company_data/recruitment/blacklist/RESET')
            commit('company_data/recruitment/interviews/RESET')
            commit('company_data/recruitment/rating/RESET')

            commit('company_data/employee/RESET')
            commit('company_data/employee/documents/RESET')
            commit('company_data/employee/employees/RESET')
            commit('company_data/employee/finances/RESET')
            commit('company_data/employee/vacations/RESET')
            commit('company_data/employee/performances/RESET')
            commit('company_data/employee/workDetails/RESET')
            commit('company_data/employee/work_schedules/RESET')

            commit('company_data/RESET')
            commit('company_data/feed/RESET')
            commit('company_data/notifications/RESET')
            commit('company_data/packages/RESET')
            commit('company_data/payments/RESET')

            /* Reset superadmin vuex store */
            commit('superadmin/companies/RESET')
            commit('superadmin/hr_modules/RESET')
            commit('superadmin/packages/RESET')
            commit('superadmin/payments/RESET')
        },
    },
    modules: {
        auth,
        notifications,
        jobseeker_profile,
        jobseeker_job_applications,
        jobseeker_job_ratings,
        company_data,
        public_data,
        superadmin,
        employee_data,
    },
    strict: debug,
})
