import { store } from '@state'

import LayoutPublic from '@layouts/layout-public'
import LayoutAuth from '@layouts/layout-auth'
import LayoutAdmin from '@layouts/layout-admin'

import PageHome from '@views/public/home'
import PagePricing from '@views/public/pricing'
import PageProduct from '@views/public/product'
import PageContactUs from '@views/public/contact'
import PageAboutUs from '@views/public/aboutus'
import TrainingPage from '@views/public/training'
import PageKnowledgeBase from '@views/public/knowledgebase'
import PageApi from '@views/public/api'
import PagePartnerShip from '@views/public/partnership'

import PageTerms from '@views/public/terms-conditions'
import PagePrivacyPolicy from '@views/public/privacy-policy'

import PageRekrutimiModule from '@views/module-rekrutimi'
import PageFeedsModule from '@views/module-feeds'
import PageEmployeesModule from '@views/module-employees'
import PageWorkScheduleModule from '@views/module-work-schedule'
import PageVacationsModule from '@views/module-vacations'
import PageFinancesModule from '@views/module-finances'
import PageFindJobs from '@views/findJobs'
import PageAllJobs from '@views/admin/jobseeker/alljobs'
import PageSavedJobs from '@views/admin/jobseeker/savedjobs'
import PageDetailJob from '@views/admin/jobseeker/detail-job.vue'
import CompanyPublicProfile from '@views/company-public-profile'
import JobPublicView from '@views/job-public-view'

/* Authentication pages */
import PageRegister from '@views/auth/register'
import PageRegisterCompany from '@views/auth/register-company'
import PageRegisterCompanyPacket from '@views/auth/register-companyPacket'
import PageRegisterJobSeeker from '@views/auth/register-jobseeker'
import PageLogin from '@views/auth/login'
import PageForgot from '@views/auth/forgot'
import PageDemo from '@views/auth/demo'

/* Super Admin pages */

import SuperAdminDashboard from '@views/admin/superadmin/dashboard'
import SuperAdminCompanies from '@views/admin/superadmin/companies'
import SuperAdminCompaniesContracts from '@views/admin/superadmin/companies-contracts'
import SuperAdminJobseekers from '@views/admin/superadmin/jobseekers'
import SuperAdminInvoices from '@views/admin/superadmin/invoices'
import SuperAdminModules from '@views/admin/superadmin/modules'
import SuperAdminMessages from '@views/admin/superadmin/messages'
import SuperAdminJobs from '@views/admin/superadmin/jobs/jobs'
import SuperAdminTrainings from '@views/admin/superadmin/trainings/trainings'
import SuperAdminSupport from '@views/admin/superadmin/support'
import SuperAdminSingleJob from '@views/admin/superadmin/jobs/single-job'
import SuperAdminModulePricing from '@views/admin/superadmin/modules/module-pricing'
import SuperAdminModulePackages from '@views/admin/superadmin/modules/offer-packages'

import SuperAdminCompanyProfileLayout from '@views/admin/superadmin/company-profile/main'
import SuperAdminCompanyProfileMainData from '@views/admin/superadmin/company-profile/main-profile-data'
import SuperAdminCompanyProfileModules from '@views/admin/superadmin/company-profile/modules'
import SuperAdminCompanyProfileAsignModules from '@views/admin/superadmin/company-profile/assign_module'
import SuperAdminCompanyProfileInvoices from '@views/admin/superadmin/company-profile/invoices'
import SuperAdminCompanyProfileEmployees from '@views/admin/superadmin/company-profile/employees'
import SuperAdminCompanyProfileInvoiceView from '@views/admin/superadmin/company-profile/invoices-view'

/* Admin pages */

/* Jobseeker pages */
import JobseekerDashboard from '@views/admin/jobseeker/dashboard'
import JobseekerPageProfile from '@views/admin/jobseeker/profile'
import JobseekerPageDownloadResume from '@views/admin/jobseeker/download-resume'
import JobseekerPageSearchJobs from '@views/admin/jobseeker/search-jobs'
import JobseekerPageSingleJob from '@views/admin/jobseeker/search-jobs-single'
import JobseekerPageAppliedPositions from '@views/admin/jobseeker/applied-positions'
import JobseekerPageRatings from '@views/admin/jobseeker/ratings'
import JobSeekerGetCV from '@views/admin/jobseeker/cv/cv'
import AccountSettings from '@views/admin/account-settings'

/* Company Plans Page*/
import CompanyPlans from '@views/admin/company/company-plans'
import CompanyInvoices from '@views/admin/company/company-invoices'

/* Company Feed Module*/
import CompanyFeed from '@views/admin/company/feed'

/* FEEDS MODULE */
import FeedsLayout from '@views/admin/company/feeds/main'
import FeedsLayoutOrganogram from '@views/admin/company/feeds/organogram'
import FeedsLayoutRegulation from '@views/admin/company/feeds/regulation'
import FeedsLayoutContacts from '@views/admin/company/feeds/contacts'
import FeedsLayoutBirthdays from '@views/admin/company/feeds/birthdays'
import FeedsLayoutEvents from '@views/admin/company/feeds/event'
import FeedsLayoutChat from '@views/admin/company/feeds/chat'
import FeedsLayoutFeeds from '@views/admin/company/feeds/feeds'
import FeedsLayoutDressCode from '@views/admin/company/feeds/dresscode'

/* Company Recruitment Module */
import CompanyJobsLayout from '@views/admin/company/recruitment/company-jobs-layout'
import CompanyJobsArchive from '@views/admin/company/recruitment/jobs/company-jobs-archive'
import CompanyJobsSingleCandidates from '@views/admin/company/recruitment/jobs/job-details'
import CompanyJobsSingleEdit from '@views/admin/company/recruitment/jobs/edit-beta-job'
import CompanyJobsAdd from '@views/admin/company/recruitment/jobs/add-beta-job'

/* Company Recruitment Module for employees that are part of the interview panel */
import EmployeeInterviewPanelJobsLayout from '@views/admin/employee/recruitment/jobs/interview-panel-jobs-layout'
import EmployeeInterviewPanelJobs from '@views/admin/employee/recruitment/jobs/interview-panel-jobs'
import EmployeeInterviewPanelJobsSingleCandidates from '@views/admin/employee/recruitment/jobs/interview-panel-job-details'

import CompanyTemplateJobs from '@views/admin/company/recruitment/template/template-jobs'

import CompanyInterviewsListing from '@views/admin/company/recruitment/interviews/interviews-candidate'
import CompanysingleInterviewCandidates from '@views/admin/company/recruitment/interviews/single-interview-candidate'

import CompanyRatingsListing from '@views/admin/company/recruitment/ratings/ratings-candidate'
import CompanySingleRatedCandidates from '@views/admin/company/recruitment/ratings/single-rated-candidate'

import CompanyBlacklistedCandidates from '@views/admin/company/recruitment/blacklisted/blacklisted-candidate'
import CompanySingleBlacklistedCandidates from '@views/admin/company/recruitment/blacklisted/single-blacklisted-candidate'

/* Company Employees Module*/
import CompanyEmployeeDashboard from '@views/admin/company/employees/dashboard'
import CompanyEmployees from '@views/admin/company/employees/all-employees/all-employees'
import CompanyEmployeesAdd from '@views/admin/company/employees/all-employees/add-employee'
//import CompanyEmployeeContracts from '@views/admin/company/employees/all-contracts'
//import CompanyEmployeePerformanceRatings from '@views/admin/company/employees/all-performances'
//import CompanyEmployeeWarnings from '@views/admin/company/employees/all-warnings'
import CompanyEmployeeBirthdays from '@views/admin/company/employees/all-birthdays'
import CompanyEmployeePerformanceRatingsConfig from '@views/admin/company/employees/config-performances'

// EMPLOYEE PROFILE PAGES WITH TABS
// ALPHA
// import EmployeeProfileLayout from '@views/admin/company/employees/employee-profile/main'
// import EmployeeProfileMainProfileData from '@views/admin/company/employees/employee-profile/main-profile-data'
// import EmployeeProfileWorkDetails from '@views/admin/company/employees/employee-profile/work-details'
// import EmployeeProfilePerformances from '@views/admin/company/employees/employee-profile/performance'
// import EmployeeProfileDocuments from '@views/admin/company/employees/employee-profile/documents'
// import EmployeeProfileVocations from '@views/admin/company/employees/employee-profile/vocations'
// import EmployeeProfileSalary from '@views/admin/company/employees/employee-profile/salary'
// import EmployeeProfileWorkSchedule from '@views/admin/company/employees/employee-profile/work-schedule'
//BETA
import EmployeeProfileLayout from '@views/admin/company/employees/profile/header'
import EmployeeProfileMainProfileData from '@views/admin/company/employees/profile/profile-cv'
import EmployeeProfileEmployeeInfo from '@views/admin/company/employees/profile/employee-info'
import EmployeeProfileContract from '@views/admin/company/employees/profile/contract'
import EmployeeProfileVacations from '@views/admin/company/employees/profile/vacation'
import EmployeeProfilePerformances from '@views/admin/company/employees/profile/performance'
import EmployeeProfileSalary from '@views/admin/company/employees/profile/salary'
import EmployeeProfileDocuments from '@views/admin/company/employees/profile/other-document'
import EmployeeProfileWarningLetter from '@views/admin/company/employees/profile/warning-letter'
import EmployeeProfileAccess from '@views/admin/company/employees/profile/access'
import CompanyEmployeeTodo from '@views/admin/company/employees/profile/todo'
import CompanyEmployeeAssets from '@views/admin/company/employees/profile/assets'

import DocumentTemplates from '@views/admin/company/employees/documenttemplates/showTemplates'

/* Company Vocations Module*/
import CompanyVocationConfigGeneralVocations from '@views/admin/company/vocations/general-vocations'
import CompanyVocationConfigPublicHolidays from '@views/admin/company/vocations/public-holidays'
//import CompanyVocationEmployeeVocations from '@views/admin/company/vocations/all-employee-vocations'
import CompanyVocationEmployeeVocationRequests from '@views/admin/company/vocations/employee-vocation'

/* Company Wages Module */
import CompanyWagesSettings from '@views/admin/company/wages/settings-wages'
import CompanyEmployeeWagesList from '@views/admin/company/wages/employee-wages-list'
import CompanyGenerateWages from '@views/admin/company/wages/generate-wages'
import CompanyBonuses from '@views/admin/company/wages/bonuses'

/* Company FINANCE Module*/
import CompanyFinanceEmployeeSalaries from '@views/admin/company/finances/all-employee-salaries'
import CompanyFinanceAssignEmployeeToSalaryList from '@views/admin/company/finances/assign-employee-to-salary-list'
import CompanyFinanceGenerateSalaries from '@views/admin/company/finances/generate-salaries'

/* Company Employee Insurances Module*/
import AllCompanyEmployeesInsurances from '@views/admin/company/insurance/all-employee-insurances'
import CompanyEmployeeInsurances from '@views/admin/company/insurance/employee-insurance'

// Company Management Assets Module
import AssetsPage from '@views/admin/company/management-assets/assets'
import CategoryAssetsPage from '@views/admin/company/management-assets/categories'

/* Comapny Performance Module*/
import CompanyPerformanceTemplates from '@views/admin/company/performances/performance-templates'
import CreateCompanyPerformanceTemplates from '@views/admin/company/performances/performance-template-create'
import SectionPerformancesCreate from '@views/admin/company/performances/section-performance-create'
import DepartmentPerformanceTemplates from '@views/admin/company/performances/department-performance-templates'
import PositionsPerformanceTemplates from '@views/admin/company/performances/position-performance-templates'
import AllCompanyEmployeesPerformances from '@views/admin/company/performances/all-employee-performances'
import EmployeePerformances from '@views/admin/company/performances/employee-performances'

/* Company Work Schedule Module*/
import CompanyEmployeesWorkSchedules from '@views/admin/company/work-schedule/all-work-schedules'
import CompanyWorkScheduleSettings from '@views/admin/company/work-schedule/settings'
import CompanyWorkScheduleAllEmployees from '@views/admin/company/work-schedule/all-employees'
import TodayAttendances from '@views/admin/company/work-schedule/today-attendances'
import CompanyEmployeeWeeklyWorkSchedules from '@views/admin/company/work-schedule/weekly-work-schedules'
import MonthlyAttendances from '@views/admin/company/work-schedule/monthly-attendances'
import CompanyAttendanceSettings from '@views/admin/company/work-schedule/attendance-settings'

/* Company Payment Settings Module*/
import CompanyPaymentSettingsLayout from '@views/admin/company/payment-settings/payment-main'
import CompanyPaymentOfferPackages from '@views/admin/company/payment-settings/payment-offer-packages'

import CompanyPaymentSettingsInvoices from '@views/admin/company/payment-settings/invoices'
import CompanyPaymentSettingsViewInvoice from '@views/admin/company/payment-settings/view-invoice'
import CompanyPaymentSettingsPackages from '@views/admin/company/payment-settings/packages'
import CompanyPaymentSettingsAvailable from '@views/admin/company/payment-settings/available'
import CompanyPaymentSettingsActive from '@views/admin/company/payment-settings/active'
import CompanyPaymentSettingsConfig from '@views/admin/company/payment-settings/config'

/* Company Account Settings */
import CompanySettingsLayout from '@views/admin/company/account-settings/main'
import CompanySettingsBusinessInfo from '@views/admin/company/account-settings/business-information'
import CompanySettingsBusinessOrganogram from '@views/admin/company/account-settings/business-organogram'
import CompanySettingsEmployeeAccesses from '@views/admin/company/account-settings/employee-accesses'
import CompanySettingsBusinessPassword from '@views/admin/company/account-settings/business-password'
import CompanySettingsBusinessRegulation from '@views/admin/company/account-settings/business-regulation'
import CompanySettingsBusinessLogo from '@views/admin/company/account-settings/business-logo'
import CompanySettingsBusinessDressCode from '@views/admin/company/account-settings/business-dresscode'
import CompanySettingsGeneral from '@views/admin/company/account-settings/general'
import CompanySettingsIntegrations from '@views/admin/company/account-settings/integrations'
import CompanySettingsApiKey from '@views/admin/company/account-settings/api-key'

import AllNotificationsView from '@views/admin/notificationsbeta'

import EmployeeViewSalaries from '@views/admin/employee/salaries'
import EmployeeViewVacations from '@views/admin/employee/vacations'

/* EMPLOYEE PAGES */
import EmployeeVacations from '@views/admin/employee/vacations/vacation'
import EmployeeVacationRequests from '@views/admin/employee/access-modules/vacation-requests/vacation-requests'
import EmployeeFeeds from '@views/admin/employee/feeds/feed'
import EmployeeProfile from '@views/admin/employee/profile/profile'
import EmployeeSalaries from '@views/admin/employee/salaries/salary'
import EmployeeSchedules from '@views/admin/employee/schedules/work-schedule'
import EmployeePerformance from '@views/admin/employee/performance/performance'
import CompanyEmployeeReports from '@views/admin/employee/reports'
import CompanyEmployeesContracts from '@views/admin/company/employees/contracts'
import CompanyRecruitmentReports from '@views/admin/company/recruitment/reports'
import EmployeeCompanySettingsOrganogram from '@views/admin/employee/company-settings/organogram'
import EmployeeCompanySettingsDressCode from '@views/admin/employee/company-settings/dress-code'
import EmployeeCompanySettingsRegulations from '@views/admin/employee/company-settings/regulations'
import EmployeeEvents from '@views/admin/employee/events/event'
import EmployeeTodos from '@views/admin/employee/todos/todos'

import CompanySupportFAQ from '@views/admin/company/support'

import VerifyEmail from '@views/auth/verifyEmail'
import acceptJobSeekerInvitation from '@views/auth/acceptJobSeekerInvitation'

import NoAccessView from '@views/admin/no-access'
import NoAccessPage from '@views/admin/noaccess-page'
import NoEmailVerifyPage from '@views/admin/noaccess-verifiedemail'

export default [
    // Public pages with Public Layout BETA
    {
        path: '/',
        name: 'LayoutPublic',
        component: LayoutPublic,
        redirect: { path: '/' },
        meta: {
            authRequired: false,
        },
        children: [
            {
                path: '',
                name: 'PageProduct',
                component: PageProduct,
            },

            {
                path: 'product',
                name: 'PageProduct',
                component: PageProduct,
            },

            {
                path: 'aboutus',
                name: 'PageAboutUs',
                component: PageAboutUs,
            },

            {
                path: 'academy',
                name: 'TrainingPage',
                component: TrainingPage,
            },

            {
                path: 'pricing',
                name: 'PagePricing',
                component: PagePricing,
            },

            {
                path: 'downloadapp',
                name: 'PageKnowledgeBase',
                component: PageKnowledgeBase,
            },

            {
                path: 'api',
                name: 'PageApi',
                component: PageApi,
            },

            {
                path: 'partnership',
                name: 'PagePartnerShip',
                component: PagePartnerShip,
            },

            {
                path: 'terms-conditions',
                name: 'PageTerms',
                component: PageTerms,
            },

            {
                path: 'privacy-policy',
                name: 'PagePrivacyPolicy',
                component: PagePrivacyPolicy,
            },
        ],
    },

    // Auth pages with auth layout BETA
    {
        path: '/auth/',
        name: 'LayoutAuth',
        component: LayoutAuth,
        meta: {
            authRequired: false,
        },
        children: [
            {
                path: 'verify',
                name: 'VerifyEmail',
                component: VerifyEmail,
            },

            {
                path: 'accept-jobseeker-invitation',
                name: 'acceptJobSeekerInvitation',
                component: acceptJobSeekerInvitation,
            },

            {
                path: 'register',
                name: 'PageRegisterJobSeeker',
                component: PageRegisterJobSeeker,
            },

            {
                path: 'company',
                name: 'PageRegisterCompany',
                component: PageRegisterCompany,
            },

            {
                path: 'company/:packet',
                name: 'PageRegisterCompany',
                component: PageRegisterCompanyPacket,
            },

            {
                path: 'demo',
                name: 'PageDemo',
                component: PageDemo,
            },

            {
                path: 'jobseeker',
                name: 'PageRegisterJobSeeker',
                component: PageRegisterJobSeeker,
            },

            {
                path: 'login',
                name: 'PageLogin',
                component: PageLogin,
            },

            {
                path: 'forgot',
                name: 'PageForgot',
                component: PageForgot,
            },
        ],
    },

    // Notifications and account settings BETA
    {
        path: '/app/',
        name: 'LayoutAdmin',
        component: LayoutAdmin,
        meta: {
            authRequired: true,
        },
        children: [
            {
                path: 'notifications',
                name: 'AllNotificationsView',
                component: AllNotificationsView,
            },

            {
                path: 'account-settings',
                name: 'AccountSettings',
                component: AccountSettings,
            },

            {
                path: 'no-access',
                name: 'NoAccessView',
                component: NoAccessView,
            },

            {
                path: 'no-access-page',
                name: 'NoAccessPage',
                component: NoAccessPage,
            },

            {
                path: 'no-access-verify-email',
                name: 'NoEmailVerifyPage',
                component: NoEmailVerifyPage,
            },
        ],
    },

    // JobSeeker PAGES BETA
    {
        path: '/app/jobseeker/',
        name: 'LayoutAdmin',
        component: LayoutAdmin,
        meta: {
            authRequired: true,
        },
        beforeEnter(routeTo, routeFrom, next) {
            let current_user_type = localStorage.getItem('auth_usertype')
            let verified = localStorage.getItem('verifiedUser')

            if (current_user_type == 'job_seeker') {
                if (verified != '0') {
                    next()
                } else {
                    next({ name: 'NoEmailVerifyPage' })
                }
            } else {
                next({ name: 'NoAccessPage' })
            }
        },
        children: [
            {
                path: 'all-jobs',
                name: 'PageAllJobs',
                component: PageAllJobs,
            },

            {
                path: 'saved-jobs',
                name: 'PageSavedJobs',
                component: PageSavedJobs,
            },

            {
                path: 'detail-job/:id',
                name: 'PageDetailJob',
                component: PageDetailJob,
            },

            {
                path: 'profile',
                name: 'JobseekerPageProfile',
                component: JobseekerPageProfile,
            },

            {
                path: 'download-resume',
                name: 'JobseekerPageDownloadResume',
                component: JobseekerPageDownloadResume,
            },

            {
                path: 'applied-positions',
                name: 'JobseekerPageAppliedPositions',
                component: JobseekerPageAppliedPositions,
            },

            // {
            //     path: 'profile-ratings',
            //     name: 'JobseekerPageRatings',
            //     component: JobseekerPageRatings,
            // },

            {
                path: 'get-cv',
                name: 'JobSeekerGetCV',
                component: JobSeekerGetCV,
            },
        ],
    },

    // COMPANY PAGES BETA
    {
        path: '/app/company/',
        name: 'LayoutAdmin',
        component: LayoutAdmin,
        meta: {
            authRequired: true,
        },
        beforeEnter(routeTo, routeFrom, next) {
            let current_user_type = localStorage.getItem('auth_usertype')
            let verified = localStorage.getItem('verifiedUser')

            if (current_user_type == 'company' || current_user_type == 'employee') {
                if (verified != '0') {
                    next()
                } else {
                    next({ name: 'NoEmailVerifyPage' })
                }
            } else {
                next({ name: 'NoAccessPage' })
            }
        },
        children: [
            // COMPANY FEED
            {
                path: 'feed',
                name: 'CompanyFeed',
                component: CompanyFeed,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    store
                        .dispatch('company_data/has_access_to', 'feeds')

                        .then((response) => {
                            if (response.data == 1 && current_user_type == 'company') {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // FEEDS
            {
                path: 'feeds/',
                name: 'FeedsLayout',
                component: FeedsLayout,

                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    store
                        .dispatch('company_data/has_access_to', 'feeds')

                        .then((response) => {
                            if (response.data == 1 && current_user_type == 'company') {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },

                children: [
                    {
                        path: 'organogram',
                        component: FeedsLayoutOrganogram,
                        name: 'FeedsLayoutOrganogram',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'organogram',
                        },
                    },
                    {
                        path: 'regulation',
                        component: FeedsLayoutRegulation,
                        name: 'FeedsLayoutRegulation',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'regulation',
                        },
                    },
                    {
                        path: 'contacts',
                        component: FeedsLayoutContacts,
                        name: 'FeedsLayoutContacts',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'contacts',
                        },
                    },
                    {
                        path: 'birthdays',
                        component: FeedsLayoutBirthdays,
                        name: 'FeedsLayoutBirthdays',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'birthdays',
                        },
                    },
                    {
                        path: 'events',
                        component: FeedsLayoutEvents,
                        name: 'FeedsLayoutEvents',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'events',
                        },
                    },
                    {
                        path: 'chat',
                        component: FeedsLayoutChat,
                        name: 'FeedsLayoutChat',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'chat',
                        },
                    },
                    {
                        path: 'feeds',
                        component: FeedsLayoutFeeds,
                        name: 'FeedsLayoutFeeds',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'feeds',
                        },
                    },
                    {
                        path: 'dresscode',
                        component: FeedsLayoutDressCode,
                        name: 'FeedsLayoutDressCode',
                        props: true,
                        meta: {
                            module_name: 'feed',
                            active_tab: 'dresscode',
                        },
                    },
                ],
            },

            // JOBS, ADD NEW JOB, DETAIL JOBS, EDIT JOB
            {
                path: 'company-jobs-archive',
                name: 'CompanyJobsArchive',
                component: CompanyJobsArchive,
                meta: {
                    show_search_candiate: true,
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'add-new-job',
                name: 'CompanyJobsAdd',
                component: CompanyJobsAdd,
                props: true,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'company-jobs-archive/:id',
                name: 'CompanyJobsLayout',
                component: CompanyJobsLayout,
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
                children: [
                    {
                        // when /company-jobs-archive/:id/details is matched
                        path: 'details',
                        name: 'CompanyJobsSingleCandidates',
                        component: CompanyJobsSingleCandidates,
                        props: true,
                        meta: {
                            show_search_candiate: true,
                            module_name: 'recruitment',
                        },
                    },
                    {
                        // when /company-jobs-archive/:id/edit is matched
                        path: 'edit',
                        name: 'CompanyJobsSingleEdit',
                        component: CompanyJobsSingleEdit,
                        meta: {
                            show_search_candiate: true,
                            module_name: 'recruitment',
                        },
                    },
                ],
            },

            // JOBS TEMPLATE
            {
                path: 'template-jobs',
                name: 'CompanyTemplateJobs',
                component: CompanyTemplateJobs,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // COMPANY RECRUITMENT REPORTS
            {
                path: 'recruitment-reports',
                name: 'CompanyRecruitmentReports',
                component: CompanyRecruitmentReports,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            // END OF COMPANY RECRUITMENT REPORTS

            // INTERVIEWS
            {
                path: 'company-interviews',
                name: 'CompanyInterviewsListing',
                component: CompanyInterviewsListing,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'company-interviews/:id',
                name: 'CompanyInterviewsListing',
                component: CompanysingleInterviewCandidates,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // RATINGS
            {
                path: 'company-ratings',
                name: 'CompanyRatingsListing',
                component: CompanyRatingsListing,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'company-ratings/:id',
                name: 'CompanyRatingsListing',
                component: CompanySingleRatedCandidates,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            //BLACKLISTED
            {
                path: 'company-blacklisted-candidates',
                name: 'CompanyBlacklistedCandidates',
                component: CompanyBlacklistedCandidates,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'company-blacklisted-candidates/:id',
                name: 'CompanyBlacklistedCandidates',
                component: CompanySingleBlacklistedCandidates,
                meta: {
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // MODULE EMPLOYEE
            {
                path: 'employee/dashboard',
                name: 'CompanyEmployeeDashboard',
                component: CompanyEmployeeDashboard,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'employee/all-employees',
                name: 'CompanyEmployees',
                component: CompanyEmployees,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'employee/profile/:id/',
                name: 'EmployeeProfileLayout',
                component: EmployeeProfileLayout,
                children: [
                    {
                        path: '/',
                        component: EmployeeProfileMainProfileData,
                        name: 'EmployeeProfileMainProfileData',
                        props: true,
                        meta: {
                            module_name: 'employees',
                            active_tab: 'profile',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'employee-info',
                        component: EmployeeProfileEmployeeInfo,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'employee-info',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'contract',
                        component: EmployeeProfileContract,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'contract',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'vacations',
                        component: EmployeeProfileVacations,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'vacations',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'performance',
                        component: EmployeeProfilePerformances,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'performance',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'salary',
                        component: EmployeeProfileSalary,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'salary',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'warning-letter',
                        component: EmployeeProfileWarningLetter,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'warning-letter',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'other-document',
                        component: EmployeeProfileDocuments,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'other-document',
                        },
                        beforeEnter(routeTo, routeFrom, next) {
                            store
                                .dispatch('company_data/has_access_to', 'employee')

                                .then((response) => {
                                    if (response.data == 1) {
                                        next()
                                    } else {
                                        next({ name: 'NoAccessView' })
                                    }
                                })
                                .catch(() => {
                                    next({ name: 'NoAccessView' })
                                })
                        },
                    },

                    {
                        path: 'access',
                        component: EmployeeProfileAccess,
                        name: 'EmployeeProfileMainProfileData',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'access',
                        },
                    },

                    {
                        path: 'todos',
                        component: CompanyEmployeeTodo,
                        name: 'CompanyEmployeeTodo',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'todos',
                        },
                    },

                    {
                        path: 'assets',
                        component: CompanyEmployeeAssets,
                        name: 'CompanyEmployeeAssets',
                        meta: {
                            module_name: 'employees',
                            active_tab: 'assets',
                        },
                    },
                ],
            },
            {
                path: 'employee/all-employees/add',
                name: 'CompanyEmployeesAdd',
                component: CompanyEmployeesAdd,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'document-templates',
                name: 'DocumentTemplates',
                component: DocumentTemplates,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // COMPANY EMPLOYEE REPORTS
            {
                path: 'employee-reports',
                name: 'CompanyEmployeeReports',
                component: CompanyEmployeeReports,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // COMPANY EMPLOYEE CONTRACTS
            {
                path: 'employee-contracts',
                name: 'CompanyEmployeesContracts',
                component: CompanyEmployeesContracts,
                meta: {
                    module_name: 'employees',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'employee')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            // END OF COMPANY EMPLOYEE REPORTS

            // {
            //   path: "employee/config-performances",
            //   name: "CompanyEmployeePerformanceRatingsConfig",
            //   component: CompanyEmployeePerformanceRatingsConfig,
            //   meta: {
            //     module_name: "employees",
            //   },
            //   beforeEnter(routeTo, routeFrom, next) {
            //     store
            //       .dispatch("company_data/has_access_to", "employee")

            //       .then((response) => {
            //         if (response.data == 1) {
            //           next();
            //         } else {
            //           next({ name: "NoAccessView" });
            //         }
            //       })
            //       .catch(() => {
            //         next({ name: "NoAccessView" });
            //       });
            //   },
            // },
            // END OF MODULE EMPLOYEE

            // PAYMENT SETTINGS
            {
                path: 'payment-settings/invoices/:id',
                component: CompanyPaymentSettingsViewInvoice,
            },
            {
                path: 'payment-settings/',
                name: 'CompanyPaymentSettingsLayout',
                component: CompanyPaymentSettingsLayout,

                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'company') {
                        store
                            // Try to fetch the user's information by their username
                            .dispatch('company_data/packages/get_company_total_employees')
                        next()
                    } else {
                        next()
                    }
                },

                children: [
                    // new BETA
                    {
                        path: 'offers-packages',
                        component: CompanyPaymentOfferPackages,
                        name: 'CompanyPaymentOfferPackages',
                        props: true,
                        meta: {
                            module_name: 'payment',
                            active_tab: 'offers-packages',
                        },
                    },
                    // end new BETA
                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: '/',
                        component: CompanyPaymentSettingsActive,
                        name: 'CompanyPaymentSettings',
                        props: true,
                        meta: {
                            module_name: 'payment',
                            active_tab: 'packages', // Activate first tab in employee profile page
                        },
                    },
                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: 'packages',
                        component: CompanyPaymentSettingsPackages,
                        name: 'CompanyPaymentSettingsPackages',
                        props: true,
                        meta: {
                            module_name: 'payment',
                            active_tab: 'packages', // Activate first tab in employee profile page
                        },
                    },
                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: 'available',
                        component: CompanyPaymentSettingsAvailable,
                        name: 'CompanyPaymentSettingsAvailable',
                        props: true,
                        meta: {
                            module_name: 'available',
                            active_tab: 'available', // Activate first tab in employee profile page
                        },
                    },
                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: 'active',
                        component: CompanyPaymentSettingsActive,
                        name: 'CompanyPaymentSettingsActive',
                        props: true,
                        meta: {
                            module_name: 'active',
                            active_tab: 'active', // Activate first tab in employee profile page
                        },
                    },
                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: 'invoices',
                        component: CompanyPaymentSettingsInvoices,
                        name: 'CompanyPaymentSettingsInvoices',
                        props: true,
                        meta: {
                            module_name: 'invoices',
                            active_tab: 'invoices', // Activate first tab in employee profile page
                        },
                    },

                    {
                        // when /company-jobs-archive/:id/ is matched with Work Details
                        path: 'config',
                        component: CompanyPaymentSettingsConfig,
                        name: 'CompanyPaymentSettingsConfig',
                        props: true,
                        meta: {
                            module_name: 'payment',
                            active_tab: 'config', // Activate first tab in employee profile page
                        },
                    },
                ],
            },
            // END OF PAYMENT SETTINGS

            // SETTINGS ACCOUNT
            {
                path: 'account-settings/',
                name: 'CompanySettingsLayout',
                component: CompanySettingsLayout,

                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'company') {
                        next()
                    } else {
                        next()
                    }
                },

                children: [
                    {
                        path: 'business-information',
                        component: CompanySettingsBusinessInfo,
                        name: 'CompanySettingsBusinessInfo',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-information',
                        },
                    },
                    {
                        path: 'business-organogram',
                        component: CompanySettingsBusinessOrganogram,
                        name: 'CompanySettingsBusinessOrganogram',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-organogram',
                        },
                    },
                    {
                        path: 'employee-accesses',
                        component: CompanySettingsEmployeeAccesses,
                        name: 'CompanySettingsEmployeeAccesses',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'employee-accesses',
                        },
                    },
                    {
                        path: 'business-password',
                        component: CompanySettingsBusinessPassword,
                        name: 'CompanySettingsBusinessPassword',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-password',
                        },
                    },
                    {
                        path: 'business-regulation',
                        component: CompanySettingsBusinessRegulation,
                        name: 'CompanySettingsBusinessRegulation',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-regulation',
                        },
                    },
                    {
                        path: 'business-logo',
                        component: CompanySettingsBusinessLogo,
                        name: 'CompanySettingsBusinessLogo',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-logo',
                        },
                    },
                    {
                        path: 'business-dresscode',
                        component: CompanySettingsBusinessDressCode,
                        name: 'CompanySettingsBusinessDressCode',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'business-dresscode',
                        },
                    },
                    {
                        path: 'general',
                        component: CompanySettingsGeneral,
                        name: 'CompanySettingsGeneral',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'general',
                        },
                    },
                    {
                        path: 'integrations',
                        component: CompanySettingsIntegrations,
                        name: 'CompanySettingsIntegrations',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'integrations',
                        },
                    },
                    {
                        path: 'api-key',
                        component: CompanySettingsApiKey,
                        name: 'CompanySettingsApiKey',
                        props: true,
                        meta: {
                            module_name: 'account',
                            active_tab: 'api-key',
                        },
                    },
                ],
            },
            // END OF SETTINGS ACCOUNT

            // MODULE VACATIONS
            {
                path: 'vocation/config-public-holidays',
                name: 'CompanyVocationConfigPublicHolidays',
                component: CompanyVocationConfigPublicHolidays,
                meta: {
                    module_name: 'vocations',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'vacations')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'vocation/config-general-vocations',
                name: 'CompanyVocationConfigGeneralVocations',
                component: CompanyVocationConfigGeneralVocations,
                meta: {
                    module_name: 'vocations',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'vacations')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'vocation/vocation-requests',
                name: 'CompanyVocationEmployeeVocationRequests',
                component: CompanyVocationEmployeeVocationRequests,
                meta: {
                    module_name: 'vocations',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'vacations')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            // END OF MODULE VACATIONS

            // WAGES MODULE
            {
                path: 'wages/settings',
                name: 'CompanyWagesSettings',
                component: CompanyWagesSettings,
                meta: {
                    module_name: 'wages',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'wages')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'wages/employee-wages-list',
                name: 'CompanyEmployeeWagesList',
                component: CompanyEmployeeWagesList,
                meta: {
                    module_name: 'wages',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'wages')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'wages/generate-wages',
                name: 'CompanyGenerateWages',
                component: CompanyGenerateWages,
                meta: {
                    module_name: 'wages',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'wages')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'wages/bonuses',
                name: 'CompanyBonuses',
                component: CompanyBonuses,
                meta: {
                    module_name: 'wages',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'wages')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            //END OF WAGES MODULE

            // INSSURANCES MODULE
            {
                path: 'insurances',
                name: 'AllCompanyEmployeesInsurances',
                component: AllCompanyEmployeesInsurances,
                meta: {
                    module_name: 'insurance',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'insurance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'insurances/employee/:id',
                name: 'CompanyEmployeeInsurances',
                component: CompanyEmployeeInsurances,
                meta: {
                    module_name: 'insurance',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'insurance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            
            // MANAGEMENT ASSETS
            {
                path: 'assets',
                name: 'AssetsPage',
                component: AssetsPage,
                meta: {
                    module_name: 'assets',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'assets')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'category-assets',
                name: 'CategoryAssetsPage',
                component: CategoryAssetsPage,
                meta: {
                    module_name: 'assets',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'assets')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // PERFORMANCES
            {
                path: 'all-performances',
                name: 'AllCompanyEmployeesPerformances',
                component: AllCompanyEmployeesPerformances,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances/employee/:id',
                name: 'EmployeePerformances',
                component: EmployeePerformances,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances/templates/position/:id',
                name: 'CompanyPerformanceTemplates',
                component: CompanyPerformanceTemplates,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances-section/:id',
                name: 'SectionPerformancesCreate',
                component: SectionPerformancesCreate,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances/templates',
                name: 'DepartmentPerformanceTemplates',
                component: DepartmentPerformanceTemplates,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances/templates/department/:id',
                name: 'PositionsPerformanceTemplates',
                component: PositionsPerformanceTemplates,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            {
                path: 'performances/templates/create',
                name: 'CreateCompanyPerformanceTemplates',
                component: CreateCompanyPerformanceTemplates,
                meta: {
                    module_name: 'performances',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'performance')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },

            // WORK SCHEDULE
            {
                path: 'workschedule/today-attendances',
                name: 'TodayAttendances',
                component: TodayAttendances,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'weekly-employee-schedules/:id',
                name: 'CompanyEmployeeWeeklyWorkSchedules',
                component: CompanyEmployeeWeeklyWorkSchedules,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'monthly-employee-attendances/:id',
                name: 'MonthlyAttendances',
                component: MonthlyAttendances,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            
            {
                path: 'workschedule/attendance-settings',
                name: 'CompanyAttendanceSettings',
                component: CompanyAttendanceSettings,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            
            {
                path: 'workschedule/all-employees',
                name: 'CompanyWorkScheduleAllEmployees',
                component: CompanyWorkScheduleAllEmployees,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'workschedule/settings',
                name: 'CompanyWorkScheduleSettings',
                component: CompanyWorkScheduleSettings,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('company_data/has_access_to', 'workschedule')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            // END OF WORK SCHEDULE

            // SUPPORT FAQ
            {
                path: 'support-faq',
                name: 'CompanySupportFAQ',
                component: CompanySupportFAQ,
            },
        ],
    },

    // EMPLOYEE PAGES BETA
    {
        path: '/app/employee/',
        name: 'LayoutAdmin',
        component: LayoutAdmin,
        meta: {
            authRequired: true,
        },
        beforeEnter(routeTo, routeFrom, next) {
            let current_user_type = localStorage.getItem('auth_usertype')

            if (current_user_type == 'employee') {
                next()
            } else {
                next({ name: 'NoAccessPage' })
            }
        },
        children: [
            // EMPLOYEE FEED
            {
                path: 'feeds',
                name: 'EmployeeFeeds',
                component: EmployeeFeeds,
                beforeEnter(routeTo, routeFrom, next) {
                    if (localStorage.getItem('auth_isEmployeeInProbation') == 1) return next({ name: 'EmployeeProfile' })

                    return next()
                },
            },
            // END OF FEED VACATION

            // EMPLOYEE PROFILE
            {
                path: 'profile',
                name: 'EmployeeProfile',
                component: EmployeeProfile,
            },
            // END OF EMPLOYEE PROFILE

            // INTERVIEW PANEL JOBS PAGE
            {
                path: 'jobs',
                name: 'EmployeeInterviewPanelJobs',
                component: EmployeeInterviewPanelJobs,
                meta: {
                    show_search_candiate: true,
                    module_name: 'recruitment',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('employee_data/has_access_to', 'recruitment')

                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessPage' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessPage' })
                        })
                },
            },
            // END OF INTERVIEW PANEL JOBS PAGE

            // INTERVIEW PANEL JOBS SINGLE JOB PAGES
            {
                path: 'jobs/:id',
                name: 'EmployeeInterviewPanelJobsLayout',
                component: EmployeeInterviewPanelJobsLayout,
                beforeEnter(routeTo, routeFrom, next) {
                    store
                        .dispatch('employee_data/has_access_to', 'recruitment')
                        .then((response) => {
                            if (response.data == 1) {
                                next()
                            } else {
                                next({ name: 'NoAccessPage' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessPage' })
                        })
                },
                children: [
                    {
                        path: 'details',
                        name: 'EmployeeInterviewPanelJobsSingleCandidates',
                        component: EmployeeInterviewPanelJobsSingleCandidates,
                        props: true,
                        meta: {
                            show_search_candiate: true,
                            module_name: 'recruitment',
                        },
                    },
                ],
            },
            // END OF INTERVIEW PANEL JOBS SINGLE JOB PAGES

            // EMPLOYEE VACATION
            {
                path: 'vacations',
                name: 'EmployeeVacations',
                component: EmployeeVacations,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE VACATION

            // EMPLOYEE SALARY
            {
                path: 'salaries',
                name: 'EmployeeSalaries',
                component: EmployeeSalaries,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE SALARY

            // EMPLOYEE SCHEDULE
            {
                path: 'schedules',
                name: 'EmployeeSchedules',
                component: EmployeeSchedules,
                meta: {
                    module_name: 'workschedule',
                },
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE SCHEDULE

            // EMPLOYEE PERFORMANCE
            {
                path: 'performance',
                name: 'EmployeePerformance',
                component: EmployeePerformance,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE PERFORMANCE

            // EMPLOYEE EVENTS
            {
                path: 'employee-events',
                name: 'EmployeeEvents',
                component: EmployeeEvents,
            },
            // END OF EMPLOYEE EVENTS

            {
                path: 'employee-todos',
                name: 'EmployeeTodos',
                component: EmployeeTodos,
            },

            // EMPLOYEE COMPANY SETTINGS (ORGANOGRAM)
            {
                path: 'company-settings/organogram',
                name: 'EmployeeCompanySettingsOrganogram',
                component: EmployeeCompanySettingsOrganogram,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE COMPANY SETTINGS (ORGANOGRAM)

            // EMPLOYEE COMPANY SETTINGS (DRESS CODE)
            {
                path: 'company-settings/dresscode',
                name: 'EmployeeCompanySettingsDressCode',
                component: EmployeeCompanySettingsDressCode,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE COMPANY SETTINGS (DRESS CODE)

            // EMPLOYEE COMPANY SETTINGS (REGULATIONS)
            {
                path: 'company-settings/regulation',
                name: 'EmployeeCompanySettingsRegulations',
                component: EmployeeCompanySettingsRegulations,
                // beforeEnter(routeTo, routeFrom, next) {
                //   let current_user_type = localStorage.getItem("auth_usertype");
                //   store
                //     .dispatch("company_data/has_access_to", "feeds")

                //     .then((response) => {
                //       if (response.data == 1 && current_user_type == "employee") {
                //         next();
                //       } else {
                //         next({ name: "NoAccessView" });
                //       }
                //     })
                //     .catch(() => {
                //       next({ name: "NoAccessView" });
                //     });
                // },
            },
            // END OF EMPLOYEE COMPANY SETTINGS (REGULATIONS)

            // EMPLOYEE ACCESS MODULES
            {
                path: 'access/vacation-requests',
                name: 'EmployeeVacationRequests',
                component: EmployeeVacationRequests,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_id = localStorage.getItem('auth.user_id')
                    store
                        .dispatch('company_data/employee/access/get_employee_access', current_user_id)
                        .then(() => {
                            const employee_access = store.getters['company_data/employee/access/get_current_employee_access']
                            if (employee_access && employee_access.all.vacations) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'access/workschedule/all-employees',
                name: 'EmployeeAccessWorkScheduleAllEmployees',
                component: CompanyWorkScheduleAllEmployees,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_id = localStorage.getItem('auth.user_id')
                    store
                        .dispatch('company_data/employee/access/get_employee_access', current_user_id)
                        .then(() => {
                            const employee_access = store.getters['company_data/employee/access/get_current_employee_access']
                            if (employee_access && employee_access.all.workschedule) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
            {
                path: 'access/workschedule/settings',
                name: 'EmployeeAccessWorkScheduleSettings',
                component: CompanyWorkScheduleSettings,
                meta: {
                    module_name: 'workschedule',
                },
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_id = localStorage.getItem('auth.user_id')
                    store
                        .dispatch('company_data/employee/access/get_employee_access', current_user_id)
                        .then(() => {
                            const employee_access = store.getters['company_data/employee/access/get_current_employee_access']
                            if (employee_access && employee_access.all.workschedule) {
                                next()
                            } else {
                                next({ name: 'NoAccessView' })
                            }
                        })
                        .catch(() => {
                            next({ name: 'NoAccessView' })
                        })
                },
            },
        ],
    },

    // SUPER ADMIN PAGES BETA
    {
        path: '/app/',
        name: 'LayoutAdmin',
        component: LayoutAdmin,
        meta: {
            authRequired: true,
        },
        children: [
            {
                path: 'admin-dashboard',
                name: 'SuperAdminDashboard',
                component: SuperAdminDashboard,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },

            {
                path: 'superadmin-trainings',
                name: 'SuperAdminTrainings',
                component: SuperAdminTrainings,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },

            {
                path: 'superadmin-support',
                name: 'SuperAdminSupport',
                component: SuperAdminSupport,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },

            {
                path: 'module-pricing',
                name: 'SuperAdminModulePricing',
                component: SuperAdminModulePricing,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },

            {
                path: 'module-packages',
                name: 'SuperAdminModulePackages',
                component: SuperAdminModulePackages,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },

            {
                path: 'superadmin-jobs',
                name: 'SuperAdminJobs',
                component: SuperAdminJobs,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'superadmin-jobs/:id',
                name: 'SuperAdminSingleJob',
                component: SuperAdminSingleJob,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'companies',
                name: 'SuperAdminCompanies',
                component: SuperAdminCompanies,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'companies-contracts',
                name: 'SuperAdminCompaniesContracts',
                component: SuperAdminCompaniesContracts,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'jobseekers',
                name: 'SuperAdminJobseekers',
                component: SuperAdminJobseekers,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'invoices',
                name: 'SuperAdminInvoices',
                component: SuperAdminInvoices,
            },
            {
                path: 'modules',
                name: 'SuperAdminModules',
                component: SuperAdminModules,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'messages',
                name: 'SuperAdminMessages',
                component: SuperAdminMessages,
                beforeEnter(routeTo, routeFrom, next) {
                    let current_user_type = localStorage.getItem('auth_usertype')
                    if (current_user_type == 'super_admin') {
                        next()
                    } else {
                        next({ name: 'NoAccessPage' })
                    }
                },
            },
            {
                path: 'companies',
                name: 'SuperAdminCompanies',
                component: SuperAdminCompanies,
            },
            {
                path: 'company/profile/:id/',
                name: 'SuperAdminCompanyProfileLayout',
                component: SuperAdminCompanyProfileLayout,
                children: [
                    {
                        path: '/',
                        component: SuperAdminCompanyProfileMainData,
                        name: 'SuperAdminCompanyProfileMainData',
                        props: true,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'modules', // Activate first tab in employee profile page
                        },
                    },
                    {
                        path: 'modules',
                        component: SuperAdminCompanyProfileModules,
                        name: 'SuperAdminCompanyProfileModules',
                        props: true,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'active_modules', // Activate first tab in employee profile page
                        },
                    },
                    {
                        path: 'assign-modules',
                        component: SuperAdminCompanyProfileAsignModules,
                        name: 'SuperAdminCompanyProfileAsignModules',
                        props: true,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'not_active_modules', // Activate first tab in employee profile page
                        },
                    },
                    {
                        path: 'invoices',
                        component: SuperAdminCompanyProfileInvoices,
                        name: 'SuperAdminCompanyProfileInvoices',
                        props: true,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'invoices', // Activate first tab in employee profile page
                        },
                    },
                    {
                        path: 'employees',
                        component: SuperAdminCompanyProfileEmployees,
                        name: 'SuperAdminCompanyProfileEmployees',
                        props: true,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'employees', // Activate first tab in employee profile page
                        },
                    },
                    {
                        path: 'invoice',
                        component: SuperAdminCompanyProfileInvoiceView,
                        name: 'SuperAdminCompanyProfileInvoiceView',
                        props: false,
                        meta: {
                            module_name: 'companies',
                            active_tab: 'hide_everything', // Activate first tab in employee profile page
                        },
                    },
                ],
            },
        ],
    },

    {
        path: '/404',
        name: '404',
        component: require('@views/404').default,
        // Allows props to be passed to the 404 page through route
        // params, such as `resource` to define what wasn't found.
        props: true,
    },
    // Redirect any unmatched routes to the 404 page. This may
    // require some server configuration to work in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    {
        path: '*',
        redirect: '404',
    },
]
