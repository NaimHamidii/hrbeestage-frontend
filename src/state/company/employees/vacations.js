import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_general_vacations: [],
    company_single_employee_leave_definitions: [],
    company_single_employee_leaves: [],
    company_single_employee_approved_leaves: [],
    company_public_holidays: [],
    company_leave_requests: [],
    leaves_based_vacation_type: [],
    company_employees_on_vacation_next_week: [],
}

const mutations = {
    SET_LEAVES_BASED_ON_VACATION_TYPE(state, data) {
        state.leaves_based_vacation_type = data
    },
    SET_COMPANY_GENERAL_VACATIONS(state, data) {
        state.company_general_vacations = data
    },
    SET_SINGLE_EMPLOYEE_LEAVE_DEFINITIONS(state, data) {
        state.company_single_employee_leave_definitions = data
    },
    SET_SINGLE_EMPLOYEE_LEAVES(state, data) {
        state.company_single_employee_leaves = data
    },
    SET_SINGLE_EMPLOYEE_APPROVED_LEAVES(state, data) {
        state.company_single_employee_approved_leaves = data
    },
    SET_COMPANY_PUBLIC_HOLIDAYS(state, data) {
        state.company_public_holidays = data
    },
    SET_COMPANY_LEAVE_REQUESTS(state, data) {
        state.company_leave_requests = data
    },
    SET_COMPANY_EMPLOYEES_ON_VACATION_NEXT_WEEK(state, data) {
        state.company_employees_on_vacation_next_week = data
    },
    RESET(state) {
        ;(state.company_general_vacations = []), (state.company_single_employee_leave_definitions = [])
        state.company_single_employee_leaves = []
        state.company_single_employee_approved_leaves = []
        state.company_public_holidays = []
        state.company_leave_requests = []
        state.leaves_based_vacation_type = []
    },
}
const actions = {
    destroy_leave({}, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            leave_id: id,
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

    get_general_vacations({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetBaseLeaveDefinitions'

        let role = localStorage.getItem('auth_usertype')

        if (role === 'company') {
            var c_id = Helpers.getCurrentCompanyIdForAdmin()
        } else if (role === 'employee') {
            var c_id = localStorage.getItem('employee_company_id')
        }

        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: c_id,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_GENERAL_VACATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_one_base_company_leave_definition({}, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetOneBaseLeaveDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            base_company_leave_definitions_id: id,
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
    get_single_employee_leave_definitions({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaveDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_EMPLOYEE_LEAVE_DEFINITIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    create_base_company_leave_definition({ commit }, vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyCreateBaseLeaveDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: vacation_data.employee_id,
            name: vacation_data.name,
            total_days: vacation_data.total_days,
            half_days: vacation_data.half_days,
            one_time_take: vacation_data.one_time_take,
            get_extra_days: vacation_data.get_extra_days,
            extra_days_year: vacation_data.extra_days_year,
            extra_days_day: vacation_data.day,
            right_to_use_next_year: vacation_data.right_to_use_next_year,
            right_to_use_due_month: vacation_data.right_to_use_due_month,
            how_can_use: vacation_data.how_can_use,
            hide: vacation_data.hide,
            is_paid: vacation_data.is_paid,
            daily_pay_percentage: vacation_data.daily_pay_percentage,
            roles: vacation_data.roles,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_GENERAL_VACATIONS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_base_company_leave_definition({ dispatch }, vacation_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteBaseLeaveDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            base_company_leave_definitions_id: vacation_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_general_vacations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_base_company_leave_definition({ dispatch }, vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditBaseDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            base_company_leave_definitions_id: vacation_data.base_company_leave_definitions_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: vacation_data.employee_id,
            name: vacation_data.name,
            total_days: vacation_data.total_days,
            half_days: vacation_data.half_days,
            one_time_take: vacation_data.one_time_take,
            get_extra_days: vacation_data.get_extra_days,
            extra_days_year: vacation_data.extra_days_year,
            extra_days_day: vacation_data.day,
            right_to_use_next_year: vacation_data.right_to_use_next_year,
            right_to_use_due_month: vacation_data.right_to_use_due_month,
            how_can_use: vacation_data.how_can_use,
            hide: vacation_data.hide,
            is_paid: vacation_data.is_paid,
            daily_pay_percentage: vacation_data.daily_pay_percentage,
            roles: vacation_data.roles,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_general_vacations', vacation_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_employee_leave_definition({ dispatch }, vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateEmployeeLeaveDefinition'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_employee_leave_definitions_id: vacation_data.company_employee_leave_definitions_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: vacation_data.employee_id,
            definition_name: vacation_data.definition_name,
            definition_for_year: vacation_data.definition_for_year,
            definition_total_days: vacation_data.definition_total_days,
            definition_half_days: vacation_data.definition_half_days,
            definition_accumulate_monthly: vacation_data.definition_accumulate_monthly ? 1 : 0,
            definition_one_time_take: vacation_data.definition_one_time_take,
            definition_get_extra_days: vacation_data.definition_get_extra_days,
            definition_extra_days_year: vacation_data.definition_extra_days_year,
            definition_extra_days_day: vacation_data.definition_extra_days_day,
            definition_right_to_use_next_year: vacation_data.definition_right_to_use_next_year ? 1 : 0,
            definition_right_to_use_due_month: vacation_data.definition_right_to_use_due_month,
            definition_how_can_use: vacation_data.definition_how_can_use,
            hide: vacation_data.hide,
            definition_is_paid: vacation_data.definition_is_paid,
            definition_daily_pay_percentage: vacation_data.definition_daily_pay_percentage,
            definition_roles: vacation_data.definition_roles,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_general_vacations', vacation_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_company_public_holidays({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPublicHolidayDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_PUBLIC_HOLIDAYS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    add_new_company_public_holiday({ dispatch }, holiday_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddPublicHolidayDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            public_holiday_name: holiday_data.public_holiday_name,
            public_holiday_date: holiday_data.public_holiday_date,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_public_holidays')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_single_company_public_holiday({ dispatch }, public_holiday_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowPublicHolidayDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            public_holiday_id: public_holiday_id,
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
    edit_company_public_holiday({ dispatch }, holiday_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditPublicHolidayDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            public_holiday_id: holiday_data.public_holiday_id,
            public_holiday_name: holiday_data.public_holiday_name,
            public_holiday_date: holiday_data.public_holiday_date,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_public_holidays')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    delete_company_public_holiday({ dispatch }, holiday_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeletePublicHolidayDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            public_holiday_id: holiday_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_public_holidays')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_employee_vacation_requests({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_LEAVE_REQUESTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_leaves_based_on_vacation_type({ commit }, submit_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            employee_id: submit_data.employee_id,
            company_employee_leave_definitions_id: submit_data.company_employee_leave_definitions_id,
            leave_of_year: submit_data.leave_of_year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_LEAVES_BASED_ON_VACATION_TYPE', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    download_vacation({}, submited_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyPrintEmployeeLeave'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        // In the future we need to check for jobseeker_data.template_nr in order
        // to download the required email template
        let data = {
            leave_id: submited_data.leave_id,
            employee_id: submited_data.employee_id,
            template_id: submited_data.template_id,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                let contract_url = ''
                if (response.status == 200) {
                    contract_url = submited_data.SERVER_URL + 'api/' + submited_data.LEAVES_FOLDER + response.data
                    window.open(contract_url, '_newtab')
                }
            })
            .catch((error) => {
                return error.response
            })
    },

    /* GET SINGLE EMPLOYEE VACATIONS - ALL VACATIONS REQUEST - APPROVED, REJECTED, NEW */
    get_all_single_employee_vacations({ commit }, { employee_id, definition_for_year }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showEmployeeLeavesStats'
        let role = localStorage.getItem('auth_usertype')

        if (role === 'company') {
            var c_id = Helpers.getCurrentCompanyIdForAdmin()
            var e_id = employee_id
        } else if (role === 'employee') {
            var c_id = localStorage.getItem('employee_company_id')
            var e_id = localStorage.getItem('auth.user_id')
        }

        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: c_id,
            employee_id: e_id,
            definition_for_year,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_EMPLOYEE_LEAVES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_single_employee_approved_vacations({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeApprovedLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_SINGLE_EMPLOYEE_APPROVED_LEAVES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    filter_employee_vacation_requests({ commit }, filter_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            request_status: filter_data.request_status,
            year: filter_data.year,
            month: filter_data.month,
            to_month: filter_data.to_month,
            page: filter_data.page,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_LEAVE_REQUESTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    search_employee_vacation_requests_with_name_surname({ commit }, filter_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_name: filter_data.employee_name,
            employee_surname: filter_data.employee_surname,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_LEAVE_REQUESTS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_employees_on_vacation_next_week({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeesOnVacationNextWeek'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES_ON_VACATION_NEXT_WEEK', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    approve_requested_vacation({}, requested_vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAcceptRejectEmployeeLeaves'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            leave_id: requested_vacation_data.leave_id,
            employee_id: requested_vacation_data.employee_id,
            request_status: requested_vacation_data.request_status,
            processed_by: user_id,
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
    delete_requested_vacation({}, requested_vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeLeaves'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            leave_id: requested_vacation_data.leave_id,
            employee_id: requested_vacation_data.employee_id,
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
    reject_requested_vacation({}, requested_vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAcceptRejectEmployeeLeaves'
        let user_id = localStorage.getItem('auth.user_id')
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            leave_id: requested_vacation_data.leave_id,
            employee_id: requested_vacation_data.employee_id,
            request_status: requested_vacation_data.request_status,
            rejected_reason: requested_vacation_data.rejected_reason,
            processed_by: user_id,
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
    company_book_time_off({ dispatch }, requested_vacation_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeLeave'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: requested_vacation_data.employee_id,
            type: requested_vacation_data.type,
            company_employee_leave_definitions_id: requested_vacation_data.company_employee_leave_definitions_id,
            start_date: requested_vacation_data.start_date,
            end_date: requested_vacation_data.end_date,
            requested_half_days: requested_vacation_data.requested_half_days ? 1 : 0,
            reason: requested_vacation_data.reason,
            request_status: requested_vacation_data.request_status,
            leave_of_year: requested_vacation_data.leave_of_year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_single_employee_vacations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    company_edit_employee_vacation({ dispatch }, vacationData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeLeave'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            leave_id: vacationData.leave_id,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: vacationData.employee_id,
            type: vacationData.type,
            company_employee_leave_definitions_id: vacationData.company_employee_leave_definitions_id,
            start_date: vacationData.start_date,
            end_date: vacationData.end_date,
            number_of_days: vacationData.number_of_days,
            reason: vacationData.reason,
            request_status: vacationData.request_status,
            leave_of_year: vacationData.leave_of_year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_single_employee_vacations')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get_leaves_based_on_vacation_types(state) {
        return JSON.parse(JSON.stringify(state.leaves_based_vacation_type))
    },
    get_general_vacations(state) {
        return JSON.parse(JSON.stringify(state.company_general_vacations))
    },
    get_single_employee_leave_definitions(state) {
        return JSON.parse(JSON.stringify(state.company_single_employee_leave_definitions))
    },
    get_public_holidays(state) {
        return JSON.parse(JSON.stringify(state.company_public_holidays))
    },
    get_vacation_leave_requests(state) {
        return JSON.parse(JSON.stringify(state.company_leave_requests))
    },
    get_single_employee_leaves(state) {
        return JSON.parse(JSON.stringify(state.company_single_employee_leaves))
    },
    get_single_employee_approved_leaves(state) {
        return JSON.parse(JSON.stringify(state.company_single_employee_approved_leaves))
    },
    employees_on_vacation_next_week(state) {
        return JSON.parse(JSON.stringify(state.company_employees_on_vacation_next_week))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
