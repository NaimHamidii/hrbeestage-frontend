import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_departments: [],
    company_subdepartments: [],

    company_departments_class_a: [],
    company_departments_class_b: [],
    company_departments_class_c: [],
    company_departments_class_d: [],
    company_departments_class_e: [],
}

const getDepartmentById = (departments, id) => {
    if (!id) return null
    for (const department of departments) {
        if (department.id == id) return department
    }
}

const mutations = {
    SET_COMPANY_DEPARTMENTS(state, data) {
        const formatted = { all: [], base: [] }

        for (const department of data) {
            let parent = getDepartmentById(data, department.parent_id)
            let isSubDepartment = !!parent
            let isSubSubDepartment = isSubDepartment ? !!getDepartmentById(data, parent.parent_id) : false

            if (!isSubDepartment) {
                for (const subdepartment of department.subdepartments) {
                    subdepartment.isSubDepartment = true
                    subdepartment.isSubSubDepartment = false

                    for (const sub_sub_department of subdepartment.subdepartments) {
                        sub_sub_department.isSubDepartment = true
                        sub_sub_department.isSubSubDepartment = true
                    }
                }
            } else if (!isSubSubDepartment) {
                for (const subdepartment of department.subdepartments) {
                    subdepartment.isSubDepartment = true
                    subdepartment.isSubSubDepartment = true
                }
            }

            const formattedDepartment = { ...department, isSubDepartment, isSubSubDepartment }

            formatted.all.push(formattedDepartment)

            if (!isSubDepartment) formatted.base.push(formattedDepartment)
        }

        state.company_departments = formatted
    },
    SET_COMPANY_SUBDEPARTMENTS(state, data) {
        state.company_subdepartments = data
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
    RESET(state) {
        state.company_departments = []
    },
}

const actions = {
    get_company_departments({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanyDepartments'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_DEPARTMENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_subdepartments({ commit }, dep_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanySubDepartments'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            department_id: dep_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_SUBDEPARTMENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_all_subdepartments({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getCompanySubDepartments'

        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_SUBDEPARTMENTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_company_department({ dispatch }, submitted_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/addCompanyDepartments'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        let data = {
            name: submitted_data.name,
            parent_id: submitted_data.parent_id,
            class: submitted_data.class,
            report_to: submitted_data.report_to,
            parent_id: submitted_data.parent_id,
            sub_department_id: submitted_data.sub_department_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_departments')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_company_department({ dispatch }, update_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateCompanyDepartments'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            id: update_data.id,
            name: update_data.name,
            parent_id: update_data.parent_id,
            class: update_data.class,
            report_to: update_data.report_to,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_departments')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    show_company_department({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showCompanyDepartments'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            id: id,
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

    get_company_departments_with_class_a({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getDepartmentsWithClassA'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

    delete_department_company({ dispatch }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/destroyDepartmentCompany'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            id: id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_departments))
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
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
