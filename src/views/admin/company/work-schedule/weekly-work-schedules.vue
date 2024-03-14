<template>
    <div class="page_content">
        <div v-if="loading" class="d-flex justify-content-center">
            <div class="component_loader">
                <spinner :status="loading"></spinner>
            </div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-end">
                <router-link :to="'/app/company/workschedule/all-employees'" class="site_btn btn_green">
                    {{ $t('company_jobs_page.backbtn') }}
                </router-link>
            </div>
            <div class="boxi">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <div class="row mx-auto">
                            <div class="col-2">
                                <template v-if="current_employee_profile.image_url == '' || current_employee_profile.image_url == null || current_employee_profile.image_url == undefined">
                                    <div v-b-tooltip.hover :title="$t('header_page.editimage')" class="onhover">
                                        <img src="/images/user/no-image.png" class="imgCandidate" />
                                    </div>
                                </template>
                                <template v-else>
                                    <div v-b-tooltip.hover :title="$t('header_page.editimage')" class="onhover">
                                        <img :src="SERVER_URL + IMAGES_FILES + current_employee_profile.image_url" class="imgCandidate" style="border-radius: 50%" width="70px" />
                                    </div>
                                </template>
                            </div>
                            <div class="col-10">
                                <div class="textinBoxCandidateDetails">
                                    <span class="employee-name">
                                        <h4>{{ current_employee_profile.name }} {{ current_employee_profile.surname }}</h4>
                                        <template v-if="current_employee_profile.is_admin == 1"><span class="badge badge-danger name-adjacent">ADMIN</span></template></span
                                    >
                                    <h5>{{ current_employee_profile.position }}</h5>
                                    <h5>{{ current_employee_profile.department }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div>
                <div class="form-type-1">
                    <div class="form__group">
                        <label for="export_year" class="form__label bold">{{ $t('wages_module.selectyear') }} <span class="required">(*)</span></label>
                        <multiselect @select="onYearSelect" name="year" v-model="year" :options="year_options" placeholder="Select year" label="name" track-by="value"></multiselect>
                    </div>
                </div>
                <div v-if="weeklyLoading" class="d-flex justify-content-center">
                    <div class="component_loader">
                        <spinner :status="weeklyLoading"></spinner>
                    </div>
                </div>
                <div v-else>
                    <div v-if="weekly_schedules.length > 0">
                        <div v-for="item in weekly_schedules" :key="item.id">
                            <week-schedule :week="item" :schedule_template_options="schedule_template_options" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="boxi">
                            <p>No weekly schedules for this employee has been created yet.</p>
                            <p>Please generate the weekly schedules for this employee for {{ year.value }}, after creating then you can modify as you want</p>
                            <button @click="show_generate_form = !show_generate_form">Please Generate now</button>
                            <div v-if="show_generate_form" class="form-type-1 m-t-20" style="margin-left: 20px;">
                                <div class="form__group">
                                    <label class="form__label2 bold" for="name">{{ $t('workschedule.select_schedule_template') }}</label>
                                    <multiselect id="workingschedule" name="schedule_template" v-model="schedule_template" :options="schedule_template_options" @select="onScheduleTemplate" placeholder="Schedule Template" track-by="value" label="name"></multiselect>
                                    <div class="text-center m-t-20">
                                        <button @click="generateWeeklySchedules" class="site_btn btn_purple">Generate</button>
                                    </div>
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
    import Multiselect from 'vue-multiselect'
    import WeekSchedule from "@company_components/week-schedule";

    export default {
        components: {
            Multiselect,
            WeekSchedule
        },

        data() {
            return {
                loading: false,
                weeklyLoading: false,

                employee_id: '',
                year: {
                    name: "2023",
                    value: "2023"
                },
                year_options: [
                    {
                        name: '2023',
                        value: '2023',
                    },
                    {
                        name: '2024',
                        value: '2024'
                    }
                ],

                weeks: [],

                show_generate_form: false,
                schedule_template: '',
                schedule_template_options: [],
            }
        },

        computed:{
            current_employee_profile: function () {
                if (this.$store.getters['company_data/employee/employees/get_current_employee']) {
                    return this.$store.getters['company_data/employee/employees/get_current_employee']
                }
            },

            weekly_schedules: function () {
                if (this.$store.getters['company_data/employee/work_schedules/get_employee_weekly_schedules']) {
                    return this.$store.getters['company_data/employee/work_schedules/get_employee_weekly_schedules']
                }
            },
        },

        watch:{
            current_employee_profile(newvalue) {
                return newvalue
            },

            weekly_schedules(newvalue) {
                return newvalue
            },
        },

        methods:{
            getWeeksInYear: function(year) {
                const startDate = new Date(Date.UTC(year, 0, 1)); // January 1st of the given year in UTC
                const endDate = new Date(Date.UTC(year, 11, 31)); // December 31st of the given year in UTC
                const weekData = [];
                let weekNumber = 1;
                let currentDate = startDate;

                while (currentDate <= endDate) {
                    // Check if the current day is Monday (1)
                    if (currentDate.getUTCDay() === 1) {
                        const options = { timeZone: 'Europe/Belgrade', month: '2-digit', day: '2-digit', year: 'numeric' };
                        const monday = currentDate.toLocaleDateString('en-US', options);
                        currentDate.setUTCDate(currentDate.getUTCDate() + 6); // Move to Sunday
                        const sunday = currentDate.toLocaleDateString('en-US', options);

                        weekData.push({
                            monday,
                            sunday,
                            weekNumber: weekNumber.toString(),
                        });

                        currentDate.setUTCDate(currentDate.getUTCDate() + 1); // Move to next Monday
                        weekNumber++;
                    } else {
                        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
                    }
                }
                this.weeks = weekData;
            },

            fetchWeeklySchedules: function(year){
                this.weeklyLoading = true;
                const data = {
                    employee_id: this.employee_id,
                    year: year
                }

                this.$store.dispatch("company_data/employee/work_schedules/fetch_employee_weekly_schedules", data)
                    .then(response => {
                        this.weeklyLoading = false;
                    })
            },

            onYearSelect: function (data) {
                this.getWeeksInYear(data.value);
                this.fetchWeeklySchedules(data.value);
            },

            generateWeeklySchedules: function () {
                this.weeklyLoading = true;
                const data = {
                    employee_id: this.employee_id,
                    year: this.year.value,
                    weeks_year: this.weeks,
                    schedule_template: this.schedule_template.value
                }

                this.$store.dispatch("company_data/employee/work_schedules/store_employee_weekly_schedules", data)
                    .then(response => {
                        this.fetchWeeklySchedules(this.year.value);
                    })
            },
        },

        created() {
            this.employee_id = this.$route.params.id;
            this.loading = true;
            this.$store.dispatch('company_data/employee/employees/get_single_employee_profile', this.$route.params.id).then((response) => {
                this.$store.dispatch('company_data/workschedules/get_schedules').then((res) => {
                    res.data.forEach((e) => {
                        this.schedule_template_options.push({
                            name: e.name,
                            value: e.id,
                        })
                    })
                    this.loading = false;
                    this.fetchWeeklySchedules(this.year.value);
                })
            })

            this.getWeeksInYear(this.year.value);
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
</style>

