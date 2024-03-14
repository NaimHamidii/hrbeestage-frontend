export default {
    getCurrentCompanyIdForAdmin: () => {
        const isAdminEmployeeOfCompany = localStorage.getItem('auth_isAdminEmployeeOfCompany')

        if (!isNaN(Number(isAdminEmployeeOfCompany))) {
            return isAdminEmployeeOfCompany
        } else if (localStorage.getItem('employee_company_id')) {
            return localStorage.getItem('employee_company_id')
        } else {
            return localStorage.getItem('auth.user_id')
        }
    },
    scrollToFirstError: () => {
        const errorElement = document.querySelector('.form-error-notification.error:first-of-type')
        if (!errorElement) return

        let scrollTarget = errorElement.closest('.form__group')
        if (!scrollTarget) scrollTarget = errorElement

        scrollTarget.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' })

        const input = scrollTarget.querySelector('.form__input')
        if (input) input.focus()
    },
}
