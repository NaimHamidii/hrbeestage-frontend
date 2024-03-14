<template>
    <ul class="sidebar-ul-companynav">
        <!-- NEWS FEED -->
        <li>
            <!-- '/app/company/feed' -->
            <router-link :to="'/app/company/feeds/feeds'" v-bind:class="$route.name === 'CompanyFeed' || $route.name === 'FeedsLayoutOrganogram' || $route.name === 'FeedsLayout' || $route.name === 'FeedsLayoutRegulation' || $route.name === 'FeedsLayoutContacts' || $route.name === 'FeedsLayoutBirthdays' || $route.name === 'FeedsLayoutEvents' || $route.name === 'FeedsLayoutChat' || $route.name === 'FeedsLayoutFeeds' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyFeed' || $route.name === 'FeedsLayout' || $route.name === 'FeedsLayoutOrganogram' || $route.name === 'FeedsLayoutRegulation' || $route.name === 'FeedsLayoutContacts' || $route.name === 'FeedsLayoutBirthdays' || $route.name === 'FeedsLayoutEvents' || $route.name === 'FeedsLayoutChat' || $route.name === 'FeedsLayoutFeeds'">
                    <img src="/images/hrbeeElements/modules/newsfeedActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/newsfeed.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.newsfeed') }}
            </router-link>
        </li>

        <!-- RECRUITMENT-->
        <li>
            <a v-b-toggle.recruitment_submenu v-bind:class="$route.name === 'CompanyJobsArchive' || $route.name === 'CompanyJobsAdd' || $route.name === 'CompanyInterviewsListing' || $route.name === 'CompanyRatingsListing' || $route.name === 'CompanyBlacklistedCandidates' || $route.name === 'CompanyJobsSingleCandidates' || $route.name === 'CompanyJobsSingleEdit' || $route.name === 'CompanyTemplateJobs' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyJobsArchive' || $route.name === 'CompanyJobsAdd' || $route.name === 'CompanyInterviewsListing' || $route.name === 'CompanyRatingsListing' || $route.name === 'CompanyBlacklistedCandidates' || $route.name === 'CompanyJobsSingleCandidates' || $route.name === 'CompanyJobsSingleEdit' || $route.name === 'CompanyTemplateJobs'">
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
                        <router-link :to="'/app/company/company-jobs-archive'" v-bind:class="$route.name === 'CompanyJobsArchive' || $route.name === 'CompanyJobsAdd' || $route.name === 'CompanyJobsLayout' || $route.name === 'CompanyJobsSingleCandidates' || $route.name === 'CompanyJobsSingleEdit' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.jobs') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/company-interviews'" v-bind:class="$route.name === 'CompanyInterviewsListing' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.interviews') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/company-ratings/'" v-bind:class="$route.name === 'CompanyRatingsListing' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.ratings') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/company-blacklisted-candidates'" v-bind:class="$route.name === 'CompanyBlacklistedCandidates' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.blacklist') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/template-jobs'" v-bind:class="$route.name === 'CompanyTemplateJobs' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.jobstemplate') }}
                        </router-link>
                    </li>

                    <!-- Recruitment Reports -->
                    <li>
                        <router-link :to="'/app/company/recruitment-reports'">
                            {{ $t('navigationCompany.reports') }}
                        </router-link>
                    </li>
                    <!-- End of Recruitment Reports -->
                    <!-- <li>
                              <router-link :to="'comingsoon'" :disabled="true">
                                   {{ $t('navigationCompany.reports') }}
                              </router-link>
                         </li> -->
                </ul>
            </b-collapse>
        </li>

        <!-- EMPLOYEES-->
        <li>
            <a v-b-toggle.employees_submenu v-bind:class="$route.name === 'CompanyEmployees' || $route.name === 'DocumentTemplates' || $route.name === 'EmployeeProfileMainProfileData' || $route.name === 'CompanyEmployeesAdd' || $route.name === 'CompanyEmployeeBirthdays' || $route.name === 'CompanyEmployeePerformanceRatingsConfig' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyEmployees' || $route.name === 'DocumentTemplates' || $route.name === 'EmployeeProfileMainProfileData' || $route.name === 'CompanyEmployeesAdd' || $route.name === 'CompanyEmployeeBirthdays' || $route.name === 'CompanyEmployeePerformanceRatingsConfig'">
                    <img src="/images/hrbeeElements/modules/managementActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/management.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.employees') }}
            </a>
            <b-collapse id="employees_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'employees'">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link :to="'/app/company/employee/dashboard'" v-bind:class="$route.name === 'CompanyEmployeeDashboard' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.dashboard') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/employee/all-employees'" v-bind:class="$route.name === 'CompanyEmployees' || $route.name === 'EmployeeProfileMainProfileData' || $route.name === 'CompanyEmployeesAdd' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.allemployees') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/employee-contracts'" v-bind:class="$route.name === 'CompanyEmployeesContracts' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.employeeContract') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/document-templates'" v-bind:class="$route.name === 'DocumentTemplates' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.documenttemplates') }}
                        </router-link>
                    </li>
                    <!-- Employee Reports -->
                    <li>
                        <router-link :to="'/app/company/employee-reports'" v-bind:class="$route.name === 'CompanyEmployeeReports' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.reports') }}
                        </router-link>
                    </li>
                    <!-- End of Employee Reports -->
                </ul>
            </b-collapse>
        </li>

        <!-- WORK SCHEDULE -->
        <!-- <li>
               <router-link :to="'/app/work-schedule'" v-bind:class="($route.name === 'EmployeeProfileWorkSchedule')?'activerouter':''">
                    <template v-if="$route.name === 'EmployeeProfileWorkSchedule'">
                         <img src="/images/hrbeeElements/modules/workscheduleActive.svg" height="30px">
                    </template>
                    <template v-else>
                         <img src="/images/hrbeeElements/modules/workschedule.svg" height="30px">
                    </template>
                    {{ $t('navigationCompany.workschedule') }}
               </router-link>
          </li> -->
        <li>
            <a v-b-toggle.workschedule_submenu v-bind:class="$route.name === 'CompanyWorkScheduleSettings' || $route.name === 'CompanyWorkScheduleAllEmployees' || $route.name === 'TodayAttendances' || $route.name === 'CompanyAttendanceSettings' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyWorkScheduleSettings' || $route.name === 'CompanyWorkScheduleAllEmployees' || $route.name === 'TodayAttendances' || $route.name === 'CompanyAttendanceSettings'">
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
                        <router-link :to="'/app/company/workschedule/today-attendances'" v-bind:class="$route.name === 'TodayAttendances' ? 'activeroutersubmenu' : ''">
                            Today Attendances
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/workschedule/all-employees'" v-bind:class="$route.name === 'CompanyWorkScheduleAllEmployees' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.all_employees') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/workschedule/settings'" v-bind:class="$route.name === 'CompanyWorkScheduleSettings' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.schedule_template') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/workschedule/attendance-settings'" v-bind:class="$route.name === 'CompanyAttendanceSettings' ? 'activeroutersubmenu' : ''">
                            Attendances Settings
                        </router-link>
                    </li>
                </ul>
            </b-collapse>
        </li>

        <!-- VACATIONS-->
        <li>
            <a v-b-toggle.vocations_submenu v-bind:class="$route.name === 'CompanyVocationConfigGeneralVocations' || $route.name === 'CompanyVocationConfigPublicHolidays' || $route.name === 'CompanyVocationEmployeeVocationRequests' ? 'activerouter' : ''">
                <template v-if="$route.name === 'CompanyVocationConfigGeneralVocations' || $route.name === 'CompanyVocationConfigPublicHolidays' || $route.name === 'CompanyVocationEmployeeVocationRequests'">
                    <img src="/images/hrbeeElements/modules/vacationActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/vacation.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.vacations') }}
            </a>
            <b-collapse id="vocations_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'vocations'">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link :to="'/app/company/vocation/vocation-requests'" v-bind:class="$route.name === 'CompanyVocationEmployeeVocationRequests' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.vacationrequest') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/vocation/config-public-holidays'" v-bind:class="$route.name === 'CompanyVocationConfigPublicHolidays' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.publicholidays') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/vocation/config-general-vocations'" v-bind:class="$route.name === 'CompanyVocationConfigGeneralVocations' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.generalvacations') }}
                        </router-link>
                    </li>
                </ul>
            </b-collapse>
        </li>

        <!-- WAGES-->
        <li>
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
                        <router-link :to="'/app/company/wages/bonuses'" v-bind:class="$route.name === 'CompanyBonuses' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.bonuses') }}
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

        <!-- TIMELINE PROJECT -->
        <li>
            <router-link :to="'report'" v-bind:class="$route.name === 'REPORTPAGE' ? 'activerouter' : 'not-active'">
                <template v-if="$route.name === 'REPORTPAGE'">
                    <img src="/images/hrbeeElements/modules/timelineprojectActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/timelineproject.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.timelineproject') }}
            </router-link>
        </li>

        <!-- TRAINING -->
        <li>
            <router-link :to="'report'" v-bind:class="$route.name === 'REPORTPAGE' ? 'activerouter' : 'not-active'">
                <template v-if="$route.name === 'REPORTPAGE'">
                    <img src="/images/hrbeeElements/modules/trainingActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/training.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.training') }}
            </router-link>
        </li>

        <!-- INSURANCE -->
        <li>
            <router-link :to="'/app/company/insurances'" v-bind:class="$route.name === 'AllCompanyEmployeesInsurances' || $route.name === 'CompanyEmployeeInsurances' ? 'activerouter' : ''">
                <template v-if="$route.name === 'AllCompanyEmployeesInsurances' || $route.name === 'CompanyEmployeeInsurances'">
                    <img src="/images/hrbeeElements/modules/insuranceActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/insurance.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.insurance') }}
            </router-link>
        </li>

        <!-- Performance -->
        <li>
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
                    <li>
                        <router-link :to="'/app/company/performances/templates'" v-bind:class="$route.name === 'CompanyPerformanceTemplates' || $route.name === 'CreateCompanyPerformanceTemplates' || $route.name === 'DepartmentPerformanceTemplates' || $route.name === 'SectionPerformancesCreate' || $route.name === 'PositionsPerformanceTemplates' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.performance_templates') }}
                        </router-link>
                    </li>
                </ul>
            </b-collapse>
        </li>

        <!-- ASSETS MANAGEMENT -->
        <li>
            <a v-b-toggle.assets_submenu v-bind:class="$route.name === 'AssetsPage' || $route.name === 'CategoryAssetsPage' ? 'activerouter' : ''">
                <template v-if="$route.name === 'AssetsPage' || $route.name === 'CategoryAssetsPage'">
                    <img src="/images/hrbeeElements/modules/assetsActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/modules/assets.svg" height="30px" />
                </template>
                {{ $t('navigationCompany.assets') }}
            </a>
            <b-collapse id="assets_submenu" class="navigation_submenu" :visible="$route.meta.module_name == 'assets'">
                <ul class="submenu-sidebar">
                    <li>
                        <router-link :to="'/app/company/assets'" v-bind:class="$route.name === 'AssetsPage' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.assets') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/app/company/category-assets'" v-bind:class="$route.name === 'CategoryAssetsPage' ? 'activeroutersubmenu' : ''">
                            {{ $t('navigationCompany.asset_categories') }}
                        </router-link>
                    </li>
                </ul>
            </b-collapse>
        </li>

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

        <li>
            <languageSwitcher />
        </li>

        <hr />
        <!-- INSURANCE -->
        <li>
            <router-link :to="'/app/company/support-faq'" v-bind:class="$route.name === 'CompanySupportFAQ' ? 'activerouterFAQ' : ''">
                <svg class="mr-2 ml-2" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                {{ $t('navigationCompany.support') }}
            </router-link>
        </li>
    </ul>
</template>

<script>
import { profile_data } from '@components/admin-general-fields.js'
import languageSwitcher from '@components/language-switcher-sidebar'
export default {
    mixins: [profile_data],
    props: {
        packagesEnabled: {
            type: Object,
            required: true,
        },
    },

    components: {
        languageSwitcher: languageSwitcher,
    },

    computed: {
        new_notifications: function () {
            return this.$store.getters['notifications/get_notifications']
        },
    },

    watch: {
        new_notifications(newvalue) {
            return newvalue
        },
    },

    created() {
        setTimeout(() => {
            this.$store.dispatch('notifications/get_notifications').then((response) => {})
        }, 500)
    },
}
</script>

<style lang="scss">
.not-active {
    opacity: 0.5 !important;
    pointer-events: none !important;
}

.activerouterFAQ {
    font-weight: bold;
    color: black !important;
}
</style>
