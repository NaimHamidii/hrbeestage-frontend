<template>
    <div class="hr-bee-management-navbar-wrapper">
        <div class="container">
            <div class="hr-bee-management-navbar-md">
                <div>
                    <router-link :class="$route.name === 'PageProduct' ? 'link active-link' : 'link'" :to="'/product'">{{ $t('navigationlinks.product') }}</router-link>
                    <router-link :class="$route.name === 'PagePricing' ? 'link active-link' : 'link'" :to="'/pricing'">{{ $t('navigationlinks.pricing') }}</router-link>
                    <router-link :class="$route.name === 'PageAboutUs' ? 'link active-link' : 'link'" :to="'/aboutus'">{{ $t('navigationlinks.aboutus') }}</router-link>
                </div>
                <div class="text-center">
                    <router-link :to="'/'">
                        <img src="/assets/hr-bee-logo.png"/>
                    </router-link>
                </div>
                <div class="rightItems">
                    <a v-if="!isLoggedin" :class="$route.name === 'PageLogin' ? 'link active-link' : 'link'" v-on:click="redirecToLogin()">{{ $t('navigationlinks.login') }}</a>
                    <a v-if="isLoggedin" class="link" v-on:click="logOutUser()">{{ $t('navigationlinks.logout') }}</a>
                    <a v-if="isLoggedin" class="link" v-on:click="goToDashboard()">{{ $t('navigationlinks.dashboard') }}</a>
                    <languageSwitcher />
                </div>
            </div>

            <div class="hr-bee-management-navbar-sm">
                <div class="main">
                    <img v-on:click="navbarHrBeeMobile = true" class="on-hover" src="/images/hrbeeElements/hrmenu.svg" width="30px" />
                    <div class="text-center">
                        <router-link :to="'/'">
                            <img src="/assets/hr-bee-logo.png" width="120px" />
                        </router-link>
                    </div>
                    <div class="d-flex justify-content-end">
                        <img v-on:click="redirecToLogin()" v-if="!isLoggedin" src="/images/hrbeeElements/hrleftmenu.svg" width="30px" />
                        <img v-on:click="goToDashboard()" v-if="isLoggedin" src="/images/hrbeeElements/hrleftmenu.svg" width="30px" />
                    </div>
                </div>
                <hr />
                <div class="text-center">
                    <p v-if="$route.name === 'PageProduct'" class="page-title">
                        {{ $t('navigationlinks.product') }}
                    </p>
                    <p v-if="$route.name === 'PagePricing'" class="page-title">
                        {{ $t('navigationlinks.pricing') }}
                    </p>
                    <p v-if="$route.name === 'PageAboutUs'" class="page-title">
                        {{ $t('navigationlinks.aboutus') }}
                    </p>
                    <p v-if="$route.name === 'PageDemo'" class="page-title">
                        {{ $t('navigationlinks.demo') }}
                    </p>
                    <p v-if="$route.name === 'PageLogin'" class="page-title">
                        {{ $t('navigationlinks.login') }}
                    </p>
                    <p v-if="$route.name === 'PageRegisterCompany'" class="page-title">
                        {{ $t('navigationlinks.registerascompany') }}
                    </p>
                    <p v-if="$route.name === 'PageRegisterJobSeeker'" class="page-title">
                        {{ $t('navigationlinks.registerasjobseeker') }}
                    </p>
                    <p v-if="$route.name === 'PageForgot'" class="page-title">
                        {{ $t('navigationlinks.forgetpw') }}
                    </p>
                </div>
                <transition name="fade">
                    <div v-if="navbarHrBeeMobile" class="overlay-nav">
                        <div class="main-overlay">
                            <router-link :to="'/'">
                                <img src="/assets/hr-bee-logo.png" width="150px" />
                            </router-link>
                            <img v-on:click="navbarHrBeeMobile = false" src="/images/hrbeeElements/hrbackmenu.svg" width="25px" />
                        </div>
                        <hr />
                        <div class="links">
                            <a v-if="isLoggedin" class="link" v-on:click="goToDashboard()">{{ $t('navigationlinks.dashboard') }}</a>
                            <a :class="$route.name === 'PageProduct' ? 'link active-link' : 'link'" v-on:click="goTo('/product')">{{ $t('navigationlinks.product') }}</a>
                            <a :class="$route.name === 'PagePricing' ? 'link active-link' : 'link'" v-on:click="goTo('/pricing')">{{ $t('navigationlinks.pricing') }}</a>
                            <a :class="$route.name === 'PageAboutUs' ? 'link active-link' : 'link'" v-on:click="goTo('/aboutus')">{{ $t('navigationlinks.aboutus') }}</a>
                            <a v-if="!isLoggedin" :class="$route.name === 'PageLogin' ? 'link active-link' : 'link'" v-on:click="redirecToLogin()">{{ $t('navigationlinks.login') }}</a>
                            <a v-if="isLoggedin" class="link" v-on:click="logOutUser()">{{ $t('navigationlinks.logout') }}</a>
                            
                            <div>
                                <languageSwitcher />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect'
import languageSwitcher from '@components/language-switcher'
export default {
    name: 'layout-public',
    components: {
        languageSwitcher: languageSwitcher,
    },
    data() {
        return {
            isMobile: isMobile,
            scrollPosition: null,
            navbarHrBeeMobile: false,
        }
    },
    computed: {
        isLoggedin() {
            return this.$store.getters['auth/loggedIn']
        },
        role() {
            return this.$store.getters['auth/get_role']
        },
    },
    watch: {
        isLoggedin(newvalue) {
            return newvalue
        },
        role(newvalue) {
            return newvalue
        },
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
        redirecToLogin: function () {
            let current_referal_url = this.$route.name
            let current_referal_url_param_id = ''

            // If redirected to login from Single Public Job page
            // Set the job ID too
            if (current_referal_url == 'JobPublicView') {
                current_referal_url_param_id = this.$route.params.id
                localStorage.setItem('redirectRefJobID', current_referal_url_param_id)
            }
            localStorage.setItem('redirectRef', current_referal_url)
            this.$router.push({ name: 'PageLogin' })
        },
        logOutUser: function () {
            this.$store.dispatch('reset_vuex')
            this.navbarHrBeeMobile = false
        },
        goTo(route) {
            this.$router.push({
                path: route,
            })
            this.navbarHrBeeMobile = false;
        },
        goToDashboard() {
            if(this.role === 'company' || localStorage.getItem('auth_isAdminEmployee') == 1) {
                this.$router.push({
                    path: '/app/company/company-jobs-archive',
                })
            }
            if(this.role === 'job_seeker') {
                this.$router.push({
                    path: '/app/jobseeker/profile',
                })
            }
            if(this.role === 'employee') {
                this.$router.push({
                    path: '/app/employee/profile',
                })
            }
            if(this.role === 'super_admin') {
                this.$router.push({
                    path: '/app/admin-dashboard',
                })
            }
        }
    },
    created() {},
    mounted() {
        window.addEventListener('scroll', this.updateScroll)
    },
}
</script>

<style lang="scss">
    .hr-bee-management-navbar-wrapper{
        background-color: #fff;
        box-shadow: 0 8px 15px 0 rgba(0,0,0,0.1);
        margin-bottom: 10px;
        padding: 20px 0;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 1;

        .hr-bee-management-navbar-md{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            align-items: center;

            .link{
                text-decoration: none;
                text-transform: uppercase;
                color: #554D8A;
                font-size: 14px;
                margin-right: 20px;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
                font-weight: 400;
            }

            .active-link{
                font-weight: 900;
            }

            .rightItems{
                display: flex;
                align-items: center;
                justify-content: end;
            }
        }

        .hr-bee-management-navbar-sm{
            display: none;
        }

        @media (max-width: 992px) {
            .hr-bee-management-navbar-md{
                display: none;
            }

            .hr-bee-management-navbar-sm{
                display: block;

                .main{
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: center;
                }

                .page-title{
                    font-size: 11px;
                    margin-top: -20px;
                    margin-bottom: -10px;
                    font-weight: bold;
                }

                .overlay-nav {
                    height: 100%;
                    width: 270px;
                    position: fixed;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    background-color: #ffffff;
                    box-shadow: 3px 0 7px -2px rgb(223, 220, 220);

                    .main-overlay{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 20px;
                    }

                    .links {
                        padding: 20px 35px;
                        display: flex;
                        flex-direction: column;

                        .link{
                            text-decoration: none;
                            text-transform: uppercase;
                            color: #554D8A;
                            font-size: 13px;
                            margin-right: 20px;
                            font-family: 'Poppins', sans-serif;
                            font-weight: 400;
                            cursor: pointer;
                            margin-bottom: 10px;
                        }

                        .active-link{
                            font-weight: 900;
                        }
                    }
                }
            }
        }
    }

    /* Define the fade animation */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
