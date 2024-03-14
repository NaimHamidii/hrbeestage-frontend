<template>
    <div>
        <div class="page_content">
            <div class="boxi">
                <h4 class="form-title text-center">
                    {{ $t('vacations_module.manageempvacations') }}
                </h4>
                <ul class="inlineListinJobDetails text-center">
                    <li @click="updateSelectedTab('on_vacation')" :class="selected_tab == 'on_vacation' ? 'activeli' : ''">
                        {{ $t('vacations_module.onvacation') }}
                    </li>
                    <li @click="updateSelectedTab('pending_department_lead_approval')" :class="selected_tab == 'pending_department_lead_approval' ? 'activeli' : ''">
                        {{ $t('vacations_module.pendingdepartmentleadapproval') }}
                    </li>
                    <li @click="updateSelectedTab('pending_hr_approval')" :class="selected_tab == 'pending_hr_approval' ? 'activeli' : ''">
                        {{ $t('vacations_module.pendinghrapproval') }}
                    </li>
                    <li @click="updateSelectedTab('approved_request')" :class="selected_tab == 'approved_request' ? 'activeli' : ''">
                        {{ $t('vacations_module.approved') }}
                    </li>
                    <li @click="updateSelectedTab('rejected_request')" :class="selected_tab == 'rejected_request' ? 'activeli' : ''">
                        {{ $t('vacations_module.rejected') }}
                    </li>
                </ul>
            </div>

            <div class="row" v-if="selected_tab != 'on_vacation'">
                <div class="offset-md-6 col-6">
                    <div class="form-type-1 d-flex justify-content-end" style="margin-bottom: -40px !important">
                        <div class="form__group mr-2">
                            <multiselect name="year" :placeholder="$t('employee_module.selectyear')" @input="getVacations" v-model="selected_year" :options="year_options" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group mr-2">
                            <multiselect name="month" :placeholder="$t('employee_module.selectmonth')" @input="getVacations" v-model="selected_month" :options="month_options" label="name" track-by="value"></multiselect>
                        </div>
                        <div class="form__group">
                            <multiselect name="month" :placeholder="$t('employee_module.selecttomonth')" @input="getVacations" v-model="selected_to_month" :options="month_options" label="name" track-by="value"></multiselect>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <div v-if="selected_tab == 'on_vacation'">
                    <div class="boxi m-t-20">
                        <div class="row on-vacation-header">
                            <h5 v-for="weekDay in company_employees_on_vacation_next_week" class="col text-center">{{ weekDay.date | dateFormat }}</h5>
                        </div>
                        <div class="row on-vacation-body">
                            <div v-for="weekDay in company_employees_on_vacation_next_week" class="col">
                                <template v-if="!weekDay.employees_on_vacation.length"><div class="mt-2 text-center">-</div></template>
                                <template v-else>
                                    <b-badge v-for="employee in weekDay.employees_on_vacation" variant="success" class="mt-2">{{ employee.name }} {{ employee.surname }}</b-badge>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="company_leaves && company_leaves.length">
                    <div v-for="item in company_leaves" :key="item.leave_id">
                        <div class="boxi m-t-20 action-img" v-if="hasAccessToThisEmployeeDepartment(item)">
                            <template v-if="hasAccessOnlyForHeadOfDepartments(item)">
                                <template v-if="actions && actionId === item.leave_id">
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIconEmpVacations" />
                                </template>
                                <template v-else>
                                    <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openActions(item.leave_id)" class="actionIconEmpVacations" />
                                </template>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="row">
                                            <div class="col-2">
                                                <template v-if="item.image_url == '' || item.image_url == null || item.image_url == undefined">
                                                    <img src="/images/user/no-image.png" class="imgCandidate" />
                                                </template>
                                                <template v-else>
                                                    <img :src="SERVER_URL + IMAGES_FILES + item.image_url" class="imgCandidate" />
                                                </template>
                                            </div>
                                            <div class="col-10">
                                                <div class="textinBoxCandidateDetails">
                                                    <h4>{{ item.employee.name }} {{ item.employee.surname }}</h4>
                                                    <h5>{{ item.employee.position.name }}</h5>
                                                    <h5>{{ item.employee.department.name }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="d-flex justify-content-around">
                                            <div class="text-center vacationDet">
                                                <h5>{{ `Total requested ${item.leave_definition.base_definition.name} days` }}</h5>
                                                <h5>{{ item.number_of_days }}</h5>
                                            </div>
                                            <div class="text-center vacationDet">
                                                <h5>{{ $t('vacations_module.halfdays') }}</h5>
                                                <template v-if="item.requested_half_days">
                                                    <h5>{{ $t(`common.yes`) }}</h5>
                                                </template>
                                                <template v-else>
                                                    <h5>{{ $t('common.no') }}</h5>
                                                </template>
                                            </div>
                                            <div class="text-center vacationDet">
                                                <h5>{{ `Remaining ${item.leave_definition.base_definition.name}` }}</h5>
                                                <h5>{{ roundToNearestHalf(item.leave_definition.leave_days_accumulated_total, item.leave_definition.definition_half_days == 0) }}</h5>
                                            </div>
                                            <div class="text-center vacationDet">
                                                <h5>{{ $t('vacations_module.vacationyear') }}</h5>
                                                <h5>{{ item.leave_of_year }}</h5>
                                            </div>
                                            <div class="text-center vacationDet">
                                                <h5>{{ $t('vacations_module.vacationmonth') }}</h5>
                                                <h5>{{ getVacationMonthName(item.start_date) }}</h5>
                                            </div>
                                            <div class="text-center vacationDet">
                                                <h5>{{ $t('vacations_module.vacationtype') }}</h5>
                                                <h5>{{ item.leave_definition.base_definition.name }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <template v-if="actions && actionId === item.leave_id">
                                    <div class="row col-md-9 offset-md-3 m-t-20">
                                        <div class="col text-center vacationDet">
                                            <h5>{{ $t('employee_module.startdate') }}</h5>
                                            <h5 class="insideText">{{ item.start_date | moment('DD/MM/YYYY') }}</h5>
                                        </div>
                                        <div class="col text-center vacationDet">
                                            <h5>{{ $t('employee_module.enddate') }}</h5>
                                            <h5 class="insideText">{{ item.end_date | moment('DD/MM/YYYY') }}</h5>
                                        </div>
                                        <div class="col text-center vacationDet">
                                            <h5>{{ $t('vacations_module.reason') }}</h5>
                                            <h5 class="insideText">{{ item.reason }}</h5>
                                        </div>
                                    </div>
                                    <div v-if="hasWriteAccessToLeaveRequest(item)">
                                        <br />
                                        <hr />
                                        <template v-if="item.request_status != 'rejected_request' && item.request_status != 'approved_request'">
                                            <form class="d-flex justify-content-center col-md-12 form-type-1">
                                                <div class="form__group col-md-3">
                                                    <input type="text" class="form__input" placeholder="Reject reason" name="reject_reason" id="reject_reason" v-model="reject_reason" />
                                                </div>
                                            </form>
                                        </template>
                                        <div class="d-flex justify-content-center">
                                            <template v-if="item.request_status != 'rejected_request' && item.request_status != 'approved_request'">
                                                <button type="button" class="site_btn btn_green m-r-10" @click="approveLeave(item.leave_id, item.employee_id, getStatus(item))">{{ $t('vacations_module.approvebtn') }}</button>
                                                <button type="button" class="site_btn btn_white m-r-10" @click="rejectLeave(item.leave_id, item.employee_id)">{{ $t('vacations_module.rejectbtn') }}</button>
                                            </template>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <br />
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="boxi m-t-20">
                        <div class="textinBox">
                            <div class="text-center">
                                <h4 v-if="selected_tab === 'pending_department_lead_approval'">{{ $t('vacations_module.nopendingdepartmentleadvacations') }}</h4>
                                <h4 v-else-if="selected_tab === 'rejected_request'">{{ $t('vacations_module.norejectedvacations') }}</h4>
                                <h4 v-else-if="selected_tab === 'pending_hr_approval'">{{ $t('vacations_module.nopendinghrapprovalvacations') }}</h4>
                                <h4 v-else-if="selected_tab === 'approved_request'">{{ $t('vacations_module.noapprovedvacations') }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const validLeaveTabs = ['on_vacation', 'pending_department_lead_approval', 'pending_hr_approval', 'rejected_request', 'approved_request']

        return {
            monthNames,
            validLeaveTabs,

            current_user_is_admin: false,

            selected_page: 1,

            selected_year: '',
            year_options: this.generateYearOptions(2020),
            valid_year_indices: this.generateYearOptions(2020, true),
            selected_month: '',
            selected_to_month: '',
            month_options: this.generateMonthOptions(monthNames),

            v_pending_department_lead_approval: true,
            v_pending_hr_approval: false,
            v_approved: false,
            v_rejected: false,
            status: '',

            component_loading: true,

            actions: false,
            actionId: '',

            reason: false,
            info: false,
            decision: false,
            reject_reason: '',
        }
    },

    computed: {
        employee_access: function () {
            if (this.$store.getters['company_data/employee/access/get_current_employee_access']) {
                console.log("asd", this.$store.getters['company_data/employee/access/get_current_employee_access'])
                return this.$store.getters['company_data/employee/access/get_current_employee_access']
            }
        },
        company_leaves: function () {
            if (this.$store.getters['company_data/employee/vacations/get_vacation_leave_requests']) {
                return this.$store.getters['company_data/employee/vacations/get_vacation_leave_requests']
            }
        },
        company_employees_on_vacation_next_week: function () {
            if (this.$store.getters['company_data/employee/vacations/employees_on_vacation_next_week']) {
                return this.$store.getters['company_data/employee/vacations/employees_on_vacation_next_week']
            }
        },
    },
    watch: {
        employee_access: function (new_value) {
            return new_value
        },
        company_leaves: function (newValue) {
            return newValue
        },
        company_employees_on_vacation_next_week: function (newValue) {
            return newValue
        },
    },

    filters: {
        dateFormat: function (string) {
            return moment(string).format('DD/MM/YY')
        },
    },

    methods: {
        getStatus(leaveRequest) {
            if (!leaveRequest || !leaveRequest.employee || leaveRequest.employee.department_id == null || leaveRequest.employee.department_id == undefined) return false
            if (this.employee_access.department_specific[leaveRequest.employee.department_id].vacations == 'write' && this.selected_tab == 'pending_department_lead_approval') {
                return 'pending_hr_approval'
            }
            if (this.employee_access.department_specific[leaveRequest.employee.department_id].vacations == 'write_for_head_of_departments' && this.selected_tab == 'pending_department_lead_approval') {
                return 'pending_hr_approval'
            }
        },

        hasWriteAccessToLeaveRequest(leaveRequest) {
            if (!leaveRequest || !leaveRequest.employee || leaveRequest.employee.department_id == null || leaveRequest.employee.department_id == undefined) return false
            if (this.employee_access.department_specific[leaveRequest.employee.department_id].vacations == 'write' && this.selected_tab == 'pending_department_lead_approval') {
                return true
            }
            if (this.employee_access.department_specific[leaveRequest.employee.department_id].vacations == 'write_for_head_of_departments' && this.selected_tab == 'pending_department_lead_approval') {
                return true
            }
            return false
        },

        hasAccessToThisEmployeeDepartment(leaveRequest) {
            if (!leaveRequest || !leaveRequest.employee || leaveRequest.employee.department_id == null || leaveRequest.employee.department_id == undefined) return false
            return this.employee_access.department_specific[leaveRequest.employee.department_id].vacations
        },

        hasAccessOnlyForHeadOfDepartments(leaveRequest) {
            if (this.employee_access.department_specific[leaveRequest.employee.department_id].vacations === 'write_for_head_of_departments') {
                if (leaveRequest.employee.position.head_of_department === 1) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        },

        getCurrentYear() {
            return new Date().getFullYear()
        },

        generateYearOptions(startingYear, valuesOnly = false) {
            let currentYear = this.getCurrentYear()
            const options = []
            while (currentYear >= startingYear) {
                if (valuesOnly) {
                    options.push(currentYear.toString())
                } else {
                    options.push({
                        name: currentYear.toString(),
                        value: currentYear.toString(),
                    })
                }
                currentYear--
            }
            return options
        },

        generateMonthOptions(monthNames) {
            return monthNames.map((monthName, i) => {
                return {
                    name: monthName,
                    value: i + 1,
                }
            })
        },

        getVacationMonthName(date) {
            const index = Number(date.split('-')[1]) - 1
            return this.monthNames[index]
        },

        approveLeave(vacation_request_id, vacation_employee_id_requested, status) {
            const submit_data = {
                leave_id: vacation_request_id,
                employee_id: vacation_employee_id_requested,
                request_status: status,
            }
            this.$store.dispatch('company_data/employee/vacations/approve_requested_vacation', submit_data).then((response) => {
                if (response && response.status === 404) {
                    this.$toast.warning(response.data.message, 'Warning', { timeut: 3000 })
                } else {
                    this.decision = false
                    this.actions = false
                    this.actionId = ''
                    this.$toast.success(this.$t('alerts_vacations_module.approvedvacation'), 'Success', { timeut: 3000 })
                    this.getVacations()
                }
            })
        },

        rejectLeave(vacation_request_id, vacation_employee_id_requested) {
            let vacancy_data = {
                leave_id: vacation_request_id,
                employee_id: vacation_employee_id_requested,
                request_status: 'rejected_request',
                rejected_reason: this.reject_reason,
            }

            let errors = 0

            if (this.reject_reason == '' || this.reject_reason == null) {
                document.getElementById('reject_reason').focus()
                errors++
            }

            if (errors < 1) {
                this.$store.dispatch('company_data/employee/vacations/reject_requested_vacation', vacancy_data).then((response) => {
                    this.actions = false
                    this.actionId = ''
                    this.reject_reason = ''
                    this.$toast.error(this.$t('alerts_vacations_module.rejectedvacation'), 'Success', { timeut: 3000 })
                    this.getVacations()
                })
            } else {
                this.$toast.warning(this.$t('alerts_vacations_module.rejectreason'), 'Warning', { timeut: 3000 })
            }
        },

        getDecision() {
            this.decision = true
            this.reason = false
            this.info = false
        },

        getReason() {
            this.reason = true
            this.info = false
            this.decision = false
        },

        getInfo() {
            this.info = true
            this.reason = false
            this.decision = false
        },

        cancelActions() {
            this.actions = false
        },

        openActions(id) {
            this.actionId = id
            this.actions = true
        },

        updateSelectedTab(tab) {
            this.selected_tab = tab
            if (tab == 'on_vacation') {
                this.updateUrl()
                this.getEmployeesOnVacationNextWeek()
            } else {
                this.getVacations()
            }
        },

        updateUrl() {
            const query = {
                tab: this.selected_tab,
            }

            if (this.selected_tab != 'on_vacation') {
                if (this.selected_year) {
                    query.year = this.selected_year.value
                }

                if (this.selected_month) {
                    query.month = this.selected_month.value
                }

                if (this.selected_to_month) {
                    query.to_month = this.selected_to_month.value
                }
            }

            history.pushState({}, null, this.$route.path + '?' + new URLSearchParams(query).toString())
        },

        updateFiltersFromUrl() {
            const queryParams = new URL(document.location).searchParams
            const selectedTab = queryParams.get('tab')
            const year = queryParams.get('year')
            const month = queryParams.get('month')
            const to_month = queryParams.get('to_month')

            if (selectedTab !== undefined && this.validLeaveTabs.includes(selectedTab)) {
                this.selected_tab = selectedTab
            } else {
                this.selected_tab = 'on_vacation'
            }

            if (year !== undefined) {
                const index = this.valid_year_indices.indexOf(year)
                if (index > -1) this.selected_year = this.year_options[index]
            }

            if (month !== undefined) {
                if (month > 0 && month < 13) {
                    this.selected_month = this.month_options[month - 1]
                }
            }

            if (to_month !== undefined) {
                if (to_month > 0 && to_month < 13) {
                    this.selected_to_month = this.month_options[to_month - 1]
                }
            }
        },

        getVacations() {
            this.component_loading = true
            const { selected_tab, selected_year, selected_month, selected_page, selected_to_month } = this
            const filterData = {
                request_status: selected_tab,
                year: selected_year ? selected_year.value : null,
                month: selected_month ? selected_month.value : null,
                to_month: selected_to_month ? selected_to_month.value : null,
                page: selected_page,
            }

            this.updateUrl()

            this.$store.dispatch('company_data/employee/vacations/filter_employee_vacation_requests', filterData).then(() => {
                this.component_loading = false
            })
        },

        getEmployeesOnVacationNextWeek() {
            this.component_loading = true

            this.$store.dispatch('company_data/employee/vacations/get_employees_on_vacation_next_week').then((response) => {
                this.component_loading = false
            })
        },

        roundToNearestHalf(number, floor = false) {
            if (typeof number != 'number') number = Number(number)
            if (floor) return Math.floor(number)
            return Math.round(number * 2) / 2
        },
    },

    created() {
        this.current_user_is_admin = localStorage.getItem('auth_usertype') == 'company'

        this.updateFiltersFromUrl()

        if (this.selected_tab == 'on_vacation') {
            this.getEmployeesOnVacationNextWeek()
        } else {
            this.getVacations()
        }
    },
}
</script>

<style lang="scss">
.action-img {
    position: relative;
}

.actionIconEmpVacations {
    position: absolute;
    width: 30px;
    right: 10px;
    top: 5px;
}

.actionIconEmpVacations:hover {
    cursor: pointer;
}
</style>
