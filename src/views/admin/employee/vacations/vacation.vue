<template>
    <div class="page_content">
        <div class="row">
            <div class="col-12">
                <div class="form-type-1 d-flex justify-content-end" style="margin-bottom: -40px !important">
                    <div class="form__group" style="width: 130px; margin-right: 20px">
                        <multiselect name="year" :placeholder="$t('employee_module.selectyear')" @select="get_vacations" v-model="selected_year" :options="year_options" label="name" track-by="value" @input="onBookingVacationYearChange"></multiselect>
                    </div>
                    <button @click="open_book_time_off_modal()" class="site_btn btn_green m-t-10 m-b--10" style="height: 50px !important">
                        {{ $t('employee_module.booktimeoff') }}
                    </button>
                </div>
            </div>
        </div>

        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div v-if="leave_definitions.length > '0'">
                <div class="row">
                    <div class="col-md-4 m-t-20" v-for="leave_definition in leave_definitions" :key="leave_definition.id">
                        <div class="boxi">
                            <div class="vacation-item">
                                <h4>
                                    {{ leave_definition.base_definition.name }}
                                </h4>
                                <h4>{{ roundToNearestHalf(leave_definition.leave_days_used) }} / {{ roundToNearestHalf(Number(leave_definition.leave_days_accumulated_total), leave_definition.definition_half_days == 0) }}</h4>
                                <p class="vacation_history_button" v-if="parseFloat(leave_definition.leave_days_used) > 0" @click="showHistory(leave_definition.employee_leaves)">Shiko historine</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <br />
                <div class="box">
                    <div class="text-center">
                        {{ $t('emp_pages.no_general_vacations') }}
                    </div>
                </div>
            </div>

            <div class="boxi" v-if="history.length > 0">
                <div class="contract_item_list" v-for="(item, index) in history" :key="index">
                    <div class="employee_vacation_history_wrapper">
                        <div>
                            <p>{{ $t('employee_module.from') }}</p>
                            <h4>{{ item.start_date | moment('DD/MM/YYYY') }}</h4>
                        </div>
                        <div>
                            <p>{{ $t('employee_module.upto') }}</p>
                            <h4>{{ item.end_date | moment('DD/MM/YYYY') }}</h4>
                        </div>
                        <div>
                            <p>{{ $t('employee_module.total_days') }}</p>
                            <h4>{{ item.number_of_days }}</h4>
                        </div>
                        <button v-if="item.request_status === 'approved_request'" class="site_btn btn_purple" @click="showPrintModal(item.leave_id)">{{ $t('employee_module.download') }}</button>
                    </div>
                </div>
            </div>

            <vue-calendar class="m-t-20" :show-limit="3" :events="employeeCalendarEvents" :disable="disabledDates"></vue-calendar>
        </template>

        <!-- MODAL -->
        <div class="profile_edit_modals book_time_off_modal" v-if="book_time_off_modal" :class="booking_modal_spinner_loading ? 'loading' : ''">
            <div class="modal_item">
                <b-spinner label="Spinning"></b-spinner>
                <div class="close_modal m-t-10 m-r-10" @click="closeModal">
                    <img src="/images/close.svg" width="20px" />
                </div>

                <form class="form-type-1" @submit.prevent="add_new_booking">
                    <div class="textinBox">
                        <h4>{{ $t('employee_module.booktimeoff') }}</h4>
                        <p class="m-b-30">
                            {{ $t('employee_module.booktimeofffromcompany') }}
                        </p>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="vacationYear" class="form__label2 bold">{{ $t('employee_module.vacationyear') }} <span class="required">(*)</span></label>
                            <multiselect name="vacation_year" :placeholder="$t('employee_module.selectyear')" v-validate="'required'" v-model="vacation_year" :options="year_options" label="name" track-by="value" @input="onBookingVacationYearChange"></multiselect>
                            <span v-if="submitted && errors.has('vacation_year')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="vacationType" class="form__label2 bold">{{ $t('employee_module.vacationtype') }}</label>
                            <multiselect v-validate="'required'" id="vacationType" name="vacationType" v-model="vacationType" :options="vacationTypeOptions" :placeholder="$t('employee_module.selectvacationtype')" label="name" track-by="value" @input="onBookingVacationTypeChange"></multiselect>
                            <span v-if="submitted && errors.has('vacationType')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>
                    <template v-if="vacationTypeOptions && vacationTypeOptions.length">
                        <template>
                            <div class="form__inline">
                                <div class="form__group">
                                    <br />
                                    <b-form-checkbox name="requested_half_days" v-model="requested_half_days" :disabled="!bookingAllowHalfDays" switch>
                                        {{ $t('vacations_module.halfdays') }}
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </template>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="vacation_start_data" class="form__label2 bold">{{ $t('employee_module.startdate') }}</label>
                                <datepicker :key="bookingDateFromKey" :disabledDates="disabledDatesForBookingFrom" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_start_data" placeholder="20/05/2020" v-model="vacation_start_data" name="vacation_start_data" @input="onBookingDateChange('from')" :open-date="bookingDateFromOpenDate"></datepicker>
                                <span v-if="submitted && errors.has('vacation_start_data')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <div class="form__group">
                                <label for="vacation_end_date" class="form__label2 bold">{{ $t('employee_module.enddate') }}</label>
                                <datepicker :key="bookingDateToKey" :disabledDates="disabledDatesForBookingTo" @input="onBookingDateChange('to')" :disabled="check_if_end_date_disable()" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_end_date" placeholder="20/05/2020" v-model="vacation_end_date" name="vacation_end_date" :open-date="bookingDateToOpenDate"></datepicker>
                                <span v-if="submitted && errors.has('vacation_end_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>

                        <div class="form__group">
                            <label for="vacation_request_reason" class="form__label2 bold">{{ $t('employee_module.reason') }}</label>

                            <textarea v-validate="'required'" class="form__textarea" id="vacation_request_reason" type="text" :placeholder="$t('employee_module.reasondc')" v-model="vacation_request_reason" name="vacation_request_reason"></textarea>
                            <span v-if="submitted && errors.has('vacation_request_reason')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>

                        <div class="text-center">
                            <button class="site_btn btn_green" type="submit">
                                {{ $t('employee_module.booktimeoff') }}
                            </button>
                        </div>
                    </template>
                </form>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="modal_download">
            <div class="modal_item">
                <div class="box">
                    <div class="close_modal" @click="modal_download = false">
                        <img src="/images/close.svg" width="20px" />
                    </div>
                    <div class="container m-t-b">
                        <div class="addExperienceSection">
                            <form class="form-type-1" @submit.prevent="printLeave">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="vacation" class="form__label2 bold">{{ $t('employee_module.selectvacationtemplate') }} <span class="required">(*)</span></label>
                                        <multiselect name="vacation" @select="onVacationSelect" v-model="vacation" :options="vacationOptions" :placeholder="$t('employee_module.selectvacationtemplate')" label="name" track-by="value"></multiselect>
                                    </div>
                                </div>
                                <div class="row mt-4 m-b--10">
                                    <div class="col-md-12 m-b--10">
                                        <div class="text-center">
                                            <button type="submit" class="site_btn btn_blue">
                                                {{ $t('btn.printbtn') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var momentBusinessDays = require('moment-business-days')
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
    components: {
        Multiselect,
        Datepicker,
    },

    inject: {
        $validator: '$validator',
    },

    computed: {
        leave_definitions: function () {
            if (this.$store.getters['company_data/employee/vacations/get_single_employee_leaves']) {
                return this.$store.getters['company_data/employee/vacations/get_single_employee_leaves']
            }
        },
    },

    watch: {
        leave_definitions: function (new_value) {
            for (const leaveDefinition of new_value) {
                this.vacationTypeOptions.push({
                    name: `${leaveDefinition.base_definition.name} (${Number(leaveDefinition.leave_days_left) + Number(leaveDefinition.leave_days_accumulated_yearly_bonus)} days left)`,
                    value: leaveDefinition.company_employee_leave_definitions_id,
                })
            }
            return new_value
        },
    },

    data() {
        const valid_year_indices = ['2024', '2023', '2022', '2021', '2020']

        const year_options = [
            {
                name: '2024',
                value: '2024',
            },
            {
                name: '2023',
                value: '2023',
            },
            {
                name: '2022',
                value: '2022',
            },
            {
                name: '2021',
                value: '2021',
            },
            {
                name: '2020',
                value: '2020',
            },
        ]

        const latest_year = year_options[0]

        return {
            component_loading: false,

            bookingDateFromKey: 0,
            bookingDateToKey: 0,

            bookingDateFromOpenDate: new Date(),
            bookingDateToOpenDate: new Date(),

            current_employee_id: '',

            // Modal related
            modal_visible: false,
            book_time_off_modal: false,
            submitted: false,

            // Book time off fields
            vacation_start_data: '',
            vacation_end_date: '',
            requested_half_days: false,
            disable_end_date: 0,
            vacationType: [],
            vacationTypeOptions: [],
            vacation_request_reason: '',

            disabledDates: {
                days: [6, 0],
            },

            disabledDatesForBookingFrom: {
                days: [],
                dates: [],
            },

            disabledDatesForBookingTo: {
                days: [],
                dates: [],
            },

            vacation_year: [],

            valid_year_indices,
            latest_year,
            selected_year: '',
            year_options,

            employeeCalendarEvents: [],

            bookingAllowHalfDays: false,

            booking_modal_spinner_loading: false,

            history: [],
            modal_download: false,
            vacation: [],
            vacationOptions: [],
            selected_leave_id: '',
            selected_template_id: '',
        }
    },

    methods: {
        showPrintModal: function (id) {
            this.modal_download = true
            this.selected_leave_id = id

            let data = {
                type: 'vacations',
                c_id: localStorage.getItem('employee_company_id'),
            }
            this.$store.dispatch('company_data/employee/documenttemplates/show_document_template', data).then((response) => {
                this.vacation = []
                this.vacationOptions = []

                response.data.forEach((e) => {
                    this.vacationOptions.push({
                        name: e.title,
                        value: e.id,
                    })
                })
            })
        },

        onVacationSelect: function (data) {
            this.selected_template_id = data.value
        },

        printLeave: function () {
            this.modal_download = false

            let data = {
                leave_id: this.selected_leave_id,
                employee_id: localStorage.getItem('employee_id'),
                template_id: this.selected_template_id,
                SERVER_URL: this.SERVER_URL,
                LEAVES_FOLDER: this.LEAVES_FOLDER,
            }

            this.$store.dispatch('company_data/employee/vacations/download_vacation', data).then((response) => {
                this.modal_download = false
            })
        },

        showHistory: function (data) {
            this.history = []
            this.history = data.filter((item) => item.request_status === 'approved_request')
        },

        onBookingVacationTypeChange: function (data) {
            for (const leaveDefinition of this.leave_definitions) {
                if (leaveDefinition.company_employee_leave_definitions_id == data.value) {
                    this.bookingAllowHalfDays = leaveDefinition.definition_half_days > 0
                    if (!this.bookingAllowHalfDays) this.requested_half_days = false
                    break
                }
            }
        },
        onBookingVacationYearChange: function (data) {
            this.history = []

            if (!data) {
                this.vacationTypeOptions = []
                return
            }

            this.booking_modal_spinner_loading = true
            this.vacationType = []
            this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: data.value }).then((response) => {
                this.vacationTypeOptions = []
                for (const leaveDefinition of response.data) {
                    this.vacationTypeOptions.push({
                        name: `${leaveDefinition.base_definition.name} (${Number(leaveDefinition.leave_days_left) + Number(leaveDefinition.leave_days_accumulated_yearly_bonus)} days left)`,
                        value: leaveDefinition.company_employee_leave_definitions_id,
                    })
                }

                this.booking_modal_spinner_loading = false
            })
        },
        onBookingDateChange: function (type) {
            if (type == 'from') {
                this.disabledDatesForBookingTo.to = this.vacation_start_data
                if (!this.vacation_end_date) {
                    this.bookingDateToOpenDate = new Date(this.vacation_start_data.getTime())
                }
                this.bookingDateToKey++
            } else {
                if (!this.vacation_start_data) {
                    this.bookingDateFromOpenDate = new Date(this.vacation_end_date.getTime())
                }
                this.disabledDatesForBookingFrom.from = this.vacation_end_date
                this.bookingDateFromKey++
            }
        },
        get_employee_approved_leaves: function () {
            let current_approved_vacations = []
            let data = {
                company_id: localStorage.getItem('employee_company_id'),
                employee_id: localStorage.getItem('auth.user_id'),
                employee_job_seeker_id: localStorage.getItem('employee_job_seeker_id'),
            }
            this.$store.dispatch('employee_data/vacations/get_all_single_employee_approved_vacations', data).then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    let current_index = response.data[i]
                    let title = current_index.leave_definition.base_definition.name
                    let start_date = current_index.start_date
                    let end_date = current_index.end_date
                    let reason = current_index.reason
                    let customClass = 'timeoff'
                    let type = 'timeoff'

                    current_approved_vacations.push({
                        start: new Date(start_date + 'T00:00:00'),
                        end: new Date(end_date + 'T00:00:00'),
                        title: title,
                        reason: reason,
                        classes: customClass,
                        type: type,
                        customDate: start_date,
                    })
                }
                current_approved_vacations.forEach((element) => {
                    this.employeeCalendarEvents.push(element)
                })
                this.component_loading = false
            })
        },
        get_company_public_holidays() {
            let data = {
                company_id: localStorage.getItem('employee_company_id'),
                employee_id: localStorage.getItem('auth.user_id'),
                employee_job_seeker_id: localStorage.getItem('employee_job_seeker_id'),
            }

            this.$store.dispatch('company_data/general_settings/get_company_general_settings').then((response) => {
                if (response.data.vacation_weekend_count) {
                    this.disabledDatesForBookingFrom = {
                        days: [],
                        dates: [],
                    };
                    this.disabledDatesForBookingTo = {
                        days: [],
                        dates: [],
                    };
                } else {
                    this.disabledDatesForBookingFrom = {
                        days: [6, 0],
                        dates: [],
                    };
                    this.disabledDatesForBookingTo = {
                        days: [6, 0],
                        dates: [],
                    };
                }

                this.$store.dispatch('employee_data/vacations/get_employee_public_holidays', data).then((response) => {
                    const current_holidays = []
                    for (var i = 0; i < response.data.length; i++) {
                        let current_index = response.data[i]

                        let title = current_index.public_holiday_name
                        let date = current_index.public_holiday_date
                        let customClass = 'holiday'
                        let type = 'holiday'

                        current_holidays.push({
                            start: new Date(date + 'T00:00:00'),
                            end: new Date(date + 'T00:00:00'),
                            title: title,
                            classes: customClass,
                            type: type,
                            customDate: date,
                        })

                        this.disabledDatesForBookingFrom.dates.push(new Date(current_index.public_holiday_date + 'T00:00:00'))
                        this.disabledDatesForBookingTo.dates.push(new Date(current_index.public_holiday_date + 'T00:00:00'))
                    }

                    momentBusinessDays.defineLocale('us', {
                        holidays: current_holidays,
                        holidayFormat: 'MM-DD-YYYY',
                        workingWeekdays: [1, 2, 3, 4, 5],
                    })
                })
            })
        },

        open_book_time_off_modal: function () {
            this.modal_visible = true
            this.book_time_off_modal = true
            this.history = []
        },

        check_if_end_date_disable: function () {
            if (this.disable_end_date == '1') {
                return true
            } else {
                return false
            }
        },

        closeModal: function () {
            this.modal_visible = false
            this.book_time_off_modal = false
        },

        add_new_booking() {
            if (this.booking_modal_spinner_loading) return
            this.submitted = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let start_date = this.vacation_start_data
                    start_date = this.$moment(start_date).format('YYYY-MM-DD')

                    let end_date = this.vacation_end_date
                    if (end_date != '') {
                        end_date = this.$moment(end_date).format('YYYY-MM-DD')
                    }

                    const daysDifference = this.$moment(start_date, 'YYYY-MM-DD').businessDiff(this.$moment(end_date, 'YYYY-MM-DD')) + 1

                    let submitted_vacation_data = {
                        employee_id: this.current_employee_id,
                        type: this.vacationType.name,
                        company_employee_leave_definitions_id: this.vacationType.value,
                        start_date: start_date,
                        end_date: end_date,
                        number_of_days: daysDifference,
                        requested_half_days: this.requested_half_days,
                        reason: this.vacation_request_reason,
                        leave_of_year: this.vacation_year.value,
                        request_status: 'pending_department_lead_approval',
                    }

                    this.$store
                        .dispatch('employee_data/vacations/company_book_time_off', submitted_vacation_data)
                        .then((response) => {
                            if (response.status === 200) {
                                this.$toast.success(this.$t('alerts_employee_module.vacationfromcompany'), 'Success', { timeut: 3000 })
                            }
                            if (response.status === 404) {
                                this.$toast.warning(response.data.message, 'Warning', { timeut: 3000 })
                            }

                            this.$validator.pause()
                            setTimeout(() => this.$validator.resume(), 1000)

                            this.closeModal()
                            this.get_company_public_holidays()
                            this.get_vacations()

                            this.vacationType = []
                            this.vacation_start_data = ''
                            this.vacation_end_date = ''
                            this.reason = ''
                        })
                        .catch(() => {
                            console.error(error)
                        })
                } else {
                    this.spinner_updating = false
                }
            })
        },

        get_vacations(data) {
            this.component_loading = true

            const for_year = data ? data.value : this.selected_year.value

            if (this.$route.query.year != for_year) this.$router.push({ path: this.$router.currentPath, query: { year: for_year } })

            this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_vacations', { employee_id: this.current_employee_id, definition_for_year: for_year }).then((response) => {
                this.component_loading = false
            })

            this.vacation_year = {
                name: for_year,
                value: for_year,
            }
        },

        roundToNearestHalf(number, floor = false) {
            if (typeof number != 'number') number = Number(number)
            if (floor) return Math.floor(number)
            return Math.round(number * 2) / 2
        },
    },

    created() {
        if (this.$route.params.id !== undefined) {
            const current_employee_id = Number(this.$route.params.id)
            if (!isNaN(current_employee_id)) this.current_employee_id = current_employee_id
        }

        this.current_employee_id = this.$route.params.id

        let selectedYearIndex = 0
        if (this.$route.query.year !== undefined) {
            const index = this.valid_year_indices.indexOf(this.$route.query.year)
            if (index > -1) selectedYearIndex = index
        }

        this.selected_year = this.year_options[selectedYearIndex]

        this.get_vacations()
        this.get_company_public_holidays()
        this.get_employee_approved_leaves()
    },
}
</script>
<style>
.book_time_off_modal .spinner-border {
    display: none;
    position: absolute;
    left: calc(50% - 37.5px);
    top: calc(50% - 37.5px);
    z-index: 1;
    width: 75px;
    height: 75px;
}

.book_time_off_modal.loading .spinner-border {
    display: block;
}

.book_time_off_modal.loading form {
    opacity: 0.25;
    pointer-events: none;
}

.vacation_history_button {
    margin-bottom: -24px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
}

.employee_vacation_history_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
