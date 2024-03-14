<template>
    <div class="page_content">
        <template v-if="component_loading">
            <div class="component_loader">
                <spinner :status="component_loading"></spinner>
            </div>
        </template>
        <template v-else>
            <template v-if="!access_control_section">
                <div class="boxi">
                    <div class="textinBox">
                        <h4>{{ $t('workschedule.workingschedule') }}</h4>
                        <template v-if="actions">
                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontalActive.svg" @click="cancelActions()" class="actionIconEmpVacations" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/companyIcons/actionsHorizontal.svg" @click="openActions()" class="actionIconEmpVacations" />
                        </template>
                    </div>
                    <div class="d-flex flex-wrap justify-content-around">
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.monday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_monday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ monday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ monday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.tuesday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_tuesday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ tuesday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ tuesday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.wednesday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_wednesday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ wednesday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ wednesday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.thursday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_thursday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ thursday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ thursday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.friday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_friday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ friday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ friday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.saturday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_saturday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ saturday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ saturday_to }}</h3>
                            </template>
                        </div>
                        <div class="weekdays-box my-2">
                            <div class="text-center">
                                <h5>{{ $t('workschedule.sunday') }}</h5>
                            </div>
                            <hr />
                            <template v-if="!works_sunday">
                                <br /><br />
                                <h3 class="text-center">{{ $t('workschedule.nowork') }}</h3>
                            </template>
                            <template v-else>
                                <h4>{{ $t('workschedule.start') }}:</h4>
                                <h3>{{ sunday_from }}</h3>
                                <h4>{{ $t('workschedule.end') }}:</h4>
                                <h3>{{ sunday_to }}</h3>
                            </template>
                        </div>
                    </div>
                    <template v-if="actions">
                        <hr />
                        <ul class="actions-ul">
                            <li>
                                <button @click="openAccessControlSection()">Access Control</button>
                            </li>
                        </ul>
                    </template>
                </div>
            </template>
            <template v-else>
                <div class="boxi">
                    <div class="mt-3" v-if="employee_access_control_logs != null">
                        <div class="borderTopBottom contract_item_list" v-for="log in employee_access_control_logs.logs">
                            <div>
                                <p>{{ $t('workschedule.date') }}</p>
                                <h4>{{ log.checkin_date }}</h4>
                            </div>
                            <div class="mt-2 row text-center">
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.byschedulecheckin') }}</p>
                                    <h4>{{ getEmployeeWorkScheduleByDate(employee_access_control_logs.work_schedule, log.checkin_date, 'from') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.byschedulecheckout') }}</p>
                                    <h4>{{ getEmployeeWorkScheduleByDate(employee_access_control_logs.work_schedule, log.checkin_date, 'to') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.workinghours') }}</p>
                                    <h4>{{ getEmployeeWorkDurationByDate(employee_access_control_logs.work_schedule, log.checkin_date) }}</h4>
                                </div>
                            </div>
                            <div class="mt-2 row text-center" v-for="logItem in log.data">
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.checkedin') }}</p>
                                    <h4>{{ logItem.checkin | moment('HH:mm:ss') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.checkedout') }}</p>
                                    <h4>{{ logItem.checkout | moment('HH:mm:ss') }}</h4>
                                </div>
                                <div class="col-md-4">
                                    <p>{{ $t('workschedule.workedhours') }}</p>
                                    <h4>{{ logItem.duration_seconds | secondsToHours }}</h4>
                                </div>
                            </div>
                            <div class="absences-container row" :class="{ 'fully-reviewed': log.all_absences_reviewed }" v-if="log.absences" v-for="absenceItem in log.absences">
                                <div class="col-md-4">
                                    <h4>{{ $t('workschedule.absencenotes') }}:</h4>
                                    <div class="absence-item">
                                        <ul>
                                            <li v-for="interval in absenceItem.intervals">{{ generateIntervalNote(interval) }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h4>{{ $t('workschedule.reasons') }}:</h4>
                                    <div class="absence-item">
                                        <p>{{ absenceItem.reason || $t('workschedule.noreason') }}</p>
                                    </div>
                                </div>
                                <div class="col-md-2 text-end">
                                    <button type="button" class="btn btn-light edit-absence-item-btn" @click="openEditAbsenceModal(absenceItem)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end pr-5 pt-2">
                            <p>
                                {{ $t('workschedule.totalworkinghours') }} <b>{{ employee_access_control_logs.total_duration_seconds | secondsToHours }}</b>
                            </p>
                        </div>
                        <div class="d-flex justify-content-end pr-5 pt-2">
                            <p>
                                {{ $t('workschedule.totalabsencehours') }} <b>{{ employee_access_control_logs.total_absence_seconds | secondsToHours }}</b>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </template>

        <b-modal ref="edit_absence_modal" hide-footer :title="$t('workschedule.editabsence')">
            <form class="form-type-1" @submit.prevent="updateAbsenceItem">
                <div class="form__group mb-4" :key="selected_absence_item.absence_id">
                    <label class="form__label2 bold" for="reason">{{ $t('workschedule.reasons') }}</label>
                    <input id="reason" name="reason" :placeholder="$t('workschedule.reasons')" type="text" v-model="selected_absence_item.reason" class="form-control" />
                </div>

                <div class="modal_footer_buttons">
                    <ul class="bootstrap_inline_buttons">
                        <li>
                            <button class="outlined_link outline_grey" type="reset" @click="closeModal">
                                {{ $t('button.cancel') }}
                            </button>
                        </li>

                        <li>
                            <button class="outlined_link outline_green" type="submit">{{ $t('button.update') }}</button>
                        </li>
                    </ul>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            component_loading: false,

            works_monday: false,
            monday_from: '',
            monday_to: '',
            works_tuesday: false,
            tuesday_from: '',
            tuesday_to: '',
            works_wednesday: false,
            wednesday_from: '',
            wednesday_to: '',
            works_thursday: false,
            thursday_from: '',
            thursday_to: '',
            works_friday: false,
            friday_from: '',
            friday_to: '',
            works_saturday: false,
            saturday_from: '',
            saturday_to: '',
            works_sunday: false,
            sunday_from: '',
            sunday_to: '',

            actions: false,

            selected_month: [],
            selected_monthOptions: [],
            access_control_section: false,

            selected_absence_item: {
                reason: '',
            },
        }
    },

    computed: {
        current_site_language() {
            this.fillMonthOptions(this.$i18n.locale())
            return this.$i18n.locale()
        },
        employee_access_control_logs: function () {
            if (this.$store.getters['company_data/employee/work_schedules/get_employee_access_control_logs']) {
                return this.$store.getters['company_data/employee/work_schedules/get_employee_access_control_logs']
            }
        },
    },

    watch: {
        current_site_language(newValue) {
            this.fillMonthOptions(newValue)
        },
        employee_access_control_logs: function (new_value) {
            for (const log of new_value.logs) {
                log.all_absences_reviewed = true
                if (log.absences) {
                    for (const absence of log.absences) {
                        if (absence.reviewed == 0) {
                            log.all_absences_reviewed = false
                            break
                        }
                    }
                }
            }
            return new_value
        },
    },

    filters: {
        secondsToHours(seconds) {
            let hours = Math.floor(seconds / (60 * 60))

            const divisorForMinutes = seconds % (60 * 60)
            let minutes = Math.floor(divisorForMinutes / 60)

            const divisorForSeconds = divisorForMinutes % 60
            seconds = Math.ceil(divisorForSeconds)

            if (hours < 10) hours = '0' + hours
            if (minutes < 10) minutes = '0' + minutes
            if (seconds < 10) seconds = '0' + seconds

            return hours + ':' + minutes + ':' + seconds
        },
        arrayToString(array) {
            return array.join('<br />')
        },
    },

    methods: {
        getEmployeeWorkScheduleByDate(workSchedule, date, fromOrTo) {
            if (!workSchedule) return 'N/A'

            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const day = days[new Date(date).getDay()]

            if (fromOrTo) {
                return workSchedule[day + '_' + fromOrTo]
            } else {
                return `${workSchedule[day + '_from']} - ${workSchedule[day + '_to']}`
            }
        },
        getEmployeeWorkDurationByDate(workSchedule, date) {
            if (!workSchedule) return 'N/A'

            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const day = days[new Date(date).getDay()]

            const from = workSchedule[day + '_from']
            const fromSplit = from.split(':')
            const to = workSchedule[day + '_to']
            const toSplit = to.split(':')

            let diffHours = Math.abs(Number(toSplit[0]) - Number(fromSplit[0]))
            let diffMinutes = Math.abs(Number(toSplit[1]) - Number(fromSplit[1]))
            let diffSeconds = Math.abs(Number(toSplit[2]) - Number(fromSplit[2]))

            return ((diffHours * 3600 + diffMinutes * 60 + diffSeconds) / 3600).toFixed(2)
        },
        humanReadableInterval(seconds, locale = 'en') {
            const hours = Math.floor(seconds / 3600)
            let minutes

            let hoursString = ''
            let minutesString = ''

            if (locale == 'en') {
                if (hours == 1) {
                    hoursString = 'one hour'
                } else if (hours > 1) {
                    hoursString = hours + ' hours'
                }

                if (hours > 0) {
                    hoursString += ' and '
                    minutes = seconds % 60
                } else {
                    minutes = Math.floor(seconds / 60)
                }

                if (minutes == 1) {
                    minutesString = 'one minute'
                } else {
                    minutesString = minutes + ' minutes'
                }
            } else if (locale == 'sq') {
                if (hours == 1) {
                    hoursString = 'një orë'
                } else if (hours > 1) {
                    hoursString = hours + ' orë'
                }

                if (hours > 0) {
                    hoursString += ' dhe '
                    minutes = seconds % 60
                } else {
                    minutes = Math.floor(seconds / 60)
                }

                if (minutes == 1) {
                    minutesString = 'një minut'
                } else {
                    minutesString = minutes + ' minuta'
                }
            }

            return `${hoursString}${minutesString}`
        },
        generateIntervalNote(interval) {
            const locale = this.$i18n.locale()

            const localeStrings = {
                en: {
                    overtime: 'Worked :interval overtime',
                    missed_work: 'Missed :interval of work',
                    checkin_early: 'Checkin :interval early',
                    checkin_late: 'Checkin :interval late',
                    checkout_early: 'Checkout :interval early',
                    checkout_late: 'Checkout :interval late',
                },
                sq: {
                    overtime: 'Punë :interval jashtë orarit',
                    missed_work: 'Mungesë :interval',
                    checkin_early: 'Hyrje :interval herët',
                    checkin_late: 'Hyrje :interval me vonesë',
                    checkout_early: 'Dalje :interval herët',
                    checkout_late: 'Dalje :interval me vonesë',
                },
            }

            if (!localeStrings[locale] || !localeStrings[locale][interval.type]) {
                return 'N/A'
            }

            return localeStrings[locale][interval.type].replace(':interval', this.humanReadableInterval(interval.interval_seconds, locale))
        },
        fillMonthOptions(current_language) {
            this.selected_month = []
            this.selected_monthOptions = []

            switch (current_language) {
                case 'en':
                    this.selected_monthOptions.push(
                        {
                            name: 'January',
                            value: 1,
                        },
                        {
                            name: 'February',
                            value: 2,
                        },
                        {
                            name: 'March',
                            value: 3,
                        },
                        {
                            name: 'April',
                            value: 4,
                        },
                        {
                            name: 'May',
                            value: 5,
                        },
                        {
                            name: 'June',
                            value: 6,
                        },
                        {
                            name: 'July',
                            value: 7,
                        },
                        {
                            name: 'August',
                            value: 8,
                        },
                        {
                            name: 'September',
                            value: 9,
                        },
                        {
                            name: 'October',
                            value: 10,
                        },
                        {
                            name: 'November',
                            value: 11,
                        },
                        {
                            name: 'December',
                            value: 12,
                        }
                    )
                    break
                case 'sq':
                    this.selected_monthOptions.push(
                        {
                            name: 'Janar',
                            value: 1,
                        },
                        {
                            name: 'Shkurt',
                            value: 2,
                        },
                        {
                            name: 'Mars',
                            value: 3,
                        },
                        {
                            name: 'Prill',
                            value: 4,
                        },
                        {
                            name: 'Maj',
                            value: 5,
                        },
                        {
                            name: 'Qershor',
                            value: 6,
                        },
                        {
                            name: 'Korrik',
                            value: 7,
                        },
                        {
                            name: 'Gusht',
                            value: 8,
                        },
                        {
                            name: 'Shtator',
                            value: 9,
                        },
                        {
                            name: 'Tetor',
                            value: 10,
                        },
                        {
                            name: 'Nëntor',
                            value: 11,
                        },
                        {
                            name: 'Dhjetorë',
                            value: 12,
                        }
                    )
                    break
            }
        },
        get_employee_schedule() {
            this.component_loading = true

            this.$store.dispatch('employee_data/schedules/get_employee_schedule').then((response) => {
                let tempArray = []

                if (response.data.monday_from === '00:00:00' && response.data.monday_to === '00:00:00') {
                    this.works_monday = false
                    this.monday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.monday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_monday = true
                    tempArray = response.data.monday_from.split(':')
                    this.monday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.monday_to.split(':')
                    this.monday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.tuesday_from === '00:00:00' && response.data.tuesday_to === '00:00:00') {
                    this.works_tuesday = false
                    this.tuesday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.tuesday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_tuesday = true
                    tempArray = response.data.tuesday_from.split(':')
                    this.tuesday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.tuesday_to.split(':')
                    this.tuesday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.wednesday_from === '00:00:00' && response.data.wednesday_to === '00:00:00') {
                    this.works_wednesday = false
                    this.wednesday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.wednesday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_wednesday = true
                    tempArray = response.data.wednesday_from.split(':')
                    this.wednesday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.wednesday_to.split(':')
                    this.wednesday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.thursday_from === '00:00:00' && response.data.thursday_to === '00:00:00') {
                    this.works_thursday = false
                    this.thursday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.thursday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_thursday = true
                    tempArray = response.data.thursday_from.split(':')
                    this.thursday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.thursday_to.split(':')
                    this.thursday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.friday_from === '00:00:00' && response.data.friday_to === '00:00:00') {
                    this.works_friday = false
                    this.friday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.friday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_friday = true
                    tempArray = response.data.friday_from.split(':')
                    this.friday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.friday_to.split(':')
                    this.friday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.saturday_from === '00:00:00' && response.data.saturday_to === '00:00:00') {
                    this.works_saturday = false
                    this.saturday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.saturday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_saturday = true
                    tempArray = response.data.saturday_from.split(':')
                    this.saturday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.saturday_to.split(':')
                    this.saturday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                if (response.data.sunday_from === '00:00:00' && response.data.sunday_to === '00:00:00') {
                    this.works_sunday = false
                    this.sunday_from = {
                        HH: '00',
                        mm: '00',
                    }
                    this.sunday_to = {
                        HH: '00',
                        mm: '00',
                    }
                } else {
                    this.works_sunday = true
                    tempArray = response.data.sunday_from.split(':')
                    this.sunday_from = tempArray[0] + ':' + tempArray[1]
                    tempArray = []

                    tempArray = response.data.sunday_to.split(':')
                    this.sunday_to = tempArray[0] + ':' + tempArray[1]
                    tempArray = []
                }

                this.component_loading = false
            })
        },

        cancelActions() {
            this.actions = false
        },

        openActions() {
            this.actions = true
        },

        openAccessControlSection() {
            let currentMonth = moment().month() + 1

            this.selected_month = {
                value: currentMonth,
                name: this.selected_monthOptions.find((option) => option.value === currentMonth).name,
            }

            this.access_control_section = true

            let data = {
                employee_id: this.current_employee.user_id,
                month: currentMonth,
            }

            this.$store.dispatch('company_data/employee/work_schedules/get_employee_access_control_logs', data).then((response) => {
                if (response.status != 200) {
                    this.$toast.error(this.$t('workschedule.nologs'), 'Error', { timeut: 3000 })
                    this.access_control_section = false
                }
            })
        },

        closeModal() {
            this.modal_visible = false
            this.selected_absence_item = {
                reason: '',
            }

            this.$refs.edit_absence_modal.hide()
        },

        openEditAbsenceModal(absenceItem) {
            this.selected_absence_item = { absence_id: absenceItem.absence_id, reason: absenceItem.reason }
            this.$refs.edit_absence_modal.show()
        },

        updateAbsenceItem() {
            const updateData = {
                absence_id: this.selected_absence_item.absence_id,
                reason: this.selected_absence_item.reason,
                employee_id: this.current_employee.user_id,
                month: this.selected_month.value,
            }

            this.$store.dispatch('company_data/employee/work_schedules/update_absence_item', updateData).then((response) => {
                if (response.status != 200) {
                    this.$toast.error(this.$t('alerts.smthwrong'), 'Error', { timeut: 3000 })
                } else {
                    this.$toast.success(this.$t('alerts.successful_data_updated'), 'Success', { timeut: 3000 })
                    this.closeModal()
                }
            })
        },
    },

    created() {
        try {
            this.current_employee = JSON.parse(localStorage.getItem('user_auth'))
        } catch (err) {}
        this.get_employee_schedule()
    },
}
</script>
<style>
.boxi .textinBox {
    position: relative;
}
.borderBottom {
    border-bottom: 1px solid #d3d0d4;
}
.absences-container {
    margin-top: 30px;
    margin-bottom: 10px;
    background-color: rgba(244, 37, 37, 0.1);
    padding: 10px 0 10px 0;
}
.absences-container.fully-reviewed {
    background-color: rgba(53, 176, 255, 0.1);
}
.absences-container h4 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
.boxi.has-unreviewed-absences {
    border-bottom: 2px solid #f42525;
}
.boxi.has-absences {
    border-bottom: 2px solid #35b0ff;
}
.absence-item {
    font-size: 14px;
    font-weight: 500;
    text-decoration: underline;
}
.absence-item p {
    font-size: 15px !important;
}
.edit-absence-item-btn {
    display: block !important;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
}
.edit-absence-item-btn svg {
    width: 16px;
    height: 16px;
}
</style>
