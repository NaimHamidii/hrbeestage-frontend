<template>
    <ul class="sidebar-ul">
        <li v-bind:class="$route.name === 'PageDetailJob' || $route.name === 'PageSavedJobs' ? 'activerouter' : ''">
            <router-link :to="'/app/jobseeker/all-jobs'" v-bind:class="$route.name === 'PageDetailJob' || $route.name === 'PageSavedJob' ? 'router-link-active' : ''">
                <template v-if="$route.name === 'PageDetailJob' || $route.name === 'PageAllJobs' || $route.name === 'PageSavedJob'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/findjobsActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/findjobs.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.findjobs') }}
            </router-link>
        </li>

        <li>
            <router-link :to="'/app/jobseeker/profile'">
                <template v-if="$route.name === 'JobseekerPageProfile'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/cvActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/cv.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.profileCV') }}
            </router-link>
        </li>

        <li>
            <router-link :to="'/app/jobseeker/applied-positions'">
                <template v-if="$route.name === 'JobseekerPageAppliedPositions'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/appliedActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/applied.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.appliedpositions') }}
            </router-link>
        </li>

        <!-- <li>
            <router-link :to="'/app/jobseeker/profile-ratings'">
              <template v-if="$route.name === 'JobseekerPageRatings'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/ratingsActive.svg" height="30px">
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/ratings.svg" height="30px">
                </template>
              {{ $t('navigationlinks.ratingsbyinterviews') }}
            </router-link>
        </li> -->

        <hr />

        <li>
            <router-link :to="'/app/jobseeker/saved-jobs'">
                <template v-if="$route.name === 'PageSavedJobs'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/savedjobsActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/savedjobs.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.savedjobs') }}
            </router-link>
        </li>
        <li>
            <router-link :to="'/app/jobseeker/get-cv'">
                <template v-if="$route.name === 'JobSeekerGetCV'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/downloadcvActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/downloadcv.svg" height="30px" />
                </template>
                {{ $t('navigationlinks.downloadcv') }}
            </router-link>
        </li>
        <li id="sm1200">
            <router-link :to="'/app/notifications'">
                <template v-if="$route.name === 'AllNotificationsView'">
                    <img src="/images/hrbeeElements/jobSeekerIcons/notificonActive.svg" height="30px" />
                </template>
                <template v-else>
                    <img src="/images/hrbeeElements/jobSeekerIcons/notificon.svg" height="30px" />
                </template>
                <b>{{ new_notifications.total_new_notifications }}</b> {{ $t('navigationlinks.nnotifications') }}
            </router-link>
        </li>
        <hr />
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

    props: {
        role: {
            type: String,
        },
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
        },
        title: {
            type: String,
        },
    },
    data() {
        return {
            company_logo: '',
        }
    },
    computed: {
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
        new_notifications: function () {
            return this.$store.getters['notifications/get_notifications']
        },
    },
    watch: {
        company_data: function (new_value) {
            if (typeof new_value.logo_url !== 'undefined') {
                this.company_logo = new_value.logo_url
            }
            return new_value
        },
        // Watch language changes because we need this to get proper Json imports for business categories
        current_site_language(newValue) {
            this.fillBusinessCategoriesData(newValue)
        },
        new_notifications(newvalue) {
            return newvalue
        },
    },
    methods: {
        logoutUser: function () {
            this.$store.dispatch('reset_vuex')
        },
    },
    created() {
        setTimeout(() => {
            this.$store.dispatch('notifications/get_notifications').then((response) => {})
        }, 500)

        if (localStorage.getItem('auth_usertype') == 'company') {
            setTimeout(() => {
                this.$store.dispatch('company_data/get_company_profile_data')
            }, 300)
        }

        if (localStorage.getItem('auth_usertype') == 'job_seeker') {
            setTimeout(() => {
                this.$store.dispatch('jobseeker_profile/get_jobseeker_profile')
            }, 270)
        }
    },
}
</script>

<style style="scss">
#sm1200 {
    display: none;
}
@media (min-width: 315px) and (max-width: 1200px) {
    #sm1200 {
        display: block;
    }
}
</style>
