<template>
    <b-dropdown variant="link" size="lg" no-caret right class="user_dropdown_info">
        <template v-if="role == 'job_seeker'">
            <template slot="button-content">
                <div class="header_user_profile">
                    <p class="fullname">{{ profile_data.name }} {{ profile_data.surname }}</p>
                    <template v-if="profile_data.image_url != null && profile_data.image_url != ''">
                        <img :src="SERVER_BACK + IMAGES_FILES + profile_data.image_url" v-on:click="navbarHrBeeMobile = true" class="imgHeaderProfile" />
                    </template>
                    <template v-else>
                        <img src="/images/user/no-image.png" v-on:click="navbarHrBeeMobile = true" class="profileImage" />
                    </template>
                </div>
            </template>
            <b-dropdown-item>
                <div class="notificationuserprofile" id="md1200">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="float-right">
                                <br />
                                <p class="dropdownStylep">{{ profile_data.name }} {{ profile_data.surname }}</p>
                                <p class="dropdownStylep1">{{ email }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <template v-if="profile_data.image_url != null && profile_data.image_url != ''">
                                <img :src="SERVER_BACK + IMAGES_FILES + profile_data.image_url" class="profileImagedropdown" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="profileImagedropdown" />
                            </template>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-6 text-center">
                            <router-link :to="'/app/account-settings'" class="settingbtn">
                                {{ $t('btn.settingaccountbtn') }}
                            </router-link>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right btnlogout">
                                <button @click="logoutUser" class="logoutbtn">
                                    {{ $t('btn.logoutbtn') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-dropdown-item>

            <div v-if="navbarHrBeeMobile" class="overlayright" id="sm1200">
                <template v-if="profile_data.image_url != null">
                    <img :src="SERVER_BACK + IMAGES_FILES + profile_data.image_url" class="overlayImg" />
                </template>
                <template v-else>
                    <img src="/images/blank_image.svg" class="overlayImg" />
                </template>
                <span class="spanoverlayImg">{{ profile_data.name }} {{ profile_data.surname }}</span>
                <hr />
                <!-- <ul class="overlayjobseekerNav">
                    <jobseeker-navigation :name="profile_name" :surname="profile_surname" :title="profile_title" :email="profile_email" :role="profile_role" v-if="profile_role == 'job_seeker'"/>
                    <language-switcher />                                    
                </ul> -->
                <button class="closeNavButton" v-on:click="navbarHrBeeMobile = false">
                    <img src="/images/hrbeeElements/close.svg" width="20px" />
                </button>
                <ul class="sidebar-ul-right">
                    <li v-on:click="navbarHrBeeMobile = false">
                        <router-link :to="'/app/account-settings'" class="rightsidebar" v-bind:class="$route.name === 'AccountSettings' ? 'activerouter' : ''">
                            <template v-if="$route.name === 'AccountSettings'">
                                <img src="/images/hrbeeElements/jobSeekerIcons/settingsActive.svg" height="30px" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/jobSeekerIcons/settings.svg" height="30px" />
                            </template>
                            {{ $t('btn.settingaccountbtn') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="logoutUser" to="/" class="rightsidebar">
                            <template>
                                <img src="/images/hrbeeElements/hrleftmenu.svg" height="30px" />
                            </template>
                            {{ $t('btn.logoutbtn') }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </template>

        <template v-if="role == 'company'">
            <template slot="button-content">
                <div class="header_user_profile">
                    <p>{{ company_data.name }}</p>
                </div>
            </template>
            <b-dropdown-item active-class="navigation-top-active" :to="'/app/company/account-settings/business-information'">
                <svg data-v-55924c06="" width="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <desc data-v-55924c06="">Created with Sketch.</desc>
                    <defs data-v-55924c06=""></defs>
                    <g data-v-55924c06="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g data-v-55924c06="" id="Individual-homepage" transform="translate(-43.000000, -456.000000)" fill="#00DD80" fill-rule="nonzero">
                            <g data-v-55924c06="" id="Sidebar" transform="translate(-5.000000, -6.000000)">
                                <g data-v-55924c06="" id="Sidebar-Nav" transform="translate(47.000000, 120.000000)">
                                    <g data-v-55924c06="" id="Group-4-Copy" transform="translate(1.000000, 338.000000)">
                                        <g data-v-55924c06="" id="settings-work-tool-(2)" transform="translate(0.000000, 4.000000)"><path data-v-55924c06="" d="M13.9561926,6.22273166 C13.9340537,6.02593505 13.704591,5.87805111 13.5061747,5.87805111 C12.8646686,5.87805111 12.2954134,5.5013872 12.0566783,4.91886301 C11.8127862,4.32222239 11.9700503,3.62640211 12.4481455,3.18785511 C12.5986377,3.05028501 12.6169217,2.81999444 12.4907042,2.66002558 C12.1623719,2.24309598 11.7891888,1.86648417 11.3817296,1.54008727 C11.2221735,1.41204967 10.9880746,1.4298645 10.8497197,1.58306164 C10.4324673,2.0451534 9.6829757,2.21689464 9.1038231,1.97524841 C8.50112517,1.72172563 8.12106604,1.11102067 8.15825932,0.455466082 C8.17050081,0.249553703 8.02000865,0.0705198441 7.81471629,0.0466104634 C7.29182244,-0.0138662053 6.76434455,-0.0157414509 6.23988795,0.0424432511 C6.03693971,0.0648420173 5.88644755,0.239656574 5.89327153,0.442964445 C5.91608757,1.09205985 5.5314444,1.69208634 4.93473698,1.93649334 C4.36251254,2.17022186 3.61828217,1.99993915 3.20186322,1.54196251 C3.06423764,1.39110943 2.83394139,1.37256533 2.67360395,1.49752961 C2.25405951,1.82668729 1.87248973,2.20361165 1.54113609,2.61710329 C1.41189724,2.77785351 1.43091061,3.01085276 1.58291343,3.14915212 C2.07012464,3.59035573 2.22744079,4.29221846 1.97432849,4.89573498 C1.73267631,5.47112282 1.13518752,5.84195263 0.451174854,5.84195263 C0.229213238,5.83481628 0.071115725,5.98379412 0.0468411151,6.18559138 C-0.0147309642,6.71149357 -0.0154602443,7.24734498 0.0438198117,7.77751857 C0.0658023984,7.97514861 0.302245434,8.12173031 0.50284956,8.12173031 C1.11242356,8.10615535 1.69767086,8.48354852 1.94317781,9.08097049 C2.18790338,9.67761112 2.03058724,10.3730147 1.55176275,10.8119263 C1.40199986,10.9494964 1.38298649,11.1794223 1.50920404,11.3393912 C1.83446298,11.7536642 2.20769813,12.1306406 2.61661592,12.4597462 C2.77700545,12.5889819 3.01037509,12.5707504 3.14940714,12.4175532 C3.5682223,11.9543155 4.31766181,11.7828868 4.89452239,12.0250018 C5.49873098,12.2777432 5.87879011,12.8883961 5.84159682,13.5443153 C5.82945951,13.7503319 5.98068096,13.9296783 6.18513985,13.953223 C6.45262938,13.984425 6.72173375,14 6.9915674,14 C7.24770099,14 7.50388669,13.9859357 7.76002028,13.9574423 C7.96302062,13.9350436 8.1134086,13.760229 8.10658462,13.5565565 C8.08309138,12.9078257 8.46841174,12.3077993 9.06433779,12.063809 C9.640417,11.8285178 10.3815219,12.0007278 10.7979929,12.4582356 C10.9363999,12.6087762 11.1650813,12.6269556 11.3263043,12.5024081 C11.7450674,12.1740317 12.1258558,11.7974199 12.4587721,11.3827823 C12.5879589,11.2223967 12.5697269,10.9890328 12.4169427,10.8507856 C11.9297315,10.409582 11.771634,9.70761504 12.0247463,9.10451524 C12.2627,8.53678465 12.8379978,8.15558891 13.456792,8.15558891 L13.543368,8.15782878 C13.7440763,8.174133 13.9287404,8.01952943 13.9530671,7.81465885 C14.0147434,7.28828784 14.0154727,6.75290524 13.9561926,6.22273166 Z M7.01110169,9.3497036 C5.72350553,9.3497036 4.67615509,8.30237896 4.67615509,7.01481454 C4.67615509,5.7273022 5.72350553,4.67992548 7.01110169,4.67992548 C8.29864575,4.67992548 9.34599619,5.7273022 9.34599619,7.01481454 C9.34599619,8.30237896 8.29864575,9.3497036 7.01110169,9.3497036 Z" id="Shape"></path></g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Account settings
            </b-dropdown-item>
            <b-dropdown-item @click="logoutUser" active-class="navigation-top-active">
                <svg data-v-55924c06="" width="14px" height="15px" viewBox="0 0 14 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <desc data-v-55924c06="">Created with Sketch.</desc>
                    <defs data-v-55924c06=""></defs>
                    <g data-v-55924c06="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g data-v-55924c06="" id="Individual-homepage" transform="translate(-45.000000, -514.000000)" fill="#000000" fill-rule="nonzero">
                            <g data-v-55924c06="" id="Sidebar" transform="translate(-5.000000, -6.000000)">
                                <g data-v-55924c06="" id="Sidebar-Nav" transform="translate(47.000000, 120.000000)">
                                    <g data-v-55924c06="" id="Group-4-Copy-4" transform="translate(3.000000, 395.000000)">
                                        <g data-v-55924c06="" id="logout" transform="translate(0.000000, 5.000000)">
                                            <path data-v-55924c06="" d="M10,3.33670173 L10,0.749820613 C10,0.337419276 9.68616279,0 9.30232558,0 L0.697674419,0 C0.313953488,0 0,0.337419276 0,0.749820613 L0,1.23720401 L0,11.009866 L0,11.3474102 C0,11.6222195 0.151162791,11.8846567 0.372093023,12.0096268 L5.6744186,14.9590462 C5.90697674,15.0840163 6.18604651,14.9091831 6.18604651,14.6216269 L6.18604651,11.7473146 L9.30232558,11.7473146 C9.68616279,11.7473146 10,11.4100203 10,10.997494 L10,6.89847461 L8.60465116,6.89847461 L8.60465116,9.87276304 C8.60465116,10.0852122 8.45348837,10.2476733 8.25581395,10.2476733 L6.19767442,10.2476733 L6.19767442,6.3985942 L6.19767442,3.96167721 L6.19767442,3.88669515 C6.19767442,3.61176092 6.04651163,3.34932371 5.8255814,3.22435361 L2.69767442,1.4997662 L8.25581395,1.4997662 C8.45348837,1.4997662 8.60465116,1.66222733 8.60465116,1.8746765 L8.60465116,3.34932371 L10,3.34932371 L10,3.33670173 Z" id="Shape"></path>
                                            <path data-v-55924c06="" d="M11.566896,2.22558325 L13.7865698,4.49456575 C14.0711434,4.78546095 14.0711434,5.21598583 13.7865698,5.50688102 L11.566896,7.77586352 C11.2823225,8.06675872 10.8496568,8.07851088 10.5650832,7.78761569 C10.2920064,7.50847266 10.3260414,7.042924 10.587963,6.76366461 L11.5895481,5.75134934 L7.70807847,5.75134934 C7.51468227,5.75134934 7.32105842,5.66989869 7.19584605,5.51863319 C6.87712366,5.16955896 6.95680426,4.55286115 7.36659019,4.320145 C7.46903667,4.26196596 7.59424904,4.22705854 7.70807847,4.22705854 L11.5896619,4.22705854 C11.5896619,4.22705854 10.5994597,3.21474327 10.5880768,3.21474327 C10.3261553,2.94711969 10.2920064,2.47005157 10.5651971,2.202428 C10.8383877,1.92316861 11.2823225,1.93468806 11.566896,2.22558325 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Log Out
            </b-dropdown-item>
        </template>

        <template v-if="role == 'employee'">
            <template slot="button-content">
                <div class="header_user_profile">
                    <p class="fullname">{{ employee_data.name }} {{ employee_data.surname }}</p>
                    <template v-if="employee_data.image_url != null && employee_data.image_url != ''">
                        <img :src="SERVER_BACK + IMAGES_FILES + employee_data.image_url" v-on:click="navbarHrBeeMobile = true" class="imgHeaderProfile" />
                    </template>
                    <template v-else>
                        <img src="/images/user/no-image.png" v-on:click="navbarHrBeeMobile = true" class="profileImage" />
                    </template>
                </div>
            </template>
            <b-dropdown-item>
                <div class="notificationuserprofile" id="md1200">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="float-right">
                                <br />
                                <p class="dropdownStylep">{{ employee_data.name }} {{ employee_data.surname }}</p>
                                <p class="dropdownStylep1">{{ employee_data.email }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <template v-if="employee_data.image_url != null && employee_data.image_url != ''">
                                <img :src="SERVER_BACK + IMAGES_FILES + employee_data.image_url" class="profileImagedropdown" />
                            </template>
                            <template v-else>
                                <img src="/images/user/no-image.png" class="profileImagedropdown" />
                            </template>
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div class="col-md-6 text-center">
                            <router-link :to="'/app/account-settings'" class="settingbtn">
                                {{ $t('btn.settingaccountbtn') }}
                            </router-link>
                        </div>
                        <div class="col-md-6">
                            <div class="float-right btnlogout">
                                <button @click="logoutUser" class="logoutbtn">
                                    {{ $t('btn.logoutbtn') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-dropdown-item>

            <div v-if="navbarHrBeeMobile" class="overlayright" id="sm1200">
                <template v-if="employee_data.image_url != null">
                    <img :src="SERVER_BACK + IMAGES_FILES + employee_data.image_url" class="overlayImg" />
                </template>
                <template v-else>
                    <img src="/images/user/no-image.png" class="overlayImg" />
                </template>
                <span class="spanoverlayImg">{{ employee_data.name }} {{ employee_data.surname }}</span>
                <hr />
                <button class="closeNavButton" v-on:click="navbarHrBeeMobile = false">
                    <img src="/images/hrbeeElements/close.svg" width="20px" />
                </button>
                <ul class="sidebar-ul-right">
                    <li v-on:click="navbarHrBeeMobile = false">
                        <router-link :to="'/app/account-settings'" class="rightsidebar" v-bind:class="$route.name === 'AccountSettings' ? 'activerouter' : ''">
                            <template v-if="$route.name === 'AccountSettings'">
                                <img src="/images/hrbeeElements/jobSeekerIcons/settingsActive.svg" height="30px" />
                            </template>
                            <template v-else>
                                <img src="/images/hrbeeElements/jobSeekerIcons/settings.svg" height="30px" />
                            </template>
                            {{ $t('btn.settingaccountbtn') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link @click.native="logoutUser" to="/" class="rightsidebar">
                            <template>
                                <img src="/images/hrbeeElements/hrleftmenu.svg" height="30px" />
                            </template>
                            {{ $t('btn.logoutbtn') }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </template>

        <template v-if="role == 'super_admin'">
            <template slot="button-content">
                <div class="header_user_profile">
                    <p>{{ name }}{{ surname }}</p>
                </div>
            </template>
            <b-dropdown-item @click="logoutUser" active-class="navigation-top-active" :to="'/'">
                <svg data-v-55924c06="" width="14px" height="15px" viewBox="0 0 14 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <desc data-v-55924c06="">Created with Sketch.</desc>
                    <defs data-v-55924c06=""></defs>
                    <g data-v-55924c06="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g data-v-55924c06="" id="Individual-homepage" transform="translate(-45.000000, -514.000000)" fill="#000000" fill-rule="nonzero">
                            <g data-v-55924c06="" id="Sidebar" transform="translate(-5.000000, -6.000000)">
                                <g data-v-55924c06="" id="Sidebar-Nav" transform="translate(47.000000, 120.000000)">
                                    <g data-v-55924c06="" id="Group-4-Copy-4" transform="translate(3.000000, 395.000000)">
                                        <g data-v-55924c06="" id="logout" transform="translate(0.000000, 5.000000)">
                                            <path data-v-55924c06="" d="M10,3.33670173 L10,0.749820613 C10,0.337419276 9.68616279,0 9.30232558,0 L0.697674419,0 C0.313953488,0 0,0.337419276 0,0.749820613 L0,1.23720401 L0,11.009866 L0,11.3474102 C0,11.6222195 0.151162791,11.8846567 0.372093023,12.0096268 L5.6744186,14.9590462 C5.90697674,15.0840163 6.18604651,14.9091831 6.18604651,14.6216269 L6.18604651,11.7473146 L9.30232558,11.7473146 C9.68616279,11.7473146 10,11.4100203 10,10.997494 L10,6.89847461 L8.60465116,6.89847461 L8.60465116,9.87276304 C8.60465116,10.0852122 8.45348837,10.2476733 8.25581395,10.2476733 L6.19767442,10.2476733 L6.19767442,6.3985942 L6.19767442,3.96167721 L6.19767442,3.88669515 C6.19767442,3.61176092 6.04651163,3.34932371 5.8255814,3.22435361 L2.69767442,1.4997662 L8.25581395,1.4997662 C8.45348837,1.4997662 8.60465116,1.66222733 8.60465116,1.8746765 L8.60465116,3.34932371 L10,3.34932371 L10,3.33670173 Z" id="Shape"></path>
                                            <path data-v-55924c06="" d="M11.566896,2.22558325 L13.7865698,4.49456575 C14.0711434,4.78546095 14.0711434,5.21598583 13.7865698,5.50688102 L11.566896,7.77586352 C11.2823225,8.06675872 10.8496568,8.07851088 10.5650832,7.78761569 C10.2920064,7.50847266 10.3260414,7.042924 10.587963,6.76366461 L11.5895481,5.75134934 L7.70807847,5.75134934 C7.51468227,5.75134934 7.32105842,5.66989869 7.19584605,5.51863319 C6.87712366,5.16955896 6.95680426,4.55286115 7.36659019,4.320145 C7.46903667,4.26196596 7.59424904,4.22705854 7.70807847,4.22705854 L11.5896619,4.22705854 C11.5896619,4.22705854 10.5994597,3.21474327 10.5880768,3.21474327 C10.3261553,2.94711969 10.2920064,2.47005157 10.5651971,2.202428 C10.8383877,1.92316861 11.2823225,1.93468806 11.566896,2.22558325 Z" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                Log Out
            </b-dropdown-item>
        </template>
    </b-dropdown>
</template>

<script>
export default {
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
    },
    data() {
        return {
            company_logo: '',
            navbarHrBeeMobile: false,
        }
    },
    computed: {
        company_data: function () {
            return this.$store.getters['company_data/get']
        },
        profile_data: function () {
            return this.$store.getters['jobseeker_profile/get']
        },
        employee_data: function () {
            return this.$store.getters['employee_data/profile/get']
        },
    },
    watch: {
        company_data: function (new_value) {
            if (typeof new_value.logo_url !== 'undefined') {
                this.company_logo = new_value.logo_url
            }
            return new_value
        },
        current_site_language(newValue) {
            this.fillBusinessCategoriesData(newValue)
        },
    },
    methods: {
        logoutUser: function () {
            this.$store.dispatch('reset_vuex')
        },
    },
    created() {
        if (localStorage.getItem('auth_usertype') == 'company') {
            this.$store.dispatch('company_data/get_company_profile_data')
        } else if (localStorage.getItem('auth_usertype') == 'job_seeker') {
            this.$store.dispatch('jobseeker_profile/get_jobseeker_profile')
        } else if (localStorage.getItem('auth_usertype') == 'employee') {
            this.$store.dispatch('employee_data/profile/get_employee_profile')
        }
    },
}
</script>

<style lang="scss">
#sm1200 {
    display: none !important;
}
#md1200 {
    display: block !important;
}
.btnlogout {
    margin-top: -6.5px !important;
}
.settingbtn {
    width: 150px !important;
    height: 30px !important;
    border-radius: 3px;
    background-color: #1b75bb;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    padding: 7px 20px !important;
}
.settingbtn:hover {
    color: #ffffff;
}
.logoutbtn {
    width: 100px !important;
    height: 33px !important;
    border-radius: 3px;
    background-color: #343348;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    padding: 7px 20px !important;
}
.dropdownStylep1 {
    margin-top: -12px !important;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    text-align: right;
    color: #bbbdbf;
}
.dropdownStylep {
    font-size: 14px !important;
    font-weight: bold !important;
    line-height: 1.53 !important;
    color: #343348 !important;
}
.profileImage {
    width: 30px !important;
    height: 30px !important;
}
.profileImagedropdown {
    width: 80px !important;
    height: 80px !important;
    padding-right: 10px !important;
}
.header_user_profile {
    p {
        display: inline-block;
        margin-bottom: 0;
        margin-right: 10px;
        color: #34325f;
        font-weight: bold;
        &.user_avatar {
            margin-right: 0;
            height: 40px;
            width: 40px;

            background: #ededfd;
            vertical-align: middle;
            border-radius: 50px;
            line-height: 39px;
            font-weight: bold;
        }
    }
    .company_logo {
        display: inline-block;
        width: 26px;
        height: 27px;
        margin-left: 7px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
a.dropdown-item.active.navigation-top-active {
    background: initial;
    color: #21a9e6;
}

@media (min-width: 315px) and (max-width: 1200px) {
    .user_dropdown_info {
        .fullname {
            display: none !important;
        }
        .profileImage {
            width: 40px !important;
            height: 40px !important;
            border-radius: 20% !important;
        }
    }
    #sm1200 {
        display: block !important;
    }
    #md1200 {
        display: none !important;
    }
}
</style>
