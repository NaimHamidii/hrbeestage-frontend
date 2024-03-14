import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_events: [],
    company_dress_code: [],
    company_departments_class_a: [],
    company_departments_class_b: [],
    company_departments_class_c: [],
    company_departments_class_d: [],
    company_departments_class_e: [],
    positions_by_departments: [],
}

const mutations = {
    SET_COMPANY_EVENTS(state, data) {
        state.company_events = data
    },
    SET_COMPANY_DRESS_CODE(state, data) {
        state.company_dress_code = data
    },
    SET_COMPANY_DEPARTMENTS_CLASS_A(state, data) {
        state.company_departments_class_a = data
    },
    SET_COMPANY_DEPARTMENTS_CLASS_B(state, data) {
        state.company_departments_class_b = data
    },
    SET_COMPANY_DEPARTMENTS_CLASS_C(state, data) {
        state.company_departments_class_c = data
    },
    SET_COMPANY_DEPARTMENTS_CLASS_D(state, data) {
        state.company_departments_class_d = data
    },
    SET_COMPANY_DEPARTMENTS_CLASS_E(state, data) {
        state.company_departments_class_e = data
    },
    SET_POSITIONS_BY_DEPARTMENTS(state, data) {
        state.positions_by_departments = data
    },
    RESET(state) {
        state.company_dress_code = []
    },
}

const actions = {
    get_company_events({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEvents'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EVENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    updateStatusOfEventInvitation({ dispatch }, update_data) {
        let current_api = API_CONFIG.API_ENDPOINT + `api/updateStatusOfEventInvitation/${update_data.id}`;
        let current_user_access_token = localStorage.getItem("auth.access_token");
        let data = {
          status: update_data.status
        };
        let config = {
          headers: { Authorization: "Bearer " + current_user_access_token },
        };
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return error.response;
          });
      },

    get_company_events_with_page({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEvents?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EVENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    show_company_regulation({}) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getRegulationCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let data = {
            id: c_id,
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

    show_dress_codes({ commit }, dress_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDressCodesCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let data = {
            id: c_id,
            gender: dress_data.gender,
            department_id: dress_data.department_id,
            position_id: dress_data.position_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DRESS_CODE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_departments_with_class_a({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassA'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_CLASS_A', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_departments_with_class_b({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassB'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_CLASS_B', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_departments_with_class_c({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassC'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_CLASS_C', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_departments_with_class_d({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassD'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_CLASS_D', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_departments_with_class_e({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassE'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS_CLASS_E', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_departments({}) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyDepartments'

        let current_user_access_token = localStorage.getItem('auth.access_token')
        let c_id = localStorage.getItem('employee_company_id')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: c_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_positions_by_department({ commit }, submitted_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getPositionByDepartment'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            department_id: submitted_data.department_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_POSITIONS_BY_DEPARTMENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    getEvents(state) {
        return JSON.parse(JSON.stringify(state.company_events))
    },
    get(state) {
        return JSON.parse(JSON.stringify(state.company_dress_code))
    },
    get_departments_class_a(state) {
        return JSON.parse(JSON.stringify(state.company_departments_class_a))
    },
    get_departments_class_b(state) {
        return JSON.parse(JSON.stringify(state.company_departments_class_b))
    },
    get_departments_class_c(state) {
        return JSON.parse(JSON.stringify(state.company_departments_class_c))
    },
    get_departments_class_d(state) {
        return JSON.parse(JSON.stringify(state.company_departments_class_d))
    },
    get_departments_class_e(state) {
        return JSON.parse(JSON.stringify(state.company_departments_class_e))
    },
    get_positions_by_departments(state) {
        return JSON.parse(JSON.stringify(state.positions_by_departments))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
