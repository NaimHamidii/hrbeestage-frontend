import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_employee_work_schedules: [],
    company_single_employee_work_schedules: [],
    employee_access_control_logs: [],
    employee_access_control_logs_stats: [],

    today_attendances: [],
    employee_weekly_schedules: [],
    employee_monthly_attendances: []
}

const mutations = {
    SET_EMPLOYEE_ACCESS_CONTROL_LOGS(state, data) {
        state.employee_access_control_logs = data
    },
    SET_EMPLOYEE_ACCESS_CONTROL_LOGS_STATS(state, data) {
        state.employee_access_control_logs_stats = data
    },
    SET_COMPANY_EMPLOYEE_WORK_SCHEDULES(state, data) {
        state.company_employee_work_schedules = data
    },
    SET_COMPANY_SINGLE_EMPLOYEE_WORK_SCHEDULES(state, data) {
        state.company_single_employee_work_schedules = data
    },
    SET_TODAYS_ATTENDANCES(state, data) {
        state.today_attendances = data;
    },
    SET_EMPLOYEE_WEEKLY_SCHEDULES(state, data) {
        state.employee_weekly_schedules = data;
    },
    SET_EMPLOYEE_MONTHLY_ATTENDANCES(state, data) {
        state.employee_monthly_attendances = data;
    },

    RESET(state) {
        state.company_employee_work_schedules = []
        state.company_single_employee_work_schedules = []
    },
}
const actions = {
    get_todays_attendances({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getAttendancesForToday'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_TODAYS_ATTENDANCES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_employee_todays_attendances({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeAttendancesForToday'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_id
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

    fetch_employee_monthly_attendances({ commit }, s_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeAttendancesMonthly'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: s_data.employee_id,
            month: s_data.month,
            year: s_data.year
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_MONTHLY_ATTENDANCES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_employee_attendance({ commit }, id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/deleteAttendance'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            id: id
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

    store_employee_attendance({ commit }, s_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storeNewAttendanceForEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: s_data.employee_id,
            checkin: s_data.checkin,
            checkout: s_data.checkout,
            type: 'work'
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

    fetch_employee_weekly_schedules({ commit }, s_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showEmployeeWeeklySchedules'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: s_data.employee_id,
            year: s_data.year
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_WEEKLY_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    store_employee_weekly_schedules({ commit }, s_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/storeWeeklySchedulesForEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: s_data.employee_id,
            year: s_data.year,
            weeks_year: s_data.weeks_year,
            schedule_template: s_data.schedule_template
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

    update_employee_weekly_schedules({ commit }, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateWeeklyScheduleForEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
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

    get_employee_access_control_logs({ commit }, data_to_send) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/access-control-logs'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: data_to_send.employee_id,
            month: data_to_send.month,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_ACCESS_CONTROL_LOGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_employee_access_control_logs_stats({ commit }, data_to_send) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/access-control-stats'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: data_to_send.employee_id,
            month: data_to_send.month,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_EMPLOYEE_ACCESS_CONTROL_LOGS_STATS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_company_employee_work_schedules({ commit }, searchData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkSchedules'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            all: 'all',
            employee_name: searchData ? searchData.employee_name : '',
            employee_surname: searchData ? searchData.employee_surname : '',
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEE_WORK_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    search_employee_work_schedules({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkSchedules'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_name: employee_data.employee_name,
            employee_surname: employee_data.employee_surname,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEE_WORK_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_company_employee_work_schedules_with_page({ commit }, page) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkSchedules?page=' + page
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            all: 'all',
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEE_WORK_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_work_schedule({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeWorkSchedules'
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
                commit('SET_COMPANY_SINGLE_EMPLOYEE_WORK_SCHEDULES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    workschedule_reports({}, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/workScheduleReports'
        let current_user_access_token = localStorage.getItem('auth.access_token')

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

    workschedule_monthly_reports({}, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/workScheduleReportsMonthly'
        let current_user_access_token = localStorage.getItem('auth.access_token')

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

    workschedule_reports_hrbee({}, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/workScheduleReportsAttendanceHrBee'
        let current_user_access_token = localStorage.getItem('auth.access_token')

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

    workschedule_monthly_reports_hrbee({}, data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/workScheduleReportsMonthlyAttendanceHrBee'
        let current_user_access_token = localStorage.getItem('auth.access_token')

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

    edit_single_employee_work_schedule({ dispatch }, schedule_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeWorkSchedules'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            name: schedule_data.name,
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: schedule_data.employee_id,
            monday_from: schedule_data.monday_from,
            monday_to: schedule_data.monday_to,
            tuesday_from: schedule_data.tuesday_from,
            tuesday_to: schedule_data.tuesday_to,
            wednesday_from: schedule_data.wednesday_from,
            wednesday_to: schedule_data.wednesday_to,
            thursday_from: schedule_data.thursday_from,
            thursday_to: schedule_data.thursday_to,
            friday_from: schedule_data.friday_from,
            friday_to: schedule_data.friday_to,
            saturday_from: schedule_data.saturday_from,
            saturday_to: schedule_data.saturday_to,
            sunday_from: schedule_data.sunday_from,
            sunday_to: schedule_data.sunday_to,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_single_employee_work_schedule', schedule_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_absence_item({ dispatch }, absenceData) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditAbsenceItem'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            absence_id: absenceData.absence_id,
            deduct_from_pay: absenceData.deduct_from_pay,
            deduct_from_pay_amount: absenceData.deduct_from_pay_amount,
            reviewed: absenceData.reviewed,
            reason: absenceData.reason,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_employee_access_control_logs', { employee_id: absenceData.employee_id, month: absenceData.month })
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_employee_work_schedules))
    },
    get_single_employee_work_schedules(state) {
        return JSON.parse(JSON.stringify(state.company_single_employee_work_schedules))
    },
    get_employee_access_control_logs(state) {
        return JSON.parse(JSON.stringify(state.employee_access_control_logs))
    },
    get_employee_access_control_logs_stats(state) {
        return JSON.parse(JSON.stringify(state.employee_access_control_logs_stats))
    },
    get_today_attendances(state) {
        return JSON.parse(JSON.stringify(state.today_attendances))
    },
    get_employee_weekly_schedules(state) {
        return JSON.parse(JSON.stringify(state.employee_weekly_schedules))
    },
    get_employee_monthly_attendances(state) {
        return JSON.parse(JSON.stringify(state.employee_monthly_attendances));
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
