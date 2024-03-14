import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    company_employees: [],
    company_employee_upcoming_birthdays: [],
    company_current_employee_data: [],
    company_employee_statistics: [],
}

const mutations = {
    SET_COMPANY_EMPLOYEES(state, data) {
        state.company_employees = data
    },
    SET_COMPANY_UPCOMING_EMPLOYEE_BIRTHDAYS(state, data) {
        state.company_employee_upcoming_birthdays = data
    },
    SET_CURRENT_EMPLOYEE_DATA(state, data) {
        state.company_current_employee_data = data
    },
    SET_COMPANY_EMPLOYEE_STATISTICS(state, data) {
        state.company_employee_statistics = data
    },
    RESET(state) {
        state.company_employees = []
        state.company_employee_upcoming_birthdays = []
        state.company_current_employee_data = []
    },
}
const actions = {
    get_company_employees({ commit }, dataStatus) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            status: dataStatus,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_all_active_company_employees({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            status: 1,
            get_all: 1,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    get_employee_contracts({}) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getEmployeeContractList'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {}
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
    get_company_employees_with_page({ commit }, load_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees?page=' + load_data.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            status: load_data.status,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    filter_company_employees({ commit }, filters) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            department: filters.department,
            position: filters.position,
            gender: filters.gender,
            city: filters.city,
            birthday_month: filters.birthday_month,
            status: filters.status,
            started_job: filters.started_job
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    filter_company_employees_with_page({ commit }, filters) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees?page=' + filters.page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            department: filters.department,
            position: filters.position,
            gender: filters.gender,
            city: filters.city,
            birthday_month: filters.birthday_month,
            status: filters.status,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_company_employees({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_name: employee_data.employee_name,
            employee_surname: employee_data.employee_surname,
            status: employee_data.status,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_upcoming_employee_birthdays({ commit }, current_month) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            get_birthdays: current_month,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_UPCOMING_EMPLOYEE_BIRTHDAYS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_profile({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
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
                commit('SET_CURRENT_EMPLOYEE_DATA', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    search_jobseeker_with_national_ID({}, national_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobSeekerFullProfileByNationalId'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            national_id: national_id,
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

    get_number_of_employees({}) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyTotalNumberOfEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, {}, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_employee_to_company({}, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            job_seeker_id: employee_data.job_seeker_id,
            user_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: employee_data.name,
            surname: employee_data.surname,
            gender: employee_data.gender,
            date_of_birth: employee_data.date_of_birth,
            city: employee_data.city,
            country: employee_data.country,
            position_id: employee_data.position,
            department_id: employee_data.department,
            started_job: employee_data.started_job,
            idcardno: employee_data.idcardno,
            phone_number: employee_data.phone_number,
            biography: '',
            image_url: employee_data.image_url,
            github_url: '',
            linkedin_url: '',
            dribble_url: '',
            skype_url: '',
            email: employee_data.email,
            address: employee_data.address,
            personal_id: employee_data.personal_id,
            nationality: employee_data.nationality,
            blood_group: employee_data.blood_group,
            contact_person: employee_data.contact_person,
            contact_person_phone: employee_data.contact_person_phone,
            employee_bank_name: employee_data.employee_bank_name,
            employee_bank_account_number: employee_data.employee_bank_account_number,
            is_active: 1,
            contract_start_date: employee_data.contract_start_date,
            contract_end_date: employee_data.contract_end_date,
            probation_months: employee_data.probation_months,
            qualification: employee_data.qualification,
            orientation: employee_data.orientation,
            notes: employee_data.notes,
            salary_type: employee_data.salary_type,
            gross_salary: employee_data.gross_salary,
            net_salary: employee_data.net_salary,
            health_insurance_monthly_cost: employee_data.health_insurance_monthly_cost,
            add_to_wages_list: employee_data.add_to_wages_list,
            is_second_job: employee_data.is_second_job,
            marital_status: employee_data.marital_status,
            internship: employee_data.internship,
            indefinite_term: employee_data.indefinite_term,
            pay_tax: employee_data.pay_tax,
            pay_contribution: employee_data.pay_contribution,
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

    update_employee_details({ dispatch }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_data.employee_id,
            job_seeker_id: employee_data.job_seeker_id,
            name: employee_data.name,
            surname: employee_data.surname,
            gender: employee_data.gender,
            city: employee_data.city,
            date_of_birth: employee_data.date_of_birth,
            position_id: employee_data.position,
            department_id: employee_data.department,
            country: employee_data.country,
            phone_number: employee_data.phone_number,
            image_url: employee_data.image_url,
            biography: employee_data.biography,
            github_url: employee_data.github_url,
            linkedin_url: employee_data.linkedin_url,
            dribble_url: employee_data.dribble_url,
            skype_url: employee_data.skype_url,
            email: employee_data.email,
            address: employee_data.address,
            personal_id: employee_data.personal_id,
            nationality: employee_data.nationality,
            blood_group: employee_data.blood_group,
            contact_person: employee_data.contact_person,
            contact_person_phone: employee_data.contact_person_phone,
            employee_bank_name: employee_data.employee_bank_name,
            employee_bank_account_number: employee_data.employee_bank_account_number,
            is_active: employee_data.is_active,
            contract_termination_date: employee_data.contract_termination_date,
            contract_termination_reason: employee_data.contract_termination_reason,
            contract_termination_notice_pay_gross: employee_data.contract_termination_notice_pay_gross,
            vacation_day_termination: employee_data.vacation_day_termination,
            contract_start_date: employee_data.contract_start_date,
            contract_end_date: employee_data.contract_end_date,
            probation_months: employee_data.probation_months,
            qualification: employee_data.qualification,
            orientation: employee_data.orientation,
            notes: employee_data.notes,
            salary_type: employee_data.salary_type,
            gross_salary: employee_data.gross_salary,
            net_salary: employee_data.net_salary,
            add_to_wages_list: employee_data.add_to_wages_list,
            is_second_job: employee_data.is_second_job,
            started_job: employee_data.started_job,
            marital_status: employee_data.marital_status,
            internship: employee_data.internship,
            access_control_id: employee_data.access_control_id,
            indefinite_term: employee_data.indefinite_term,
            current_address: employee_data.current_address,
            workplace_location: employee_data.workplace_location,
            pay_tax: employee_data.pay_tax,
            pay_contribution: employee_data.pay_contribution,
            staff_category: employee_data.staff_category,
            monthly_working_days: employee_data.monthly_working_days
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_single_employee_profile', employee_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    terminate_employee({ dispatch }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyTerminateEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            employee_id: employee_data.employee_id,

            contract_termination_date: employee_data.contract_termination_date,
            contract_termination_reason: employee_data.contract_termination_reason,
            contract_termination_notice_pay_gross: employee_data.contract_termination_notice_pay_gross,
            vacation_day_termination: employee_data.vacation_day_termination,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_single_employee_profile', employee_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_profile_image_of_employee({}, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/uploadEmployeeProfileImage'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, employee_data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_jobseeker_with_hired_status({}) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showJobSeekerByHiredStatus'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
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

    generate_new_password_for_employee({}, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGenerateNewPasswordForEmployee'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            employee_id,
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

    update_employee_password({}, s_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/updateEmployeePassword'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            employee_id: s_data.employee_id,
            new_password: s_data.new_password
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

    get_company_employee_statistics({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyGetEmployeeStatistics'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, null, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEE_STATISTICS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
}

const getters = {
    get(state) {
        return JSON.parse(JSON.stringify(state.company_employees))
    },
    get_current_employee(state) {
        return JSON.parse(JSON.stringify(state.company_current_employee_data))
    },
    get_upcoming_birthdays(state) {
        return JSON.parse(JSON.stringify(state.company_employee_upcoming_birthdays))
    },
    employee_statistics(state) {
        return JSON.parse(JSON.stringify(state.company_employee_statistics))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
