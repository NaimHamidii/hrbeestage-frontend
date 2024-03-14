<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Vacations</h4>
            <ul class="header_menu_right">
                <li>
                    <a @click="open_book_time_off_modal()" class="site_btn btn_green"> Book time off </a>
                </li>
            </ul>
        </div>
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <div class="profile_vocation_allowance">
                <div class="company_allowances">
                    <b-row>
                        <b-col md="2">
                            <div class="remaining_days">
                                <h6>Yearly leave</h6>
                                <h4>{{ employee_yearly_leave_days_used }}/{{ company_single_employee_leave_definitions.employee_yearly_leave_days }}</h4>
                                <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                            </div>
                        </b-col>
                        <b-col md="2" v-for="(allowance_item, index) in company_single_employee_leave_definitions" :key="index">
                            <div class="allowance_item">
                                <h6>{{ $t('VacationLeaveTypes.' + index) }}</h6>
                                <template v-if="index == 'employee_yearly_leave_days'">
                                    <h5>{{ employee_yearly_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_sick_leave_days'">
                                    <h5>{{ employee_sick_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_maternity_leave_days'">
                                    <h5>{{ employee_maternity_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_marriage_leave_days'">
                                    <h5>{{ employee_marriage_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_daily_leave_days'">
                                    <h5>{{ employee_daily_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_death_leave_days'">
                                    <h5>{{ employee_death_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_paternity_leave_days'">
                                    <h5>{{ employee_paternity_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_blood_donation_leave_days'">
                                    <h5>{{ employee_blood_donation_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_compensation_leave_days'">
                                    <h5>{{ employee_compensation_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_overtime_compensation_leave_days'">
                                    <h5>{{ employee_overtime_compensation_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                                <template v-if="index == 'employee_unpaid_leave_days'">
                                    <h5>{{ employee_unpaid_leave_days_used }}/{{ allowance_item }}</h5>
                                    <p>{{ $t('VacationLeaveTypes.days_used') }}</p>
                                </template>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </div>

            <vue-calendar :show-limit="3" :events="employeeCalendarEvents" :disable="disabledDates" :highlight="highlightDays" @show-all="showAll" @day-clicked="dayClicked" @event-clicked="eventClicked" @month-changed="monthChanged"> </vue-calendar>

            <!-- MODALS -->
            <div class="profile_edit_modals performance_modal" v-if="modal_visible">
                <!-- Add Performance Modal -->
                <div class="modal_item" v-if="book_time_off_modal">
                    <div class="close_modal" @click="closeModal">
                        <img src="/images/close.svg" width="10px" />
                    </div>

                    <form class="form-type-1" @submit.prevent="add_new_booking">
                        <h5>Book time off</h5>
                        <p class="m-b-30">As a company you can book time off for an employee directly.</p>

                        <div class="form__group">
                            <label for="vacationType" class="form__label bold">Select a vaction type:</label>
                            <multiselect id="vacationType" name="vacationType" v-model="vacationType" :options="vacationTypeOptions" placeholder="Select vacation type" label="name" track-by="value"></multiselect>
                        </div>

                        <div class="form__inline">
                            <div class="form__group">
                                <label for="vacation_start_data" class="form__label bold">Vacation start date</label>
                                <datepicker :disabledDates="disabledDates" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_start_data" placeholder="20/05/2019" v-model="vacation_start_data" name="vacation_start_data"></datepicker>
                                <span v-if="submitted && errors.has('vacation_start_data')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                            <div class="form__group">
                                <label for="vacation_end_date" class="form__label bold">Vacation end date</label>
                                <datepicker :disabledDates="disabledDates" :disabled="check_if_end_date_disable()" v-validate="'required'" format="dd-MM-yyyy" class="form__input" id="vacation_end_date" placeholder="20/05/2019" v-model="vacation_end_date" name="vacation_end_date"></datepicker>
                                <span v-if="submitted && errors.has('vacation_end_date')" class="form-error-notification error">
                                    {{ $t('inputError.required') }}
                                </span>
                            </div>
                        </div>

                        <div class="form__group last-input">
                            <label for="vacation_request_reason" class="form__label bold">Vacation request reason </label>

                            <textarea v-validate="'required'" class="form__textarea" id="vacation_request_reason" type="text" placeholder="Please type vacation reason below." v-model="vacation_request_reason" name="vacation_request_reason"></textarea>
                            <span v-if="submitted && errors.has('vacation_request_reason')" class="form-error-notification error">
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
                                    <button class="save" type="submit">
                                        {{ $t('button.book_time_off') }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <!-- END Add Performance Modal -->
            </div>
        </template>
    </div>
</template>

<script>
var momentBusinessDays = require('moment-business-days')

import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { nextTick } from 'q'
//import search_blacklisted_candidates  from '@company_components/jobs/data-search'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        current_site_language() {
            this.fillMonths(this.$i18n.locale())
            this.fillVacationTypeOptions(this.$i18n.locale())
            //this.getTranslation(this.$i18n.locale())
            return this.$i18n.locale()
        },
        company_single_employee_leave_definitions() {
            if (this.$store.getters['company_data/employee/vacations/get_single_employee_leave_definitions']) {
                return this.$store.getters['company_data/employee/vacations/get_single_employee_leave_definitions']
            }
        },
        single_employee_approved_leaves() {
            if (this.$store.getters['company_data/employee/vacations/get_single_employee_approved_leaves']) {
                return this.$store.getters['company_data/employee/vacations/get_single_employee_approved_leaves']
            }
        },
        current_public_holidays() {
            if (this.$store.getters['company_data/employee/vacations/get_public_holidays']) {
                return this.$store.getters['company_data/employee/vacations/get_public_holidays']
            }
        },
    },
    watch: {
        current_site_language() {
            this.fillMonths(this.$i18n.locale())
            this.fillVacationTypeOptions(this.$i18n.locale())
            //this.getTranslation(this.$i18n.locale())
            return this.$i18n.locale()
        },
        company_single_employee_leave_definitions: function (new_value) {
            if ('undefined' !== typeof new_value['employee_id']) {
                // The property DOES exists
                delete new_value['employee_id']
            }
            if ('undefined' !== typeof new_value['created_at']) {
                // The property DOES exists
                delete new_value['created_at']
            }
            if ('undefined' !== typeof new_value['updated_at']) {
                // The property DOES exists
                delete new_value['updated_at']
            }

            if ('undefined' !== typeof new_value['employee_yearly_leave_days_used']) {
                // The property DOES exists
                this.employee_yearly_leave_days_used = new_value.employee_yearly_leave_days_used
                delete new_value['employee_yearly_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_sick_leave_days_used']) {
                // The property DOES exists
                this.employee_sick_leave_days_used = new_value.employee_sick_leave_days_used
                delete new_value['employee_sick_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_maternity_leave_days_used']) {
                // The property DOES exists
                this.employee_maternity_leave_days_used = new_value.employee_maternity_leave_days_used
                delete new_value['employee_maternity_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_marriage_leave_days_used']) {
                // The property DOES exists
                this.employee_marriage_leave_days_used = new_value.employee_marriage_leave_days_used
                delete new_value['employee_marriage_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_daily_leave_days_used']) {
                // The property DOES exists
                this.employee_daily_leave_days_used = new_value.employee_daily_leave_days_used
                delete new_value['employee_daily_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_death_leave_days_used']) {
                // The property DOES exists
                this.employee_death_leave_days_used = new_value.employee_death_leave_days_used
                delete new_value['employee_death_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_paternity_leave_days_used']) {
                // The property DOES exists
                this.employee_paternity_leave_days_used = new_value.employee_paternity_leave_days_used
                delete new_value['employee_paternity_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_blood_donation_leave_days_used']) {
                // The property DOES exists
                this.employee_blood_donation_leave_days_used = new_value.employee_blood_donation_leave_days_used
                delete new_value['employee_blood_donation_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_compensation_leave_days_used']) {
                // The property DOES exists
                this.employee_compensation_leave_days_used = new_value.employee_compensation_leave_days_used
                delete new_value['employee_compensation_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_overtime_compensation_leave_days_used']) {
                // The property DOES exists
                this.employee_overtime_compensation_leave_days_used = new_value.employee_overtime_compensation_leave_days_used
                delete new_value['employee_overtime_compensation_leave_days_used']
            }
            if ('undefined' !== typeof new_value['employee_unpaid_leave_days_used']) {
                // The property DOES exists
                this.employee_unpaid_leave_days_used = new_value.employee_unpaid_leave_days_used
                delete new_value['employee_unpaid_leave_days_used']
            }

            return new_value
        },
        single_employee_approved_leaves(new_value) {
            return new_value
        },
        current_public_holidays(new_value) {
            for (let i = 0; i < new_value.length; i++) {
                let current_date = new_value[i].public_holiday_date

                current_date = this.$moment(current_date).format('MM-DD-YYYY')

                this.public_holidays.push(current_date)
            }
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,
            spinner_updating: false,
            current_employee_id: '',

            // Modal related
            modal_visible: false,
            book_time_off_modal: false,
            submitted: false,

            employeeCalendarEvents: [],

            // Book time off fields
            vacation_start_data: '',
            vacation_end_date: '',
            disable_end_date: 0,
            vacationType: [],
            vacationTypeOptions: [],
            vacation_request_reason: '',

            disabledDates: {
                days: [6, 0],
            },

            highlightDays: {
                to: new Date(2017, 9, 5), // Highlight all dates up to specific date
                from: new Date(2017, 11, 26), // Highlight all dates after specific date
                days: [6, 0], // Highlight Saturday's and Sunday's
            },

            requested_half_days: false,

            employee_yearly_leave_days_used: 0,
            employee_sick_leave_days_used: 0,
            employee_maternity_leave_days_used: 0,
            employee_marriage_leave_days_used: 0,
            employee_daily_leave_days_used: 0,
            employee_death_leave_days_used: 0,
            employee_paternity_leave_days_used: 0,
            employee_blood_donation_leave_days_used: 0,
            employee_compensation_leave_days_used: 0,
            employee_overtime_compensation_leave_days_used: 0,
            employee_unpaid_leave_days_used: 0,

            public_holidays: ['09-05-2019'],
        }
    },
    methods: {
        showAll(events) {
            // Do something...
        },
        dayClicked(day) {
            // Do something...
        },
        eventClicked(event) {},
        monthChanged(start, end) {
            // Do something...
        },
        fillVacationTypeOptions(current_language) {
            this.vacationType = []
            this.vacationTypeOptions = []
            switch (current_language) {
                case 'en':
                    this.vacationTypeOptions.push(
                        {
                            name: 'Yearly leave',
                            value: 'yearly_leave',
                        },
                        {
                            name: 'Sick leave',
                            value: 'sick_leave',
                        },
                        {
                            name: 'Marriage leave',
                            value: 'marriage_leave',
                        },
                        {
                            name: 'Maternity leave',
                            value: 'maternity_leave',
                        },
                        {
                            name: 'Daily leave',
                            value: 'daily_leave',
                        },
                        {
                            name: 'Death leave',
                            value: 'death_leave',
                        },
                        {
                            name: 'Paternity leave',
                            value: 'paternity_leave',
                        },
                        {
                            name: 'Blood donation leave',
                            value: 'blood_donation_leave',
                        },
                        {
                            name: 'Compensation leave',
                            value: 'compensation_leave',
                        },
                        {
                            name: 'Overtime comensation leave',
                            value: 'overtime_compensation_leave',
                        },
                        {
                            name: 'Unpaid leave',
                            value: 'unpaid_leave',
                        }
                    )

                    break
                case 'sq':
                    this.vacationTypeOptions.push(
                        {
                            name: 'Pushim mjeksorë',
                            value: 'yearly_leave',
                        },
                        {
                            name: 'Sick leave',
                            value: 'sick_leave',
                        },
                        {
                            name: 'Marriage leave',
                            value: 'marriage_leave',
                        },
                        {
                            name: 'Maternity leave',
                            value: 'maternity_leave',
                        },
                        {
                            name: 'Daily leave',
                            value: 'daily_leave',
                        },
                        {
                            name: 'Death leave',
                            value: 'death_leave',
                        },
                        {
                            name: 'Paternity leave',
                            value: 'paternity_leave',
                        },
                        {
                            name: 'Blood donation leave',
                            value: 'blood_donation_leave',
                        },
                        {
                            name: 'Compensation leave',
                            value: 'compensation_leave',
                        },
                        {
                            name: 'Overtime comensation leave',
                            value: 'overtime_compensation_leave',
                        },
                        {
                            name: 'Unpaid leave',
                            value: 'unpaid_leave',
                        }
                    )

                    break
            }
        },
        // Fill monnths data depending on current language
        fillMonths(current_language) {
            this.monthOptions = []
            switch (current_language) {
                case 'en':
                    this.monthOptions.push(
                        {
                            name: 'January',
                            value: '01',
                        },
                        {
                            name: 'February',
                            value: '02',
                        },
                        {
                            name: 'March',
                            value: '03',
                        },
                        {
                            name: 'April',
                            value: '04',
                        },
                        {
                            name: 'May',
                            value: '05',
                        },
                        {
                            name: 'June',
                            value: '06',
                        },
                        {
                            name: 'July',
                            value: '07',
                        },
                        {
                            name: 'August',
                            value: '08',
                        },
                        {
                            name: 'September',
                            value: '09',
                        },
                        {
                            name: 'October',
                            value: '10',
                        },
                        {
                            name: 'November',
                            value: '11',
                        },
                        {
                            name: 'December',
                            value: '12',
                        }
                    )

                    break
                case 'sq':
                    this.monthOptions.push(
                        {
                            name: 'Janar',
                            value: '01',
                        },
                        {
                            name: 'Shkurt',
                            value: '02',
                        },
                        {
                            name: 'Mars',
                            value: '03',
                        },
                        {
                            name: 'Prill',
                            value: '04',
                        },
                        {
                            name: 'Maj',
                            value: '05',
                        },
                        {
                            name: 'Qershor',
                            value: '06',
                        },
                        {
                            name: 'Korrik',
                            value: '07',
                        },
                        {
                            name: 'Gusht',
                            value: '08',
                        },
                        {
                            name: 'Shtator',
                            value: '09',
                        },
                        {
                            name: 'Tetor',
                            value: '10',
                        },
                        {
                            name: 'Nëntor',
                            value: '11',
                        },
                        {
                            name: 'Dhjetorë',
                            value: '12',
                        }
                    )

                    break
            }
        },

        handleDayChanged(data) {},
        handleMonthChanged(data) {},
        toggleHalfDayOff: function (checked) {
            if (checked) {
                this.disable_end_date = 1
            } else {
                this.disable_end_date = 0
            }
        },
        check_if_end_date_disable: function () {
            if (this.disable_end_date == '1') {
                return true
            } else {
                return false
            }
        },
        open_book_time_off_modal: function () {
            this.modal_visible = true
            this.book_time_off_modal = true
        },
        closeModal: function () {
            this.modal_visible = false
            this.book_time_off_modal = false
        },
        addWeekdays: function (date, days) {
            while (days > 0) {
                date = date.add(1, 'days')
                // decrease "days" only if it's a weekday.
                if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
                    days -= 1
                }
            }
            return date
        },
        add_new_booking() {
            this.submitted = true
            this.spinner_updating = true

            this.$validator.validate().then((valid) => {
                if (valid) {
                    let start_date = this.vacation_start_data
                    start_date = this.$moment(start_date).format('YYYY-MM-DD')

                    let end_date = this.vacation_end_date
                    if (end_date != '') {
                        end_date = this.$moment(end_date).format('YYYY-MM-DD')
                    }

                    let submitted_vacation_data = {
                        employee_id: this.current_employee_id,
                        type: this.vacationType.value,
                        start_date: start_date,
                        end_date: end_date,
                        requested_half_days: this.requested_half_days,
                        reason: this.vacation_request_reason,
                    }

                    setTimeout(() => {
                        this.$store
                            .dispatch('company_data/employee/vacations/company_book_time_off', submitted_vacation_data)
                            .then(() => {
                                this.alert_handle_in_calls_directly('successful_data_updated', 'success')
                                this.spinner_updating = false
                                this.closeModal()

                                this.vacationType = []
                                this.vacation_start_data = ''
                                this.vacation_end_date = ''
                                this.requested_half_days = false
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },

        get_company_public_holidays() {
            let current_holidays = []
            this.$store.dispatch('company_data/employee/vacations/get_company_public_holidays').then((response) => {
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

                    let date_for_holiday = this.$moment(date).format('MM-DD-YYYY')
                }

                current_holidays.forEach((element) => {
                    this.employeeCalendarEvents.push(element)
                })

                momentBusinessDays.defineLocale('us', {
                    holidays: this.public_holidays,
                    holidayFormat: 'MM-DD-YYYY',
                    workingWeekdays: [1, 2, 3, 4, 5], //Defines days from 1 (Monday) to 5 (Fridays) as business days.
                })
            })
        },
        get_employee_approved_leaves: function () {
            let current_approved_vacations = []
            this.$store.dispatch('company_data/employee/vacations/get_all_single_employee_approved_vacations', this.current_employee_id).then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    let current_index = response.data[i]
                    let title = current_index.type
                    let start_date = current_index.start_date
                    let end_date = current_index.end_date
                    let reason = current_index.reason
                    let customClass = 'timeoff'
                    let type = 'timeoff'

                    title = this.$t('VacationLeaveTypes.' + title)

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
    },

    created() {
        let current_employee_id = ''
        // Check URL paramteher if there is a direction coming from Interview page
        if (this.$route.params.id !== undefined) {
            current_employee_id = parseInt(this.$route.params.id)
            this.current_employee_id = current_employee_id

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/vacations/get_single_employee_leave_definitions', this.current_employee_id).then((response) => {
                    this.component_loading = false
                })
            }, 500)
        }

        this.$calendar.eventBus.$on('show-all', (events) => this.showAll(events))
        this.$calendar.eventBus.$on('day-clicked', (day) => this.dayClicked(day))

        this.get_company_public_holidays()
        this.get_employee_approved_leaves()
    },
    components: {
        //'search-candidates': search_blacklisted_candidates
        Multiselect,
        Datepicker,
    },
}
</script>

<style lang="scss">
.__vev_calendar-wrapper .cal-wrapper .cal-header {
    padding-bottom: 0;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body {
    background: #fff;
}
.__vev_calendar-wrapper .cal-wrapper {
    padding: initial;
    display: inline-block;
    width: 40%;
    margin-right: 30px;
    vertical-align: top;
}
.__vev_calendar-wrapper .events-wrapper {
    padding-top: 0;
    position: relative;
    display: inline-block;
    width: 49%;
    padding: initial;
    left: initial;
    bottom: initial;
    top: initial;
    vertical-align: top;
    .cal-events {
        height: initial;
        overflow-y: visible;
        padding: initial;
        margin: initial;
        height: 480px;
        overflow-y: scroll;
    }
}
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .is-event {
    content: '';
    border: 2px solid #f29543;
    background-color: #fff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin-left: -18px;
    margin-top: -19px;
    border-radius: 5px;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item .is-today {
    content: '';
    background-color: #f29543;
    border-radius: 50%;
    opacity: 0.8;
    width: 7px;
    height: 7px;
    position: absolute;
    top: 67%;
    z-index: 2;
    margin-top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: 13px auto;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates .item {
    &.holiday {
        p {
            &.date-num {
                color: #fff !important;
            }
        }
        .is-event {
            border: 2px solid #554def !important;
            background: #554def !important;
        }
    }
    cursor: pointer;
    &:hover {
    }
}

.events-wrapper {
    background: none !important;
    h2 {
        display: none !important;
    }
}
.calendar-event-item {
    background: #fff;
    margin-bottom: 15px;
    padding: 22px 30px;

    &.type-timeoff {
        border-left: 3px solid #f29543;
    }
    &.type-holiday {
        border-left: 3px solid #554def;
    }

    h4 {
        span {
            margin-left: 10px;
            vertical-align: middle;
        }
    }
    h5 {
        margin-bottom: 0;
    }
}
.company_allowances {
    margin-bottom: 40px;
    .remaining_days {
        background: rgba(242, 149, 67, 0.12);
        padding: 15px;
        border-radius: 7px;
        text-align: center;
        h4 {
            font-size: 30px;
            color: #f29543;
            margin: 20px 0;
            font-weight: bold;
            margin-bottom: 8px;
        }
        p {
            font-size: 13px;
            font-weight: 600;
            color: #343349;
            margin: 0;
        }
    }
    .allowance_item {
        background: #fff;
        padding: 15px;
        border-radius: 7px;
        margin-bottom: 20px;
        text-align: center;
        h5 {
            font-size: 30px;
            color: #f29543;
            margin: 20px 0;
            font-weight: bold;
            margin-bottom: 8px;
        }
        p {
            font-size: 13px;
            font-weight: 600;
            color: #343349;
            margin: 0;
        }
    }
}

.vue-calendar {
    display: grid;
    grid-template-rows: 10% 90%;
    background: #fff;
    margin: 0 auto;
    padding: 40px;
    border-radius: 5px;
}
.calendar-header {
    align-items: center;
}
.header-left,
.header-right {
    flex: 1;
}
.header-center {
    flex: 3;
    text-align: center;
}
.title {
    margin: 0 5px;
}
.next-month,
.prev-month {
    cursor: pointer;
}
.calendar-body {
    display: grid;
    grid-template-rows: 5% 95%;
}
.days-header {
    display: grid;
    grid-auto-columns: 14.25%;
    grid-template-areas: 'a a a a a a a';
    border-top: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}
.days-body {
    display: grid;
    grid-template-rows: auto;
}
.day-number {
    text-align: right;
    margin-right: 10px;
}
.day-label {
    text-align: center;
    border-right: 1px solid #e0e0e0;
}
.week-row {
    display: grid;
    grid-template-areas: 'a a a a a a a';
    grid-row-gap: 5px;
    grid-auto-columns: 14.25%;
    border-left: 1px solid #e0e0e0;
}
.week-day {
    padding: 4px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}
.week-day.disabled {
    background-color: #f5f5f5;
}
.week-day.not-current > .day-number {
    color: #c3c3c3;
}
.week-day.today > .day-number {
    font-weight: 700;
    color: red;
}
.events {
    font-size: 12px;
    cursor: pointer;
    padding: 0 0 0 4px;
}
.events .event {
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 4px 2px 0;
    border-radius: 3px;
    padding: 4px 17px;
    height: initial;
    &.holiday {
        background: #5445f3;
        color: #fff;
    }
    &.timeoff {
        background: #f29543 !important;
        color: #fff;
    }
}
.events .more-link {
    color: rgba(0, 0, 0, 0.38);
}
</style>
