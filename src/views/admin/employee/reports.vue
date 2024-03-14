<template>
    <div class="page_content">
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.employeereports') }}</h4>
                <p>{{ $t('account_settings.employeereportsdc') }}</p>
                <hr />
                <form class="form-type-1" @submit.prevent="downloadReport('employee_report')">
                    <div class="text-center">
                        <button class="site_btn btn_purple1" type="submit">{{ $t('account_settings.downloadreport') }}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.employeeleavereports') }}</h4>
                <p>{{ $t('account_settings.employeeleavereportsdc') }}</p>
                <hr />
                <div class="text-center">
                    <button class="site_btn btn_purple1" type="button" @click="downloadReport('employee_leaves_report')">{{ $t('account_settings.downloadleavesreport') }}</button>
                    <button class="site_btn btn_purple1 ml-4" type="button" @click="downloadReport('employee_unused_leaves_report')">{{ $t('account_settings.downloadunusedleavesreport') }}</button>
                </div>
            </div>
        </div>
        <div class="boxi">
            <div class="textinBox">
                <h4>{{ $t('account_settings.employeepromotionsreports') }}</h4>
                <p>{{ $t('account_settings.employeepromotionsreportsdc') }}</p>
                <hr />
                <form class="form-type-1" @submit.prevent="downloadReport('employee_promotions_report')">
                    <div class="text-center">
                        <button class="site_btn btn_purple1" type="submit">{{ $t('account_settings.downloadreport') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
    inject: {},

    components: {},

    computed: {},

    watch: {},

    data() {
        return {}
    },

    methods: {
        downloadReport: function (reportType) {
            this.$store
                .dispatch('company_data/download_report', { reportType })
                .then((response) => {
                    if (reportType === 'employee_report') {
                        const dataResponse = response.data.original;
                        const wb = XLSX.utils.book_new()
                        const ws = XLSX.utils.aoa_to_sheet([[
                            "Employee ID",
                            "Employee name",
                            "Employee e-mail",
                            "Active/inactive",
                            "Job position",
                            "Department",
                            "Sub-department",
                            "Job location",
                            "Reporting manager",
                            "Status (intern/employee)",
                            "Date of birth",
                            "Gender",
                            "Telephone",
                            "Employee personal ID",
                            "Place of birth (country)",
                            "Place of birth (city)",
                            "Address",
                            "Current address",
                            "Marital status",
                            "Professional certifications",
                            "Employment date",
                            "Contract start date",
                            "Contract validity",
                            "Salary gross",
                            "Bank name",
                            "Bank account",
                            "Qualification",
                            "Orientation",
                            "Notes"
                        ]])
                        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                        const rows = [];

                        console.log("dataResponse", dataResponse);

                        dataResponse.forEach((item) => {
                            const row = [
                                item.idcardno, 
                                `${item.name} ${item.surname}`, 
                                item.email, 
                                `${item.is_active ? 'Active' : 'Inactive'}`,
                                item.position.name,
                                item.department.name,
                                '',
                                item.workplace_location,
                                item.reporting_manager,
                                `${item.internship == 1 ? 'Intern' : 'Employee'}`,
                                item.date_of_birth,
                                item.gender,
                                item.phone_number,
                                item.personal_id,
                                item.country,
                                item.city,
                                item.address,
                                item.current_address,
                                `${item.marital_status === 'married' ? 'Married' : 'Not Married'}`,
                                item.professional_certifications,
                                item.started_job,
                                item.contract_start_date,
                                `${item.indefinite_term == 1 ? 'Indefinite' : item.contract_end_date}`,
                                item.gross_salary,
                                item.employee_bank_name,
                                item.employee_bank_account_number,
                                item.qualification,
                                item.orientation,
                                item.notes
                            ]
                            rows.push(row)
                        })

                        const newLine2 = rows
                        XLSX.utils.sheet_add_aoa(ws, newLine2, { origin: -1 })

                        XLSX.writeFile(wb, `HrBee_Employee_Report_${new Date().toLocaleDateString()}.xlsx`)
                    } else {
                        if (response.status != 200) throw response.data[0]
                        const blob = new Blob([response.data.content], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                        const link = document.createElement('a')
                        link.href = URL.createObjectURL(blob)
                        link.download = response.data.filename
                        link.click()
                        URL.revokeObjectURL(link.href)
                    }
                })
                .catch((error) => {
                    alert(`Server error! ${error}`)
                })
        },
    },

    created() {},
}
</script>
<style>
.boxi:not(:first-child) {
    margin-top: 20px;
}
</style>
