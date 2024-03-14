<template>
    <div class="page_content">
        <div v-if="loading" class="d-flex justify-content-center">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-md-4" v-for="emp in today_attendances" :key="emp.employee_id">
                    <div class="boxi mb-2">
                        <div class="row">
                            <div class="col-2 d-flex align-items-center">
                                <template v-if="emp.image_url == '' || emp.image_url == null || emp.image_url == undefined">
                                    <img src="/images/user/no-image.png" class="imgCandidate" />
                                </template>
                                <template v-else>
                                    <img :src="SERVER_URL + IMAGES_FILES + emp.image_url" class="imgCandidate" />
                                </template>
                            </div>
                            <div class="col-8">
                                <div class="textinBoxCandidateDetails">
                                    <h4 style="margin-top: 0;">{{ emp.name }} {{ emp.surname }}</h4>
                                    <h5>{{ emp.position }} - {{ emp.department }}</h5>
                                    <h5 :class="isLate(emp.attendances, emp.schedule_from) ? 'today-attendance-late' : 'today-attendance-in-time'" style="font-weight: bold; margin-top: 2px; margin-right: 10px;">Work Check In: {{ getFirstCheckInWork(emp.attendances) }}</h5>
                                    <h5 :class="pauseMoreThanWasSpecified(emp.attendances) ? 'today-attendance-late' : 'today-attendance-in-time'" style="font-weight: bold;">Pause Duration: {{ getPauseDuration(emp.attendances) }}</h5>
                                </div>
                            </div>
                            <div class="col-2 d-flex align-items-center">
                                <div class="on-hover" @click="showAttendancesInfo(emp.employee_id, emp.schedule_from, emp.schedule_to)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile_edit_modals" v-if="info_attendances_modal">
            <div class="modal_item">
                <div class="boxi">
                    <div class="d-flex justify-content-between">
                        <h5>{{ $t('attendance.today_attendances') }}</h5>
                        <div @click="info_attendances_modal = false" class="on-hover">
                            <spinner :status="info_attendances_loading"></spinner>
                            <img v-if="!info_attendances_loading" src="/images/close.svg" width="20px" />
                        </div>
                    </div>
                    <hr />
                    <p>{{ $t('attendance.today_schedule') }}: {{ schedule_from }} - {{ schedule_to }}</p>
                    <p :class="isLate(employee_attendances, schedule_from) ? 'today-attendance-late' : 'today-attendance-in-time'">Check In Work: {{ getFirstCheckInWork(employee_attendances) }}</p>
                    <p :class="pauseMoreThanWasSpecified(employee_attendances) ? 'today-attendance-late' : 'today-attendance-in-time'">Pause Duration: {{ getPauseDuration(employee_attendances) }}</p>
                    <div v-if="!info_attendances_loading" class="container">
                        <div v-for="item in employee_attendances" :key="item.id">
                            <div class="row attendance-item">
                                <div class="col-md-3 label-value">
                                    <p class="label">{{ $t('attendance.checkin') }}</p>
                                    <p class="value">{{ showTime(item.checkin) }}</p>
                                </div>
                                <div class="col-md-3 label-value">
                                    <p class="label">{{ $t('attendance.checkout') }}</p>
                                    <p class="value">{{ showTime(item.checkout) }}</p>
                                </div>
                                <div class="col-md-3 label-value">
                                    <p class="label">{{ $t('attendance.type') }}</p>
                                    <p class="value">{{ item.type === "work" ? $t('attendance.work') : item.type === "out_work" ? "Dalje zyrtare" : item.type === "private_not_work" ? "Dalje private" : $t('attendance.pause') }}</p>
                                </div>
                                <div class="col-md-3 label-value">
                                    <p class="label">{{ $t('attendance.duration') }}</p>
                                    <p class="value">{{ getDurationFromSeconds(item.duration_seconds) }}</p>
                                </div>
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
            return {
                loading: false,
                info_attendances_loading: false,

                info_attendances_modal: false,
                employee_attendances: [],
                schedule_from: '',
                schedule_to: '',

                late_for_work_minutes_to_seconds: 0,
                allowed_seconds_for_pause: 0
            }
        },

        computed:{
            today_attendances: function () {
                if (this.$store.getters['company_data/employee/work_schedules/get_today_attendances']) {
                    return this.$store.getters['company_data/employee/work_schedules/get_today_attendances']
                }
            },
            
        },

        watch:{
            today_attendances: function (new_value) {
                return new_value
            },
        },

        methods:{
            pauseMoreThanWasSpecified: function(attendances) {
                let pauseDuration = 0;
                for (let i = 0; i < attendances.length; i++) {
                    if (attendances[i].type === "pause") {
                        if (attendances[i].duration_seconds) {
                            pauseDuration = pauseDuration + parseFloat(attendances[i].duration_seconds);
                        }
                    }
                }
                if (pauseDuration > this.allowed_seconds_for_pause){
                    return true;
                }
                return false;
            },

            getPauseDuration: function(attendances) {
                let pauseDuration = 0;
                for (let i = 0; i < attendances.length; i++) {
                    if (attendances[i].type === "pause") {
                        if (attendances[i].duration_seconds) {
                            pauseDuration = pauseDuration + parseFloat(attendances[i].duration_seconds);
                        }
                    }
                }
                if (!pauseDuration || pauseDuration === 0) return '~'
                const hours = Math.floor(pauseDuration / 3600);
                const minutes = Math.floor((pauseDuration % 3600) / 60);
                const remainingSeconds = pauseDuration % 60;
            
                return `${hours}:${minutes}:${remainingSeconds}`;
            },

            isLate: function(attendances, scheduleFrom) {
                let firstCheckIn = null;
                for (let i = 0; i < attendances.length; i++) {
                    if (attendances[i].type === "work") {
                        const parsedTimestamp = moment(attendances[i].checkin, 'YYYY-MM-DD HH:mm:ss');
                        firstCheckIn = parsedTimestamp.format('HH:mm:ss');
                        break;
                    }
                }
                if (firstCheckIn > scheduleFrom) {
                    const firstCheckInMoment = moment(firstCheckIn, 'HH:mm:ss');
                    const scheduleFromMoment = moment(scheduleFrom, 'HH:mm:ss');

                    const differenceInSeconds = firstCheckInMoment.diff(scheduleFromMoment, 'seconds');

                    if (differenceInSeconds > this.late_for_work_minutes_to_seconds) {
                        return true;
                    }
                    return false;
                }
                return false
            },

            fetchData: function() {
                this.loading = true;
                this.$store.dispatch("company_data/employee/work_schedules/get_todays_attendances")
                    .then(response => {
                        this.loading = false;
                    })
            },

            getFirstCheckInWork: function(attendances) {
                for (let i = 0; i < attendances.length; i++) {
                    if (attendances[i].type === "work") {
                        const parsedTimestamp = moment(attendances[i].checkin, 'YYYY-MM-DD HH:mm:ss');
                        return parsedTimestamp.format('HH:mm:ss');
                    }
                }
                return null;
            },

            showTime: function(dateTime) {
                if (!dateTime) return '~';
                const parsedTimestamp = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
                return parsedTimestamp.format('HH:mm:ss');
            },

            getDurationFromSeconds: function(duration) {
                if (!duration) return '~'
                const hours = Math.floor(duration / 3600);
                const minutes = Math.floor((duration % 3600) / 60);
                const remainingSeconds = duration % 60;
            
                return `${hours}:${minutes}:${remainingSeconds}`;
            },

            showAttendancesInfo: function(id, schedule_from, schedule_to) {
                this.info_attendances_loading = true;
                this.info_attendances_modal = true;
                this.employee_attendances = [];
                this.schedule_from = schedule_from,
                this.schedule_to = schedule_to,
                this.$store.dispatch("company_data/employee/work_schedules/get_employee_todays_attendances", id)
                    .then(response => {
                        this.info_attendances_loading = false;
                        this.employee_attendances = response.data;
                    })
            }
        },

        created() {
            this.fetchData();
            this.$store.dispatch('company_data/attendance_settings/get_company_general_attendance_settings').then((response) => {
                this.loading_general_settings = false;
                if (response.data.id) {
                    this.late_for_work_minutes_to_seconds = response.data.late_for_work_minutes * 60;
                    this.allowed_seconds_for_pause = parseFloat(response.data.allowed_pause_minutes) + parseFloat(response.data.late_pause_minutes);
                    this.allowed_seconds_for_pause = this.allowed_seconds_for_pause * 60;
                }
            })
        },
    }
</script>

<style lang="scss">
    .attendance-item {
        margin-bottom: 15px;

        .label-value {
            p {
                padding: 0;
                margin: 0;
            }

            .label {
                font-size: 13px;
            }

            .value {
                font-weight: bold;
            }
        }
    }
    .today-attendance-late{
        color: red !important;
    }

    .today-attendance-in-time {
        color: rgb(60, 231, 60) !important;
    }
</style>

