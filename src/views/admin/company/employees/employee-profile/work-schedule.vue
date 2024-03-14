<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <h4>Work schedule</h4>

            <ul class="header_menu_right" v-if="employeeWorkSchedule != ''">
                <li>
                    <a @click="OpenEditWorkScheduleModal(employeeWorkSchedule.monday_from, employeeWorkSchedule.monday_to, employeeWorkSchedule.tuesday_from, employeeWorkSchedule.tuesday_to, employeeWorkSchedule.wednesday_from, employeeWorkSchedule.wednesday_to, employeeWorkSchedule.thursday_from, employeeWorkSchedule.thursday_to, employeeWorkSchedule.friday_from, employeeWorkSchedule.friday_to, employeeWorkSchedule.saturday_from, employeeWorkSchedule.saturday_to, employeeWorkSchedule.sunday_from, employeeWorkSchedule.sunday_to)" class="site_btn btn_green">Edit work schedule</a>
                </li>
            </ul>
        </div>

        <div class="company_employee_listings profile_month_salary_data">
            <template v-if="component_loading" class="widget_listings">
                <div class="component_loader">
                    <spinner :status="component_loading"></spinner>
                </div>
            </template>
            <template v-else>
                <template v-if="employeeWorkSchedule != ''">
                    <b-row>
                        <div class="employee_item" :key="employeeWorkSchedule.employee_id">
                            <div class="employee_info_body">
                                <ul>
                                    <li>
                                        <p class="table-column-description">Monday</p>
                                        {{ employeeWorkSchedule.monday_from | filterTime }} - {{ employeeWorkSchedule.monday_to | filterTime }}
                                    </li>
                                    <li>
                                        <p class="table-column-description">Tuesday</p>
                                        {{ employeeWorkSchedule.tuesday_from | filterTime }} - {{ employeeWorkSchedule.tuesday_to | filterTime }}
                                    </li>
                                    <li>
                                        <p class="table-column-description">Wednesday</p>
                                        {{ employeeWorkSchedule.wednesday_from | filterTime }} - {{ employeeWorkSchedule.wednesday_to | filterTime }}
                                    </li>
                                    <li>
                                        <p class="table-column-description">Thursday</p>
                                        {{ employeeWorkSchedule.thursday_from | filterTime }} - {{ employeeWorkSchedule.thursday_to | filterTime }}
                                    </li>
                                    <li>
                                        <p class="table-column-description">Friday</p>
                                        {{ employeeWorkSchedule.friday_from | filterTime }} - {{ employeeWorkSchedule.friday_to | filterTime }}
                                    </li>
                                    <li>
                                        <p class="table-column-description">Saturday</p>
                                        <template v-if="employeeWorkSchedule.saturday_from == '00:00:00'"> Not working </template>
                                        <template v-else> {{ employeeWorkSchedule.saturday_from | filterTime }} - {{ employeeWorkSchedule.saturday_to | filterTime }} </template>
                                    </li>
                                    <li>
                                        <p class="table-column-description">Sunday</p>
                                        <template v-if="employeeWorkSchedule.sunday_from == '00:00:00'"> Not working </template>
                                        <template v-else> {{ employeeWorkSchedule.sunday_from | filterTime }} - {{ employeeWorkSchedule.sunday_from | filterTime }} </template>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </b-row>
                </template>
                <template v-else>
                    <div class="box cv_status m-b-20">
                        <div class="status_image">
                            <img src="/images/salaries_list.svg" width="30px" />
                        </div>
                        <div class="status_text">
                            <h5>This employee doesn't have any work schedule generated.</h5>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <!-- end of template -->

        <!-- MODALS -->
        <div class="profile_edit_modals" v-if="modal_visible">
            <!-- EDIT MONTHLY REPORT MODAL -->
            <div class="modal_item salary_report_calculation_modal" v-if="edit_work_schedule_modal_visible">
                <div class="close_modal" @click="closeModal">
                    <img src="/images/close.svg" width="10px" />
                </div>

                <form class="form-type-1 selected_employee_single_generation_form_data" @submit.prevent="initiateEditWorkSchedule()">
                    <h5 class="m-t-20 m-b-30">Edit work schedule</h5>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_monday_from" class="form__label bold">Monday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_monday_from" class="form__input" v-model="edit_monday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_monday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_monday_to" class="form__label bold">Monday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_monday_to" class="form__input" v-model="edit_monday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_monday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_tuesday_from" class="form__label bold">Tuesday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_tuesday_from" class="form__input" v-model="edit_tuesday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_tuesday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_tuesday_to" class="form__label bold">Tuesday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_tuesday_to" class="form__input" v-model="edit_tuesday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_tuesday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_wednesday_from" class="form__label bold">Wednesday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_wednesday_from" class="form__input" v-model="edit_wednesday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_wednesday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_wednesday_to" class="form__label bold">Wednesday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_wednesday_to" class="form__input" v-model="edit_wednesday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_wednesday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_thursday_from" class="form__label bold">Thursday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_thursday_from" class="form__input" v-model="edit_thursday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_thursday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_thursday_to" class="form__label bold">Thursday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_thursday_to" class="form__input" v-model="edit_thursday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_thursday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_friday_from" class="form__label bold">Friday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_friday_from" class="form__input" v-model="edit_friday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_friday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_friday_to" class="form__label bold">Friday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_friday_to" class="form__input" v-model="edit_friday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_friday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <hr />

                    <div class="form__group link-to-form-group">
                        <b-form-checkbox v-model="free_saturday" @change="toggleSaturdayFree"> Not working on Saturday </b-form-checkbox>
                    </div>
                    <div class="form__inline">
                        <div class="form__group">
                            <label for="edit_saturday_from" class="form__label bold">Saturday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_saturday_from" class="form__input" :disabled="check_if_saturdays_disabled()" v-model="edit_saturday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_saturday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_saturday_to" class="form__label bold">Saturday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_saturday_to" class="form__input" :disabled="check_if_saturdays_disabled()" v-model="edit_saturday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_saturday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                    </div>

                    <div class="form__group link-to-form-group">
                        <b-form-checkbox v-model="free_sunday" @change="toggleSundayFree"> Not working on Sunday </b-form-checkbox>
                    </div>
                    <div class="form__inline last-input">
                        <div class="form__group">
                            <label for="edit_sunday_from" class="form__label bold">Sunday From</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_sunday_from" class="form__input" :disabled="check_if_sundays_disabled()" v-model="edit_sunday_from" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_sunday_from')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
                        <div class="form__group">
                            <label for="edit_sunday_to" class="form__label bold">Sunday to</label>
                            <vue-timepicker format="HH:mm" v-validate="'required'" hide-clear-button name="edit_sunday_to" :disabled="check_if_sundays_disabled()" class="form__input" v-model="edit_sunday_to" manual-input hide-dropdown></vue-timepicker>
                            <span v-if="submitted && errors.has('edit_sunday_to')" class="form-error-notification error">
                                {{ $t('inputError.required') }}
                            </span>
                        </div>
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
                                <button class="save" type="submit">Save work schedule</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <!-- END EDIT MONTHLY REPORT MODAL -->
        </div>
    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'

export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        employeeWorkSchedule: function () {
            if (this.$store.getters['company_data/employee/work_schedules/get_single_employee_work_schedules']) {
                return this.$store.getters['company_data/employee/work_schedules/get_single_employee_work_schedules']
            }
        },
    },

    watch: {
        employeeWorkSchedule: function (new_value) {
            let tempArray = []

            tempArray = new_value.monday_from.split(':')
            this.edit_monday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.monday_to.split(':')
            this.edit_monday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Tuesday from and to */
            tempArray = new_value.tuesday_from.split(':')
            this.edit_tuesday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.tuesday_to.split(':')
            this.edit_tuesday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Wednesday from and to */
            tempArray = new_value.wednesday_from.split(':')
            this.edit_wednesday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.wednesday_to.split(':')
            this.edit_wednesday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Thursday from and to */
            tempArray = new_value.thursday_from.split(':')
            this.edit_thursday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.thursday_to.split(':')
            this.edit_thursday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Friday from and to */
            tempArray = new_value.friday_from.split(':')
            this.edit_friday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.friday_to.split(':')
            this.edit_friday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Saturday from and to */
            tempArray = new_value.saturday_from.split(':')
            this.edit_saturday_from = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            tempArray = new_value.saturday_to.split(':')
            this.edit_saturday_to = {
                HH: tempArray[0],
                mm: tempArray[1],
            }
            tempArray = []

            /* Saturday from and to */
            tempArray = new_value.sunday_from.split(':')
            if ((tempArray[0] = '00')) {
                this.free_saturday = true
                this.edit_sunday_from = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
            }

            tempArray = []

            tempArray = new_value.sunday_to.split(':')
            if ((tempArray[0] = '00')) {
                this.free_sunday = true
                this.edit_sunday_to = {
                    HH: tempArray[0],
                    mm: tempArray[1],
                }
            }

            tempArray = []

            return new_value
        },
    },

    data() {
        return {
            // Content related
            component_loading: true,

            // Form related
            spinner_updating: false,
            submitted: false,

            modal_visible: false,
            edit_work_schedule_modal_visible: false,

            employee_id: '',

            edit_monday_from: [],
            edit_monday_to: [],
            edit_tuesday_from: [],
            edit_tuesday_to: [],
            edit_wednesday_from: [],
            edit_wednesday_to: [],
            edit_thursday_from: [],
            edit_thursday_to: [],
            edit_friday_from: [],
            edit_friday_to: [],
            edit_saturday_from: [],
            edit_saturday_to: [],
            edit_sunday_from: [],
            edit_sunday_to: [],

            free_saturday: false,
            free_sunday: false,
        }
    },
    methods: {
        OpenEditWorkScheduleModal: function (monday_from, monday_to, tuesday_from, tuesday_to, wednesday_from, wednesday_to, thursday_from, thursday_to, friday_from, friday_to, saturday_from, saturday_to, sunday_from, sunday_to) {
            this.modal_visible = true
            this.edit_work_schedule_modal_visible = true
        },
        closeModal: function () {
            this.modal_visible = false
            this.edit_work_schedule_modal_visible = false
        },
        initiateEditWorkSchedule: function () {
            this.submitted = true
            this.spinner_updating = true
            this.component_loading = true
            this.$validator.validate().then((valid) => {
                if (valid) {
                    let final_edit_monday_from = this.edit_monday_from['HH'] + ':' + this.edit_monday_from['mm']
                    let final_edit_monday_to = this.edit_monday_to['HH'] + ':' + this.edit_monday_to['mm']

                    let final_edit_tuesday_from = this.edit_tuesday_from['HH'] + ':' + this.edit_tuesday_from['mm']
                    let final_edit_tuesday_to = this.edit_tuesday_to['HH'] + ':' + this.edit_tuesday_to['mm']

                    let final_edit_wednesday_from = this.edit_wednesday_from['HH'] + ':' + this.edit_wednesday_from['mm']
                    let final_edit_wednesday_to = this.edit_wednesday_to['HH'] + ':' + this.edit_wednesday_to['mm']

                    let final_edit_thursday_from = this.edit_thursday_from['HH'] + ':' + this.edit_thursday_from['mm']
                    let final_edit_thursday_to = this.edit_thursday_to['HH'] + ':' + this.edit_thursday_to['mm']

                    let final_edit_friday_from = this.edit_friday_from['HH'] + ':' + this.edit_friday_from['mm']
                    let final_edit_friday_to = this.edit_friday_to['HH'] + ':' + this.edit_friday_to['mm']

                    let final_edit_saturday_from = ''
                    let final_edit_saturday_to = ''
                    if (this.edit_saturday_from != '' && this.edit_saturday_to != '') {
                        final_edit_saturday_from = this.edit_saturday_from['HH'] + ':' + this.edit_saturday_from['mm']
                        final_edit_saturday_to = this.edit_saturday_to['HH'] + ':' + this.edit_saturday_to['mm']
                    }

                    let final_edit_sunday_from = ''
                    let final_edit_sunday_to = ''
                    if (this.final_edit_sunday_from != '' && this.final_edit_sunday_to != '') {
                        final_edit_sunday_from = this.edit_sunday_from['HH'] + ':' + this.edit_sunday_from['mm']
                        final_edit_sunday_to = this.edit_sunday_to['HH'] + ':' + this.edit_sunday_to['mm']
                    }

                    let data = {
                        employee_id: this.employee_id,
                        monday_from: final_edit_monday_from,
                        monday_to: final_edit_monday_to,
                        tuesday_from: final_edit_tuesday_from,
                        tuesday_to: final_edit_tuesday_to,
                        wednesday_from: final_edit_wednesday_from,
                        wednesday_to: final_edit_wednesday_to,
                        thursday_from: final_edit_thursday_from,
                        thursday_to: final_edit_thursday_to,
                        friday_from: final_edit_friday_from,
                        friday_to: final_edit_friday_to,
                        saturday_from: this.free_saturday == false ? final_edit_saturday_from : '00:00',
                        saturday_to: this.free_saturday == false ? final_edit_saturday_to : '00:00',
                        sunday_from: this.free_sunday == false ? final_edit_sunday_from : '00:00',
                        sunday_to: this.free_sunday == false ? final_edit_sunday_to : '00:00',
                    }

                    setTimeout(() => {
                        this.$store.dispatch('company_data/employee/work_schedules/edit_single_employee_work_schedule', data).then((response) => {
                            if (response.status == 404) {
                                if (response.data.message == 'Already generated monthly salary for this month.') {
                                    this.alert_handle_in_calls_directly('already_generated_salary_in_this_month_for_this_user', 'error')
                                }
                            } else {
                                this.alert_handle_in_calls_directly('work_schedule_has_been_updated', 'success')
                            }
                            this.spinner_updating = false
                            this.component_loading = false
                            this.closeModal()
                        })
                    }, 500)
                } else {
                    this.spinner_updating = false
                }
            })
        },
        toggleSaturdayFree: function (checked) {
            if (checked == false) {
                this.free_saturday = true
            } else {
                this.free_saturday = false
            }
        },
        check_if_saturdays_disabled: function () {
            if (this.free_saturday) {
                return true
            } else {
                return false
            }
        },

        toggleSundayFree: function (checked) {
            if (checked == false) {
                this.free_sunday = true
            } else {
                this.free_sunday = false
            }
        },
        check_if_sundays_disabled: function () {
            if (this.free_sunday) {
                return true
            } else {
                return false
            }
        },
    },
    created() {
        let current_employee_id = parseInt(this.$route.params.id)
        this.employee_id = current_employee_id

        setTimeout(() => {
            this.$store.dispatch('company_data/employee/work_schedules/get_single_employee_work_schedule', current_employee_id).then((response) => {
                this.component_loading = false

                let check_if_direct_edit = this.$route.query
                if (Object.keys(check_if_direct_edit).length != 0) {
                    // If this page is visited from Work Schedules page open direct modal for edit
                    let open_edit_modal = check_if_direct_edit.edit
                    if (open_edit_modal == 'yes') {
                        this.OpenEditWorkScheduleModal()
                    }
                }
            })
        }, 200)
    },
    components: {
        VueTimepicker,
    },
    filters: {
        filterTime(value) {
            if (!value) return ''
            let formatedTime = value.split(':')
            return formatedTime[0] + ':' + formatedTime[1]
        },
    },
}
</script>

<style lang="scss" scoped>
.time-picker {
    &.form__input {
        &[disabled] {
            input {
                background: #f1f1f1;
            }
        }
    }
}
.link-to-form-group {
    margin-bottom: 0 !important;
}
.listing_menu_action {
    position: absolute;
    top: 19px;
    right: 20px;
}
.profile_month_salary_data {
    .employee_item {
        .employee_info_body {
            padding: 20px;
            ul {
                text-align: left;
                li {
                    &.listing_menu_action {
                        position: absolute;
                        right: 0;
                    }
                    list-style: none;
                    display: inline-table;
                    width: auto;
                    margin-right: 30px;
                    vertical-align: middle;
                    min-width: 119px;

                    text-align: center;
                    .table-column-description {
                        margin-bottom: 5px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
}
</style>
