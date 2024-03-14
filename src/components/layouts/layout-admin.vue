<template>
    <div class="layout-admin">
        <div class="admin_left" id="md">
            <div class="admin_sidebar">
                <template>
                    <div class="logo" v-if="profile_role == 'company'">
                        <img v-if="company_data.logo_url_second !== null" :src="SERVER_URL + IMAGES_FILES + company_data.logo_url_second" width="150px" class="m-t-30 ml-3" />
                        <img v-else src="/assets/hr-bee-logo.png" width="150px" class="m-t-30 ml-3" />
                    </div>
                    <div class="logo" v-else-if="profile_role == 'employee'">
                        <img v-if="company_logo != null" :src="SERVER_URL + IMAGES_FILES + company_logo" width="150px" class="m-t-30 ml-3" />
                        <img v-else src="/assets/hr-bee-logo.png" width="150px" class="m-t-30 ml-3" />
                    </div>
                    <div class="logo" v-else>
                        <img src="/assets/hr-bee-logo.png" width="150px" class="m-t-30 ml-3" />
                    </div>
                </template>

                <div class="navigation">
                    <template>
                        <div class="container">
                            <jobseeker-navigation v-if="profile_role == 'job_seeker'" />
                            <company-navigation v-if="profile_role == 'company'" :packagesEnabled="global_active_packages" />
                            <superadmin-navigation v-if="profile_role == 'super_admin'" />
                            <employee-navigation v-if="profile_role == 'employee'" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="admin_right" id="md">
            <div class="admin_header">
                <b-navbar toggleable="md" type="light">
                    <div>
                        <div class="leftNavAdmin">
                            <jobseeker-notifications v-if="profile_role == 'job_seeker'" />
                            <company-notifications v-if="profile_role == 'company'" />
                            <employee-notifications v-if="profile_role == 'employee'" />
                            <superadmin-notification v-if="profile_role == 'super_admin'" />
                        </div>
                        <div class="centerNavAdmin">
                            <current-package v-if="profile_role == 'company'" />
                        </div>
                        <div class="rightNavAdmin">
                            <user-header-profile :name="profile_name" :surname="profile_surname" :email="profile_email" :role="profile_role" />
                        </div>
                    </div>
                </b-navbar>
            </div>
            <div class="admin_content">
                <router-view />
            </div>
        </div>

        <div class="admin_right" id="sm">
            <b-navbar class="navbarHrBee navFixed">
                <b-container>
                        <button v-on:click="navbarHrBeeMobile = true">
                            <img src="/images/hrbeeElements/hrmenu.svg" width="30px" />
                        </button>
                        <img v-if="company_logo != null" :src="SERVER_URL + IMAGES_FILES + company_logo" width="140px" />
                        <img v-else src="/assets/hr-bee-logo.png" width="140px" />
                        <user-header-profile class="rightButton" :name="profile_name" :surname="profile_surname" :email="profile_email" :role="profile_role" />

                    <div v-if="navbarHrBeeMobile" class="overlay">
                        <template v-if="employee_data.image_url != null || profile_data.image_url != null">
                            <img v-if="employee_data.image_url != null" :src="SERVER_BACK + IMAGES_FILES + employee_data.image_url" class="overlayImg" />
                            <img v-if="profile_data.image_url != null" :src="SERVER_BACK + IMAGES_FILES + profile_data.image_url" class="overlayImg" />
                        </template>
                        <template v-else>
                            <img src="/images/blank_image.svg" class="overlayImg" />
                        </template>
                        <span class="spanoverlayImg">{{ profile_name }} {{ profile_surname }}</span>
                        <hr />
                        <ul class="overlayjobseekerNav">
                            <jobseeker-navigation :name="profile_name" :surname="profile_surname" :title="profile_title" :email="profile_email" :role="profile_role" v-if="profile_role == 'job_seeker'" />
                            <employee-navigation v-if="profile_role == 'employee'" />
                            <company-navigation v-if="profile_role == 'company'" :packagesEnabled="global_active_packages" />
                            <superadmin-navigation v-if="profile_role == 'super_admin'" />
                        </ul>
                        <button class="closeNavButton" v-on:click="navbarHrBeeMobile = false">
                            <img src="/images/hrbeeElements/close.svg" width="20px" />
                        </button>
                    </div>
                </b-container>
            </b-navbar>

            <div class="admin_content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import { Slide } from 'vue-burger-menu'

import { profile_data } from '@components/admin-general-fields.js'
import { company_active_packages } from '@components/admin-packages-enabled.js'
/* General components */
import nav_user_profile from '@components/nav-user-profile'

/* Jobseeker Componenents */
import nav_jobseeker from '@jobseeker_components/jobseeker-navigation'
import nav_jobseeker_notifications from '@jobseeker_components/jobseeker-notifications'
//import jobseeker_job_search         from '@jobseeker_components/jobseeker-admin-job-search'

/* Company Componenents */
import nav_company from '@company_components/company-navigation'
import nav_company_current_package from '@company_components/company-navigation-current-package.vue'
import nav_company_notifications from '@company_components/company-notifications'

/* Superadmin Componenents */
import super_admin_navigation from '@superadmin_components/navigation'
import super_admin_notification from '@superadmin_components/notification'

/* Employee Componenents */
import employee_navigation from '@employee_components/navigation'
import employee_notifications from '@employee_components/employee-notifications'

export default {
    mixins: [profile_data, company_active_packages],
    name: 'layout-auth',
    components: {
        /* General components */
        'user-header-profile': nav_user_profile,

        /* Jobseeker Componenents */
        'jobseeker-navigation': nav_jobseeker,
        'jobseeker-notifications': nav_jobseeker_notifications,
        //'jobseeker-search-job': jobseeker_job_search,

        /* Company Componenents */
        'company-navigation': nav_company,
        'current-package': nav_company_current_package,
        'company-notifications': nav_company_notifications,

        /* Superadmin Componenents */
        'superadmin-navigation': super_admin_navigation,
        'superadmin-notification': super_admin_notification,

        /* Employee Componenents */
        'employee-navigation': employee_navigation,
        'employee-notifications': employee_notifications,
        Slide,
    },

    data() {
        return {
            isMobile: isMobile,
            navbarHrBeeMobile: false,
            scrollPosition: null,

            company_logo: ''
        }
    },
    computed: {
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
        employee_data: function () {
            return this.$store.getters['employee_data/profile/get']
        },
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll)
    },
    created() {
        if (localStorage.getItem('auth_usertype') == 'company') {
            this.$store.dispatch('company_data/get_company_profile_data');
        }
        if (localStorage.getItem('auth_usertype') == 'job_seeker') {
            this.$store.dispatch('jobseeker_profile/get_jobseeker_profile')
        } else if (localStorage.getItem('auth_usertype') == 'employee') {
            this.$store.dispatch('employee_data/profile/get_employee_profile').then(res => {
                this.company_logo = res.data.company.logo_url_second;
            })
        }
    },
}
</script>

<style lang="scss">
.navFixed {
    height: auto !important;
    position: fixed !important;
    top: 0 !important;
    width: 100% !important;
}
#sm {
    display: none;
}
@media (min-width: 300px) and (max-width: 1200px) {
    #sm {
        display: block !important;
    }
    .admin_content {
        margin-top: 100px !important;
    }
    #md {
        display: none !important;
    }
}
</style>
