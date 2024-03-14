import { API_CONFIG } from '@state_src/config.js'

const state = {
    current_employee_access_raw: [],
    current_employee_access: {
        all: {},
        department_specific: {},
        is_interview_panel_member: false,
    },
}

const mutations = {
    SET_CURRENT_EMPLOYEE_ACCESS(state, data) {
        const newData = {
            all: {},
            department_specific: {},
            is_interview_panel_member: data.is_interview_panel_member == 1,
        }
        if (data && data.package_access && data.package_access.length) {
            for (const access of data.package_access) {
                if (!newData.all[access.company_package.package_slug]) {
                    newData.all[access.company_package.package_slug] = true;
                }
                if (!newData.department_specific[access.access_to_department_id]) {
                    newData.department_specific[access.access_to_department_id] = {};
                }
                newData.department_specific[access.access_to_department_id][access.company_package.package_slug] = access.access_type;
            }
        }
        state.current_employee_access_raw = data;
        state.current_employee_access = newData;
    },
};
const actions = {
    get_employee_access({ commit }, employeeId) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetEmployeeAccess'
        const current_user_access_token = localStorage.getItem('auth.access_token')

        const data = {
            employee_id: employeeId,
        }

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_EMPLOYEE_ACCESS', response.data)
                return response
            })
            .catch((error) => {
                console.error(error)
                return error.response
            })
    },

    edit_employee_access({ commit }, submitted_data) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpsertEmployeeAccess'
        const current_user_access_token = localStorage.getItem('auth.access_token')

        const data = {
            employee_id: submitted_data.employee_id,
            access_items: submitted_data.access_items,
        }

        const config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_CURRENT_EMPLOYEE_ACCESS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    edit_employee_admin_status({}, { employee_id, is_admin }) {
        const current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeAdminStatus'
        const current_user_access_token = localStorage.getItem('auth.access_token')

        const data = {
            employee_id,
            is_admin,
        }

        const config = {
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
}

const getters = {
    get_current_employee_access: function () {
        return state.current_employee_access
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
