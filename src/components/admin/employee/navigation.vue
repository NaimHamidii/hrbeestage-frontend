<template>
    <ul class="sidebar-ul">
        <li v-if="!current_employee_is_in_probation" v-bind:class="$route.name === 'EmployeeFeeds' ? 'activerouter' : ''">
            <router-link :to="'/app/employee/feeds'" v-bind:class="$route.name === 'EmployeeFeeds' ? 'router-link-active' : ''">
                <template v-if="$route.name === 'EmployeeFeeds'">
                    <img src="/images/hrbeeElements/modules/newsfeedActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/newsfeed.svg" height="30px" />
                </template>
                {{ $t('employeeNavigation.feeds') }}
            </router-link>
        </li>

        <li>
            <router-link :to="'/app/employee/profile'">
                <template v-if="$route.name === 'EmployeeProfile'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/cvActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/cv.svg" height="30px" />
                </template>
                {{ $t('employeeNavigation.profile') }}
            </router-link>
        </li>

        <template v-if="!current_employee_is_in_probation">
            <li>
                <a v-b-toggle.recruitment_submenu :class="{ activerouter: $route.name === 'EmployeeInterviewPanelJobs' || $route.name === 'EmployeeInterviewPanelJobsLayout' || $route.name === 'EmployeeInterviewPanelJobsSingleCandidates', 'not-active': !employee_access || !employee_access.is_interview_panel_member }">
                    <template v-if="$route.name === 'EmployeeInterviewPanelJobs' || $route.name === 'EmployeeInterviewPanelJobsLayout' || $route.name === 'EmployeeInterviewPanelJobsSingleCandidates'">
                        <img src="/images/hrbeeElements/modules/recruitmentActive.svg" height="30px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/modules/recruitment.svg" height="30px" />
                    </template>
                    {{ $t('navigationCompany.recruitment') }}
                </a>
                <b-collapse id="recruitment_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'recruitment'">
                    <ul class="submenu-sidebar">
                        <li>
                            <router-link :to="'/app/employee/jobs'" v-bind:class="$route.name === 'CompanyJobsArchiveForInterviewPanel' ? 'activeroutersubmenu' : ''">
                                {{ $t('navigationCompany.jobs') }}
                            </router-link>
                        </li>
                    </ul>
                </b-collapse>
            </li>

            <li v-bind:class="$route.name === 'EmployeeVacations' ? 'activerouter' : ''">
                <router-link :to="'/app/employee/vacations'" v-bind:class="$route.name === 'EmployeeVacations' ? 'router-link-active' : ''">
                    <template v-if="$route.name === 'EmployeeVacations'">
                        <img src="/images/hrbeeElements/modules/vacationActive.svg" height="30px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/modules/vacation.svg" height="30px" />
                    </template>
                    {{ $t('employeeNavigation.vacations') }}
                </router-link>
            </li>
        </template>

        <li v-bind:class="$route.name === 'EmployeeSalaries' ? 'activerouter' : ''">
            <router-link :to="'/app/employee/salaries'" v-bind:class="$route.name === 'EmployeeSalaries' ? 'router-link-active' : ''">
                <template v-if="$route.name === 'EmployeeSalaries'">
                    <img src="/images/hrbeeElements/modules/wagesActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/wages.svg" height="30px" />
                </template>
                {{ $t('employeeNavigation.salaries') }}
            </router-link>
        </li>

        <li v-if="employee_access.all.wages">
            <a v-b-toggle.finances_submenu v-bind:class="$route.name === 'CompanyWagesSettings' || $route.name === 'CompanyEmployeeWagesList' || $route.name === 'CompanyFinanceGenerateSalaries' || $route.name === 'CompanyGenerateWages' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyWagesSettings' || $route.name === 'CompanyEmployeeWagesList' || $route.name === 'CompanyFinanceGenerateSalaries' || $route.name === 'CompanyGenerateWages'">
                    <img src="/images/hrbeeElements/modules/wagesActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/wages.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.wages') }}
            </a>
            <b-collapse id="finances_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'wages'">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link :to="'/app/company/wages/generate-wages'" v-bind:class="$route.name === 'CompanyGenerateWages' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.generatewages') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/wages/employee-wages-list'" v-bind:class="$route.name === 'CompanyEmployeeWagesList' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.employeeswages') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/wages/settings'" v-bind:class="$route.name === 'CompanyWagesSettings' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.settings') }}
                        </router-link>
                    </li>
                    <!-- <li>
                              <router-link :to="'/app/finances/employee-salaries'" v-bind:class="($route.name === 'CompanyFinanceEmployeeSalaries')?'activeroutersubmenu' : ''">
                                   {{ $t('navigationCompany.employeesalaries') }} old
                              </router-link>
                         </li>
                         <li>
                              <router-link :to="'/app/finances/generate-salaries'" v-bind:class="($route.name === 'CompanyFinanceAssignEmployeeToSalaryList')?'activeroutersubmenu' : ''">
                                   {{ $t('navigationCompany.generatesalaries') }} old
                              </router-link>
                         </li> -->
                </ul>
            </b-collapse>
        </li>

        <template v-if="!current_employee_is_in_probation">
            <template v-if="employee_access && employee_access.all.workschedule">
                <li>
                    <a v-b-toggle.workschedule_submenu v-bind:class="$route.name === 'EmployeeAccessWorkScheduleSettings' || $route.name === 'CompanyWorkScheduleAllEmployees' ? 'activerouter' : ''">
                        <template v-if="$route.name === 'EmployeeAccessWorkScheduleSettings' || $route.name === 'EmployeeAccessWorkScheduleAllEmployees'">
                            <img src="/images/hrbeeElements/modules/workscheduleActive.svg" height="30px" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/modules/workschedule.svg" height="30px" />
                        </template>
                        {{ $t('navigationCompany.workschedule') }}
                    </a>
                    <b-collapse id="workschedule_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'workschedule'">
                        <ul class="submenu-sidebar">
                            <li>
                                <router-link :to="'/app/employee/schedules'" v-bind:class="$route.name === 'EmployeeSchedules' ? 'activeroutersubmenu' : ''">
                                    {{ $t('employeeNavigation.myschedule') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/employee/access/workschedule/all-employees'" v-bind:class="$route.name === 'EmployeeAccessWorkScheduleAllEmployees' ? 'activeroutersubmenu' : ''">
                                    {{ $t('navigationCompany.all_employees') }}
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/app/employee/access/workschedule/settings'" v-bind:class="$route.name === 'EmployeeAccessWorkScheduleSettings' ? 'activeroutersubmenu' : ''">
                                    {{ $t('navigationCompany.schedule_template') }}
                                </router-link>
                            </li>
                        </ul>
                    </b-collapse>
                </li>
            </template>
            <template v-else>
                <li v-bind:class="$route.name === 'EmployeeSchedules' ? 'activerouter' : ''">
                    <router-link :to="'/app/employee/schedules'" v-bind:class="$route.name === 'EmployeeSchedules' ? 'router-link-active' : ''">
                        <template v-if="$route.name === 'EmployeeSchedules'">
                            <img src="/images/hrbeeElements/modules/workscheduleActive.svg" height="30px" />
                        </template>
                        <template v-else>
                            <img src="/images/hrbeeElements/modules/workschedule.svg" height="30px" />
                        </template>
                        {{ $t('employeeNavigation.workschedule') }}
                    </router-link>
                </li>
            </template>
        </template>

        <li v-if="employee_access.all.performance">
            <a v-b-toggle.performance_submenu v-bind:class="$route.name === 'CompanyPerformanceTemplates' || $route.name === 'CreateCompanyPerformanceTemplates' || $route.name === 'CompanyVocationEmployeeVocationRequests' || $route.name === 'AllCompanyEmployeesPerformances' || $route.name === 'EmployeePerformances' || $route.name === 'DepartmentPerformanceTemplates' || $route.name === 'SectionPerformancesCreate' || $route.name === 'PositionsPerformanceTemplates' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyPerformanceTemplates' || $route.name === 'CreateCompanyPerformanceTemplates' || $route.name === 'CompanyVocationEmployeeVocationRequests' || $route.name === 'AllCompanyEmployeesPerformances' || $route.name === 'EmployeePerformances' || $route.name === 'DepartmentPerformanceTemplates' || $route.name === 'SectionPerformancesCreate' || $route.name === 'PositionsPerformanceTemplates'">
                    <img src="/images/hrbeeElements/modules/performanceActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/performance.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.performance') }}
            </a>
            <b-collapse id="performance_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'performances'">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link :to="'/app/company/all-performances'" v-bind:class="$route.name === 'AllCompanyEmployeesPerformances' || $route.name === 'EmployeePerformances' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.all_employee_performances') }}
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link :to="'/app/company/performances/templates'" v-bind:class="$route.name === 'CompanyPerformanceTemplates' || $route.name === 'CreateCompanyPerformanceTemplates' || $route.name === 'DepartmentPerformanceTemplates' || $route.name === 'SectionPerformancesCreate' || $route.name === 'PositionsPerformanceTemplates' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.performance_templates') }}
                        </router-link>
                    </li> -->
                </ul>
            </b-collapse>
        </li>
        <li v-else-if="!current_employee_is_in_probation" v-bind:class="$route.name === 'EmployeePerformance' ? 'activerouter' : ''">
            <router-link :to="'/app/employee/performance'" v-bind:class="$route.name === 'EmployeePerformance' ? 'router-link-active' : ''">
                <template v-if="$route.name === 'EmployeePerformance'">
                    <img src="/images/hrbeeElements/modules/performanceActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/performance.svg" height="30px" />
                </template>
                {{ $t('employeeNavigation.performance') }}
            </router-link>
        </li>

        <template v-if="!current_employee_is_in_probation">
            <li class="seperator"></li>

            <li v-bind:class="$route.name === 'EmployeeEvents' ? 'activerouter' : ''">
                <router-link :to="'/app/employee/employee-events'" v-bind:class="$route.name === 'EmployeeEvents' ? 'router-link-active' : ''">
                    <template v-if="$route.name === 'EmployeeEvents'">
                        <img src="/images/hrbeeElements/feedsIcons/events-active.svg" height="25px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/feedsIcons/events.svg" height="25px" />
                    </template>
                    {{ $t('employeeNavigation.events') }}
                </router-link>
            </li>

            <li v-bind:class="$route.name === 'EmployeeCompanySettingsOrganogram' ? 'activerouter' : ''">
                <router-link :to="'/app/employee/company-settings/organogram'" v-bind:class="$route.name === 'EmployeeCompanySettingsOrganogram' ? 'router-link-active' : ''">
                    <template v-if="$route.name === 'EmployeeCompanySettingsOrganogram'">
                        <img src="/images/hrbeeElements/feedsIcons/organogram-active.svg" height="25px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/feedsIcons/organogram.svg" height="25px" />
                    </template>
                    {{ $t('employeeNavigation.companyorganogram') }}
                </router-link>
            </li>

            <li v-bind:class="$route.name === 'EmployeeCompanySettingsDressCode' ? 'activerouter' : ''">
                <router-link :to="'/app/employee/company-settings/dresscode'" v-bind:class="$route.name === 'EmployeeCompanySettingsDressCode' ? 'router-link-active' : ''">
                    <template v-if="$route.name === 'EmployeeCompanySettingsDressCode'">
                        <img src="/images/hrbeeElements/feedsIcons/dress_code-active.svg" height="25px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/feedsIcons/dress_code.svg" height="25px" />
                    </template>
                    {{ $t('employeeNavigation.dresscode') }}
                </router-link>
            </li>

            <li v-bind:class="$route.name === 'EmployeeCompanySettingsRegulations' ? 'activerouter' : ''">
                <router-link :to="'/app/employee/company-settings/regulation'" v-bind:class="$route.name === 'EmployeeCompanySettingsRegulations' ? 'router-link-active' : ''">
                    <template v-if="$route.name === 'EmployeeCompanySettingsRegulations'">
                        <img src="/images/hrbeeElements/feedsIcons/regulations-active.svg" height="25px" />
                    </template>
                    <template v-else>
                        <img src="/images/hrbeeElements/feedsIcons/regulations.svg" height="25px" />
                    </template>
                    {{ $t('employeeNavigation.regulation') }}
                </router-link>
            </li>
        </template>

        <li id="sm1200">
            <router-link :to="'/app/notifications'">
                <template v-if="$route.name === 'AllNotificationsView'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/notificonActive.svg" height="25px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/notificon.svg" height="25px" />
                </template>
                <b>{{ new_notifications.total_new_notifications }}</b> {{ $t('navigationlinks.nnotifications') }}
            </router-link>
        </li>

        <hr />

        <li v-if="!current_employee_is_in_probation && employee_access && employee_access.all.vacations">
            <router-link :to="'/app/employee/access/vacation-requests'" v-bind:class="$route.name === 'EmployeeVacationRequests' ? 'router-link-active' : ''">
                <template v-if="$route.name === 'EmployeeVacationRequests'">
                    <img src="/images/hrbeeElements/modules/vacationActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/vacation.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.vacationrequests') }}
            </router-link>
        </li>

        <li>
            <languageSwitcher />
        </li>
    </ul>
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'
import languageSwitcher from '@components/language-switcher-sidebar'
export default {
    mixins: [profile_data],

    components: {
        languageSwitcher: languageSwitcher,
    },

    computed: {
        new_notifications: function () {
            return this.$store.getters['notifications/get_notifications']
        },
        employee_access: function () {
            if (this.$store.getters['company_data/employee/access/get_current_employee_access']) {
                return this.$store.getters['company_data/employee/access/get_current_employee_access']
            }
        },
    },

    watch: {
        new_notifications(newvalue) {
            return newvalue
        },

        employee_access(newValue) {
            return newValue
        },
    },

    data: function () {
        return {
            current_employee_id: '',
            current_employee_is_in_probation: false,
        }
    },

    methods: {
        get_current_employee_access: function () {
            if (this.current_employee_id == null) return

            this.$store.dispatch('company_data/employee/access/get_employee_access', this.current_employee_id)
        },
    },

    created() {
        this.current_employee_id = Number(localStorage.getItem('auth.user_id'))
        this.current_employee_is_in_probation = localStorage.getItem('auth_isEmployeeInProbation') == 1
        if (!this.current_employee_is_in_probation && !isNaN(this.current_employee_id)) this.get_current_employee_access()
        this.$store.dispatch('notifications/get_notifications')
    },
}
</script>

<style scoped>
.activerouter {
    background-color: #f0f1f3 !important;
    border-radius: 3px !important;
    font-size: 12px !important;
    font-weight: 400 !important;
    color: #3099f1 !important;
    background-color: unset !important;
}
</style>
