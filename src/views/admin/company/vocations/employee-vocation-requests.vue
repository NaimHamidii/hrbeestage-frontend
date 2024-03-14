<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon bg--pushimet">
                    <i class="hr-icon-ios-calendar"></i>
                </div>
                <div class="title">
                    <h5>{{ $t('vacations_module.vacationsrequest') }}</h5>
                </div>
            </div>

            <ul class="header_menu_right" v-if="all_company_vacation_leave_requests.total > 0">
                <li>
                    <employee-vacation-search searchType="employee_vacation_search" @searchEmployee="searchEmployee" @reset_search="reset_search" />
                </li>
                <li>
                    <a @click="showVacationsFilter" class="outlined_link outline_purple">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" viewBox="0 0 971.986 971.986" style="enable-background: new 0 0 971.986 971.986" xml:space="preserve">
                            <path
                                d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
                                            c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
                                            c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"
                            />
                        </svg>
                        Filter vacations
                    </a>
                </li>
            </ul>
        </div>
        <template v-if="current_active_vacation_filters.length > 0">
            <ul class="widget_filters relative">
                <li class="menu_filter_item clear_filters" @click="deleteFilters()">Clear filters</li>
                <li class="menu_filter_item" v-for="filter_item in current_active_vacation_filters" :key="filter_item.filter_value">
                    <!-- Filter by Degree -->
                    <template v-if="filter_item.filter_name == 'filter_vacation_status'"> Status: {{ $t('VacationStatus.' + filter_item.filter_value) }} </template>
                    <!-- Filter by Fi
                        eld of study -->
                    <template v-if="filter_item.filter_name == 'filter_vacation_type'"> Type: {{ $t('VacationLeaveTypes.' + filter_item.filter_value) }} </template>
                </li>
            </ul>
        </template>

        <div class="company_employee_listings">
            <div v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </div>
            <div v-else>
                <template v-if="search_active">
                    <div class="component_loader">
                        <spinner :status="search_active"></spinner>
                    </div>
                </template>
                <template v-else>
                    <template v-if="all_company_vacation_leave_requests.total > '0'">
                        <b-row>
                            <template v-for="employee_item in all_company_vacation_leave_requests.data" :key="employee_item.job_application_id">
                                <div class="employee_item">
                                    <div class="interview_header">
                                        <div class="column candidate_image">
                                            <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                <img src="/images/user/no-image.png" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" />
                                            </template>
                                            <div class="current_allowance" v-b-tooltip.hover title="Remaining yearly leave days">
                                                <span>
                                                    {{ employee_item.remaining_yearly_leaves }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="column candidate_details">
                                            <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>
                                            <b-badge @click="view_profile(employee_item.employee_id)" variant="green" class="hide_responsive">View calendar</b-badge>
                                        </div>
                                    </div>

                                    <div class="employee_info_body">
                                        <ul>
                                            <li v-b-tooltip.hover title="Vacation start date">
                                                <p class="table-column-description">Start date</p>
                                                {{ employee_item.start_date | moment('DD/MM/YYYY') }}
                                            </li>
                                            <li v-b-tooltip.hover title="Vacation end date">
                                                <p class="table-column-description">End date</p>
                                                {{ employee_item.end_date | moment('DD/MM/YYYY') }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Total days</p>
                                                {{ employee_item.number_of_days }} days
                                            </li>

                                            <li>
                                                <p class="table-column-description">Vacation type</p>

                                                <template v-if="employee_item.type == 'yearly_leave'">
                                                    {{ $t('VacationLeaveTypes.yearly_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'sick_leave'">
                                                    {{ $t('VacationLeaveTypes.sick_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'marriage_leave'">
                                                    {{ $t('VacationLeaveTypes.marriage_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'maternity_leave'">
                                                    {{ $t('VacationLeaveTypes.maternity_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'daily_leave'">
                                                    {{ $t('VacationLeaveTypes.daily_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'death_leave'">
                                                    {{ $t('VacationLeaveTypes.death_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'paternity_leave'">
                                                    {{ $t('VacationLeaveTypes.paternity_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'blood_donation_leave'">
                                                    {{ $t('VacationLeaveTypes.blood_donation_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'compensation_leave'">
                                                    {{ $t('VacationLeaveTypes.compensation_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'overtime_compensation_leave'">
                                                    {{ $t('VacationLeaveTypes.overtime_compensation_leave') }}
                                                </template>
                                                <template v-if="employee_item.type == 'unpaid_leave'">
                                                    {{ $t('VacationLeaveTypes.unpaid_leave') }}
                                                </template>
                                            </li>

                                            <li>
                                                <p class="table-column-description">Reason</p>

                                                <span class="cursor" :id="'application_status-' + employee_item.leave_id">View reason</span>

                                                <b-popover placement="left" :target="'application_status-' + employee_item.leave_id" triggers="hover focus">
                                                    <template slot="title">Vacation reason</template>
                                                    <p>{{ employee_item.reason }}</p>
                                                </b-popover>
                                            </li>

                                            <template v-if="employee_item.request_status == 'new_status'">
                                                <li class="current_allowance_status" :class="'status-' + employee_item.request_status">
                                                    {{ $t('VacationStatus.pending_department_lead_approval_action') }}
                                                </li>
                                            </template>

                                            <template v-if="employee_item.request_status == 'rejected_request'">
                                                <li class="current_allowance_status" :class="'status-' + employee_item.request_status" :id="'application_status-reject_reason' + employee_item.employee_id">
                                                    {{ $t('VacationStatus.rejected_request_action') }}
                                                    <b-popover placement="left" :target="'application_status-reject_reason' + employee_item.employee_id" triggers="hover focus">
                                                        <template slot="title"> {{ $t('VacationStatus.rejected_request_reason') }}</template>
                                                        <p>{{ employee_item.rejected_reason }}</p>
                                                    </b-popover>
                                                </li>
                                            </template>

                                            <template v-if="employee_item.request_status == 'approved_request'">
                                                <li class="current_allowance_status" :class="'status-' + employee_item.request_status">
                                                    {{ $t('VacationStatus.approved_request_action') }}
                                                </li>
                                            </template>

                                            <li>
                                                <div class="listing_menu_action">
                                                    <b-dropdown variant="link" size="lg" no-caret right>
                                                        <template slot="button-content">
                                                            <div class="header_user_profile">
                                                                <svg width="25px" height="7px" viewBox="0 0 25 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                                                                    <desc>Created with Sketch.</desc>
                                                                    <defs></defs>
                                                                    <g id="Page-1" stroke="none" stroke-width="1">
                                                                        <g id="Business-Recruitment-Konkurset" transform="translate(-1435.000000, -431.000000)">
                                                                            <g id="Jobs-applied-Copy-8" transform="translate(342.000000, 213.000000)">
                                                                                <g id="Group-6-Copy-3" transform="translate(2.000000, 209.000000)">
                                                                                    <g id="Single-post-">
                                                                                        <g id="Group-11" transform="translate(1091.000000, 9.000000)">
                                                                                            <circle id="Oval-5" cx="3.5" cy="3.5" r="3.5"></circle>
                                                                                            <circle id="Oval-5-Copy" cx="12.5" cy="3.5" r="3.5"></circle>
                                                                                            <circle id="Oval-5-Copy-2" cx="21.5" cy="3.5" r="3.5"></circle>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </template>
                                                        <b-dropdown-item @click="approveVacations(employee_item.leave_id, employee_item.employee_id)" class="table-action" v-if="employee_item.request_status == 'new_status'">
                                                            <svg width="14px" viewBox="0 0 427 427" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g id="checked-(1)" fill="#6AC259" fill-rule="nonzero">
                                                                        <path d="M213.333,0 C95.518,0 0,95.514 0,213.333 C0,331.152 95.518,426.666 213.333,426.666 C331.161,426.666 426.666,331.152 426.666,213.333 C426.666,95.514 331.157,0 213.333,0 Z M174.199,322.918 L80.264,228.987 L111.573,197.678 L174.199,260.3 L315.093,119.402 L346.402,150.711 L174.199,322.918 Z" id="Shape"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>

                                                            <p>Approve vacation</p>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item @click="openRejectVacancyModal(employee_item.leave_id, employee_item.employee_id)" class="table-action" v-if="employee_item.request_status == 'new_status'">
                                                            <svg width="14px" viewBox="0 0 430 430" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <g id="cancel">
                                                                        <circle id="Oval" fill="#E24C4B" cx="215" cy="215" r="215"></circle>
                                                                        <path d="M312.9615,312.9615 C304.910167,321.012833 291.490021,321.012833 283.438688,312.9615 L215,244.522812 L146.561312,312.9615 C138.509979,321.012833 125.089833,321.012833 117.0385,312.9615 C108.987167,304.910167 108.987167,291.490021 117.0385,283.438688 L185.477188,215 L117.0385,146.561312 C108.987167,138.509979 108.987167,125.089833 117.0385,117.0385 C125.089833,108.987167 138.509979,108.987167 146.561312,117.0385 L215,185.477188 L283.438688,117.0385 C291.490021,108.987167 304.910167,108.987167 312.9615,117.0385 C321.012833,125.089833 321.012833,138.509979 312.9615,146.561312 L244.522812,215 L312.9615,283.438688 C321.012833,291.490021 321.012833,304.909224 312.9615,312.9615 Z" id="Path" fill="#FFFFFF"></path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <p>Reject vacation</p>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item @click="DeleteVacancy(employee_item.leave_id, employee_item.employee_id)" class="table-action">
                                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" viewBox="0 0 612 612" style="enable-background: new 0 0 612 612" xml:space="preserve">
                                                                <path
                                                                    d="M561,76.5H178.5c-17.85,0-30.6,7.65-40.8,22.95L0,306l137.7,206.55c10.2,12.75,22.95,22.95,40.8,22.95H561
                                                                                                    c28.05,0,51-22.95,51-51v-357C612,99.45,589.05,76.5,561,76.5z M484.5,397.8l-35.7,35.7L357,341.7l-91.8,91.8l-35.7-35.7
                                                                                                    l91.8-91.8l-91.8-91.8l35.7-35.7l91.8,91.8l91.8-91.8l35.7,35.7L392.7,306L484.5,397.8z"
                                                                />
                                                            </svg>
                                                            <p>Delete request</p>
                                                        </b-dropdown-item>
                                                    </b-dropdown>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </b-row>

                        <b-pagination v-if="all_company_vacation_leave_requests.total > '10'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="all_company_vacation_leave_requests.total" v-model="all_company_vacation_leave_requests.current_page" :per-page="all_company_vacation_leave_requests.per_page"> </b-pagination>
                    </template>
                    <template v-else>
                        <template v-if="search_error">
                            <div class="status_text">
                                <p>You don't have any request with this search or filter</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="box cv_status m-b-20">
                                <div class="status_image">
                                    <img src="/images/vacation-settings.svg" width="30px" />
                                </div>
                                <div class="status_text">
                                    <h5>You don't have any vacation request.</h5>
                                    <p>A list of vacation requests will be listed here if an employee requests a vacation.</p>
                                </div>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
            <!-- end of template -->
        </div>

        <vacation-filters ref="vacation_filters" @getVacationsWithFilter="getVacationsWithFilter" />

        <!-- MODALS -->
        <div class="profile_edit_modals performance_modal" v-if="modal_visible">
            <!-- Add Performance Modal -->
            <div class="modal_item" v-if="reject_vacation_request_modal">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1" @submit.prevent="rejectVacancy">
                    <h5>Rejection reason</h5>
                    <p class="m-b-30">If you rejected this vacancy before and if you provide a new vacancy rejection, it will replace the last rejection reason.</p>

                    <div class="form__group last-input">
                        <label for="vacancy_request_reject_reason" class="form__label bold">Rejection reason details</label>

                        <textarea v-validate="'required'" class="form__textarea" id="vacancy_request_reject_reason" type="text" placeholder="Please type the rejection reason below." v-model="vacancy_request_reject_reason" name="vacancy_request_reject_reason"></textarea>
                        <span v-if="submitted && errors.has('vacancy_request_reject_reason')" class="form-error-notification error">
                            {{ $t('inputError.required') }}
                        </span>
                    </div>

                    <div class="modal_footer_buttons">
                        <div class="button_spinner" v-if="spinner_updating">
                            <spinner :status="spinner_updating"></spinner>
                        </div>
                        <ul>
                            <li>
                                <button type="reset" @click="closeModal">
                                    {{ $t('button.cancel') }}
                                </button>
                            </li>

                            <li>
                                <button class="refuzo" type="submit">
                                    {{ $t('button.reject') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END Add Performance Modal -->
        </div>
    </div>
</template>

<script>
import employeeVacationSearch from '@company_components/jobs/data-search'
import employeeVacationFilter from '@company_components/vacations/filter-vacation-requests'

export default {
    computed: {
        all_company_vacation_leave_requests: function () {
            if (this.$store.getters['company_data/employee/vacations/get_vacation_leave_requests']) {
                return this.$store.getters['company_data/employee/vacations/get_vacation_leave_requests']
            }
        },
    },
    watch: {
        all_company_vacation_leave_requests: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            search_active: false,
            search_error: false,

            // Modal related
            modal_visible: false,
            reject_vacation_request_modal: false,

            // Form related
            spinner_updating: false,
            submitted: false,

            vacancy_leave_reject_id: '',
            vacancy_leave_reject_employee_id: '',
            vacancy_request_reject_reason: '',
            /* Filters */
            current_active_vacation_filters: [],
        }
    },
    methods: {
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/approve_requested_vacation', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        view_profile: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/vocations' })
        },
        approveVacations(vacation_request_id, vacation_employee_id_requested) {
            this.component_loading = true
            let submit_data = {
                leave_id: vacation_request_id,
                employee_id: vacation_employee_id_requested,
                request_status: 'pending_hr_approval',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/approve_requested_vacation', submit_data).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        openRejectVacancyModal(vacation_request_id, vacation_employee_id_requested) {
            this.vacancy_leave_reject_id = vacation_request_id
            this.vacancy_leave_reject_employee_id = vacation_employee_id_requested
            this.modal_visible = true
            this.reject_vacation_request_modal = true
        },
        DeleteVacancy(vacation_request_id, vacation_employee_id_requested) {
            let submit_data = {
                leave_id: vacation_request_id,
                employee_id: vacation_employee_id_requested,
            }
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/delete_requested_vacation', submit_data).then((response) => {
                    this.component_loading = false
                })
            }, 300)
        },
        closeModal() {
            this.modal_visible = false
            this.reject_vacation_request_modal = false
        },
        rejectVacancy() {
            this.spinner_updating = true
            this.submitted = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let vacancy_data = {
                        leave_id: this.vacancy_leave_reject_id,
                        employee_id: this.vacancy_leave_reject_employee_id,
                        request_status: 'rejected_request',
                        rejected_reason: this.vacancy_request_reject_reason,
                    }
                    this.component_loading = true
                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/vacations/reject_requested_vacation', vacancy_data).then((response) => {
                            this.component_loading = false
                            this.spinner_updating = false
                            this.vacancy_leave_reject_id = ''
                            this.vacancy_leave_reject_id = ''
                            this.vacancy_request_reject_reason = ''
                            this.closeModal()
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        searchEmployee: function (query) {
            this.search_error = true
            this.search_active = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/search_employee_vacation_requests_with_name_surname', SearchData).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        reset_search: function () {
            this.search_error = false
            this.search_active = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/get_all_employee_vacation_requests', this.current_created_job_id).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        showVacationsFilter: function () {
            this.$refs.vacation_filters.open_modal()
        },
        getVacationsWithFilter: function (status, type) {
            this.current_active_vacation_filters = []

            this.search_error = true
            this.search_active = true

            let vacation_type_filter_exists = false
            let vacation_status_filter_exists = false

            if (type.vacationType !== '') {
                if (typeof type.vacationType.value !== 'undefined') {
                    vacation_type_filter_exists = true
                    this.current_active_vacation_filters.push({
                        filter_name: 'filter_vacation_type',
                        filter_value: type.vacationType.value,
                    })
                }
            }
            if (status.vacationStatus !== '') {
                if (typeof status.vacationStatus.value !== 'undefined') {
                    vacation_status_filter_exists = true
                    this.current_active_vacation_filters.push({
                        filter_name: 'filter_vacation_status',
                        filter_value: status.vacationStatus.value,
                    })
                }
            }

            let filter_data = {
                filter_vacationStatus: vacation_status_filter_exists ? status.vacationStatus.value : '',
                filter_vacationType: vacation_type_filter_exists ? type.vacationType.value : '',
            }
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/filter_employee_vacation_requests', filter_data).then((response) => {
                    this.search_active = false
                    this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                })
            }, 200)
        },
        deleteFilters: function () {
            this.current_active_vacation_filters = []
            this.search_error = false
            this.search_active = true
            this.$refs.vacation_filters.reset()

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/get_all_employee_vacation_requests').then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/vacations/get_all_employee_vacation_requests').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        'employee-vacation-search': employeeVacationSearch,
        'vacation-filters': employeeVacationFilter,
    },
}
</script>

<style lang="scss" scoped>
.current_allowance {
    position: absolute;
    top: -4px;
    right: -4px;

    span {
        width: 25px;
        height: 25px;
        z-index: 999;
        display: block;
        border-radius: 50px;
        background: #f29543;
        text-align: center;
        color: #fff;
        font-weight: 500;
        font-size: 12px;
        line-height: 25px;
    }
}
.current_allowance_status {
    position: relative;
    background: #34cc62;
    text-align: center;
    width: 100%;
    border-radius: 3px;
    color: #fff;
    bottom: 0;
    font-size: 13px;
    padding: 2px 10px;

    &.status-new_status {
        background: #f29543;
    }
    &.status-rejected_request {
        background: #f42525;
    }
}
.company_employee_listings .employee_item .interview_header .column.candidate_details {
    vertical-align: middle;
}
.vacation_requested_dates {
    text-align: left !important;
    max-width: 290px !important;
    vertical-align: middle;
    width: 290px !important;
    ul {
        padding: 0 !important;
        margin: 0 !important;

        li {
            background: #f29543 !important;
            color: #fff;
            padding: 2px 5px;
            border-radius: 4px;
            margin-bottom: 2px;
            width: 51px !important;
            text-align: center;
            display: inline-block !important;
            margin-right: 0 !important;
            margin-right: 2px !important;
        }
    }
}
</style>
