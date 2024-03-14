import { API_CONFIG } from '@state_src/config.js'
import Helpers from '@components/helpers'

const state = {
    wages_settings: [],
    company_finances_list: [],
    company_employees_notIn_salary_list: [],
    company_monthly_generated_salaries: [],
    company_monthly_bonuses: [],
    company_finances_single_employee_salary_details: [],
    company_single_employee_monthly_generated_salaries: [],
}

const mutations = {
    SET_WAGES_SETTINGS(state, data) {
        state.wages_settings = data
    },
    SET_COMPANY_FINANCES_LIST(state, data) {
        state.company_finances_list = data
    },
    SET_COMPANY_EMPLOYEES_NOT_IN_SALARY_LIST(state, data) {
        state.company_employees_notIn_salary_list = data
    },
    SET_COMPANY_MONTHLY_GENERATED_SALARIES(state, data) {
        state.company_monthly_generated_salaries = data
    },
    SET_COMPANY_MONTHLY_BONUSES(state, data) {
        state.company_monthly_bonuses = data
    },
    SET_COMPANY_SINGLE_EMPLOYEE_MONTHLY_GENERATED_SALARIES(state, data) {
        state.company_single_employee_monthly_generated_salaries = data
    },
    SET_SINGLE_EMPLOYEE_FINANCES_DETAILS(state, data) {
        state.company_finances_single_employee_salary_details = data
    },

    RESET(state) {
        ;(state.wages_settings = []), (state.company_finances_list = []), (state.company_employees_notIn_salary_list = []), (state.company_monthly_generated_salaries = []), (state.company_finances_single_employee_salary_details = [])
        state.company_single_employee_monthly_generated_salaries = []
    },
}
const actions = {
    get_open_records() {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/showOpenRecords'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    close_all_records() {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/closeAllRecords'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.get(current_api, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    show_wages_settings({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowSalarySettings'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_WAGES_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    update_wages_settings({ commit }, wages_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateSalarySettings'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            id: wages_data.setting_id,
            tax_0_to_80: wages_data.tax_0_to_80,
            tax_80_to_250: wages_data.tax_80_to_250,
            tax_250_to_450: wages_data.tax_250_to_450,
            tax_greater_450: wages_data.tax_greater_450,
            contribution: wages_data.contribution,
            overtime: wages_data.overtime,
            wardship: wages_data.wardship,
            weekend_holidays: wages_data.weekend_holidays,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_WAGES_SETTINGS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_employees_not_added_to_salary_list({ commit }) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            is_included_in_monthly_salary: 0,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES_NOT_IN_SALARY_LIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_employees_not_added_to_salary_list_with_page({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            is_included_in_monthly_salary: 0,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_EMPLOYEES_NOT_IN_SALARY_LIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_finances_list({ commit }, query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeSalaryDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: query ? query.name : null,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_FINANCES_LIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_finances_list_with_page({ commit }, page_number_to) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeSalaryDefinitions?page=' + page_number_to
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_FINANCES_LIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_company_finances_list_with_search({ commit }, searchName) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeSalaryDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_name: searchName,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_FINANCES_LIST', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_finances({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeSalaryDefinitions'
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
                commit('SET_SINGLE_EMPLOYEE_FINANCES_DETAILS', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    edit_single_employee_salary_details({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeSalaryDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: finance_data.employee_id,
            job_start_date: finance_data.job_start_date,
            gross_salary: finance_data.gross_salary,
            is_second_job: finance_data.is_second_job,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_company_finances_list')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_employee_from_finances_list({ dispatch }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeSalaryDefinitions'
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
                dispatch('get_company_finances_list')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    add_employee_to_finances_list({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyAddEmployeeSalaryDefinitions'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: finance_data.employee_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_employees_not_added_to_salary_list')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_generated_company_monthly_salaries({ commit }, query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: query ? query.name : null,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_generated_company_monthly_salaries_with_filters({ commit }, filter_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            salary_type: filter_data.salary_type,
            from_salary: filter_data.from_salary,
            to_salary: filter_data.to_salary,
            year: filter_data.year,
            month: filter_data.month,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_generated_company_monthly_salaries_with_page({ commit }, page_number) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary?page=' + page_number
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_monthly_salary_gen({ commit }, monthly_salary_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            monthly_salary_id: monthly_salary_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_SINGLE_EMPLOYEE_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_monthly_salary_generations({ commit }, employee_id) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary'
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
                commit('SET_COMPANY_SINGLE_EMPLOYEE_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_single_employee_monthly_salary_generations_with_page({ commit }, employee_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlySalary?page=' + employee_data.page
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: employee_data.employee_id,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_SINGLE_EMPLOYEE_MONTHLY_GENERATED_SALARIES', response.data)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_all_company_monthly_bonuses({ commit }, query) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployeeMonthlyBonuses'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            name: query ? query.name : null,
            year: query.year,
            month: query.month,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                commit('SET_COMPANY_MONTHLY_BONUSES', response.data)
                return response.data
            })
            .catch((error) => {
                return error.response
            })
    },

    generate_all_monthly_salaries({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/generateMonthlyEmployeeSalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            month: finance_data.month,
            year: finance_data.year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_generated_company_monthly_salaries')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    generate_monthly_salary_for_single_employee({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/generateMonthlyEmployeeSalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: finance_data.employee_id,
            month: finance_data.month,
            year: finance_data.year,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_generated_company_monthly_salaries')
                dispatch('get_single_employee_monthly_salary_generations', finance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    edit_generated_monthly_salary_for_single_employee({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            monthly_salary_id: finance_data.monthly_salary_id,
            advance_payment: finance_data.advance_payment,
            bonus_payment: finance_data.bonus_payment,
            contribution_5_percent: finance_data.contribution_5_percent,
            gross_salary_by_hours: finance_data.gross_salary_by_hours,
            leave_without_payment: finance_data.leave_without_payment,
            meals_payment: finance_data.meals_payment,
            net_salary: finance_data.net_salary,
            overtime_nightshift: finance_data.overtime_nightshift,
            price_per_hours: finance_data.price_per_hours,
            tax_0_to_80_0_percent: finance_data.tax_0_to_80_0_percent,
            tax_80_to_250_4_percent: finance_data.tax_80_to_250_4_percent,
            tax_250_to_450_8_percent: finance_data.tax_250_to_450_8_percent,
            tax_greater_450_10_percent: finance_data.tax_greater_450_10_percent,
            total_tax: finance_data.total_tax,
            wardship: finance_data.wardship,
            weekend_holidays: finance_data.weekend_holidays,
            work_hour_per_month: finance_data.work_hour_per_month,
            working_hours: finance_data.working_hours,
            total_salary: finance_data.total_salary,
            health_insurance_cost: finance_data.health_insurance_cost,
            health_insurance_gross: finance_data.health_insurance_gross,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_generated_company_monthly_salaries')
                dispatch('get_single_employee_monthly_salary_generations', finance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    edit_monthly_bonus_for_single_employee({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyEditEmployeeMonthlyBonus'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            monthly_salary_id: finance_data.monthly_salary_id,
            bonus_payment: finance_data.bonus_payment,
            bonus_note: finance_data.bonus_note,
        }

        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_company_monthly_bonuses')
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    upload_monthly_bonuses({}, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUploadEmployeeMonthlyBonuses'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = new FormData()

        data.append('year', finance_data.year)
        data.append('month', finance_data.month)
        data.append('file', finance_data.file)

        return API_CONFIG.SITE_AXIOS.post(current_api, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + current_user_access_token,
            },
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_monthly_bonuses({}, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeMonthlyBonuses'
        let current_user_access_token = localStorage.getItem('auth.access_token')

        let data = {
            year: finance_data.year,
            month: finance_data.month,
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    delete_employee_salary_generation({ dispatch }, finance_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyDeleteEmployeeMonthlySalary'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            monthly_salary_id: finance_data,
        }
        let config = {
            headers: { Authorization: 'Bearer ' + current_user_access_token },
        }
        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                dispatch('get_all_generated_company_monthly_salaries')
                dispatch('get_single_employee_monthly_salary_generations', finance_data.employee_id)
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    get_employees_included_in_salary_list({}, search_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyShowEmployees'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            is_included_in_monthly_salary: 1,
            employee_name: search_data.employee_name,
            employee_surname: search_data.employee_surname,
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

    generate_salaries_in_pdf({}, generate_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getSalariesAsPDF'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            year: generate_data.year,
            month: generate_data.month,
            description: generate_data.description,
        }
        let config = {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                let current_pdf_url = ''
                if (response.status == 200) {
                    current_pdf_url = generate_data.SERVER_URL + generate_data.SALARIES_EXPORT_FOLDER + response.data
                    window.open(current_pdf_url, '_newtab')
                }
            })
            .catch((error) => {
                return error.response
            })
    },

    generate_salaries_in_csv({}, generate_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/getSalariesAsCSV'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            year: generate_data.year,
            month: generate_data.month,
            description: generate_data.description,
        }
        let config = {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
            // responseType: 'blob',
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },

    generate_tax_declaration({}, generate_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/exportTaxDeclaration'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let config = {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, generate_data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_gross_salary_bonus({}, update_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateEmployeeGrossSalaryBonus'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: update_data.employee_id,
            gross_salary_bonus: update_data.gross_salary_bonus,
        }

        let config = {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
        }

        return API_CONFIG.SITE_AXIOS.post(current_api, data, config)
            .then((response) => {
                return response
            })
            .catch((error) => {
                return error.response
            })
    },
    update_salary_increment({}, update_data) {
        let current_api = API_CONFIG.API_ENDPOINT + 'api/companyUpdateEmployeeSalaryIncrements'
        let current_user_access_token = localStorage.getItem('auth.access_token')
        let data = {
            company_id: Helpers.getCurrentCompanyIdForAdmin(),
            employee_id: update_data.employee_id,
            increment_salary_every_n_years: update_data.increment_salary_every_n_years,
            increment_salary_on_month: update_data.increment_salary_on_month,
            increment_salary_by_amount: update_data.increment_salary_by_amount,
        }

        let config = {
            headers: {
                Authorization: 'Bearer ' + current_user_access_token,
            },
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
    get(state) {
        return JSON.parse(JSON.stringify(state.company_finances_list))
    },
    get_employees_not_added_salary_list(state) {
        return JSON.parse(JSON.stringify(state.company_employees_notIn_salary_list))
    },
    get_monthly_generated_salaries(state) {
        return JSON.parse(JSON.stringify(state.company_monthly_generated_salaries))
    },
    get_monthly_bonuses(state) {
        return JSON.parse(JSON.stringify(state.company_monthly_bonuses))
    },
    get_single_employee_salary_details(state) {
        return JSON.parse(JSON.stringify(state.company_finances_single_employee_salary_details))
    },
    get_single_employee_monthly_salary_generations(state) {
        return JSON.parse(JSON.stringify(state.company_single_employee_monthly_generated_salaries))
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
