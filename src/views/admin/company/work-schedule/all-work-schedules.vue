<template>
    <div class="page_content">
        <div class="page_title has-back-arrow has-menu-right m-b-30">
            <div class="hrbee-widget-icon m-t-20 m-b-50 inline">
                <div class="icon oraret">
                    <i class="hr-icon-ios-time"></i>
                </div>
                <div class="title">
                    <h5>Work schedule</h5>
                </div>
            </div>

            <ul class="header_menu_right">
                <li>
                    <employee-search searchType="company_employee_search" ref="search" @searchEmployee="searchEmployee" @reset_search="reset_search" />
                </li>
            </ul>
        </div>

        <div class="company_employee_listings company_work_schedule_employee_listings">
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
                    <template v-if="company_work_schedules.total > '0'">
                        <b-row>
                            <template v-for="employee_item in company_work_schedules.data">
                                <div class="employee_item" :key="employee_item.job_application_id">
                                    <div class="interview_header">
                                        <div class="column candidate_image">
                                            <template v-if="employee_item.image_url == '' || employee_item.image_url == null || employee_item.image_url == undefined">
                                                <img src="/images/user/no-image.png" />
                                            </template>
                                            <template v-else>
                                                <img :src="SERVER_URL + IMAGES_FILES + employee_item.image_url" />
                                            </template>
                                        </div>
                                        <div class="column candidate_details">
                                            <h5>{{ employee_item.name }} {{ employee_item.surname }}</h5>

                                            <b-badge @click="view_profile(employee_item.employee_id)" variant="primary">Profile</b-badge>
                                        </div>
                                    </div>
                                    <div class="employee_info_body">
                                        <ul>
                                            <li>
                                                <p class="table-column-description">Monday</p>
                                                {{ employee_item.monday_from | filterTime }} - {{ employee_item.monday_to | filterTime }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Tuesday</p>
                                                {{ employee_item.tuesday_from | filterTime }} - {{ employee_item.tuesday_to | filterTime }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Wednesday</p>
                                                {{ employee_item.wednesday_from | filterTime }} - {{ employee_item.wednesday_to | filterTime }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Thursday</p>
                                                {{ employee_item.thursday_from | filterTime }} - {{ employee_item.thursday_to | filterTime }}
                                            </li>
                                            <li>
                                                <p class="table-column-description">Friday</p>
                                                {{ employee_item.friday_from | filterTime }} - {{ employee_item.friday_to | filterTime }}
                                            </li>

                                            <li class="cursor" :id="'workschedule-' + employee_item.employee_id">
                                                <p class="table-column-description">Weekends</p>
                                                Read more

                                                <b-popover placement="left" :target="'workschedule-' + employee_item.employee_id" triggers="hover focus">
                                                    <template slot="title">Weekends</template>
                                                    <ul>
                                                        <li>
                                                            <p class="table-column-description">Saturday</p>

                                                            <p class="table-column-description value">
                                                                <template v-if="employee_item.saturday_from == '00:00:00'"> Not working </template>
                                                                <template v-else> {{ employee_item.saturday_from | filterTime }} - {{ employee_item.saturday_to | filterTime }} </template>
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p class="table-column-description">Sunday</p>
                                                            <p class="table-column-description value">
                                                                <template v-if="employee_item.sunday_from == '00:00:00'"> Not working </template>
                                                                <template v-else> {{ employee_item.sunday_from | filterTime }} - {{ employee_item.sunday_to | filterTime }} </template>
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </b-popover>
                                            </li>
                                            <li class="action-link">
                                                <a @click="edit_work_schedule(employee_item.employee_id)" v-b-tooltip.hover title="Edit work schedule" class="nav-icon bg--profilet" data-original-title="Edit work schedule">
                                                    <svg width="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <desc>Created with Sketch.</desc>
                                                        <defs></defs>
                                                        <g id="Page-1" stroke="none" stroke-width="1">
                                                            <g id="Business-Recruitment-Konkurset" transform="translate(-1277.000000, -962.000000)" fill-rule="nonzero">
                                                                <g id="Notification" transform="translate(1272.000000, 957.000000)">
                                                                    <g id="pencil-edit-button" transform="translate(5.000000, 5.000000)"><path d="M7.46189638,2.0026454 L9.90296784,4.45564876 L3.72394191,10.6649354 L1.28425447,8.21193199 L7.46189638,2.0026454 Z M11.7552689,1.41103724 L10.666645,0.31708196 C10.2459294,-0.105693987 9.56277427,-0.105693987 9.14062932,0.31708196 L8.09783645,1.36498172 L10.5389079,3.81800788 L11.7552689,2.59568996 C12.081577,2.26776101 12.081577,1.73894338 11.7552689,1.41103724 Z M0.00679292588,11.6598257 C-0.0376314435,11.8607372 0.142879426,12.0407641 0.342834466,11.9919042 L3.06299896,11.329138 L0.623311511,8.8761346 L0.00679292588,11.6598257 Z" id="Shape"></path></g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </b-row>

                        <b-pagination v-if="company_work_schedules.total > '10'" align="center" class="m-t-20" @change="loadAnotherPage" :total-rows="company_work_schedules.total" v-model="company_work_schedules.current_page" :per-page="company_work_schedules.per_page"> </b-pagination>
                    </template>
                    <template v-else>
                        <div class="box cv_status m-b-20">
                            <template v-if="search_error">
                                <p>You don't have any employee with this name</p>
                            </template>
                            <template v-else>
                                <div class="status_text">
                                    <h5>You don't have any employees at the moment..</h5>
                                    <p>This list will be generated automatically as soon as you add any employee to your company.</p>
                                </div>
                                <div class="status_button text-right">
                                    <router-link :to="'/app/employee/all-employees/add'" class="site_btn btn_green"> Add new employee </router-link>
                                </div>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
            <!-- end of template -->
        </div>
    </div>
</template>

<script>
import employeeSearch from '@company_components/jobs/data-search'
export default {
    inject: {
        $validator: '$validator',
    },
    computed: {
        company_work_schedules: function () {
            if (this.$store.getters['company_data/employee/work_schedules/get']) {
                return this.$store.getters['company_data/employee/work_schedules/get']
            }
        },
    },
    watch: {
        company_work_schedules: function (new_value) {
            return new_value
        },
    },
    data() {
        return {
            // Content related
            component_loading: true,

            search_active: false,
            search_error: false,
        }
    },
    methods: {
        searchEmployee: function (query) {
            this.search_error = true
            this.search_active = true

            let name_surname_array = query.split(' ')

            let SearchData = {
                employee_name: name_surname_array[0] !== 'undefined' ? name_surname_array[0] : '',
                employee_surname: name_surname_array[1] == 'undefined' ? name_surname_array[1] : '',
            }

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/work_schedules/search_employee_work_schedules', SearchData).then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        reset_search: function () {
            this.search_error = false
            this.search_active = true

            setTimeout(() => {
                this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules').then((response) => {
                    this.search_active = false
                })
            }, 200)
        },
        loadAnotherPage: function (page_number_to) {
            this.component_loading = true
            setTimeout(() => {
                this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules_with_page', page_number_to).then((response) => {
                    this.component_loading = false
                })
            }, 200)
        },
        view_profile: function (employee_id) {
            //this.$router.push({path: '/app/employee/profile/'+ employee_id + '/profile'})
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/' })
        },
        edit_work_schedule: function (employee_id) {
            this.$router.push({ path: '/app/employee/profile/' + employee_id + '/work-schedule?edit=yes' })
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('company_data/employee/work_schedules/get_all_company_employee_work_schedules').then((response) => {
                this.component_loading = false
            })
        }, 200)
    },
    components: {
        'employee-search': employeeSearch,
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
.company_work_schedule_employee_listings {
    .employee_item {
        .interview_header {
            width: 20%;
            .column {
                vertical-align: middle !important;
            }
        }
    }
}
</style>
